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
  payment: Partial<Payment>;
  //MERCADO PAGO
  transaction_amount: number;
  payment_method_id: string;
  email: string;
  descripcion: string;
  installments: number;
  token: string
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
