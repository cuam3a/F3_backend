import { Types } from "mongoose";
import { Competition, CompetitionTest, CompetitionUser, Status, User, UserTest } from "../interfaces/types";
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

const setForTime10 = async (arr: any[], category: string) => {
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
    real = real + 1;
  }
  return arr;
};

export const getBonus = async (userId: string) => {
  const competitions = await CompetitionUserModel.find<CompetitionUser>({
    useBonus: { $ne: true },
    typeEvent: 'online',
    user: userId,
    status: Status.ACTIVO,
    place: { $lte: 10 },
  }).populate("competition");

  if (!competitions || competitions.length == 0) {
    return 0;
  }

  const competition = competitions.sort((a, b) => b.amount - a.amount);
  
  if(competition[0].amount == 0 && (competition[0].competition as Competition)?.region.toString() == "65f7d1441dbb758962e93534")
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

export const getUserTest = (category:string, typeAthlete:string, competitionTest:CompetitionTest) : Partial<UserTest> => {
  if(typeAthlete.toUpperCase() == "ALTO_RENDIMIENTO" || typeAthlete.toLowerCase() == "avanzado" ){
    const test : UserTest[] = competitionTest.altoRendimiento.map(ele => {return JSON.parse(ele)})
    for(let i=0; i< test.length; i++){
      let userTest = test[i];
      if(userTest.edgeSupported.includes(category)){
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
  if(typeAthlete.toUpperCase() == "INICIACION_DEPORTIVA" || typeAthlete.toLowerCase() == "principiante" ){
    const test : UserTest[] = competitionTest.iniciacionDeportiva.map(ele => {return JSON.parse(ele)})
    for(let i=0; i< test.length; i++){
      let userTest = test[i];
      if(userTest.edgeSupported.includes(category)){
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
}
