import { Types } from "mongoose";
import {
  Competition,
  CompetitionTest,
  CompetitionUser,
  Status,
  User,
  UserTest,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import CompetitionUserTestModel from "../models/competitionUserTest.model";

export const setPointsAthlete = async (id: string) => {
  const exist = await CompetitionModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA");

  //Atletas calificados
  const athletes = await CompetitionUserModel.find<CompetitionUser>({
    competition: exist.id,
    judgeStatus: "calificado",
    status: Status.ACTIVO,
  });
  await CompetitionUserModel.populate(athletes, "user");
  let arrAmrap10 = [];
  let arrRoundsCap12 = [];
  let arrForTime10 = [];
  let arrForTime10Weight = [];

  for await (let user of athletes) {
    let test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      status: Status.ACTIVO,
    });

    let category = `${user.category ?? ""} ${user.typeAthlete ?? "AVANZADO"} ${
      ((user?.user ?? {}) as Partial<User>).gender ?? "---"
    }`;
    let amrap10 = test.find(
      (f) => f.testType == "AMRAP_10" && f.isValid == true
    );
    if (amrap10) {
      arrAmrap10.push({
        id: user.id,
        category: category,
        reps: amrap10.judgeReps == 0 ? amrap10.reps : amrap10.judgeReps,
        place: 0,
      });
    } else {
      arrAmrap10.push({ id: user.id, category: category, reps: 0, place: 0 });
    }

    let roundsCap12 = test.find(
      (f) => f.testType == "ROUNDS_FOR_TIME_CAP_12" && f.isValid == true
    );
    if (roundsCap12) {
      arrRoundsCap12.push({
        id: user.id,
        category: category,
        reps:
          roundsCap12.judgeReps == 0 ? roundsCap12.reps : roundsCap12.judgeReps,
        time:
          roundsCap12.judgeTime == ""
            ? roundsCap12.time
            : roundsCap12.judgeTime,
        place: 0,
      });
    } else {
      arrRoundsCap12.push({
        id: user.id,
        category: category,
        reps: 0,
        place: 0,
        time: "",
      });
    }

    let forTime10 = test.find(
      (f) => f.testType == "FOR_TIME_CAP_10" && f.isValid == true
    );
    if (forTime10) {
      arrForTime10.push({
        id: user.id,
        category: category,
        reps: forTime10.judgeReps == 0 ? forTime10.reps : forTime10.judgeReps,
        time: forTime10.judgeTime == "" ? forTime10.time : forTime10.judgeTime,
        weight: forTime10.weight ? forTime10.weight : forTime10.judgeWeight,
        place: 0,
      });
    } else {
      arrForTime10.push({
        id: user.id,
        category: category,
        reps: 0,
        place: 0,
        time: "",
        weight: 0,
      });
    }

    let forTime10Weight = test.find(
      (f) => f.testType == "FOR_TIME_CAP_10" && f.isValid == true
    );
    if (forTime10Weight) {
      arrForTime10Weight.push({
        id: user.id,
        category: category,
        weight: forTime10Weight.weight
          ? forTime10Weight.weight
          : forTime10Weight.judgeWeight,
        place: 0,
      });
    } else {
      arrForTime10Weight.push({
        id: user.id,
        category: category,
        place: 0,
        weight: 0,
      });
    }
  }

  const arrCategory = arrAmrap10
    .map((m: any) => {
      return m.category;
    })
    .filter(
      (value: any, index: any, array: any) => array.indexOf(value) === index
    );
  for await (let category of arrCategory) {
    arrAmrap10 = await setPlaceAmrap10(arrAmrap10, category);
    arrRoundsCap12 = await setRoundsCap12(arrRoundsCap12, category);
    arrForTime10 = await setForTime10(arrForTime10, category);
    arrForTime10Weight = await setForTime10Weight(arrForTime10Weight, category);
  }

  for await (let user of athletes) {
    const totalAmrap10 = arrAmrap10.find((f) => f.id == user.id)?.place ?? 0;
    const totalRoundsCap12 =
      arrRoundsCap12.find((f) => f.id == user.id)?.place ?? 0;
    const totalForTime10 =
      arrForTime10.find((f) => f.id == user.id)?.place ?? 0;
    const totalForTime10Weight =
      arrForTime10Weight.find((f) => f.id == user.id)?.place ?? 0;

    user.points =
      totalAmrap10 + totalRoundsCap12 + totalForTime10 + totalForTime10Weight;
  }

  for await (let category of arrCategory) {
    const athletesCategory = athletes.filter(
      (f) =>
        `${f.category ?? ""} ${f.typeAthlete ?? "AVANZADO"} ${
          ((f?.user ?? {}) as Partial<User>).gender ?? "---"
        }` == category
    );
    let place = 1;
    let real = 1;
    let last = -1;
    for await (let athlete of athletesCategory.sort(
      (a, b) => a.points - b.points
    )) {
      athlete.points === last ? (place = place) : (place = real);
      last = athlete.points;
      athlete.place = place;
      await CompetitionUserModel.findOneAndUpdate(
        { _id: athlete.id },
        {
          place: place,
          points: athlete.points,
        },
        {
          new: true,
        }
      );

      real = real + 1;
    }
  }
};

const setPlaceAmrap10 = async (arr: any[], category: string) => {
  let place = 1;
  let real = 1;
  let last = -1;
  for await (let item of arr
    .filter((f) => f.category == category)
    .sort((a, b) => b.reps - a.reps)) {
    item.reps === last ? (place = place) : (place = real);

    last = item.reps;
    item.place = place;
    real = real + 1;
  }
  return arr;
};

const setRoundsCap12 = async (arr: any[], category: string) => {
  let place = 1;
  let real = 1;
  let last = -1;
  let lastTime = "";
  for await (let item of arr
    .filter((f) => f.time !== "" && f.category == category)
    .sort(
      (a, b) =>
        parseFloat((a.time ?? "99:99").replace(":", ".")) -
        parseFloat((b.time ?? "99:99").replace(":", "."))
    )) {
    item.time === lastTime ? (place = place) : (place = real);

    lastTime = item.time ?? "00:00";
    item.place = place;
    real = real + 1;
  }
  last = -1;
  for await (let item of arr
    .filter((f) => f.time === "" && f.category == category)
    .sort((a, b) => b.reps - a.reps)) {
    item.reps === last ? (place = place) : (place = real);

    last = item.reps;
    item.place = place;
    real = real + 1;
  }
  return arr;
};

const setForTime10 = async (
  arr: any[],
  category: string,
  total: number = 0
) => {
  let place = 1;
  let real = 1;
  let last = -1;
  let lastTime = "";
  for await (let item of arr
    .filter((f) => f.time !== "" && f.category == category && f.reps >= total)
    .sort(
      (a, b) =>
        parseFloat((a.time ?? "00:99:99").replace(":", ".")) -
        parseFloat((b.time ?? "00:99:99").replace(":", "."))
    )) {
    item.time === lastTime ? (place = place) : (place = real);

    lastTime = item.time ?? "00:00:00";
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
      await CompetitionUserTestModel.findOneAndUpdate(
        { _id: item.idTest },
        {
          place: item.place,
          points: item.points,
        },
        {
          new: true,
        }
      );
    } else {
      item.points = 0;
    }
  }
  for await (let item of arr
    .filter((f) => f.time !== "" && f.category == category && f.reps < total)
    .sort((a, b) => b.reps - a.reps)) {
    item.reps === last ? (place = place) : (place = real);

    last = item.reps;
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
      await CompetitionUserTestModel.findOneAndUpdate(
        { _id: item.idTest },
        {
          place: item.place,
          points: item.points,
        },
        {
          new: true,
        }
      );
    } else {
      item.points = 0;
    }
  }
  last = -1;
  for await (let item of arr
    .filter((f) => f.time === "" && f.category == category)
    .sort((a, b) => b.reps - a.reps)) {
    item.reps === last ? (place = place) : (place = real);

    last = item.reps;
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
      await CompetitionUserTestModel.findOneAndUpdate(
        { _id: item.idTest },
        {
          place: item.place,
          points: item.points,
        },
        {
          new: true,
        }
      );
    } else {
      item.points = 0;
    }
  }

  return arr;
};

const setForTime10Weight = async (arr: any[], category: string) => {
  let place = 1;
  let real = 1;
  let last = -1;
  for await (let item of arr
    .filter((f) => f.category == category)
    .sort((a, b) => b.weight - a.weight)) {
    item.weight === last ? (place = place) : (place = real);

    last = item.weight;
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
      await CompetitionUserTestModel.findOneAndUpdate(
        { _id: item.idTest },
        {
          place: item.place,
          points: item.points,
        },
        {
          new: true,
        }
      );
    } else {
      item.points = 0;
    }
  }
  return arr;
};

const setOnlyTime = async (arr: any[], category: string) => {
  let place = 1;
  let real = 1;
  let last = -1;
  let lastTime = "";
  for await (let item of arr
    .filter((f) => f.time !== "" && f.category == category)
    .sort(
      (a, b) =>
        parseFloat((a.time ?? "00:99:99").replace(":", ".")) -
        parseFloat((b.time ?? "00:99:99").replace(":", "."))
    )) {
    item.time === lastTime ? (place = place) : (place = real);

    lastTime = item.time ?? "00:00:00";
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
      await CompetitionUserTestModel.findOneAndUpdate(
        { _id: item.idTest },
        {
          place: item.place,
          points: item.points,
        },
        {
          new: true,
        }
      );
    } else {
      item.points = 0;
    }
  }
  return arr;
};

export const getBonus = async (userId: string) => {
  const competitions = await CompetitionUserModel.find<CompetitionUser>({
    useBonus: { $ne: true },
    typeEvent: "online",
    user: userId,
    status: Status.ACTIVO,
    place: { $lte: 10 },
  }).populate("competition");

  if (!competitions || competitions.length == 0) {
    return 0;
  }

  const competition = competitions.sort((a, b) => b.amount - a.amount);

  if (
    competition[0].amount == 0 &&
    (competition[0].competition as Competition)?.region.toString() ==
      "65f7d1441dbb758962e93534"
  )
    return 550;

  return competition[0].amount;
};

export const setUseBonus = async (userId: string) => {
  const competitions = await CompetitionUserModel.find<CompetitionUser>({
    useBonus: { $ne: true },
    user: userId,
    status: Status.ACTIVO,
    place: { $lte: 10 },
  });

  if (!competitions || competitions.length == 0) {
    return false;
  }

  const competition = competitions.sort((a, b) => b.amount - a.amount);
  await CompetitionUserModel.findOneAndUpdate(
    { _id: competition[0].id },
    { useBonus: true },
    { new: true }
  );
  return true;
};

export const getUserTest = (
  category: string,
  typeAthlete: string,
  competitionTest: CompetitionTest
): Partial<UserTest> => {
  if (
    typeAthlete.toUpperCase() == "ALTO_RENDIMIENTO" ||
    typeAthlete.toLowerCase() == "avanzado"
  ) {
    const test: UserTest[] = competitionTest.altoRendimiento.map((ele) => {
      return JSON.parse(ele);
    });
    for (let i = 0; i < test.length; i++) {
      let userTest = test[i];
      if (userTest.edgeSupported.includes(category)) {
        userTest.id = competitionTest.id;
        userTest.Cap = competitionTest.Cap;
        userTest.name = competitionTest.name;
        userTest.ordenTest = competitionTest.ordenTest;
        userTest.testType = competitionTest.testType;
        userTest.description = competitionTest.description;
        userTest.testSubType = competitionTest.testSubType;
        return userTest;
      }
    }
  }
  if (
    typeAthlete.toUpperCase() == "INICIACION_DEPORTIVA" ||
    typeAthlete.toLowerCase() == "principiante"
  ) {
    const test: UserTest[] = competitionTest.iniciacionDeportiva.map((ele) => {
      return JSON.parse(ele);
    });
    for (let i = 0; i < test.length; i++) {
      let userTest = test[i];
      if (userTest.edgeSupported.includes(category)) {
        userTest.id = competitionTest.id;
        userTest.Cap = competitionTest.Cap;
        userTest.name = competitionTest.name;
        userTest.ordenTest = competitionTest.ordenTest;
        userTest.testType = competitionTest.testType;
        userTest.description = competitionTest.description;
        userTest.testSubType = competitionTest.testSubType;
        return userTest;
      }
    }
  }
  return {};
};

//Evaluacion
export const setPointsAthleteR = async (id: string) => {
  const exist = await CompetitionModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA");

  //Atletas calificados
  const athletes = await CompetitionUserModel.find<CompetitionUser>({
    competition: exist.id,
    judgeStatus: "calificado",
    status: Status.ACTIVO,
  });
  await CompetitionUserModel.populate(athletes, "user");
  let arrCHICHEN_ITZA = [];
  let arrTAJ_MAHAL = [];
  let arrPETRA = [];
  let arrLA_GRAN_MURALLA = [];
  let arrEL_COLISEO = [];
  console.log(athletes);
  for await (let user of athletes) {
    let test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      competitionTest: "6643b78e6b00bcf7672bca5c",
      status: Status.ACTIVO,
    });

    let category = `${user.category ?? ""} ${user.typeAthlete ?? "AVANZADO"} ${
      ((user?.user ?? {}) as Partial<User>).gender ?? "---"
    }`;
    let CHICHEN_ITZA = test.find((f) => f.isValid == true);
    if (CHICHEN_ITZA) {
      arrCHICHEN_ITZA.push({
        id: user.id,
        category: category,
        reps:
          CHICHEN_ITZA.judgeReps == 0
            ? CHICHEN_ITZA.reps
            : CHICHEN_ITZA.judgeReps,
        time:
          CHICHEN_ITZA.judgeTime == ""
            ? CHICHEN_ITZA.time
            : CHICHEN_ITZA.judgeTime,
        place: 0,
        points: 0,
        idTest: CHICHEN_ITZA.id,
      });
    } else {
      arrCHICHEN_ITZA.push({
        id: user.id,
        category: category,
        reps: 0,
        place: 0,
        time: "",
        points: 0,
        idTest: 0,
      });
    }

    test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      competitionTest: "664846318384a00b6de1327b",
      status: Status.ACTIVO,
    });
    let TAJ_MAHAL = test.find((f) => f.isValid == true);
    if (TAJ_MAHAL) {
      arrTAJ_MAHAL.push({
        id: user.id,
        category: category,
        reps: TAJ_MAHAL.judgeReps == 0 ? TAJ_MAHAL.reps : TAJ_MAHAL.judgeReps,
        time: TAJ_MAHAL.judgeTime == "" ? TAJ_MAHAL.time : TAJ_MAHAL.judgeTime,
        place: 0,
        points: 0,
        idTest: TAJ_MAHAL.id,
      });
    } else {
      arrTAJ_MAHAL.push({
        id: user.id,
        category: category,
        reps: 0,
        place: 0,
        time: "",
        points: 0,
        idTest: 0,
      });
    }

    test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      competitionTest: "664848e08384a00b6de1327d",
      status: Status.ACTIVO,
    });
    let PETRA = test.find((f) => f.isValid == true);
    if (PETRA) {
      arrPETRA.push({
        id: user.id,
        category: category,
        reps: PETRA.judgeReps == 0 ? PETRA.reps : PETRA.judgeReps,
        time: PETRA.judgeTime == "" ? PETRA.time : PETRA.judgeTime,
        weight: PETRA.weight ? PETRA.weight : PETRA.judgeWeight,
        place: 0,
        points: 0,
        idTest: PETRA.id,
      });
    } else {
      arrPETRA.push({
        id: user.id,
        category: category,
        reps: 0,
        place: 0,
        time: "",
        weight: 0,
        points: 0,
        idTest: 0,
      });
    }

    test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      competitionTest: "664849908384a00b6de1327f",
      status: Status.ACTIVO,
    });
    let LA_GRAN_MURALLA = test.find((f) => f.isValid == true);
    if (LA_GRAN_MURALLA) {
      arrLA_GRAN_MURALLA.push({
        id: user.id,
        category: category,
        time:
          LA_GRAN_MURALLA.judgeTime == ""
            ? LA_GRAN_MURALLA.time
            : LA_GRAN_MURALLA.judgeTime,
        place: 0,
        points: 0,
        idTest: LA_GRAN_MURALLA.id,
      });
    } else {
      arrLA_GRAN_MURALLA.push({
        id: user.id,
        category: category,
        place: 0,
        weight: 0,
        points: 0,
        idTest: 0,
      });
    }

    test = await CompetitionUserTestModel.find({
      competitionUser: user.id,
      competitionTest: "66484a138384a00b6de13281",
      status: Status.ACTIVO,
    });
    let EL_COLISEO = test.find((f) => f.isValid == true);
    if (EL_COLISEO) {
      arrEL_COLISEO.push({
        id: user.id,
        category: category,
        weight: EL_COLISEO.weight ? EL_COLISEO.weight : EL_COLISEO.judgeWeight,
        place: 0,
        points: 0,
        idTest: EL_COLISEO.id,
      });
    } else {
      arrEL_COLISEO.push({
        id: user.id,
        category: category,
        place: 0,
        weight: 0,
        points: 0,
        idTest: 0,
      });
    }
  }

  const arrCategory = arrCHICHEN_ITZA
    .map((m: any) => {
      return m.category;
    })
    .filter(
      (value: any, index: any, array: any) => array.indexOf(value) === index
    );
  for await (let category of arrCategory) {
    arrCHICHEN_ITZA = await setForTime10(arrCHICHEN_ITZA, category, 126);
    arrTAJ_MAHAL = await setForTime10(arrTAJ_MAHAL, category, 90);
    arrPETRA = await setForTime10(arrPETRA, category, 65);
    arrLA_GRAN_MURALLA = await setOnlyTime(arrLA_GRAN_MURALLA, category);
    arrEL_COLISEO = await setForTime10Weight(arrEL_COLISEO, category);
  }

  for await (let user of athletes) {
    const totalCHICHEN_ITZA =
      arrCHICHEN_ITZA.find((f) => f.id == user.id)?.points ?? 0;
    const totalTAJ_MAHAL =
      arrTAJ_MAHAL.find((f) => f.id == user.id)?.points ?? 0;
    const totalPETRA = arrPETRA.find((f) => f.id == user.id)?.points ?? 0;
    const totalLA_GRAN_MURALLA =
      arrLA_GRAN_MURALLA.find((f) => f.id == user.id)?.points ?? 0;
    const totalEL_COLISEO =
      arrEL_COLISEO.find((f) => f.id == user.id)?.points ?? 0;

    user.points =
      totalCHICHEN_ITZA +
      totalTAJ_MAHAL +
      totalPETRA +
      totalLA_GRAN_MURALLA +
      totalEL_COLISEO;
  }

  for await (let category of arrCategory) {
    const athletesCategory = athletes.filter(
      (f) =>
        `${f.category ?? ""} ${f.typeAthlete ?? "AVANZADO"} ${
          ((f?.user ?? {}) as Partial<User>).gender ?? "---"
        }` == category
    );
    let place = 1;
    let real = 1;
    let last = -1;
    for await (let athlete of athletesCategory.sort(
      (a, b) => b.points - a.points
    )) {
      athlete.points === last ? (place = place) : (place = real);
      last = athlete.points;
      athlete.place = place;
      await CompetitionUserModel.findOneAndUpdate(
        { _id: athlete.id },
        {
          place: place,
          points: athlete.points,
        },
        {
          new: true,
        }
      );

      real = real + 1;
    }
  }
};
