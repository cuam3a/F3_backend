import {
  User,
  Status,
  Rol,
  Payment,
  Competition,
  CompetitionUser,
  CompetitionUserTest,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import CompetitionStepsModel from "../models/competitionSteps.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import {
  formatCompetitionData,
  formatCompetitionUserData,
  formatCompetitionUserTestData,
  formatUserData,
} from "../utils/modelToType";
import { Types } from "mongoose";
import { RegisteredCompetition } from "../utils/init";
import CompetitionUserTestModel from "../models/competitionUserTest.model";
import { getBonus, getUserTest } from "../utils/competition";
import CompetitionTestModel from "../models/competitionTest.model";
var nodemailer = require("nodemailer");
const fs = require("fs");

const competitionsService = async (
  idU: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { status: Status.ACTIVO, evenType: { $ne: 'taller'} } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competition",
        localField: "_id",
      },
    },
  ]);
  await CompetitionModel.populate(list, "region");
  for (var item in list) {
    var exist = await CompetitionUserModel.findOne({
      user: new Types.ObjectId(idU),
      competition: new Types.ObjectId(list[item]._id),
    }).populate("user");
    list[item].registered = exist ? true : false;
    list[item].registeredAs = list[item].registered ? "atleta" : "";
    list[item].registeredCategory = exist ? exist.category ?? "" : "";
    list[item].registeredTypeAthlete = exist ? exist.typeAthlete ?? "" : "";
    list[item].registeredScore = exist ? exist.points ?? 0 : 0;
    list[item].registeredPlace = exist ? exist.place ?? 0 : 0;
    list[item].userRegion =
      exist && exist.user ? (exist.user as Partial<User>).region : "";
    
    list[item].canRegistered = true;
    if(list[item].evenType == "nacional"){
      var existUser = list[item].usersList.find((ele:string) => ele == idU)
      if(existUser){
        list[item].canRegistered = true;
      }else{
        list[item].canRegistered = false;
      }
    }
  }
  // list.forEach(async (f:any) => {
  //   f.registered = await RegisteredCompetition(idU, f._id);
  //   f.registeredAs = f.registered ? "atleta" : "";
  // });
  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionByIdService = async (
  id: string,
  idU: string
): Promise<Partial<Competition>> => {
  const item = await CompetitionModel.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competition",
        localField: "_id",
      },
    },
  ]);
  await CompetitionModel.populate(item, "region");

  if (item.length > 0) {
    var exist = await CompetitionUserModel.findOne({
      user: new Types.ObjectId(idU),
      competition: new Types.ObjectId(item[0]._id),
    }).populate("user");
    item[0].registered = exist ? true : false;
    item[0].registeredAs = item[0].registered ? "atleta" : "";
    item[0].registeredCategory = exist ? exist.category ?? "" : "";
    item[0].registeredTypeAthlete = exist ? exist.typeAthlete ?? "" : "";
    item[0].registeredScore = exist ? exist.points ?? 0 : 0;
    item[0].registeredPlace = exist ? exist.place ?? 0 : 0;
    item[0].userRegion =
      exist && exist.user ? (exist.user as Partial<User>).region : "";
    item[0].bonus = await getBonus(idU);

    item[0].canRegistered = true;
    if(item[0].evenType == "nacional"){
      var existUser = item[0].usersList.find((ele:string) => ele == idU)
      if(existUser){
        item[0].canRegistered = true;
      }else{
        item[0].canRegistered = false;
      }
    }

    return formatCompetitionData(item[0]);
  } else {
    return formatCompetitionData(null);
  }
};

const competitionByUserIdService = async (
  userId: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionUserModel.find({
    $or: [{ user: userId }, { judgeUser: userId }],
  }).populate("competition");
  let listC: Competition[] = [];
  list.forEach((f) => {
    console.log(f.user == userId);
    let competition = f.competition as Competition;
    competition.registered = true;
    competition.registeredAs = "atleta";
    competition.registeredAsAthlete = f.user == userId ? true : false;
    competition.registeredAsJudge = f.judgeUser == userId ? true : false;
    competition.registeredCategory = f.category ?? "";
    competition.registeredTypeAthlete = f.typeAthlete ?? "";
    competition.registeredScore = f.points ?? 0;
    competition.registeredPlace = f.place ?? 0;
    listC.push(competition);
  });
  await CompetitionModel.populate(listC, "region");
  return listC.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionAddService = async (
  data: Competition,
  userId: string
): Promise<Partial<Competition>> => {
  let add = await CompetitionModel.create({
    name: data.name,
    description: data.description,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
    by: data.by,
    facebookUrl: data.facebookUrl,
    instagramUsername: data.instagramUsername,
    twitterUsername: data.twitterUsername,
    cost: data.cost,
    image: data.image,
    bgImage: data.bgImage,
    user: userId,
    typeCompetence: data.typeCompetence,
    categoriesSupported: data.categoriesSupported,
    typeEvent: data.typeEvent,
    publicationDate: data.publicationDate,
    withDiscount: data.withDiscount,
    discount: data.discount,
    discountCode: data.discountCode,
    limitInscriptionDate: data.limitInscriptionDate,
    playbookDoc: data.playbookDoc,
    scordcardDoc: data.scordcardDoc,
    additionalDoc1: data.additionalDoc1,
    additionalDoc2: data.additionalDoc2,
    region: data.region,
    status: Status.ACTIVO,
  });

  if (!add) throw Error("ERROR AGREGAR COMPETENCIA");

  data.competitionSteps.forEach(async (item) => {
    await CompetitionStepsModel.create({
      name: item.name,
      start: item.start,
      end: item.end,
      competition: add._id,
    });
  });

  return formatCompetitionData(add);
};

const competitionRegistrationService = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({
    status: Status.ACTIVO,
    rol: Rol.USER,
  });

  const list = await Promise.all(
    users.map(async (user) => {
      return formatUserData({
        model: user,
      });
    })
  );

  return list;
};

const competitionSendResultService = async (
  data: CompetitionUserTest,
  competitionId: string,
  userId: string
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserModel.findOne({
    competition: new Types.ObjectId(competitionId),
    user: new Types.ObjectId(userId),
    status: Status.ACTIVO,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA USUARIO");

  let add = await CompetitionUserTestModel.create({
    competitionUser: exist._id,
    testType: data.testType,
    url: data.url,
    files: data.files,
    time: data.time,
    reps: data.reps,
    weight: data.weight,
    status: Status.ACTIVO,
  });

  if (!add) throw Error("ERROR AGREGAR RESULTADOS PRUEBAS");

  return formatCompetitionUserTestData(add);
};

const competitionGetResultService = async (
  id: string,
  userId: string
): Promise<Partial<CompetitionUser>> => {
  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        competition: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        as: "competitionUserTest",
        from: "competitionusertests",
        foreignField: "competitionUser",
        localField: "_id",
      },
    },
  ]);
  await CompetitionUserModel.populate(list, "user");
  if (list.length > 0) {
    return formatCompetitionUserData(list[0], "judge");
  } else {
    return formatCompetitionUserData(null);
  }
};

const competitionUpdateResultService = async (
  data: CompetitionUserTest,
  competitionId: string,
  userId: string
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserTestModel.findOne({
    _id: data.id,
  });
  if (!exist) throw Error("NO EXISTE REGISTRO PRUEBAS USUARIO");

  const update = await CompetitionUserTestModel.findOneAndUpdate(
    { _id: data.id },
    {
      url: data.url,
      files: data.files,
      time: data.time,
      reps: data.reps,
      weight: data.weight,
      isPending: exist.isPending == true ? false : exist.isPending,
    },
    {
      new: true,
    }
  );
  console.log(update);
  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  if (exist.isPending == true) {
    var competitionUser = await CompetitionUserModel.findOneAndUpdate(
      { _id: exist.competitionUser, judgeUser: { $ne: null } },
      {
        judgeStatus: "en espera juez",
      },
      {
        new: true,
      }
    );

    const user = await UserModel.findOne({
      _id: competitionUser?.judgeUser,
    });
    if (user) {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure: false,
        auth: {
          user: "hola@mexicof3.com",
          pass: "2EBHKpbcqh9.",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const email = {
        from: "hola@mexicof3.com",
        to: user.user,
        subject: "Modificacion Evidencia de Alteta F3",
        html: "Atleta modifico su eviencia en pruebas F3, favor de finalizar con su evaluación",
      };
      await transporter.sendMail(email).catch((error: any) => {
        console.log(error);
      });
    }
  }

  return formatCompetitionUserTestData(update);
};

const competitionUpdateService = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({
    status: Status.ACTIVO,
    rol: Rol.USER,
  });

  const list = await Promise.all(
    users.map(async (user) => {
      return formatUserData({
        model: user,
      });
    })
  );

  return list;
};

const competitionUsersService = async (
  competitionId: string
): Promise<Partial<CompetitionUser>[]> => {
  // const list = await CompetitionUserModel.find({
  //   status: Status.ACTIVO,
  //   competition: competitionId,
  // }).populate("user");

  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        competition: new Types.ObjectId(competitionId),
        status: Status.ACTIVO,
      },
    },
    {
      $lookup: {
        as: "competitionUserTest",
        from: "competitionusertests",
        foreignField: "competitionUser",
        localField: "_id",
      },
    },
  ]);
  await CompetitionUserModel.populate(list, "user");
  await CompetitionUserModel.populate(list, "competition");

  let arr: Partial<CompetitionUser>[] = [];
  for (const item of list) {
    var userTest = await CompetitionTestModel.find({
      competition: item.competition,
    });
    item.userTest = userTest;

    arr.push(await formatCompetitionUserData(item));
  }
  return arr;
};

const competitionUsersJudgeService = async (
  id: string
): Promise<Partial<CompetitionUser>[]> => {
  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        competition: new Types.ObjectId(id),
        status: Status.ACTIVO,
      },
    },
    {
      $lookup: {
        as: "competitionUserTest",
        from: "competitionusertests",
        foreignField: "competitionUser",
        localField: "_id",
      },
    },
  ]);
  await CompetitionUserModel.populate(list, "user");

  let arr: Partial<CompetitionUser>[] = [];
  for (const item of list) {
    arr.push(await formatCompetitionUserData(item, "judge"));
  }
  return arr;
};

const competitionJudgeStartService = async (
  id: string,
  userId: string
): Promise<Partial<CompetitionUser>> => {
  console.log(id);
  const exist = await CompetitionUserModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE REGISTRO USUARIO COMPETENCIA");
  // if (
  //   (exist.judgeStatus == "bloqueado" ||
  //     exist.judgeStatus == "en espera atleta" ||
  //     exist.judgeStatus == "en espera juez") &&
  //   exist.judgeUser != userId
  // )
  //   throw Error("USUARIO CALIFICADO POR OTRO JUEZ");
  // if (exist.judgeStatus == "calificado") throw Error("USUARIO CALIFICADO");

  const update = await CompetitionUserModel.findOneAndUpdate(
    { _id: exist._id },
    {
      judgeStatus: "bloqueado",
      judgeUser: userId,
    },
    {
      new: true,
    }
  );
  console.log(update);
  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  return formatCompetitionUserData(update, "judge");
};

const competitionUserUpdateService = async (
  competitionId: string,
  userId: string,
  typeAthlete: string
): Promise<Partial<CompetitionUser>> => {
  const exist = await CompetitionUserModel.findOne({
    competition: competitionId,
    user: userId,
  });
  if (!exist) throw Error("NO EXISTE REGISTRO USUARIO COMPETENCIA");

  const update = await CompetitionUserModel.findOneAndUpdate(
    { _id: exist._id },
    {
      typeAthlete: typeAthlete,
    },
    {
      new: true,
    }
  );
  console.log(update);
  if (!update) throw Error("ERROR ACTUALIZAR USUARIO COMPETENCIA");

  return formatCompetitionUserData(update);
};

const competitionUserResultJudgeService = async (
  id: string,
  userId: string,
  idU: string
): Promise<Partial<CompetitionUser>> => {
  const exist = await CompetitionUserModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE REGISTRO USUARIO COMPETENCIA");
  // if (
  //   (exist.judgeStatus == "bloqueado" ||
  //     exist.judgeStatus == "en espera altleta" ||
  //     exist.judgeStatus == "en espera juez") &&
  //   exist.judgeUser != idU
  // )
  //   throw Error("USUARIO CALIFICADO POR OTRO JUEZ");
  // if (exist.judgeStatus == "calificado") throw Error("USUARIO CALIFICADO");

  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        _id: exist._id,
      },
    },
    {
      $lookup: {
        as: "competitionUserTest",
        from: "competitionusertests",
        foreignField: "competitionUser",
        localField: "_id",
      },
    },
  ]);
  await CompetitionUserModel.populate(list, "user");
  if (list.length > 0) {
    return formatCompetitionUserData(list[0], "judge");
  } else {
    return formatCompetitionUserData(null);
  }
};

const competitionUpdateResultJudgeStartService = async (
  data: Partial<CompetitionUserTest>
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserTestModel.findOne({
    _id: new Types.ObjectId(data.id),
  });
  if (!exist) throw Error("NO EXISTE REGISTRO PRUEBAS USUARIO");
  console.log(data);
  const update = await CompetitionUserTestModel.findOneAndUpdate(
    { _id: data.id },
    {
      judgeTime: data.judgeTime,
      judgeReps: data.judgeReps,
      judgeWeight: data.judgeWeight,
      judgeQualification: data.judgeQualification,
      judgeObservation: data.judgeObservation,
      isValid: data.isValid,
      isPending: data.isPending,
      qualificationDate: new Date(),
    },
    {
      new: true,
    }
  );

  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  const userCompetence = await CompetitionUserModel.findOne({
    _id: exist.competitionUser,
  });

  const allTest = await CompetitionUserTestModel.find({
    competitionUser: exist.competitionUser,
    status: Status.ACTIVO,
  });

  let judgeStatus = userCompetence?.judgeStatus;
  let link = "";
  let observation = "";
  allTest.every((element) => {
    if (element.isPending == false) {
      judgeStatus = "calificado";
      return true;
    }
    if (element.isPending == true) {
      judgeStatus = "en espera atleta";
      link = element.url;
      observation = element.judgeObservation;
      return false;
    }
    if (element.isValid == null) {
      judgeStatus = userCompetence?.judgeStatus;
      return false;
    }
  });
  console.log(judgeStatus);
  await CompetitionUserModel.findOneAndUpdate(
    { _id: userCompetence?.id },
    {
      judgeStatus: judgeStatus,
    },
    {
      new: true,
    }
  );

  const user = await UserModel.findOne({
    _id: userCompetence?.user,
  });
  if (data.isPending == true && user) {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: "hola@mexicof3.com",
        pass: "2EBHKpbcqh9.",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const email = {
      from: "hola@mexicof3.com",
      to: user.user,
      subject: "Error en información Pruebas F3",
      html: `Hola Atleta identificamos que alguna evidencia de las que subiste tiene problemas (${link}), por favor verifica que es lo que esta mal para que corrijas antes de la fecha limite para evaluar evidencias.  
      observacion de juez: ${observation}`,
    };
    await transporter.sendMail(email).catch((error: any) => {
      console.log(error);
    });
  }

  return formatCompetitionUserTestData(update, "judge");
};

const competitionVerifyDiscountService = async (
  id: string,
  code: string
): Promise<number> => {
  const exist = await CompetitionModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA");

  if (!exist.discountCode || exist.discountCode.length == 0) return 0;

  for await (let item of exist.discountCode) {
    let obj = JSON.parse(item);
    if (obj && Object.keys(obj).length !== 0 && obj.constructor === Object) {
      if (obj.code.toLowerCase() == code.toLowerCase()) return obj.value;
    }
  }

  return 0;
};

const competitionUsersGlobalService = async (
  test: string
): Promise<Partial<CompetitionUser>[]> => {
  let listTest: any = [];

  let arrCHICHEN_ITZA = [];
  let arrTAJ_MAHAL = [];
  let arrPETRA = [];
  let arrLA_GRAN_MURALLA = [];
  let arrEL_COLISEO = [];
  let arrCHICHEN_ITZA_2 = [];

  if (test == "TAJ MAHAL") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "665e02c016f78d629053347e",
          "664846318384a00b6de1327b",
          "667bc188857435fcfce04245",
          "661e12315f3c504e0bab6bb4",
        ],
      },
    });
  }
  if (test == "PETRA") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "664848e08384a00b6de1327d",
          "665e030b16f78d629053347f",
          "667bc188857435fcfce04246",
          "669195274f42829c32c93261",
        ],
      },
    });
  }
  if (test == "LA GRAN MURALLA") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "664849908384a00b6de1327f",
          "665e032b16f78d6290533480",
          "667bc188857435fcfce04247",
          "669195334f42829c32c93263",
        ],
      },
    });
  }
  if (test == "EL COLISEO") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "66484a138384a00b6de13281",
          "665e034f16f78d6290533481",
          "667bc188857435fcfce04248",
          "6691953c4f42829c32c93265",
        ],
      },
    });
  }
  if (test == "CHICHEN ITZA 1") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "6643b78e6b00bcf7672bca5c",
          "665e036a16f78d6290533482",
          "667bc188857435fcfce04249",
          "669195484f42829c32c93267",
        ],
      },
    });
  }
  if (test == "CHICHEN ITZA 2") {
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: {
        $in: [
          "665397a5dbf7430711b5e2c4",
          "665e038d16f78d6290533483",
          "667bc188857435fcfce0424a",
          "669195574f42829c32c93269",
        ],
      },
    });
  }

  let arr: Partial<any>[] = [];
  let arrCat: string[] = [];
  for await (var item of listTest) {
    var userTest = await CompetitionTestModel.find({
      _id: item.competitionTest,
    });
    if (userTest.length > 0) {
      var competitionUser = await CompetitionUserModel.findOne<any>({
        _id: item.competitionUser,
      });
      await CompetitionUserModel.populate(competitionUser, "user");
      let category = `${competitionUser.category ?? ""} ${
        competitionUser.typeAthlete ?? "AVANZADO"
      } ${((competitionUser?.user ?? {}) as Partial<User>).gender ?? "---"}`;
      arrCat.push(category);
      if (test == "TAJ MAHAL") {
        if (item.isValid) {
          arrTAJ_MAHAL.push({
            id: competitionUser.id,
            category: category,
            reps: item.judgeReps == 0 ? item.reps : item.judgeReps,
            time: item.judgeTime == "" ? item.time : item.judgeTime,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrTAJ_MAHAL.push({
            id: competitionUser.id,
            category: category,
            reps: 0,
            place: 0,
            time: "",
            points: 0,
            idTest: 0,
          });
        }
      }
      if (test == "PETRA") {
        if (item.isValid) {
          arrPETRA.push({
            id: competitionUser.id,
            category: category,
            reps: item.judgeReps == 0 ? item.reps : item.judgeReps,
            time: item.judgeTime == "" ? item.time : item.judgeTime,
            weight: item.weight ? item.weight : item.judgeWeight,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrPETRA.push({
            id: competitionUser.id,
            category: category,
            reps: 0,
            place: 0,
            time: "",
            weight: 0,
            points: 0,
            idTest: 0,
          });
        }
      }
      if (test == "LA GRAN MURALLA") {
        if (item.isValid) {
          arrLA_GRAN_MURALLA.push({
            id: competitionUser.id,
            category: category,
            time: item.judgeTime == "" ? item.time : item.judgeTime,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrLA_GRAN_MURALLA.push({
            id: competitionUser.id,
            category: category,
            place: 0,
            weight: 0,
            points: 0,
            idTest: 0,
          });
        }
      }
      if (test == "EL COLISEO") {
        if (item.isValid) {
          arrEL_COLISEO.push({
            id: competitionUser.id,
            category: category,
            weight: item.weight ? item.weight : item.judgeWeight,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrEL_COLISEO.push({
            id: competitionUser.id,
            category: category,
            place: 0,
            weight: 0,
            points: 0,
            idTest: 0,
          });
        }
      }
      if (test == "CHICHEN ITZA 1") {
        if (item.isValid) {
          arrCHICHEN_ITZA.push({
            id: competitionUser.id,
            category: category,
            reps: item.judgeReps == 0 ? item.reps : item.judgeReps,
            time: item.judgeTime == "" ? item.time : item.judgeTime,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrCHICHEN_ITZA.push({
            id: competitionUser.id,
            category: category,
            reps: 0,
            place: 0,
            time: "",
            points: 0,
            idTest: 0,
          });
        }
      }
      if (test == "CHICHEN ITZA 2") {
        if (item.isValid) {
          arrCHICHEN_ITZA_2.push({
            id: competitionUser.id,
            category: category,
            reps: item.judgeReps == 0 ? item.reps : item.judgeReps,
            time: item.judgeTime == "" ? item.time : item.judgeTime,
            place: 0,
            points: 0,
            idTest: item.id,
          });
        } else {
          arrCHICHEN_ITZA_2.push({
            id: competitionUser.id,
            category: category,
            reps: 0,
            place: 0,
            time: "",
            points: 0,
            idTest: 0,
          });
        }
      }
    }

    //   let competitionUser = await CompetitionUserModel.aggregate([
    //     {
    //       $match: {
    //         _id: item.competitionUser,
    //         category:'21-29 años',
    //         typeAthlete:"INICIACION_DEPORTIVA"
    //       },
    //     },
    //     {
    //       $lookup: {
    //         as: "competitionUserTest",
    //         from: "competitionusertests",
    //         foreignField: "competitionUser",
    //         localField: "_id",
    //       },
    //     },
    //   ]);
    //   if(competitionUser.length > 0){
    //     competitionUser[0].userTest = userTest;
    //     await CompetitionUserModel.populate(competitionUser[0], "user");
    //     await CompetitionUserModel.populate(competitionUser[0], "competition");
    //     await CompetitionModel.populate(competitionUser[0].competition, "region");
    //     arr.push(await formatCompetitionUserData(competitionUser[0]));
    //   }
    // }
  }

  const arrCategory = arrCat
    .map((m: any) => {
      return m;
    })
    .filter(
      (value: any, index: any, array: any) => array.indexOf(value) === index
    );
  for await (let category of arrCategory) {
    if (test == "TAJ MAHAL") {
      arrTAJ_MAHAL = await setForTime10(arrTAJ_MAHAL, category, "00:07:00");
    }
    if (test == "PETRA") {
      arrPETRA = await setForTime10(arrPETRA, category, "00:03:00");
    }
    if (test == "LA GRAN MURALLA") {
      arrLA_GRAN_MURALLA = await setOnlyTime(arrLA_GRAN_MURALLA, category);
    }
    if (test == "EL COLISEO") {
      arrEL_COLISEO = await setForTime10Weight(arrEL_COLISEO, category);
    }
    if (test == "CHICHEN ITZA 1") {
      arrCHICHEN_ITZA = await setForTime10(
        arrCHICHEN_ITZA,
        category,
        "00:08:00"
      );
    }
    if (test == "CHICHEN ITZA 2") {
      arrCHICHEN_ITZA_2 = await setForTime10(
        arrCHICHEN_ITZA_2,
        category,
        "00:08:00"
      );
    }
  }

  if (test == "TAJ MAHAL") {
    for await (let item of arrTAJ_MAHAL.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "TAJ MAHAL"
        });
      }
    }
  }
  if (test == "PETRA") {
    for await (let item of arrPETRA.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "PETRA"
        });
      }
    }
  }
  if (test == "LA GRAN MURALLA") {
    for await (let item of arrLA_GRAN_MURALLA.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "LA GRAN MURALLA"
        });
      }
    }
  }
  if (test == "EL COLISEO") {
    for await (let item of arrEL_COLISEO.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "EL COLISEO"
        });
      }
    }
  }
  if (test == "CHICHEN ITZA 1") {
    for await (let item of arrCHICHEN_ITZA.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "CHICHEN ITZA 1"
        });
      }
    }
  }
  if (test == "CHICHEN ITZA 2") {
    for await (let item of arrCHICHEN_ITZA_2.filter(ele => ele.place == 1)) {
      const competitionUser =
        await CompetitionUserModel.findOne<CompetitionUser>({ _id: item.id });
      await CompetitionModel.populate(competitionUser, "competition");
      await UserModel.populate(competitionUser, "user");
      if (competitionUser) {
        let image = fs.existsSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`)
        ? fs.readFileSync(`${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`, {
            encoding: "base64",
          })
        : `${process.cwd()}/upload/competitions/${(competitionUser.competition as Competition).image}`;
        arr.push({
          competitionName: (competitionUser.competition as Competition).name,
          image: image,
          name: (competitionUser.user as User).name,
          lastName: (competitionUser.user as User).lastName,
          club: (competitionUser.user as User).place,
          country: `${(competitionUser.user as User).city}, ${(competitionUser.user as User).state}`,
          category: item.category,
          reps: item.reps ?? 0,
          time: item.time ?? "",
          weight: item.weight ?? 0,
          place: item.place,
          test: "CHICHEN ITZA 2"
        });
      }
    }
  }
  console.log(arr)
  return arr;
};

const setForTime10 = async (
  arr: any[],
  category: string,
  totalTime: string = ""
) => {
  let place = 1;
  let real = 1;
  let last = -1;
  let lastTime = "";
  for await (let item of arr
    .filter(
      (f) => f.time !== "" && f.category == category && f.time != totalTime
    )
    .sort(
      (a, b) =>
        parseFloat((a.time ?? "00:99:99").substring(3).replace(":", ".")) -
        parseFloat((b.time ?? "00:99:99").substring(3).replace(":", "."))
    )) {
    item.time === lastTime ? (place = place) : (place = real);

    lastTime = item.time ?? "00:00:00";
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
    } else {
      item.points = 0;
    }
    // if (category == "21-29 años INICIACION_DEPORTIVA FEMENIL")
    //   console.log(item.place);
  }
  for await (let item of arr
    .filter(
      (f) => f.time !== "" && f.category == category && f.time == totalTime
    )
    .sort((a, b) => b.reps - a.reps)) {
    item.reps === last ? (place = place) : (place = real);

    last = item.reps;
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
    } else {
      item.points = 0;
    }
    // if (category == "21-29 años INICIACION_DEPORTIVA FEMENIL")
    //   console.log(item.place);
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
        parseFloat((a.time ?? "00:99:99").substring(3).replace(":", ".")) -
        parseFloat((b.time ?? "00:99:99").substring(3).replace(":", "."))
    )) {
    item.time === lastTime ? (place = place) : (place = real);

    lastTime = item.time ?? "00:00:00";
    item.place = place;
    item.points = 100 - (place - 1) * 10;
    real = real + 1;
    if (item.idTest != 0) {
    } else {
      item.points = 0;
    }
  }
  return arr;
};

const coursesService = async (
  idU: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { status: Status.ACTIVO, evenType: 'taller' } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competition",
        localField: "_id",
      },
    },
  ]);
  await CompetitionModel.populate(list, "region");
  for (var item in list) {
    var exist = await CompetitionUserModel.findOne({
      user: new Types.ObjectId(idU),
      competition: new Types.ObjectId(list[item]._id),
    }).populate("user");
    list[item].registered = exist ? true : false;
    list[item].registeredAs = list[item].registered ? "atleta" : "";
    list[item].registeredCategory = exist ? exist.category ?? "" : "";
    list[item].registeredTypeAthlete = exist ? exist.typeAthlete ?? "" : "";
    list[item].registeredScore = exist ? exist.points ?? 0 : 0;
    list[item].registeredPlace = exist ? exist.place ?? 0 : 0;
    list[item].userRegion =
      exist && exist.user ? (exist.user as Partial<User>).region : "";
    
    list[item].canRegistered = true;
    if(list[item].evenType == "nacional"){
      var existUser = list[item].usersList.find((ele:string) => ele == idU)
      if(existUser){
        list[item].canRegistered = true;
      }else{
        list[item].canRegistered = false;
      }
    }
  }
  // list.forEach(async (f:any) => {
  //   f.registered = await RegisteredCompetition(idU, f._id);
  //   f.registeredAs = f.registered ? "atleta" : "";
  // });
  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

export {
  competitionsService,
  competitionByIdService,
  competitionByUserIdService,
  competitionAddService,
  competitionRegistrationService,
  competitionSendResultService,
  competitionUpdateService,
  competitionUsersService,
  competitionGetResultService,
  competitionUpdateResultService,
  competitionUsersJudgeService,
  competitionJudgeStartService,
  competitionUserUpdateService,
  competitionUserResultJudgeService,
  competitionUpdateResultJudgeStartService,
  competitionVerifyDiscountService,
  competitionUsersGlobalService,
  coursesService,
};
