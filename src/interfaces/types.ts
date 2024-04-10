import { Types } from "mongoose";

export type User = {
  id: Types.ObjectId | string;
  customerOpenPayId: string;
  user: string;
  password: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  celphone: number;
  city: string;
  state: string;
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
  discountCode: string;
  competenceId: string;
  typeAthlete: string;
  coachAccepted: boolean;
  judgeTest:boolean;
  coachTest:boolean;
  registeredAs?:string;
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
  user: Types.ObjectId;
  cardName: string;
  cardNumber: string;
  year: string;
  month: string;
  amount: number;
  date: Date;
  authorization: string;
  reference: string;
  description: string;
  mp_id: string;
  status: string;
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
  type: string;
  status: Status;
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
  limitQualificationDate: Date;
  playbookDoc: string;
  scordcardDoc: string;
  additionalDoc1: string;
  additionalDoc2: string;
  user: Types.ObjectId;
  status: Status;
  registered: boolean;
  registeredAs: "atleta" | "entrenador" | "juez";
  registeredAsJudge: boolean;
  registeredAsAthlete: boolean;
  registeredCategory: string;
  registeredPlace: number;
  registeredScore: number;
  registeredTypeAthlete: string;
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
  id: Types.ObjectId;
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
  judgeUser: Types.ObjectId | Partial<User>;
  judgeStatus: 'pendiente' | 'calificado' | 'bloqueado' | 'en espera atleta' | 'en espera juez'
  payment: Types.ObjectId | Partial<Payment>;
  competitionUserTest: Partial<CompetitionUserTest>[];
  hasTest: boolean | null;
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
  judgeWeight: number;
  judgeQualification: number;
  judgeObservation: string;
  isValid: Boolean;
  isPending: Boolean;
  qualificationDate: Date;
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

export type Test = {
  id: string;
  name: string;
  type: 'juez' | 'entrenador';
  numQuestions: number;
  minApproval: number;
  status: Status;
  limitTime: number;
  questionTest : Partial<QuestionTest>[]
};

export type QuestionTest = {
  id: string;
  test: Types.ObjectId;
  question: string;
  type: 'option' | 'check';
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  rightAnswer :string[];
  toolTip: string;
  status: Status;
};

export type TestUser = {
  id: string;
  test: Types.ObjectId | Partial<Test>;
  user: Types.ObjectId;
  statusTest: 'aprobado' | 'no aprobado';
  statusPhysicalTest: 'aprobado' | 'no aprobado';
  score: number;
  presentedDate: Date;
  limitDate: Date;
  validationDate: Date;
  status: Status;
};

export type TestUserAnswers = {
  id: string;
  testUser: Types.ObjectId;
  questionTest: Types.ObjectId;
  answer: string[];
  status: Status;
};

export type CoachUser = {
  id: string;
  user: Types.ObjectId | Partial<User>;
  comment: string;
  aceppted: boolean;
  status: Status;
};