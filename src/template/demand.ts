import { Demand } from "../interfaces/types";
import { getByCode } from "../services/constantValue";
import { NumberToLetter, formatDateLetter } from "../utils/convert";

export const demandHtml = async (demand: Partial<Demand>): Promise<string> => {
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
          <b>${
            demand.lawyers?.join(" Y/O ") ?? ""
          }</b> mexicanos, mayores de edad,
          <b>ENDOSATARIOS EN PROCURACIÓN</b> de la <b>C. ${
            demand.actor?.name ?? ""
          } ${demand.actor?.lastName ?? ""}</b>, con Clave
          Única de Registro de Población <b>(CURP) ${
            demand.actor?.CURP ?? ""
          }</b> y con Registro Federal
          de Contribuyente <b>(RFC) ${
            demand.actor?.RFC ?? ""
          }</b>, señalando como domicilio para oír y
          recibir toda clase de notificaciones el ubicado en <b>${await getByCode(
            "DIRECCION_DEMANDA"
          )}</b> y
          correo electrónico ${(
            await getByCode("EMAIL_DEMANDA")
          ).toLowerCase()}, autorizado en términos del Artículo 1069 del
          Código de Comercio a <b>${await getByCode(
            "LIC_1"
          )}</b> con cédula profesional número ${await getByCode(
    "LIC_1_CEDULA"
  )}, ante usted
          respetuosamente comparezco para exponer:
        </p>
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          Que mediante el presente escrito y con el Titulo de Crédito que constituye
          en el presente caso el documento base de la acción, venimos a demandar en
          la
          <b>VÍA EJECUTIVA MERCANTIL</b> y en ejercicio de la
          <b>ACCIÓN CAMBIARIA DIRECTA</b> en contra del <b>C. ${
            demand.defendant?.name ?? ""
          } ${demand.defendant?.lastName ?? ""}</b>, con
          domicilio para ser emplazado en <b>${`${
            demand.defendant?.street ?? ""
          } ${
            demand.defendant?.number ? "NUMERO " + demand.defendant?.number : ""
          }, COLONIA ${demand.defendant?.suburb ?? ""}, CP. ${
            demand.defendant?.zipCode ?? ""
          }, ${demand.defendant?.city ?? ""}, ${
            demand.defendant?.town ?? ""
          }`}</b>, 
          ${
            demand.exhorted == true
              ? `por lo que deberá girarse atento <b>EXHORTO</b> a su similar de <b>${
                  demand.exhortedCity ?? ""
                }, ${demand.exhortedTown ?? ""}</b>.`
              : "."
          }
        </p>
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          Como consecuencia de la acción que ejército, me permito reclamar el pago
          de las siguientes:
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
        PRESTACIONES:
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; text-indent: 5%;">
          <b>A). - </b> El pago de la cantidad de
          <b>$${new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 2,
          }).format(demand.defendant?.promiseAmount ?? 0)} (${NumberToLetter(
    demand.defendant?.promiseAmount ?? 0
  )})</b>, por concepto de suerte principal.
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
          Fundo la presente demanda en las consideraciones de hecho y preceptos de
          derecho siguientes:
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
        H E C H O S:
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>1.-</b> En la Ciudad de 
           ${demand.defendant?.city ?? ""}
                , ${demand.defendant?.town ?? ""}
          , el día <b>${formatDateLetter(
            demand.defendant?.promiseDate ?? new Date()
          )}</b> el
          <b>C. ${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</b>, acepto pagar y suscribió a favor de la
          <b>C. ${demand.actor?.name ?? ""} ${
    demand.actor?.lastName ?? ""
  }</b>, un título de crédito denominado pagaré, por la
          cantidad de <b>$${new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 2,
          }).format(demand.defendant?.promiseAmount ?? 0)} (${NumberToLetter(
    demand.defendant?.promiseAmount ?? 0
  )})</b>, pagadero en la Ciudad de HERMOSILLO, SONORA 
  ${
    demand.exhorted == true
      ? `o en la Ciudad de ${demand.defendant?.city ?? ""}, ${
          demand.defendant?.town ?? ""
        }`
      : ""
  }
   y estipulándose en el mismo
          un interés moratorio del <b>${await getByCode(
            "PORCENTAJE"
          )}</b> mensual, y como fecha de
          vencimiento el día <b>${formatDateLetter(
            demand.defendant?.promiseDueDate ?? new Date()
          )}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>2.-</b> Tal es el caso que, al llegarse la fecha de vencimiento se
          presentó el título de crédito de referencia para que fuera cubierto al
          <b>C. ${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</b>, no efectuando el pago de este. por lo que la
          <b>C. ${demand.actor?.name ?? ""} ${
    demand.actor?.lastName ?? ""
  }</b> el día <b>${formatDateLetter(
    demand.defendant?.approvalDate ?? new Date()
  )}</b> endosó en procuración a los
          suscritos el documento base de la acción para obtener su cobro.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>3.-</b> No obstante, procedimos en forma extrajudicial a tratar de
          obtener el pago del documento sin lograr resultado alguno, motivo por el
          cual nos vemos precisados a ejercitar la acción en la vía y forma
          propuesta.
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
        P R U E B A S:
      </div>
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>1.-</b> Documental privada consistente en pagaré original de fecha
          <b>${formatDateLetter(
            demand.defendant?.promiseDate ?? new Date()
          )}</b>, valioso por la cantidad de
          <b>$${new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 2,
          }).format(demand.defendant?.promiseAmount ?? 0)} (${NumberToLetter(
    demand.defendant?.promiseAmount ?? 0
  )})</b>, suscrito por el <b>C. ${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</b>,
          a favor de la <b>C. ${demand.actor?.name ?? ""} ${
    demand.actor?.lastName ?? ""
  }</b>.
        </p>
        ${
          (demand.actor?.economicActivity ?? "Persona Fisica") == "Persona Fisica"
            ? `<p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>2.-</b> Documental privada consiste copia simple de la Clave Única de
          Registro de Población <b>(CURP)</b> expedida a favor del actor
          <b>C. ${demand.actor?.name ?? ""} ${demand.actor?.lastName ?? ""}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>3.-</b> Documental privada, consiste en copia simple de Registro
          Federal del Contribuyente <b>(RFC)</b> expedida a favor del actor
          <b>C. ${demand.actor?.name ?? ""} ${demand.actor?.lastName ?? ""}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>4.-</b> Documental privada, consiste en copia de credencia para votar con fotografía del demandado ${
            demand.defendant?.INE ?? ""
          } <b>${demand.defendant?.name ?? ""} ${
                demand.defendant?.lastName ?? ""
              }</b></b>.
        </p>`
            : `
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>2.-</b> Documental privada, consiste en copia simple de Registro
          Federal del Contribuyente <b>(RFC)</b> expedida a favor del actor
          <b>C. ${demand.actor?.name ?? ""} ${demand.actor?.lastName ?? ""}</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>3.-</b> Documental privada, consiste en copia de credencia para votar con fotografía del demandado ${
            demand.defendant?.INE ?? ""
          } <b>${demand.defendant?.name ?? ""} ${
                demand.defendant?.lastName ?? ""
              }</b>.
        </p>`
        }
      </div>
      <div
        style="
          display: grid;
          font-weight: bold;
          text-align: center;
          text-justify: inter-word;
          margin-top:40px;
        "
      >
        D E R E C H O:
      </div>
      <div style="display: grid; page-break-inside: avoid;">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>I.-</b> Son aplicables en cuanto al fondo los artículos 1, 2, 5, 23,
          25, 77, 101, 109, 111, 112, 114, 150 fracción 11, 151, 152, 154, 167, 174
          y demás relativos de la Ley General de Títulos y Operaciones de Crédito.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>II.-</b> Norman el procedimiento los artículos 1049, 1051, 1391 al 1414
          y demás relativos del Código de Comercio.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>III.-</b> La competencia de ese Juzgado se encuentra establecida por
          los Artículos 1104, 1105, 1106, 1107 y además relativos del Código de
          Comercio.
        </p>
      </div>
      <div style="display: grid; page-break-inside: avoid;">
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          Por lo anteriormente expuesto y fundado,
          <b>A USTED C. JUEZ, MUY ATENTAMENTE PEDIMOS:-</b>.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>PRIMERO:-</b> Se nos tenga con el presente escrito demandado en la vía
          y forma propuesta a la <b>C. ${demand.defendant?.name ?? ""} ${
    demand.defendant?.lastName ?? ""
  }</b>, por el pago de la suerte
          principal más sus accesorios que se reclaman.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>SEGUNDO:-</b> Se radique la presente demanda dictando auto con efectos
          de mandamiento en forma, para que se requiera de pago a los demandados,
          tanto de la suerte principal como de los accesorios a que me he referido y
          de no hacerlo así en el momento mismo de la diligencia, se proceda a
          embargársele bienes bastantes y suficientes de su propiedad, con el
          propósito de garantizar todas y cada una de las prestaciones que se
          reclaman; 
          ${
            demand.exhorted == true
              ? `por lo que deberá girarse atento <b>EXHORTO</b> a su similar de <b>${
                  demand.exhortedCity ?? ""
                }, ${
                  demand.exhortedTown ?? ""
                }</b> para los efectos de que se sirva
          diligenciar el requerimiento, embargo y emplazamiento de la presente
          demanda.`
              : "."
          }
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>TERCERO:-</b> ${
            demand.exhorted == true
              ? `Se autorice al C. Juez exhortado para los efectos de que
          decrete en caso de ser necesario lo relativo a los medios de apremio
          establecidos en el Artículo 1067 Bis del Código de Comercio, asimismo se
          autorice al Juez exhortado para que gire los oficios necesarios a las
          Autoridades correspondientes con el fin de que se lleve a cabo la
          diligencian de requerimiento, embargo y emplazamiento: así como para los
          efectos de que acuerde lo relativo al señalamiento del nuevo domicilio de
          la parte demandada, en caso de que la misma ya no se encuentre en el
          domicilio señalado en la presente demanda; y para efecto de que amplíe el
          plazo para la contestación de la demanda en caso de que el C. Actuario
          Ejecutor de ese H. Juzgado levante razón de ausencia del demandado.`
              : `Se le corra traslado a la parte demandada con copia de la demanda, documento base de la acción, auto de radicación de esta, diligencia de emplazamiento y demás documentos, a efectos de que esté en sus condiciones procesales de hacer valer las defensas y excepciones si tuviere alguna en su favor.`
          }
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>CUARTO:-</b> Se le corra traslado a la parte demandada con copia de la
          demanda, documentos base de la acción, auto de radicación, diligencia de
          emplazamiento y además documentos, a efecto de que esté en condiciones
          procesales de hacer valer las defensas y excepciones si tuviere alguna en
          su favor y en su oportunidad y previos los trámites de Ley dictar
          sentencia condenado a la parte demandada al pago de todas y cada una de
          las prestaciones reclamadas, y respecto de los bienes dados en exequendo,
          se haga trance y remate de los mismos para que con el producto de éstos se
          cubran todas y cada una de las prestaciones reclamadas en el presente
          juicio.
        </p>
        <p style="text-align: justify; text-justify: inter-word; margin-top: 10px; text-indent: 5%;">
          <b>QUINTO:-</b> Tenérseme por autorizado para intervenir en el presente
          juicio a los Profesionistas a que me refiero en el preámbulo de este
          escrito.
        </p>
        <p style="text-align: center;">
          <b>PROTESTAMOS LO NECESARIO.</b><br/> Hermosillo, Sonora, ${formatDateLetter(
            new Date(),
            false
          )}.
        </p>
      </div>
      <div
        style="
          display: grid;
          font-weight: bold;
          margin-top: 70px;
          grid-template-columns: 50% 50%;
          grid-template-rows: 70px 70px 70px 70px 70px;
        "
      >
      <label style="text-align: center"><b>
      ${
        demand.lawyers?.join(
          "</b></label><label style='text-align: center'><b>"
        ) ?? ""
      }
      </b></label>
      </div>
    </div>
    `;
};
