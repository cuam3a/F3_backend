import { Credit, Demand } from "../interfaces/types";
import { getByCode } from "../services/constantValue";
import { NumberToLetter, formatDateLetter } from "../utils/convert";

export const creditHtml = async (credit: Partial<Credit>): Promise<string> => {
  const img = "data:image/jpeg;base64,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"
  return `
  <div
    style="
      font-family: Arial;
      font-size: 12px;
      page-break-after:auto;
      page-break-inside: avoid;
      margin-left:10px;
      margin-right:10px;
      position: 'absolute';
      top: 2;
      left: 2;
    "
  >
    <div
      style="
        display: grid;
        font-weight: bold;
        grid-template-columns: 25% 50%;
        grid-template-rows: 50px;
      "
    >
      <div style="text-align:center; display: flex; align-items: center; justify-content: center;">
        <img src="${img}" style="width: 70px; height:70px; text-align: center; margin-top:10px"/>
      </div>
      <label style="text-align:center;display: flex;align-items: flex-end; justify-content: center;"><b>SOLICITUD DE APERTURA DE CRÉDITO</b></label>
    </div>
    
    <br>
    <div
      style="
        display: flex;
        font-family: Arial;
        font-size: 9px;
        flex-direction: column;
        grid-template-columns: 25% 50%;
        grid-template-rows: 50px;
      "
    >
      <div style="display: flex; background-color:#E3E3E3; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>Lugar y fecha: ${credit.place ?? ""} A ${formatDateLetter(credit.date ?? new Date)}</p>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 33%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Folio: ${credit.folio ?? 0}</p>
        </div>
        <div style="width: 33%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Promotor: ${credit.user?.name ?? ""}</p>
        </div>
        <div style="width: 33%; display: flex; flex-direction: row;  padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Campaña: ${credit.campaign ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>SOLICITUD</b></p>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 40%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Monto solicitado: $ ${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2,}).format(credit.amount ?? 0)}</p>
        </div>
        <div style="width: 60%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
          <p>Medio de disposición: ${credit.disposalMedium ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 40%; display: flex; flex-direction: column; padding-left: 5px; border: 1px solid gray; height:70px">
          <p>Depósito en Garantía: $ ${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2,}).format(credit.guaranteeDeposit ?? 0)}  M.N.</p>
          <p style="height: 20px; margin-block:1px; background-color:#E3E3E3;">Periodicidad y Plazo:</p>
          <div style="display: flex; flex-direction: row;">
            <div style="width: 30%; display: flex; flex-direction: row; align-items: center; justify-content: center; padding-left: 5px; ">
              <p style="margin-left: 20px; border-bottom: 0.5px solid black; padding-bottom: 5px; width: 100%; text-align: center;">${credit.term ?? 0}</p>
            </div>
            <div style="width: 70%; display: flex; flex-direction: row; align-items: center; justify-content: space-around; padding-left: 5px; ">
              <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
                <div style="display: flex; flex-direction: row; margin-bottom:2px">
                  <div style="
                    border: 1px solid #ddd;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin: 0px auto;
                  ">
                    ${credit.period == "Quincenas" ? "X" : ""}
                  </div>
                  <label>Quincenas</label>
                </div>
                <div style="display: flex; flex-direction: row; margin-bottom:2px">
                  <div style="
                    border: 1px solid #ddd;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin: 0px auto;
                  ">
                    ${credit.period == "Catorcenas" ? "X" : ""}
                  </div>
                  <label>Catorcenas</label>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
                <div style="display: flex; flex-direction: row; margin-bottom:2px">
                  <div style="
                    border: 1px solid #ddd;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin: 0px auto;
                  ">
                    ${credit.period == "Meses" ? "X" : ""}
                  </div>
                  <label>Meses</label>
                </div>
                <div style="display: flex; flex-direction: row; margin-bottom:2px">
                  <div style="
                    border: 1px solid #ddd;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin: 0px auto;
                  ">
                    ${credit.period == "Semanas" ? "X" : ""}
                  </div>
                  <label>Semanas</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 60%; display: flex; flex-direction: column; padding-left: 5px; border: 1px solid gray; height:70px">
          <p style="margin-block:5px; margin-left: 30px;">Abono en Cuenta: CLABE: ${credit.CLABE ?? ""}</p>
          <p style="margin-block:5px; margin-left: 30px;">Banco: ${credit.bank ?? ""}</p>
          <p style="margin-block:5px; margin-left: 30px;">Otro: ${credit.other ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; text-align:justify; height:24px">
        <p style="width: 14%;">Destino del crédito:</p>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.creditDestination == "Vacaciones" ? "X" : ""}
          </div>
          <label>Vacaciones</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.creditDestination == "Educación" ? "X" : ""}
          </div>
          <label>Educación</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.creditDestination == "Pago de deuda" ? "X" : ""}
          </div>
          <label>Pago de deuda</label>
        </div>
        <div style="width: 16%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.creditDestination == "Remodelación / Reparación" ? "X" : ""}
          </div>
          <label>Remodelación / Reparación</label>
        </div>
        <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.creditDestination == "Otro" ? "X" : ""}
          </div>
          <label>Otro: ${credit.creditDestinationOther ?? ""} </label>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>DATOS PERSONALES Y DE IDENTIFICACIÓN DEL SOLICITANTE</b></p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 50%; display: flex; flex-direction: row;">
          <p>Apellido(s): ${credit.defendant?.lastName ?? ""}</p>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row;">
          <p>Nombre(s): ${credit.defendant?.name ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 20%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p style="width: 50%;">Género:
          </p>
          <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <div style="
              border: 1px solid #ddd;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            ">
              ${credit.defendant?.gender == "M" ? "X" : ""}
            </div>
            <label> M </label>
          </div>
          <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <div style="
              border: 1px solid #ddd;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            ">
              ${credit.defendant?.gender == "F" ? "X" : ""}
            </div>
            <label> F </label>
          </div>
        </div>
        <div style="width: 40%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Fecha de nacimiento: ${credit.defendant?.dateOfBirth?.getDate() ?? ""} / ${(credit.defendant?.dateOfBirth?.getMonth() ?? 0)+1} / ${credit.defendant?.dateOfBirth?.getFullYear() ?? ""}</p>
        </div>
        <div style="width: 40%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>Lugar de nacimiento: ${credit.defendant?.townOfBirth ?? ""} País: ${credit.defendant?.cityOfBirth ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 40%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
          <p>CURP: ${credit.defendant?.CURP ?? ""}</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>RFC: ${credit.defendant?.RFC ?? ""}</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>FIEL: ${credit.defendant?.FIEL ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>Domicilio: Calle: ${credit.defendant?.street ?? ""}</p>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row;">
        <p>No. Ext: ${credit.defendant?.number ?? ""}</p>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row;">
        <p>No. Int: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>Colonia: ${credit.defendant?.suburb ?? ""}</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>C.P.: ${credit.defendant?.zipCode ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>Alcaldía o Municipio: ${credit.defendant?.state ?? ""}</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Ciudad: ${credit.defendant?.city ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 60%; display: flex; flex-direction: row;">
          <p>Estado: ${credit.defendant?.town ?? ""}</p>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row;">
        <p>País: ${credit.defendant?.country ?? ""}</p>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row;">
        <p>Nacionalidad: ${credit.defendant?.nationality ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; text-align:justify; height:24px">
        <p style="width: 14%; padding-left: 5px;">Estado Civil:</p>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.defendant?.maritalStatus == "Soltero" ? "X" : ""}
          </div>
          <label>Soltero (a)</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.defendant?.maritalStatus == "Casado" ? "X" : ""}
          </div>
          <label>Casado (a)</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.defendant?.maritalStatus == "Divorciado" ? "X" : ""}
          </div>
          <label>Divorciado (a)</label>
        </div>
        <div style="width: 16%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.defendant?.maritalStatus == "Viudo" ? "X" : ""}
          </div>
          <label>Viudo (a)</label>
        </div>
        <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
            ${credit.defendant?.maritalStatus == "Unión Libre" ? "X" : ""}
          </div>
          <label>Unión Libre </label>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Teléfonos: Casa: ${credit.defendant?.phone ?? ""}</p>
        </div>
        <div style="width: 35%; display: flex; flex-direction: row;">
        <p>Celular: ${credit.defendant?.celphone ?? ""}</p>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row;">
        <p>Oficina: ${credit.defendant?.officePhone ?? ""}</p>
        </div>
        <div style="width: 10%; display: flex; flex-direction: row;">
        <p>Ext: ${credit.defendant?.officeExt ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>Correo electrónico: ${credit.defendant?.email ?? ""}</p>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>INFORMACIÓN LABORAL / PENSIÓN</b></p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray;">
        <div style="width: 60%; display: flex; flex-direction: row; height:24px">
          <p style="width: 40%;">Estatus actual del empleado:
          </p>
          <div style="width: 30%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <div style="
              border: 1px solid #ddd;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            ">
              ${credit.defendant?.employeeCurrentStatus == "Activo" ? "X" : ""}
            </div>
            <label>Activo </label>
          </div>
          <div style="width: 30%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <div style="
              border: 1px solid #ddd;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            ">
              ${credit.defendant?.employeeCurrentStatus == "Pensionado" ? "X" : ""}
            </div>
            <label> Pensionado </label>
          </div>
        </div>
        <div style="width: 40%; display: flex; flex-direction: row; height:24px">
          <p>Puesto: ${((credit.defendant?.position ?? "") == "OTRO" ? (credit.defendant?.positionOther ?? "") : (credit.defendant?.position ?? ""))}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>Dependencia: ${((credit.defendant?.dependence ?? "") == "OTRO" ? (credit.defendant?.dependenceOther ?? "") : (credit.defendant?.dependence ?? ""))}</p>
      </div>
      <div style="display: flex; flex-direction: row; height:24px">
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray;">
          <p>No. de empleado: Casa: ${credit.defendant?.employeeNo ?? ""}</p>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray;">
          <p>Antigüedad en el empleo: ${credit.defendant?.employeeSeniorityYear ?? ""} años  ${credit.defendant?.employeeSeniorityMonth ?? ""} meses</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <p>Centro de trabajo: ${credit.defendant?.workplace ?? ""}</p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>Domicilio: Calle: ${credit.defendant?.workStreet ?? ""}</p>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row;">
        <p>No. Ext: ${credit.defendant?.workNumber ?? ""}</p>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row;">
        <p>No. Int: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 40%; display: flex; flex-direction: row;">
          <p>Colonia: ${credit.defendant?.workSuburb ?? ""}</p>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row;">
        <p>C.P.: ${credit.defendant?.workZipCode ?? ""}</p>
        </div>
        <div style="width: 40%; display: flex; flex-direction: row;">
          <p>Alcaldía o Municipio: ${credit.defendant?.workState ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:24px">
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray;">
          <p>Ciudad: ${credit.defendant?.workCity ?? ""}</p>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray;">
        <p>Estado: ${credit.defendant?.workTown ?? ""}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>REFERENCIAS PERSONALES</b></p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>1. Nombre completo: </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Relación:</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Teléfono casa: </p>
        </div>
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Celular: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Horario de contacto: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>2. Nombre completo: </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Relación:</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Teléfono casa: </p>
        </div>
        <div style="width: 35%; display: flex; flex-direction: row;">
        <p>Celular: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Horario de contacto: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>3. Nombre completo: </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Relación:</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Teléfono casa: </p>
        </div>
        <div style="width: 35%; display: flex; flex-direction: row;">
        <p>Celular: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Horario de contacto: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <div style="width: 70%; display: flex; flex-direction: row;">
          <p>4. Nombre completo: </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Relación:</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:24px">
        <div style="width: 35%; display: flex; flex-direction: row;">
          <p>Teléfono casa: </p>
        </div>
        <div style="width: 35%; display: flex; flex-direction: row;">
        <p>Celular: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: row;">
        <p>Horario de contacto: </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; color:#DA0000">
        <div style="width: 20%; display: flex; flex-direction: row; text-align: center; ">
          <p>¡CUIDADO!<br/>QUE NO TE SORPRENDAN</p>
        </div>
        <div style="width: 80%; display: flex; flex-direction: row;">
        <p>ESTE TRÁMITE ES GRATUITO, SI ALGUIEN TE SOLICITA ALGO A CAMBIO, REPÓRTALO</p>
        </div>
      </div>
    </div>
  </div>

  <div
    style="
      font-family: Arial;
      font-size: 12px;
      page-break-after:auto;
      page-break-inside: avoid;
      margin-left:10px;
      margin-right:10px;
      position: 'absolute';
      top: 2;
      left: 2;
    "
  >
    <div
      style="
        display: grid;
        font-weight: bold;
        grid-template-columns: 25% 50%;
        grid-template-rows: 50px;
      "
    >
      <div style="text-align:center; display: flex; align-items: center; justify-content: center;">
        <img src="${img}" style="width: 70px; height:70px; text-align: center; margin-top:10px"/>
      </div>
      <label style="text-align:center;display: flex;align-items: flex-end; justify-content: center;"><b>SOLICITUD DE APERTURA DE CRÉDITO</b></label>
    </div>
    
    <br>
    <div
      style="
        display: flex;
        font-family: Arial;
        font-size: 9px;
        flex-direction: column;
        grid-template-columns: 25% 50%;
        grid-template-rows: 50px;
      "
    >
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>INFORMACIÓN ADICIONAL</b></p>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; text-align:justify; height:24px">
        <p style="width: 14%; padding-left: 5px;">Tipo de domicilio:</p>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Propio</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Hipotecado</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Renta</label>
        </div>
        <div style="width: 16%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Familiar</label>
        </div>
        <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Otro</label>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; text-align:justify; height:24px">
        <p style="width: 14%;padding-left: 5px;">Tiempo de residencia:</p>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Menos de 1 año</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">1 a 2 años</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">3 a 5 años</label>
        </div>
        <div style="width: 16%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">6 a 10 años</label>
        </div>
        <div style="width: 25%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Más de 10 años</label>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <p>¿Con quién vives? (Puedes seleccionar más de una opción):</p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:40px">
        <div style="width: 60%; display: flex; flex-direction: row; align-items: center; justify-content: space-around; padding-left: 5px; ">
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Sólo</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Con mis nietos</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Con mis padres</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Con pareja / cónyuge</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Con mis hijos</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Con mis hermanos</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Otro</label>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:24px">
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3;">
          <p>Otros ingresos mensuales:</p>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3;">
          <p>Dependientes económicos:</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:30px">
        <div style="width: 50%; display: flex; flex-direction: row; justify-center:center; align-items: center; border: 1px solid gray;">
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">0</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">De 1 a 5 mil</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">De 6 a 10 mil</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">De 11 a 15 mil</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">De 16 a 20 mil</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Más de 20 mil</label>
            </div>
          </div>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; border: 1px solid gray;">
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">0</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">1</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">2</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">3</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Más de 3</label>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <p>Otros créditos (Puedes seleccionar más de una opción):</p>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; height:40px">
        <div style="width: 60%; display: flex; flex-direction: row; align-items: center; justify-content: space-around; padding-left: 5px; ">
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Hipotecario</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Tarjetas Departamentales</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Automotriz</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Nómina</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Tarjetas Bancarias</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Ninguno</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Otro</label>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; text-align:justify; height:24px">
        <p style="width: 14%; padding-left: 5px;">Grado de estudios:</p>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Ninguno</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Primaria</label>
        </div>
        <div style="width: 15%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Secundaria</label>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Bachillerato / Preparatoria</label>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Licenciatura</label>
        </div>
        <div style="width: 20%; display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <div style="
            border: 1px solid #ddd;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          ">
          </div>
          <label style="margin-left:5px">Posgrado</label>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:24px">
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3;">
          <p>¿Cómo te enteraste de nosotros?</p>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3;">
          <p>¿Qué tipo de información te gustaría recibir de nuestra parte?</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:35px">
        <div style="width: 50%; display: flex; flex-direction: row; justify-center:center; align-items: center; border: 1px solid gray;">
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Publicidad (impresos)</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Referido (compañero)</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Internet</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Call Center (llamada)</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 5px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Otro</label>
            </div>
          </div>
        </div>
        <div style="width: 50%; display: flex; flex-direction: row; border: 1px solid gray;">
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Promociones</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Tips de finanzas</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Descuentos / beneficios</label>
            </div>
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Concursos</label>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
            <div style="display: flex; flex-direction: row; margin-bottom:2px">
              <div style="
                border: 1px solid #ddd;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 0px auto;
              ">
              </div>
              <label style="margin-left:5px">Ninguna</label>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; height:110px">
        <div style="width: 45%; display: flex; flex-direction: column;">
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray; background-color:#E3E3E3; height:24px">
            <p style="margin-left:5px">¿Cuentas con Redes Sociales?</p>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray;">
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Facebook</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Instagram</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Whatsapp</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Twitter</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Pinterest</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Youtube</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Ninguna</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Otra</label>
              </div>
            </div>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray; background-color:#E3E3E3; height:24px">
            <p style="margin-left:5px">¿Tienes vehículo?</p>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray; padding-top: 2px; padding-bottom: 2px; ">
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Auto propio</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Bicicleta</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Motocicleta</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Auto Corporativo</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Ninguna</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Otra</label>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 45%; display: flex; flex-direction: column; height:110px">
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray; background-color:#E3E3E3; height:24px">
            <p style="margin-left:5px">¿Cuentas con un smartphone?</p>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray;">
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">iPhone</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">LG</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Samsung</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Motorola</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Sony</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Ninguno</label>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
       
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <div style="
                  border: 1px solid #ddd;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  margin: 0px auto;
                ">
                </div>
                <label style="margin-left:5px">Otro</label>
              </div>
            </div>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray; background-color:#E3E3E3; height:24px">
            <p style="margin-left:5px">En caso de tener vehículo, especifica modelo y año:</p>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; border: 1px solid gray;">
            <div style="display: flex; flex-direction: column; padding-left: 25px; align-items: flex-start;">
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <label style="margin-left:5px; margin-top:2px">Modelo</label>
              </div>
              <div style="display: flex; flex-direction: row; margin-bottom:2px">
                <label style="margin-left:5px; margin-top:2px">Año</label>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 10%; display: flex; flex-direction: row; align-items: center; justify-content: center; padding-left: 5px; border: 1px solid gray; height:110px">
          <img src="${img}" style="width: 75px; height:75px; text-align: center;"/>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; padding-left: 5px; border: 1px solid gray; background-color:#E3E3E3; height:24px">
        <p>Nota: Información para fines estadísticos, no influye para el otorgamiento del crédito.</p>
      </div>
      <div style="display: flex; flex-direction: row; justify-content:center; border: 1px solid gray; background-color:orange; text-align: center; height:24px">
        <p style="color:white; font-size:10px"><b>ENTREVISTA PERSONAL Y DECLARACIONES DEL PROMOTOR</b></p>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 70%; display: flex; flex-direction: column; border: 1px solid gray">
          <p>
            ¿Usted desempeña o ha desempeñado funciones públicas destacadas en un país extranjero o en territorio nacional, considerando entre otros, a los jefes de estado o de gobierno, líderes políticos, funcionarios gubernamentales de alta jerarquía,
            judiciales o militares de alta jerarquía, altos ejecutivos de empresas estatales o funcionarios o miembros importantes de partidos políticos? Respuesta: si_____. / no ____ . En caso afirmativo:<br/>
            A)	Puesto o cargo:_________________________________________________.<br/>
            B)	Periodo:________________________________________________________.<br/><br/>
            ¿Su cónyuge, concubina, concubinario, o parientes consanguíneos o afines, hasta el segundo grado, tales como padres, hijos,
            hermanos, abuelos, tíos, primos, cuñados, suegros, yernos o nueras, se encuentra en el supuesto antes mencionado? Respuesta: si_____. / no ____ . En caso afirmativo:<br/><br/>
            A) Nombre completo:_____________________________________________________,<br/>
            B) Parentesco:________________. C) Puesto o cargo:_______________________. D) Período:______________________.<br/><br/>
            <u>Obligado Solidario</u>: No aplica. <u>Beneficiario Final</u>: No aplica. <u>Proveedor de Recursos</u>: No aplica. <u>Propietario Real</u>: No aplica.
            Comentarios adicionales del Promotor sobre la entrevista realizada:<br/><br/>
              .
            <small>El suscrito, en su calidad de promotor, declara bajo protesta de decir verdad que, en la fecha de la presente Solicitud ha cotejado las copias
            simples de los documentos que se adjuntan a la presente Solicitud e integran el expediente de identificación de este Cliente contra sus originales.</small>          
          </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: column; border: 1px solid gray">
          <p style="text-align:center">
              PROMOTOR QUE REALIZÓ LA ENTREVISTA Y COTEJO:<br/><br/>
              NOMBRE Y FIRMA IGUAL QUE EN TU IDENTIFICACIÓN OFICIAL<br/><br/><br/><br/>
              <u>${credit.user?.name ?? ""}</u><br/>
              (Nombre del Promotor)
              <br/><br/><br/><br/><br/>
              ________________________________________<br/>
              (Firma del Promotor)
          </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 70%; display: flex; flex-direction: column; border: 1px solid gray">
          <p style="font-size:10px">
          Bajo protesta de decir verdad, manifiesto que (i) la información asentada en, y los documentos proporcionados para, la presente solicitud de crédito (la “Solicitud”) por el (la) suscrito(a) (en adelante el “Solicitante”) son verdaderos, correctos y auténticos, así como las manifestaciones contenidas en la misma, lo que ratifico con mi firma asentada a continuación; (ii) formulo la Solicitud por mi propio derecho y actúo a nombre y por cuenta propia; (iii) me obligo a notificar por escrito inmediatamente a <b>${credit.actor?.name ?? ""} ${credit.actor?.lastName ?? ""}</b> (en adelante “+Efectivo”) cualquier cambio en la información suministrada en la Solicitud; (iv) es de mi conocimiento que +Efectivo se reserva el derecho de autorizar la Solicitud; y (v) el crédito que, en su caso, me sea otorgado, será pagado con mis propios recursos, los cuales son y serán lícitos. Asimismo, por este conducto autorizo expresamente a +Efectivo para que por conducto de sus funcionarios facultados: (a) realice la revisión que resulte aplicable de acuerdo con las disposiciones aplicables de prevención de lavado de dinero; y (b) verifique y/o solicite cualquier tipo de información laboral ante mi patrón durante toda la vigencia del crédito solicitado.
          La presente, se firma en el lugar y fecha indicado al inicio del presente documento y forma parte integrante del Contrato de Apertura de Crédito Simple, que celebran +Efectivo, en su carácter de Acreditante, y el Solicitante, en su carácter de Acreditado.                    
          </p>
        </div>
        <div style="width: 30%; display: flex; flex-direction: column; border: 1px solid gray">
          <p style="text-align:center">
              NOMBRE Y FIRMA IGUAL QUE EN TU <br/><br/>
              IDENTIFICACIÓN OFICIAL<br/><br/><br/><br/>
              <u>${credit.defendant?.name ?? ""} ${credit.defendant?.lastName ?? ""}</u><br/>
              (Nombre del Solicitante)
              <br/><br/><br/><br/><br/>
              ________________________________________<br/>
              (Firma del Solicitante)
          </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; color:#DA0000">
        <div style="width: 20%; display: flex; flex-direction: row; text-align: center; ">
          <p>¡CUIDADO!<br/>QUE NO TE SORPRENDAN</p>
        </div>
        <div style="width: 80%; display: flex; flex-direction: row;">
        <p>ESTE TRÁMITE ES GRATUITO, SI ALGUIEN TE SOLICITA ALGO A CAMBIO, REPÓRTALO</p>
        </div>
      </div>
    </div>
  </div>
    `;
};
