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
  Payment,
} from "../interfaces/types";
const fs = require("fs");

const imgPhotoDefault =
  "iVBORw0KGgoAAAANSUhEUgAAAVwAAAFcBAMAAAB2OBsfAAAAFVBMVEUEU33v7u7///8FQGnLychUcoOWoKYZTklOAAAPjklEQVR42uydQVfjug6AwxhmPXWB9bPpsHZxk/UlFNbQAOuhHfj/P+ElTVvixE4sWU6Zc/Dm3nKG5EOVZVmW5ETWQ0zq8cU/Jt+437jfuN+437jfuKPitsYXx50sHz62Y7msf/IlcXn5P+fL9yJhWmtVjuo/ydnr8pbXxF8Jl0tx/v64JTRG+RN99loSiy+EK+Xso9A6cQyt04+cRpWT3Q/47ieIj6USbDpiNUepINmy/vcBLyo/BuNKsXzsZ92L+GzJ5ZFxuTx/8YGtRfxyK8UxceXs3Re2lvDrQYePgCsfFAB2K2H2djRc8a4T6GD6lR8H97qA01Yaka6PgXuvVYIb+nl83I1O0IO98nFxxUYlAUNnXIyHK2dFEG0p3zSXY+HKSxZIW1mINzkOrrzUCcGoeaPjEtHueGPjciraSh8EGBfqd15T0VbyXcd2z2dFQjjSPC6uKBQlLkv39jcGLg9cHXp4Y+DKP8S0Je9PGQtX3pPTbv2dOLj8QicRhn4SMXD5jCVRhqrMAzmuKOLQVtONHlfeqSQW70JS4/KLaLQl75OgxeUznUQcOqfFlZsk6shIcWVMVdiqw4oSN64qNNSBJAIpNyo2LssklXvOL6LTbq0DEe6sSEYYitPg8v/UGLjsVFDg8utRaKutkCDAjW1yjdkWjDvKPDvMtmBcUSSjjZSH4vI7NR5u6ZoF4sbyyV2eehjuSEbsME7DcMcV7qd4kbh3ychjEYI7U2PjsjwAd3Th7sWLikCOL9xKvFj3nB9BuKV4BRJ3bLOwNw443LFtbtORROAeR7jlyDG4fKqOQ8vmAoE7pivWdswQuL/VsXDZSoBx+SY52sjguNfqeLhsDcU9zhLRcnT8cWfqmLiaw3DlxVFxkxUQtzgqbZLCcMMmWpWoqRXBZPOMQIZMNK30y9/l8uFds4Aw60IA3HOBflEzmfT8o8A/hwNwf2O/Q/V8yOCrIkiTe4bUiXJl88bFrmhViqMRluNVkiR2ZfPGRRpd9Sw77+DyAce79dK9cPkU94I3ac/iQvnNlRvpiYsxuofMsO47cNH3zBcXpQsqd6f/XGPkW22JfXBRuqDXfdlKmHyjShu8cBHfHXvqT67CuCCpHy5CF1g2lAu2URht8MDlv+BPTvkQLmLnx06ED+4GpbhDmXYIpynzwUXoQuaTGLhBaMMwLuKkZyiGjI1ss5VHBBIshW2UyCO5Cj4nMg/3HL5AcM+ERPhiIQdxwVOinMCeaZdg8bL1IO4ULlzvLFGoeNlCDOEWYOH65+CCxZsO4cLNWO6PC354HfnvwQUH8haQir47sCnrxwVvgasdtj8ueB5nohdXgLULVi8Jnhm8Fxf8589huFOcKXPggj3z7SEjABc82eaiD3eD0AVQMUGBUl4HLlh1b6C4V6hojgMXqrr1gTMEF/yGdQ/uFKMLsMqSAqO8jggk1Oo64oQ9H8GGfdHjnj+iFh1QmRF02UzduDOw6sJxBWZ62HHBf7lAFCAW0G/QiTtFqS4Qd4pYN+24BUp1gbgY5bXjomwiFBe8DrtwwSaco2p9EXPNinsFfFCGK00G+iXsxoGLWyTAuIiFwooL/bN/4ArOoV5O5sBFzjQoLniK2HGRaxoYF/4eKy54E4xsWgANa5Xrmg0X7j0iccE+pC0CCd74ZL5FZqFZPo0XNXALsB1D4kItWWrDRWxSkbio7XYbFx5iwDbBggcbLLi/wRMWiws2QasuLv8PGnocDZedWnA34K8IiwsP7FlwH78u7lkXFxzAKddgJC48Kt3FRYTNx8PNO7jw/FeO7uaXIC3ZJ668AJ/4oJsPCvD52qqDC090w3dhBJ8Hzglwx1OGfYJsA7cYUbrgV6WdCCT8KBjbAg1x7JyIlnsONrsJw7ZAk4h35S1cRNJFjsWdheNeIx4xIu66hXuVIGw3EheRlnPTwp1+bdy5MHAR6dCj4i5auIg8pBUWF1Gek7VwEYmEN1hcRI5lG/cR/oj5iLhnJu4E/v2UCzkSF1E2sM+cT7CL2ohBp0Og/oA7++q4uYGLqULZH02A+59i3rU2cDGlf2PFdz/PxA4RSBTuCufvYmpI6ncd3PP/IR5R517Aca8w7/ph4KIqJRYoXFz509zART0ixeEWaNGE4TIULsYw0OCuMbjXBLi4EqofGFzUrK6DkAdcXGnlAoGL7KiRGriPScBcg+HiJHNm4OJqylgOx0XWwmkDN8HhruC42Ep/Atyd8oJwsTWyTVyBfAaD4yKFm/AmLvIhteWNmQPZCHF94qIL8OdQ3Cn2e8wbEUg0bipg/i66AwjLG+45uqR96+UDcPEvIsHdhlf8cfG18zu5hOJWnYn9cQU7Mm61ifLHxXeDIcKtwkH+1xPgu8FQ4ZbP8cYNew0JbnIqfHHhOQgRcFXuixvS04oM95AcMYQb1DCMDHe41yRJB0wy3MFek7sR1I2NTrr7IuwB3LB3EOL6VWGHNQaixN22OxjADey6tMcl6aZZ9VHuv6si9AKbvb9L0/yz8nT6cIM73dHibq88ceOG93mnxd1eeeK+qyL8khUDVwQ/LtFP0oUrCS5ZMbaWIgkf+s11+QPJlTCcICxiLsbP9qDYPUW3TmVEcUj6f+7ugDRxxTvN5Q+SWrr7OyAN3OuChpYRBEy7D9Wvt5+3VEh5DroD1T++S9bpT6uXv7c7nbh8YWS3gKQEwX6rgJnWZy/lqO5uJntqK9hP21NzO3EV6SMXEXEjjH8UF1deOvqYi2aCwK+vjnsSnM8w6lj9U7hsFZzcMiruOjh1aFTcPDiPbFTc8DyyUXFbCbGPXxs3Dc4wHXVk/zbuF3ca2unGpE4DY0wp0sk7b02131QP/uzJzQj985vgQgT71id9/Vju9sDnD3/fC5rtz2chQljOiSnXXVfuZgO82UdBsLs8ZNGQ4TL9cmuP4py/BAMz3q6oCo2yZEtXjEzK5Z/AsIsiKAAz4iFvsi8CKS/DoiMpQXldMxiyra7qi56LoADJghCXlaIVQ8ktvBQwnnferWRFK0LGpV/L1Q1aIVYEhbc72mf/1KF7jTW7BGXNNe0TJNPpIih5MahovKZ9gyVm4XgtReOoHOs6wA/JI7vUeDsW1PAgORyfgJIKMfK1NTz4haUF5u8i5tuJrVmHgtsETDI3/JCNrQhaobCfElfmIf8onB0z+kBCTUOKL2sGrm+NWqgEW5elcnzRODDNJbX2dAKZBr2SeFxgRndmxYWUDrGFDMGVdxDem+AGX8M3NtDd5+Bo8AXwGnxubCC7z8HRPs0/i53NZSguQB1YaOu/VIbj+qtDFthY8WC2Q3D9r4d3NVb0nWuZJMD1jiJWS7AV13Ou+aeUkiScOpuC+s015p+wO5TO6yceZ4fYjZ/JndDgeiaXZUHtgtmToML1u0VmHtSMufI3iHC9xNtqxtz0Sj3m2va3wV2RXB895MNyZ5t2j6YSqaTE9XBaU+HGvfMSLiHusHgXIqAJfippcQfFy04CrhjAFFf2f7waeuM65AIHSY07VLTEeMD1GHNy3CG/qvd6jIHjtc/QGp10B4znPOBql0zS4/Z/of1Xu/Q3fXNfUR3ysVdCSuCvJUpFDNzelXgh8Jc+zaPg9s2XoUuf+twGfNNSdI/QwSu1epaZTMTB7ZlsgxeWuX3e6ouJg+tWwO51cG031DlRq3PZUAfX/tG5lna33B1c0XdyGAfXvbLxQVyXJrFVPFyXNnQjBF1cx+9qGQ/XsQW3XcPZ3f73nCLHwr1zmDEPXLs21J5uLFz7N+p1haz9gl7FY+LabYPXBb32VSaTMXGtARm/64+tPSHZj7i4V/ZV1At36nTMo+HavlHPq7tt2pDKuLgWV8X3YnSbbZjHxr2z7tL8cKfKcSobD7djyqrQoR9ud6XYpZ1FxO0qYD7xxe1oQypj43bMUWbtuJN4ha7mgtLBtX6cegXj7Lit2sv9likmbktCSkJw7+wn9BFxW+vwAoRr7ilSER/XtLyuPnKJT8e7+Ri4U2uOpidu85SDrcbA/a26dt4XVwjjmxkD17C8HIjbjD6x9Ri4jenCnM1cE59I2yG7ZKSp5o4dOnGbK9tBeUeyu+6r0Ny4zd9PeXTcwliVwLhmIPNJxMVtCweOa7iRisfFbZ6osLlA4E5mupmIJWLi8mZmTtVBHoFr7OB1HhO3mYnBTkUPbo8bapx5ZTH93U07ouH6x324Ro+rsUJ6dXszFK6RLZPGi+8WrVRQJK4p3kUsXCMD7lTicWetTMIouEZ3KpUH4Jod2lIeA9dQhX1jPiSuob3lsyLgGhLZ9+VD4pq5XvpNkOMa2yx2IoNwJ0KbCXqCGNfMZ9B5IK6xPNZtxyhxxUZZEm3xuK0T5qrtGCFuq9liynkobiuVTlsjbciP3KyoKXcBwbiTViC+Ul+qpEIzx5SVe6xw3NaxK0s5VYZpq9yjygwhwG0lrrKM0+C2aU891Czx8Epb+RxsQbMx3qhubcPQ7/rgtqODtXkIxW0VVvmlK3rhtgWx5w3AbZetsUzS4bbTxHe8eNxOkZ3KCXE7DVNrXjRuh9YZw0Phik5Xz215MBa3S+ubUOeJO5m1jzr0K8fe497ttZjmxLjdIhL2k+OyCMUf3al4EsS4Ldds+5IUk8EpZ53SxSrmQo3b8vW2r1FvcNxL1nlMxif0uNxS9KJfobiWFqFbn58cd8ItBd/bNqD+uLYWofWOih7X3vVXPXPpGawW96z7AAZacSC4E2ErKtLqL/dYk6W4tPXI2W2nouByaw9optO/A71Fyi/godC2381gcfkE5KTymbWAugLuj4LZYRvrgycGDLc0D46EWc1eb3l1HtfePJZj+a4cXQMOtJFwJ/zcleCr9dnr7e3+X+6/vvPz90dnJ6o0h+6j/t/euaQwCANhuCB2P6UXyNADCIMHsATXBan7gvb+R2gedtGH2pmk6iLZze5jyOOfMfnl4gKO+8Nbi6z82naVyynouneutsX4a2N2lcrGNdvv5EMSy0x+ekyQ+jOR3wPg48KXc/QDJZt99ulpF8AFPDENFr7RlmdJ/0qCC4dgXkMrambKcPFTs7IG7Q8KFsSVGx4NlZOwpSLGxZqEEyKjDpfHNQtOlOChCFkcF0WWaIOx/wq4ZkJwE0z5LagdGIRrdmBWgjNquZpG0IGcDH8HJgcb9nk+GBfxePkFOKO8Cr9NEAHXCto5t1Irh2NcfoiBq+yPJZpx/WXdQivEzeC6MtfpcHqVYkVBTrUDRnqaFwnXr+Kj7hsveP0odmWrTYGhFMDWcJ8h6LsfenC2jXlxJz7u+1Abx/1nmHATbsJNuKEdyNXDhPvP8AFpz/i6pMm61AAAAABJRU5ErkJggg==";

type UserProps = {
  model: User | null;
  payment?: Partial<Payment>;
  userPermission?: Partial<UserPermission>[];
  notification?: Partial<Notification>[];
};
const formatUserData = ({
  model,
  payment,
  userPermission,
  notification,
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
    rol: model.rol,
    status: model.status,
    payment: payment ?? {}
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
