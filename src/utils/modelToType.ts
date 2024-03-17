import {
  ConstantValue,
  User,
  Payment,
  Document,
  Competition,
  CompetitionUser,
  CompetitionSteps,
  CompetenceUser,
  Competence,
} from "../interfaces/types";
import { getFullName } from "./init";
const fs = require("fs");

const imgPhotoDefault =
  "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";

type UserProps = {
  model: Partial<User> | null;
  payment?: Partial<Payment>;
  //userPermission?: Partial<UserPermission>[];
  notification?: Partial<Notification>[];
  competenceUser?: Partial<CompetenceUser>[];
};
const formatUserData = ({
  model,
  payment,
  //userPermission,
  notification,
  competenceUser,
}: UserProps): Partial<User> => {
  if (model === null) return {};

  var userType: Partial<User> = {
    id: model.id,
    name: model.name,
    lastName: model.lastName,
    photo: fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
      ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
          encoding: "base64",
        })
      : imgPhotoDefault,
    user: model.user,
    dateOfBirth: model.dateOfBirth,
    celphone: model.celphone,
    city: model.city,
    country: model.country,
    place: model.place,
    type: model.type,
    gender: model.gender,
    region: model.region,
    rol: model.rol,
    status: model.status,
    isAthlete: model.isAthlete,
    isCoach: model.isCoach,
    isJudge: model.isJudge,
    height: model.height,
    weight: model.weight,
    tshirtSize: model.tshirtSize,
    blood: model.blood,
    fran: model.fran,
    sprint: model.sprint,
    helen: model.helen,
    run: model.run,
    grace: model.grace,
    filthy: model.filthy,
    fightGoneBad: model.fightGoneBad,
    murph: model.murph,
    maxPullUps: model.maxPullUps,
    cleanJerk: model.cleanJerk,
    snatch: model.snatch,
    deadlift: model.deadlift,
    backSquat: model.backSquat,
    benchPress: model.benchPress,
    overheadSquat: model.overheadSquat,
    facebook: model.facebook,
    instagram: model.instagram,
    twitter: model.twitter,
    folio: model.folio,
    coachAccepted: model.coachAccepted,
    payment: payment ?? {},
    //competition: competenceUser ?? [],
    competence: competenceUser ?? [],
  };
  return userType;
};

const formatConstantData = (model: ConstantValue): Partial<ConstantValue> => {
  if (model === null) return {};

  var constantType: Partial<ConstantValue> = {
    id: model.id,
    code: model.code,
    value: model.value,
    description: model.description,
  };
  return constantType;
};

const formatDocument = (model: Document): Partial<Document> => {
  if (model === null) return {};

  var documentType: Partial<Document> = {
    id: model.id,
    title: model.title,
    description: model.description,
    photo: fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
      ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
          encoding: "base64",
        })
      : imgPhotoDefault,
    file: model.file,
  };
  return documentType;
};

type UserLostProps = {
  model: User | null;
};
const formatUserLostData = ({ model }: UserLostProps): Partial<User> => {
  if (model === null) return {};

  var userLostType: Partial<User> = {
    id: model.id,
    name: model.name,
    lastName: model.lastName,
    photo: fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
      ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
          encoding: "base64",
        })
      : imgPhotoDefault,
    user: model.user,
    dateOfBirth: model.dateOfBirth,
    celphone: model.celphone,
    city: model.city,
    country: model.country,
    place: model.place,
    type: model.type,
    gender: model.gender,
    rol: model.rol,
    status: model.status,
  };
  return userLostType;
};

const formatCompetitionData = (model: any): Partial<Competition> => {
  if (!model || model === null) return {};
  var competitionType: Partial<Competition> = {
    id: model._id,
    name: model.name,
    description: model.description,
    location: model.location,
    cost: model.cost,
    startDate: model.startDate,
    endDate: model.endDate,
    by: model.by,
    facebookUrl: model.facebookUrl,
    instagramUsername: model.instagramUsername,
    twitterUsername: model.twitterUsername,
    image: model.image,
    bgImage: model.bgImage,
    userId: model.userId,
    status: model.status,
    competitionSteps: model.competitionSteps?.map((itemStep:any) => {return formatCompetitionStepsData(itemStep)}) ?? [],
  };
  return competitionType;
};

const formatCompetitionStepsData = (model: any): Partial<CompetitionSteps> => {
  if (model === null) return {};
  var competitionStepType: Partial<CompetitionSteps> = {
    id: model._id,
    name: model.name,
    start: model.start,
  };
  return competitionStepType;
};

const formatCompetitionUserData = (model: any): Partial<CompetitionUser> => {
  if (model === null) return {};
  var competitionType: Partial<CompetitionUser> = {
    id: model._id,
    fullName: (model.user?.name ?? "") + " " + (model.user?.lastName ?? ""),
    years: model.years,
    amount: model.amount,
    category: model.category,
    place: model.place,
    points: model.points,
    createdAt: model.createdAt,
    competition: formatCompetitionData(model.competition),
  };
  return competitionType;
};

type CompetenceProps = {
  model: Partial<Competence> | null;
};
const formatCompetenceData = ({
  model
}: CompetenceProps): Partial<Competence> => {
  if (model === null) return {};

  var competenceType: Partial<Competence> = {
    id: model.id,
    name: model.name,
    description: model.description,
    madeBy: model.madeBy,
    startDate: model.startDate,
    endDate: model.endDate,
    status: model.status,
    places: model.places,
    active: model.active,
    userId: model.userId,
  };
  return competenceType;
};

type CompetenceUserProps = {
  model: Partial<CompetenceUser> | null;
  competence?: Partial<Competence>;
  user?: Partial<User>;
};
const formatCompetenceUserData = ({
  model,
  competence,
  user,
}: CompetenceUserProps): Partial<CompetenceUser> => {
  if (model === null) return {};

  var competenceUserType: Partial<CompetenceUser> = {
    id: model.id,
    competenceId: model.competenceId,
    userId: model.userId,
    years: model.years,
    amount: model.amount,
    category: model.category,
    typeAthlete: model.typeAthlete,
    createdAt: model.createdAt,
    competence: competence,
    user: user,
  };
  return competenceUserType;
};


export {
  formatUserData,
  formatConstantData,
  formatDocument,
  formatUserLostData,
  formatCompetitionData,
  formatCompetitionUserData,
//ELIMINAR
  formatCompetenceUserData,
  formatCompetenceData
};
