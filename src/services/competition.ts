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

const competitionsService = async (
  idU: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { status: Status.ACTIVO } },
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
    }).populate('user');
    list[item].registered = exist ? true : false;
    list[item].registeredAs = list[item].registered ? "atleta" : "";
    list[item].registeredCategory = exist ? exist.category ?? "" : "";
    list[item].registeredTypeAthlete = exist ? exist.typeAthlete ?? "" : "";
    list[item].registeredScore = exist ? exist.points ?? 0 : 0;
    list[item].registeredPlace = exist ? exist.place ?? 0 : 0;
    list[item].userRegion = exist && exist.user ? (exist.user as Partial<User>).region : "";
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
    }).populate('user');
    item[0].registered = exist ? true : false;
    item[0].registeredAs = item[0].registered ? "atleta" : "";
    item[0].registeredCategory = exist ? exist.category ?? "" : "";
    item[0].registeredTypeAthlete = exist ? exist.typeAthlete ?? "" : "";
    item[0].registeredScore = exist ? exist.points ?? 0 : 0;
    item[0].registeredPlace = exist ? exist.place ?? 0 : 0;
    item[0].userRegion = exist && exist.user ? (exist.user as Partial<User>).region : "";
    item[0].bonus = await getBonus(idU);
    
    return formatCompetitionData(item[0]);
  } else {
    return formatCompetitionData(null);
  }
};

const competitionByUserIdService = async (
  userId: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionUserModel.find({
   $or:[{ user: userId},{ judgeUser: userId }]
  }).populate("competition");
  let listC: Competition[] = [];
  list.forEach((f) => {
    console.log(f.user == userId)
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

  if(exist.isPending == true){
    var competitionUser = await CompetitionUserModel.findOneAndUpdate(
      { _id: exist.competitionUser, judgeUser: { $ne: null } },
      {
        judgeStatus: "en espera juez"
      },
      {
        new: true,
      }
    );

    const user = await UserModel.findOne({
      _id: competitionUser?.judgeUser,
    });
    if(user){
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
  
  let arr:Partial<CompetitionUser>[] = [];
  for (const item of list) {

    var userTest = await CompetitionTestModel.find({
      competition: item.competition,
    });
    item.userTest = userTest
    
    arr.push(await formatCompetitionUserData(item));
  };
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

  let arr:Partial<CompetitionUser>[] = [];
  for (const item of list) {
    arr.push(await formatCompetitionUserData(item, "judge"));
  };
  return arr;
};

const competitionJudgeStartService = async (
  id: string,
  userId: string
): Promise<Partial<CompetitionUser>> => {
  console.log(id)
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
console.log(data)
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
    competitionUser: exist.competitionUser, status: Status.ACTIVO
  });

  let judgeStatus = userCompetence?.judgeStatus;
  let link = "";
  let observation = "";
  allTest.every(element => {
    if(element.isPending == false){
      judgeStatus = "calificado"
      return true;
    }
    if(element.isPending == true){
      judgeStatus = "en espera atleta"
      link = element.url;
      observation = element.judgeObservation;
      return false;
    }
    if(element.isValid == null){
      judgeStatus = userCompetence?.judgeStatus;
      return false;
    }
  });
console.log(judgeStatus)
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
  if(data.isPending == true && user){
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
  code: string,
): Promise<number> => {
  const exist = await CompetitionModel.findOne({
    _id: id,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA");

  if(!exist.discountCode || exist.discountCode.length == 0) return 0;

  for await(let item of exist.discountCode){
    let obj = JSON.parse(item)
    if(obj && Object.keys(obj).length !== 0 && obj.constructor === Object){
      if(obj.code.toLowerCase() == code.toLowerCase())
        return obj.value;
    }
  }

  return 0;
};

const competitionUsersGlobalService = async (
  test:string
): Promise<Partial<CompetitionUser>[]> => {

  let listTest: any = [];
  if(test == "TAJ MAHAL"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['665e02c016f78d629053347e','664846318384a00b6de1327b'] }
    })
  }
  if(test == "PETRA"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['664848e08384a00b6de1327d','665e030b16f78d629053347f'] }
    })
  }
  if(test == "LA GRAN MURALLA"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['664849908384a00b6de1327f','665e032b16f78d6290533480'] }
    })
  }
  if(test == "EL COLISEO"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['66484a138384a00b6de13281','665e034f16f78d6290533481'] }
    })
  }
  if(test == "CHICHEN ITZA 1"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['6643b78e6b00bcf7672bca5c','665e036a16f78d6290533482'] }
    })
  }
  if(test == "CHICHEN ITZA 2"){
    listTest = await CompetitionUserTestModel.find({
      place: 1,
      competitionTest: { $in: ['665397a5dbf7430711b5e2c4','665e038d16f78d6290533483'] }
    })
  }
  let arr:Partial<CompetitionUser>[] = [];
  for await(var item of listTest){
    var userTest = await CompetitionTestModel.find({
      _id: item.competitionTest
    });
    if(userTest.length > 0){
      // var competitionUser = await CompetitionUserModel.findOne<any>({
      //   _id: item.competitionUser
      // })

       const competitionUser = await CompetitionUserModel.aggregate([
        {
          $match: {
            _id: item.competitionUser,
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
      competitionUser[0].userTest = userTest
      await CompetitionUserModel.populate(competitionUser[0], "user");
      await CompetitionUserModel.populate(competitionUser[0], "competition");
      await CompetitionModel.populate(competitionUser[0].competition, "region");
      arr.push(await formatCompetitionUserData(competitionUser[0]));
    }
    
  }

  // const list = await CompetitionUserModel.aggregate([
  //   {
  //     $match: {
  //       status: Status.ACTIVO,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       as: "competitionUserTest",
  //       from: "competitionusertests",
  //       foreignField: "competitionUser",
  //       localField: "_id",
  //     },
  //   },
  // ]);
  // await CompetitionUserModel.populate(list, "user");
  // await CompetitionUserModel.populate(list, "competition");
  
  // let arr:Partial<CompetitionUser>[] = [];
  // for (const item of list) {

  //   var userTest = await CompetitionTestModel.find({
  //     competition: item.competition,
  //     place: 1,
      
  //   });
  //   item.userTest = userTest
    
  //   arr.push(await formatCompetitionUserData(item));
  // };
  return arr;
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
};
