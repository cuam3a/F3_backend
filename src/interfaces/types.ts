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
  photoFile: File | null;
  status: Status;
  rol: Rol;
  payment: Partial<Payment>;
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
  customer: OpenpayCustomer;
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

export type Defendant = {
  id: string;
  name: string;
  lastName: string;
  street: string;
  number: string;
  suburb: string;
  zipCode: number;
  city: string;
  town: string;
  phone: number;
  celphone: number;
  email: string;
  state: string;
  country: string;
  gender: string;
  dateOfBirth: Date;
  cityOfBirth: string;
  townOfBirth: string;
  CURP: string;
  RFC: string;
  INE: string;
  FIEL: string;
  nationality: string;
  maritalStatus: string;
  officePhone: string;
  officeExt: string;
  employeeCurrentStatus: string;
  position: string;
  positionOther: string;
  dependence: string;
  dependenceOther: string;
  employeeNo: string;
  employeeSeniorityYear: number;
  employeeSeniorityMonth: number;
  workplace: string;
  workStreet: string;
  workNumber: string;
  workSuburb: string;
  workZipCode: number;
  workCity: string;
  workTown: string;
  workState: string;
  workCountry: string;
  promiseAmount: number;
  promiseDate: Date;
  promiseDueDate: Date;
  approvalDate: Date;
  amount2: number;
  numberPayments: number;
  amount3: number;
  economicActivity: string;
  promiseDueFile: string;
  agreementFile: string;
  paymentTextAgreement: string;
  INEFile: string;
  addressVoucherFile: string;
  servicePageFile: string;
  proofServiceFile: string;
  status: Status;
};

export type Actor = {
  id: string;
  name: string;
  lastName: string;
  CURP: string;
  RFC: string;
  accountNumber: string;
  cardNumber: string;
  CLABE: string;
  bank: string;
  economicActivity: string;
  CURPFile: string;
  taxStatusCertificateFile: string;
  status: Status;
};

export type Demand = {
  id: string;
  actorId: string;
  defendantId: string;
  creditId: string;
  request: string;
  requestDate: Date;
  acceptedPromotionDate: Date;
  folio: string;
  court: string;
  promiseAmount: number;
  promiseDate: Date;
  amount2: number;
  amount3: number;
  numberPayments: number;
  paymentTextDemand: string;
  paymentTextAgreement: string;
  paymentTextAgreementOther: string;
  paymentMethod: PaymentMethods;
  description: string;
  promiseDueDate: Date;
  approvalDate: Date;
  accountNumber: string;
  cardNumber: string;
  CLABE: string;
  bank: string;
  exhorted: boolean;
  exhortedCity: string;
  exhortedTown: string;
  exhortedStreet: string;
  exhortedNumber: string;
  exhortedSuburb: string;
  exhortedZipCode: number;
  authorized: Array<string>;
  lawyers: Array<string>;
  freeText: string;
  agreementFile: string; //Convenio
  sequestrationOrderFile: string; //Orden de embargo
  contractFile: string; //Demanda firmado
  promiseDueFile: string; //Pagare firmado
  notarizedPackFile: string; //Pack notariado
  notarizedAgreementFile: string;
  requestEmailFile: string;
  acceptEmailFile: string;
  notificationEmailFile: string;
  status: Status;
  demandStatus: DemandStatus;
  createdAt: Date;
  endAt: Date;
  changeStatusDate: Date;
  defendant: Partial<Defendant>;
  actor: Partial<Actor>;
  credit: Partial<Credit>;
};

export enum DemandStatus {
  CAPTURA = "CAPTURA",
  DEMANDA = "DEM. FIRMAS",
  JUZGADO = "DEM. JUZGADO",
  CAPTURA_EXPEDIENTE = "EXPEDIENTE",
  CONVENIO = "REDACCION CONVENIO",
  CONVENIO_NOTARIADO = "CONVENIO NOTARIADO",
  CONVENIO_JUZGADO = "CONVENIO JUZGADO",
  ACEPTADO = "ACEPTADO",
  ORDEN_EMBARGO = "ORDEN EMBARGO",
  FIRMAS = "FIRMAS",
  FINALIZADO = "FINALIZADO",
}

export enum PaymentMethods {
  ONE = "UNA SOLA EXHIBICION",
  TWO = "PAGOS QUINCENALES",
}

export type DemandReq = {
  actor: Partial<Actor> | null;
  defendant: Partial<Defendant> | null;
  demand: Partial<Demand> | null;
  document: Partial<Document>;
};

export type Document = {
  CURPFile: File | null;
  taxStatusCertificateFile: File | null;
  INEFile: File | null;
  addressVoucherFile: File | null;
  servicePageFile: File | null;
  proofServiceFile: File | null;
  agreementFile: File | null;
  sequestrationOrderFile: File | null;
  contractFile: File | null;
  promiseDueFile: File | null;
  notarizedPackFile: File | null;
  notarizedAgreementFile: File | null;
  creditFile: File | null;
};

export type LogEmail = {
  id: string;
  num: number;
  subject: string;
  date: Date;
  messageId: string;
  bodyText: string;
  bodyHtml: string;
  from: string;
  attachment: boolean;
  path: string;
  type: EmailType;
  demandId: string;
  demand: Partial<Demand>;
};

export enum EmailType {
  SOLICITUD = "SOLICITUD",
  ACEPTADO = "ACEPTADO",
  NOTIFICACION = "NOTIFICACION",
}



export type Log = {
  id: string;
  type: LogType;
  isError: boolean;
  description: string;
  code: string;
  userId: string;
  user: Partial<User>;
};

export enum LogType {
  USUARIO = "USUARIO",
  DEMANDA = "DEMANDA",
  EMAIL = "EMAIL",
  CONSTANTES = "CONSTANTES",
  CREDITO = "CREDITO",
}

export type Notification = {
  id: string;
  folio: string;
  title: string;
  description: string;
  url: string;
  new: boolean;
  userId: string;
  createdAt: Date;
  user: Partial<User>;
};

export type UserPermission = {
  id: string;
  type: UserPermissionType;
  allow: boolean;
  userId: string;
};

export enum UserPermissionType {
  ADD_DEMAND = "AGREGAR DEMANDA",
  EDIT_DEMAND = "EDITAR DEMANDA",
  NOTIFICATION = "NOTIFICACIONES",
  REPORT = "REPORTES",
  CONFIG = "CONFIGURACION",
  ADD_CREDIT = "AGREGAR CREDITO",
  EDIT_CREDIT = "EDITAR CREDITO",
  DELETE_DEMAND = "ELIMINAR DEMANDA",
  DELETE_CREDIT = "ELIMINAR CREDITO",
}

export type Dashboard = {
  total: number;
  active: number;
  complete: number;
  pending: number;
  demand: Partial<DemandDashboard>[];
};

export type DemandDashboard = {
  count: number;
  date: string;
  demandStatus: DemandStatus;
  day: number;
  month: number;
  year: number;
  endDay: number;
  endMonth: number;
  endYear: number;
};

//CREDIT
export type Credit = {
  id: string;
  userId: string;
  actorId: string;
  defendantId: string;
  folio: number;
  place: string;
  date: Date;
  campaign: string;
  amount: number;
  guaranteeDeposit: number;
  period: string;
  term: number;
  disposalMedium: string;
  CLABE: string;
  bank: string;
  other: string;
  accountNumber: string;
  cardNumber: string;
  exhorted: boolean;
  exhortedCity: string;
  exhortedTown: string;
  exhortedStreet: string;
  exhortedNumber: string;
  exhortedSuburb: string;
  exhortedZipCode: number;
  creditDestination: string;
  creditDestinationOther: string;
  freeText: string;
  creditFile: string;
  status: CreditStatus;
  createdAt: Date;
  user: Partial<User>;
  defendant: Partial<Defendant>;
  actor: Partial<Actor>;
};

export enum CreditStatus {
  ACTIVO = "ACTIVO",
  CANCELADO = "CANCELADO",
  DEMANDA = "DEMANDA",
}

export type CreditReq = {
  actor: Actor;
  defendant: Defendant;
  credit: Credit;
  user: User;
  document: Partial<Document>;
};
