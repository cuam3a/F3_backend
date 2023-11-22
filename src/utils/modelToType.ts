import {
  Actor,
  ConstantValue,
  Defendant,
  Demand,
  Log,
  LogEmail,
  User,
  Notification,
  UserPermission,
  DemandDashboard,
  Credit,
} from "../interfaces/types";

type UserProps = {
  model: User | null;
  userPermission?: Partial<UserPermission>[];
  notification?: Partial<Notification>[];
};
const formatUserData = ({
  model,
  userPermission,
  notification,
}: UserProps): Partial<User> => {
  if (model === null) return {};

  var userType: Partial<User> = {
    id: model.id,
    name: model.name,
    user: model.user,
    rol: model.rol,
    status: model.status,
  };
  return userType;
};

const formatDefendantData = (model: Defendant | null): Partial<Defendant> => {
  if (model === null) return {};

  var defendantType: Partial<Defendant> = {
    id: model.id,
    name: model.name,
    lastName: model.lastName,
    street: model.street,
    number: model.number,
    suburb: model.suburb,
    zipCode: model.zipCode,
    city: model.city,
    town: model.town,
    phone: model.phone,
    celphone: model.celphone,
    email: model.email,
    state: model.state,
    country: model.country,
    gender: model.gender,
    dateOfBirth: model.dateOfBirth,
    cityOfBirth: model.cityOfBirth,
    townOfBirth: model.townOfBirth,
    CURP: model.CURP,
    RFC: model.RFC,
    INE: model.INE,
    FIEL: model.FIEL,
    nationality: model.nationality,
    maritalStatus: model.maritalStatus,
    officePhone: model.officePhone,
    officeExt: model.officeExt,
    employeeCurrentStatus: model.employeeCurrentStatus,
    position: model.position,
    positionOther: model.positionOther,
    dependence: model.dependence,
    dependenceOther: model.dependenceOther,
    employeeNo: model.employeeNo,
    employeeSeniorityYear: model.employeeSeniorityYear,
    employeeSeniorityMonth: model.employeeSeniorityMonth,
    workplace: model.workplace,
    workStreet: model.workStreet,
    workNumber: model.workNumber,
    workSuburb: model.workSuburb,
    workZipCode: model.workZipCode,
    workCity: model.workCity,
    workTown: model.workTown,
    workState: model.workState,
    workCountry: model.workCountry,
    promiseAmount: model.promiseAmount,
    promiseDate: model.promiseDate,
    promiseDueDate: model.promiseDueDate,
    approvalDate: model.approvalDate,
    amount2: model.amount2,
    numberPayments: model.numberPayments,
    amount3: model.amount3,
    economicActivity: model.economicActivity,
    promiseDueFile: model.promiseDueFile,
    agreementFile: model.agreementFile,
    paymentTextAgreement: model.paymentTextAgreement,
    status: model.status,
    INEFile: model.INEFile,
    addressVoucherFile: model.addressVoucherFile,
    servicePageFile: model.servicePageFile,
    proofServiceFile: model.proofServiceFile,
  };
  return defendantType;
};

const formatActorData = (model: Actor | null): Partial<Actor> => {
  if (model === null) return {};

  var actorType: Partial<Actor> = {
    id: model.id,
    name: model.name,
    lastName: model.lastName,
    CURP: model.CURP,
    RFC: model.RFC,
    accountNumber: model.accountNumber,
    cardNumber: model.cardNumber,
    CLABE: model.CLABE,
    bank: model.bank,
    economicActivity: model.economicActivity,
    CURPFile: model.CURPFile,
    taxStatusCertificateFile: model.taxStatusCertificateFile,
    status: model.status,
  };
  return actorType;
};

type DemandProps = {
  model: Demand | null;
  actor?: Partial<Actor> | undefined;
  defendant?: Partial<Defendant> | undefined;
};

const formatDemandData = ({
  model,
  actor,
  defendant,
}: DemandProps): Partial<Demand> => {
  if (model === null) return {};

  var actorType: Partial<Demand> = {
    id: model.id,
    actorId: model.actorId,
    defendantId: model.defendantId,
    request: model.request,
    requestDate: model.requestDate,
    acceptedPromotionDate: model.acceptedPromotionDate,
    folio: model.folio,
    court: model.court,
    promiseAmount: model.promiseAmount,
    promiseDate: model.promiseDate,
    amount2: model.amount2,
    amount3: model.amount3,
    numberPayments: model.numberPayments,
    paymentTextDemand: model.paymentTextDemand,
    paymentTextAgreement: model.paymentTextAgreement,
    paymentTextAgreementOther: model.paymentTextAgreementOther,
    paymentMethod: model.paymentMethod,
    description: model.description,
    promiseDueDate: model.promiseDueDate,
    approvalDate: model.approvalDate,
    accountNumber: model.accountNumber,
    cardNumber: model.cardNumber,
    CLABE: model.CLABE,
    bank: model.bank,
    exhorted: model.exhorted,
    exhortedCity: model.exhortedCity,
    exhortedTown: model.exhortedTown,
    exhortedStreet: model.exhortedStreet,
    exhortedNumber: model.exhortedNumber,
    exhortedSuburb: model.exhortedSuburb,
    exhortedZipCode: model.exhortedZipCode,
    authorized: model.authorized,
    lawyers: model.lawyers,
    freeText: model.freeText,
    agreementFile: model.agreementFile,
    sequestrationOrderFile: model.sequestrationOrderFile,
    contractFile: model.contractFile,
    promiseDueFile: model.promiseDueFile,
    requestEmailFile: model.requestEmailFile,
    acceptEmailFile: model.acceptEmailFile,
    notificationEmailFile: model.notificationEmailFile,
    status: model.status,
    demandStatus: model.demandStatus,
    createdAt: model.createdAt,
    endAt: model.endAt,
    defendant: defendant,
    actor: actor,
    changeStatusDate: model.changeStatusDate,
  };
  return actorType;
};

type LogEmailProps = {
  model: LogEmail;
  demand?: Partial<Demand>;
};

const formatLogEmailData = ({
  model,
  demand,
}: LogEmailProps): Partial<LogEmail> => {
  if (model === null) return {};

  var logEmailType: Partial<LogEmail> = {
    id: model.id,
    num: model.num,
    subject: model.subject,
    date: model.date,
    messageId: model.messageId,
    bodyText: model.bodyText,
    bodyHtml: model.bodyHtml,
    from: model.from,
    attachment: model.attachment,
    path: model.path,
    type: model.type,
    demandId: model.demandId,
    demand: demand,
  };
  return logEmailType;
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

type LogProps = {
  model: Log;
  user?: Partial<User>;
};
const formatLogData = ({ model, user }: LogProps): Partial<Log> => {
  if (model === null) return {};

  var logType: Partial<Log> = {
    id: model.id,
    type: model.type,
    isError: model.isError,
    description: model.description,
    code: model.code,
    userId: model.userId,
    user: user,
  };
  return logType;
};

type NotificationProps = {
  model: Notification;
  user?: Partial<User>;
};
const formatNotificationData = ({
  model,
  user,
}: NotificationProps): Partial<Notification> => {
  if (model === null) return {};

  var notificationType: Partial<Notification> = {
    id: model.id,
    folio: model.folio,
    title: model.title,
    description: model.description,
    new: model.new,
    url: model.url,
    userId: model.userId,
    createdAt: model.createdAt,
    user: user,
  };
  return notificationType;
};

const formatUserPermissionData = (
  model: UserPermission | null
): Partial<Actor> => {
  if (model === null) return {};

  var userPermissionType: Partial<UserPermission> = {
    id: model.id,
    type: model.type,
    allow: model.allow,
    userId: model.userId,
  };
  return userPermissionType;
};

const formatDemandDashboardData = (model: Demand): Partial<DemandDashboard> => {
  if (model === null) return {};

  var actorType: Partial<DemandDashboard> = {
    count: 1,
    demandStatus: model.demandStatus,
    day: model.createdAt.getDay(),
    month: model.createdAt.getMonth(),
    year: model.createdAt.getFullYear(),
    endDay: model.endAt?.getDay() ?? 0,
    endMonth: model.endAt?.getMonth() ?? 0,
    endYear: model.endAt?.getFullYear() ?? 0,
  };
  return actorType;
};

type CreditProps = {
  model: Credit | null;
  actor?: Partial<Actor>;
  defendant?: Partial<Defendant>;
  user?: Partial<User>;
};

const formatCreditData = ({
  model,
  actor,
  defendant,
  user,
}: CreditProps): Partial<Credit> => {
  if (model === null) return {};

  var actorType: Partial<Credit> = {
    id: model.id,
    actorId: model.actorId,
    defendantId: model.defendantId,
    userId: model.userId,
    folio: model.folio,
    place: model.place,
    date: model.date,
    campaign: model.campaign,
    amount: model.amount,
    guaranteeDeposit: model.guaranteeDeposit,
    period: model.period,
    term: model.term,
    disposalMedium: model.disposalMedium,
    CLABE: model.CLABE,
    bank: model.bank,
    other: model.other,
    accountNumber: model.accountNumber,
    cardNumber: model.cardNumber,
    exhorted: model.exhorted,
    exhortedCity: model.exhortedCity,
    exhortedTown: model.exhortedTown,
    exhortedStreet: model.exhortedStreet,
    exhortedNumber: model.exhortedNumber,
    exhortedSuburb: model.exhortedSuburb,
    exhortedZipCode: model.exhortedZipCode,
    creditDestination: model.creditDestination,
    creditDestinationOther: model.creditDestinationOther,
    freeText: model.freeText,
    creditFile: model.creditFile,
    status: model.status,
    createdAt: model.createdAt,
    user: user,
    defendant: defendant,
    actor: actor,
  };
  return actorType;
};

export {
  formatUserData,
  formatDefendantData,
  formatActorData,
  formatDemandData,
  formatLogEmailData,
  formatConstantData,
  formatLogData,
  formatNotificationData,
  formatUserPermissionData,
  formatDemandDashboardData,
  formatCreditData,
};
