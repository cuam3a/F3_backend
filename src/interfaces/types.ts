import { Types } from "mongoose";

export type User = {
  id: string;
  customerOpenPayId: string;
  user: string;
  password: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  celphone: number;
  city: string;
  country: string;
  place: string;
  type: string;
  photo: string;
  gender: string;
  photoFile: File | null;
  status: Status;
  rol: Rol;
  passwordCode: string;
  region: string;
  isAthlete: boolean;
  isJudge: boolean;
  isCoach: boolean;
  height: number;
  weight: number;
  tshirtSize: string;
  blood: string;
  fran: number;
  sprint: number;
  helen: number;
  run: number;
  grace: number;
  filthy: number;
  fightGoneBad: number;
  murph: number;
  maxPullUps: number;
  cleanJerk: number;
  snatch: number;
  deadlift: number;
  backSquat: number;
  benchPress: number;
  overheadSquat: number;
  facebook: string;
  instagram: string;
  twitter: string;
  folio: string;
  payment: Partial<Payment>;
  competition: Partial<CompetitionUser>[];
  competence: Partial<CompetenceUser>[];
  //MERCADO PAGO
  transaction_amount: number;
  payment_method_id: string;
  email: string;
  descripcion: string;
  installments: number;
  token: string;
  competenceId: string;
  typeAthlete: string;
  coachAccepted: boolean;
};

export enum Rol {
  ADMIN = "ADMIN",
  USER = "USUARIO",
}

export enum Status {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  ELIMINADO = "ELIMINADO",
}

export type Payment = {
  id: string;
  userId: string;
  cardName: string;
  cardNumber: string;
  year: string;
  month: string;
  ccv: string;
  amount: number;
  date: Date;
  authorization: string;
  reference: string;
  order: number;
  transactionOpenPayId: string;
  success: boolean;
  error: string;
  deviceSessionId: string;
};

export type OpenpayCharge = {
  id: string;
  source_id: string;
  method: string;
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  device_session_id: string;
  customer: Partial<OpenpayCustomer>;
};

export type OpenpayCustomer = {
  id: string;
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
};

export type OpenpayCard = {
  id: string;
  card_number: string;
  holder_name: string;
  expiration_month: string;
  expiration_year: string;
  cvv2: string;
  device_session_id: string;
};

export type ConstantValue = {
  id: string;
  code: string;
  value: string;
  description: string;
};

export type LoginResponse = {
  status: number;
  token: string;
};

export type ActionResponse = {
  status: number;
  token: string;
  message: string;
  user: Partial<User>;
  data: any;
};

export type ErrorResponse = {
  status: number;
  error: string;
  errorDetail: string;
};

export type UserResponse = {
  status: number;
  user: Partial<User>;
};

export type GetListResponse = {
  status: number;
  data: any[] | any;
};

export type Document = {
  id: string;
  title: string;
  description: string;
  photo: string;
  photoFile: string;
  file: string;
  fileFile: string;
};

export type Competition = {
  id: string;
  name: string;
  description: string;
  region: Types.ObjectId | Partial<Region>;
  location: string;
  cost: number;
  startDate: Date;
  endDate?: Date;
  by: string;
  facebookUrl?: string;
  instagramUsername?: string;
  twitterUsername?: string;
  image?: string;
  bgImage?: string;
  typeCompetence: "individual" | "equipo" | "mixto";
  categoriesSupported: string[];
  typeEvent: "presencial" | "online";
  publicationDate: Date;
  withDiscount: boolean;
  discount: number;
  discountCode: string;
  limitInscriptionDate: Date;
  user: Types.ObjectId;
  status: Status;
  registered?: boolean;
  registeredAs?: "atleta" | "entrenador" | "juez";
  registeredCategory?: string;
  registeredPlace?: number;
  registeredScore?: number;
  competitionSteps: CompetitionSteps[];
};

export type CompetitionSteps = {
  id: string;
  name: string;
  start: string;
  end: string;
  competition: Types.ObjectId | Partial<Competition>;
};

export type CompetitionUser = {
  id: string;
  years: number;
  amount: number;
  category: string;
  typeAthlete: string;
  place: number;
  points: number;
  registeredAs?: "atleta" | "entrenador" | "juez";
  createdAt: Date;
  status: Status;
  fullName: string;
  competition: Types.ObjectId | Partial<Competition>;
  user: Types.ObjectId | Partial<User>;
  competitionUserTest: Partial<CompetitionUserTest>[];
};

export type CompetitionUserTest = {
  id: string;
  competitionUser: Types.ObjectId | Partial<CompetitionUser>;
  testType: TestType;
  url: string;
  files: string[];
  time: string;
  reps: number;
  weight: number;
  judgeTime: string;
  judgeReps: number;
  judgeQualification: number;
  observation: string;
  judgeUser: Types.ObjectId | Partial<User>;
  status: Status;
};

export enum TestType {
  AMRAP_10 = "AMRAP_10",
  ROUNDS_FOR_TIME_CAP_12 = "ROUNDS_FOR_TIME_CAP_12",
  FOR_TIME_CAP_10 = "FOR_TIME_CAP_10",
}

export type Region = {
  id: string;
  name: string;
  description: string;
};

export type Competence = {
  id: string;
  name: string;
  description: string;
  madeBy: string;
  startDate: Date;
  endDate: Date;
  status: string;
  places: number;
  active: boolean;
  userId: string;
};

export type CompetenceUser = {
  id: string;
  competenceId: string;
  userId: string;
  years: number;
  amount: number;
  category: string;
  typeAthlete: string;
  createdAt: Date;
  competence: Partial<Competence>;
  user: Partial<User>;
};
