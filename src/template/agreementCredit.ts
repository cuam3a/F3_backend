import { Credit } from "../interfaces/types";
import { getByCode } from "../services/constantValue";
import { NumberToLetter, formatDateLetter } from "../utils/convert";

export const agreementCreditHtml = async (credit: Partial<Credit>): Promise<string> => {
  return `
    <div
      style="
        font-family: 'Tahoma', sans-serif;
        font-size: 12px;
        page-break-after:auto;
        page-break-inside: avoid;
      "
    >
      <div style="display: grid; font-weight: bold">
        <label style="margin-left: 60%">EXPEDIENTE NO.</label>
        <label style="margin-left: 60%">JUICIO EJECUTIVO MERCANTIL</label>
        <label style="margin-left: 60%">${credit.actor?.name ?? ""} ${
          credit.actor?.lastName ?? ""
  }</label>
        <label style="margin-left: 70%">VS</label>
        <label style="margin-left: 60%">${credit.defendant?.name ?? ""} ${
          credit.defendant?.lastName ?? ""
  }</label>
      </div>
      <div style="display: grid; font-weight: bold">
        <label>C. JUEZ DE LO MERCANTIL EN TURNO.</label>
        <label>P R E S E N T E.-</label>
      </div>
      <br />
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>PANFILO LOPEZ PEREZ</b> con el carácter de parte actora y <b>C. ${
            credit.defendant?.name ?? ""
  } ${
    credit.defendant?.lastName ?? ""
  }</b>, señalado en términos de Acuerdo General 8/2020 del Pleno
          del Supremo Tribunal de Justicia del Estado de Sonora el correo electrónico ${credit?.defendant?.email ?? ""} en cual deberán hacerse las notificaciones durante la vigencia de la contingencia sanitaria, personalidad
          que tenemos debidamente acreditada y reconocida en autos del expediente cuyo número al rubro se indica,
          ante Usted con el debido respeto comparecemos para exponer:
        </p>
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          Que mediante el presente escrito y con fundamento en lo dispuesto por los artículos 1051, 105 y 1053
          del Código de Comercio, venimos a celebrar ante su señoría <b>CONVENIO DE TRANSACCION JUDICIAL</b>, para
          dar por terminada la controversia judical que se ventila en el juicio que nos ocupa, solicitando su aprobación,
          declarado en su oportunidad que el presente convenio se eleve a calidad de sentencia ejecutoriada, mismo
          que se regirá al tenor de las siguientes declaraciones y cláusulas: 
        </p>
      </div>
      <div
        style="
          display: grid;
          font-weight: bold;
          text-align: center;
          text-justify: inter-word;
        "
      >
        D E C L A R A C I O N E S:
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>I. -</b> Declara el <b>C. PANFILO LOPEZ PEREZ</b> ser Endosatario en Procuración de <b>
          ${credit.actor?.name ?? ""} ${
            credit.actor?.lastName ?? ""
  }</b> quien es propietario de un titulo de crédito 
          de los denominados pagaré, por la cantidad de <b>$${new Intl.NumberFormat(
            "es-MX", { minimumFractionDigits: 2 }
          ).format(credit.defendant?.promiseAmount ?? 0)} (${NumberToLetter(
            credit.defendant?.promiseAmount ?? 0
  )})</b> el cual fue suscrito por <b>C. ${credit.defendant?.name ?? ""} ${
    credit.defendant?.lastName ?? ""
  }</b>, y que en virtud de que el pagaré descrito con antelación no fue cubierto por el deudor en la fecha 
  de su vencimiento, se presentó demanda en la vía ejecutiva mercantil en ejercicio de la acción cambiaria 
  directa en contra del demandado.
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>II. -</b> Continúa declarando el <b>C. PANFILO LOPEZ PEREZ</b>, que la demanda referida en la declaración 
          anterior fue radicada por este tribunal a través de la cual demando el pago y cumplimiento de las 
          siguientes prestaciones:
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>A). - </b> El pago de la cantidad de
          <b>$${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
            credit.defendant?.promiseAmount ?? 0
          )} (${NumberToLetter(
            credit.defendant?.promiseAmount ?? 0
  )})</b> por concepto de suerte principal.
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>B). - </b> El pago de los intereses moratorios a razón del
          <b>${await getByCode("PORCENTAJE")}</b> mensual.
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>C). - </b> El pago de los gastos y costas que se originen con motivo
          del presente juicio.
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>III. -</b> Declara el demandando(a) <b>C. ${
            credit.defendant?.name ?? ""
          } ${
            credit.defendant?.lastName ?? ""
  }</b>, que reconoce y está de acuerdo con todas y cada una de las declaraciones que anteceden 
          y que fueron hechas por <b>C. PANFILO LOPEZ PEREZ</b>, ya que reconoce haber suscrito dicho pagaré, 
          así mismo reconoce que incumplió con el pago del adeudo contenido en el pagaré en la fecha de su 
          vencimiento, razón por la cual fue demandado(a) y mediante el presente convenio se da por emplazada 
          del juicio ejecutivo mercantil en que se actúa para todos los efectos legales a los que haya lugar.
        </p>
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>IV. -</b> Declara los <b>CC. PANFILO LOPEZ PEREZ y ${
            credit.defendant?.name ?? ""
          } ${
            credit.defendant?.lastName ?? ""
  }</b>, que están de acuerdo en solucionar el juicio en que se promueve, habiendo acordado una transacción 
          Inter partes, la cual se regirá al tenor de las siguientes:
        </p>
      </div>
      <div
        style="
          display: grid;
          font-weight: bold;
          text-align: center;
          text-justify: inter-word;
          page-break-inside: avoid;
        "
      >
        C L A U S U L A S:
      </div>
      <div style="display: grid; page-break-inside: avoid;">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%; page-break-inside: avoid;">
          <b>PRIMERA.-</b> A través del presente contrato de transacción, se da por terminada la controversia 
          judicial mediante la forma de pago que otorga <b>${
            credit.defendant?.name ?? ""
          } ${
            credit.defendant?.lastName ?? ""
  }</b> en su carácter de deudor a <b>${credit.actor?.name ?? ""} ${
    credit.actor?.lastName ?? ""
  }</b> en su carácter de acreedor.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%; page-break-inside: avoid;">
        <b>SEGUNDA.-</b> Declara el <b>C. PANFILO LOPEZ PEREZ</b>, que está de acuerdo en aceptar, la forma de pago, 
        propuesta por el deudor, para darse por pagadas las prestaciones reclamadas en el juicio que se atiende.
        </p>
      </div>
      <div style="display: grid; page-break-inside: avoid;">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%; page-break-inside: avoid;">
          <b>TERCERA.-</b> Declara el <b>C. ${credit.defendant?.name ?? ""} ${
            credit.defendant?.lastName ?? ""
  }</b>, que es la persona demandada y mediante el presente convenio se da por emplazada en el juicio 
          ejecutivo mercantil tramitado ante este juzgado de lo mercantil bajo el número de expediente que al rubro 
          se indica, manifestando que recibe las copias de traslado de la demanda principal, auto de radicación en forma 
          de cedula, ${(credit.freeText != "" && credit.freeText != null) ? credit.freeText + ", " : ""}copia del documento base de la acción consistente en un pagaré con su respectivo endoso, copia del 
          Registro Federal de Contribuyente (RFC) del actor(a) y copia de la Clave Única de Registro de Población (CURP) del actor(a) y copia del presente convenio; 
          manifestando además que reconoce el adeudo por el que fue demandado.
        </p>
        </div>
        <div style="display: grid; page-break-inside: avoid;">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%; page-break-inside: avoid;">
        <b>CUARTA.-</b> Ambas partes acuerdan que para que se dé por terminada la controversia judicial, el deudor(a) 
        <b>C. ${credit.defendant?.name ?? ""} ${
          credit.defendant?.lastName ?? ""
  }</b> pagará a <b>C. ${credit.actor?.name ?? ""} ${
    credit.actor?.lastName ?? ""
  }</b> la cantidad de <b>$${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
    credit.defendant?.amount3 ?? 0
  )} (${NumberToLetter(
    credit.defendant?.amount3 ?? 0
  )})</b> como monto total de todas las prestaciones reclamadas en el presente asunto, cantidad que liquidará de la siguiente forma:
<b>${NumberToLetter(
  credit.defendant?.numberPayments ?? 0,
    true
  )} SUCESIVOS QUINCENALES por la cantidad de $${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
    credit.defendant?.amount2 ?? 0
  )} (${NumberToLetter(
    credit.defendant?.amount2 ?? 0
  )})</b> que serán pagados a más tardar los días 01 y 16 de cada MES, <b>AUTORIZANDO LA DEUDORA QUE SE EMBARGUE SU SALARIO INTEGRADO QUE PERCIBE COMO EMPLEADO DE ${
    ((credit.defendant?.position ?? "") == "OTRO" ? credit.defendant?.positionOther : (credit.defendant?.position ?? "")) 
  } ${(credit.defendant?.employeeNo ?? "")}</b> debiéndose girar los correspondientes oficios con los insertos necesarios a <b>${
    ((credit.defendant?.dependence ?? "") == "OTRO" ? credit.defendant?.dependenceOther : (credit.defendant?.dependence ?? ""))
  }</b>, para efectos de que haga el descuento 
 y lo transfiera con la frecuencia que pague a la <b>cuenta ${
  credit.actor?.accountNumber ?? ""
 }</b> con <b>CLABE INTERBANCARIA ${
  credit.actor?.CLABE ?? ""
  }</b>, con
 <b>Número de Tarjeta ${credit.actor?.cardNumber ?? ""}</b> del banco ${
  credit.actor?.bank ?? ""
  } a nombre de <b>C. ${credit.actor?.name ?? ""} ${
    credit.actor?.lastName ?? ""
  }</b>; acordado además, que si el demandado(a) <b>C. ${
    credit.defendant?.name ?? ""
  } ${
    credit.defendant?.lastName ?? ""
  }</b> no cumple con alguno de los pagos QUINCENALES apenas acordados, se darán por vencidos anticipadamente los subsecuentes y se podrá denunciar
 el incumplimiento del convenio y en consecuencia, se acuerda que se hagan efectivas todas y cada una de las prestaciones reclamadas en el presente 
 asunto, en los precisos términos del escrito inicial de demanda y que se contiene en la declaración II del presente convenio, 
 regulándose los intereses moratorios a razón del ${await getByCode("PORCENTAJE_CONVENIO")} anual.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>QUINTA.-</b> El presente convenio de transacción es para terminar una controversia judicial, y cualquier acción que se derive por el incumplimiento 
          de este convenio por cualquiera de las partes, ambas partes acuerdan en sujetarse a las cláusulas que se consignan en el presente convenio, dándole 
          la misma eficacia y autoridad de cosa juzgada, obligándose ambas partes a presentarlo ante este Juzgado de lo Mercantil del Distrito Judicial de Hermosillo, Sonora, 
          para solicitar su aprobación judicial y estar en aptitud de promover de caso de incumplimiento, la ejecución forzosa en los términos 
          en que los prevé el articulo 405 del Código Federal de Procedimientos Civiles de aplicación supletoria al Código de Comercio.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>SEXTA.-</b> Manifiestan ambas partes que se reconoce expresamente entre si su capacidad para obligarse y el carácter con que contratan, designando como 
          domicilio convencional para los efectos del presente convenio los siguientes:
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          Por parte del actor el ubicado en <b>${await getByCode(
            "DIRECCION_DEMANDA"
          )}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          Por parte del demandado el ubicado en <b>${ (credit.exhorted == false ? `${
            credit.defendant?.street ?? ""
          } ${
            credit.defendant?.number ? "NUMERO " + credit.defendant?.number : ""
          }, COLONIA ${credit.defendant?.suburb ?? ""}, CP. ${
            credit.defendant?.zipCode ?? ""
          }, ${credit.defendant?.city ?? ""}, ${
            credit.defendant?.town ?? ""
          }` : `${
            credit.exhortedStreet ?? ""
          }, Hermosillo, Sonora`)}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>SEPTIMA.-</b> En relación con lo no manifestado en el presente convenio, se estará en todo caso a lo establecido en el Titulo Decimosexto correspondiente a las transacciones
          de la Segunda parte de las diversas especies de los contratos del Código Civil Federal.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>En mérito de lo anteriormente expuesto y fundado, <b>A USTED C. JUEZ MUY ATENTAMENTE PEDIMOS:</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>PRIMERO.-</b> Se nos tenga en los términos del presente escrito, exhibiendo el convenio de transacción judicial que hemos celebrado 
          las partes en el presente juicio a fin de dar por terminada la presente controversia judicial.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>SEGUNDO.-</b> Tenga por ratificado el convenio exhibido por estar suscrito ante Notario Público.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>TERCERO.-</b> Apruebe y sancione el referido convenio teniendo los efectos de una sentencia definitiva con la misma eficacia y <b>AUTORIDAD DE COSA JUZGADA</b>.
        </p>
      </div>
      <div style="display: grid; page-break-inside: avoid; margin-top: 20px">
        <p style="text-align: center; text-center: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>PROTESTAMOS LO NECESARIO.</b></br>
          Hermosillo, Sonora, A su fecha de presentación.
        </p>
      </div>

      <div
        style="
          display: grid;
          font-weight: bold;
          margin-top: 100px;
          grid-template-columns: 50% 50%;
          grid-template-rows: 100px;
        "
      >
      <label style="text-align: center">
      <b>
        PANFILO LOPEZ PEREZ
      </b></br>Endosatario en procuración
      </label>
      <label style='text-align: center'>
      <b>
      ${
        credit.defendant?.name ?? ""
      } ${
        credit.defendant?.lastName ?? ""
      }
      </b></br>Deudor Principal
      </label>
      </div>
    </div>
    `;
};