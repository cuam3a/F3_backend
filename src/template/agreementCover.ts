import { Demand } from "../interfaces/types";
import { getByCode } from "../services/constantValue";
import { NumberToLetter, formatDateLetter } from "../utils/convert";

export const agreementCoverHtml = async (
  demand: Partial<Demand>
): Promise<string> => {
  return `
  <div
    style="
      font-family: 'Tahoma', sans-serif;
      font-size: 12px;
      page-break-after:always;
    "
  >
    <div style="display: grid; font-weight: bold">
      <label style="margin-left: 60%">EXPEDIENTE NO. ${
        demand.folio ?? ""
      }</label>
      <label style="margin-left: 60%">JUICIO EJECUTIVO MERCANTIL</label>
      <label style="margin-left: 60%">${demand.actor?.name ?? ""} ${
    demand.actor?.lastName ?? ""
  }</label>
      <label style="margin-left: 70%">VS</label>
      <label style="margin-left: 60%">${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</label>
    </div>
    <div style="display: grid; font-weight: bold">
      <label>C. JUEZ DE LO MERCANTIL EN TURNO.</label>
      <label>P R E S E N T E.-</label>
    </div>
    <br />
    <div style="display: grid">
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
      <b>PANFILO LOPEZ PEREZ</b>, con la personalidad que tengo debidamente acredita en autos del expediente cuyo número al rubro se indica,
      ante usted respetuosamente comparezco para exponer:
      </p>
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
        Que vengo a exhibir constancia de servicio donde consta las percepciones del demandado así como el
        convenio judicial celebrado entre las partes en el presente asunto por lo que solicito
        se apruebe y eleve a <b>CATEGORIA DE COSA JUZGADA</b> por estar ratificado ante notario público; en consecuencia, 
        en cumplimiento a la <b>CLAUSULA CUARTA</b> del mencionado convenio, solicito se gire atento oficio con los insertos
        necesarios al C. ${
          ((demand.defendant?.dependence ?? "") == "OTRO" ? (demand.defendant?.dependenceOther ?? "") : (demand.defendant?.dependence ?? ""))
        }, para los efectos de que sirva ordenar a quien corresponda haga el descuento
        de ${NumberToLetter(
          demand.defendant?.numberPayments ?? 0,
          true
        )} SUCESIVOS QUINCENALES por la cantidad de $${new Intl.NumberFormat().format(
    demand.defendant?.amount3 ?? 0
  )} (${NumberToLetter(
    demand.defendant?.amount3 ?? 0
  )})</b> en el salario del empleado con ${
    demand.defendant?.employeeNo ?? ""
  }, que goza <b>C. ${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</b>, y lo tranfiera con la frecuencia que pague a la cuenta:
      </p>
      <table style="
      font-family: 'Tahoma', sans-serif;
      font-size: 12px;
      page-break-after:always;
    ">
        <tbody>
          <tr>
            <td style="text-align: end; border: 1px solid black;border-collapse: collapse;">
              CUENTA:
            </td>
            <td style="border: 1px solid black;border-collapse: collapse;">
              ${demand.actor?.accountNumber ?? ""}
            </td>
          </tr>
          <tr>
          <td style="text-align: end; border: 1px solid black;border-collapse: collapse;">
              CLABE INTERBANCARIA:
            </td>
            <td style="border: 1px solid black;border-collapse: collapse;">
              ${demand.actor?.CLABE ?? ""}
            </td>
          </tr>
          <tr>
          <td style="text-align: end; border: 1px solid black;border-collapse: collapse;">
              BANCO:
            </td>
            <td style="border: 1px solid black;border-collapse: collapse;">
              ${demand.actor?.bank ?? ""}
            </td>
          </tr>
          <tr>
          <td style="text-align: end; border: 1px solid black;border-collapse: collapse;">
              TITULAR:
            </td>
            <td style="border: 1px solid black;border-collapse: collapse;">
            ${demand.actor?.name ?? ""} ${demand.actor?.lastName ?? ""}
            </td>
          </tr>
          <tr>
          <td style="text-align: end; border: 1px solid black;border-collapse: collapse;">
              RFC:
            </td>
            <td style="border: 1px solid black;border-collapse: collapse;">
              ${demand.actor?.RFC ?? ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="display: grid">
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
        <b>SOLICITANDO QUE SE LE CORRA TRASLADO A DICHA AUTORIDAD CON ESTE ESCRITO QUE CONTIENE LOS DATOS PARA LAS
        TRANSFERENCIAS BANCARIAS EN EL OFICIO CORRESPONDIENTE.</b>
      </p>
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
        Por lo anteriormente expuesto y fundado, A USTED C JUEZ, ATENTAMENTE PIDO:-.
      </p>
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
        <b>PRIMERO:-</b> Se aprueba y eleve a <b>CATEGORIA DE COSA JUZGADA</b> el convenio exhibido en autos.
      </p>
      <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
        <b>SEGUNDO:-</b> Se gire el oficio con los insertos y apercibimientos necesarios al <b>C. ${
          ((demand.defendant?.dependence ?? "") == "OTRO" ? (demand.defendant?.dependenceOther ?? "") : (demand.defendant?.dependence ?? ""))
        }</b> para que se haga el descuento en los términos solicitados.
      </p>
      <p style="text-align: center;">
          <b>PROTESTO LO NECESARIO.</b><br/> Hermosillo, Sonora, ${formatDateLetter(
            new Date(),
            false
          )}.
        </p>
    </div>
    <div style="display: grid; margin-top:100px">
      <p style="text-align: center; text-justify: inter-word;">
        <b>LIC. PANFILO LOPEZ PEREZ</b>
      </p>
    </div>
  </div>
    `;
};
