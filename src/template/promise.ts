import { Demand } from "../interfaces/types";
import { NumberToLetter, formatDateLetter } from "../utils/convert";

export const promiseHtml = async (demand: Partial<Demand>): Promise<string> => {
  return `
    <div
      style="
        font-family: 'Tahoma', sans-serif;
        font-size: 12px;
        page-break-after:always;
      "
    >
      <div style="display: flex; justify-content:center; font-weight: bold">
        <label>PAGARÉ</label>
      </div>
      <div style="display: flex; justify-content:end; font-weight: bold">
        <label>BUENO POR $${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
          demand.defendant?.promiseAmount ?? 0
        )}</label>
      </div>
      <div style="display: flex; justify-content:end; margin-top:30px">
        <label>${demand.defendant?.city ?? ""}
        , ${demand.defendant?.town ?? ""}, a ${formatDateLetter(demand.defendant?.promiseDate ?? new Date())}</label>
      </div>
      <br />
      <div style="display: grid">
        <p style="text-align: justify; text-justify: inter-word;">
          Debo(mos) y pagaré(mos) incondicionalmente por este PAGARÉ a la orden de ${
            demand.actor?.name ?? ""
          } ${demand.actor?.lastName ?? ""}
          en la Ciudad de HERMOSILLO, SONORA ${
            demand.defendant?.city !== "HERMOSILLO"
              ? `o ${demand.defendant?.city ?? ""}, ${
                  demand.defendant?.town ?? ""
                }`
              : ""
          } el día 
          ${formatDateLetter(
            demand.defendant?.promiseDueDate ?? new Date()
          )} la cantidad de $${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
            demand.defendant?.promiseAmount ?? 0
          )} (${NumberToLetter(
    demand.defendant?.promiseAmount ?? 0
  )}). Valor recibido a mi (nuestra) entera satisfacción. Este PAGARÉ forma parte de una serie numerada del 1 al 1 y todos están sujetos a la condición de que al no pagarse cualquiera de ellos a su vencimiento serán exigibles todos los que le siguen en número, además de los ya vencidos, desde la fecha de vencimiento de este documento hasta el día de su liquidación, causará intereses moratorios al tipo de 6.00% mensual, pagadero en esta ciudad juntamente con el principal.
        </p>
      </div>
      <div style="display: grid; font-weight: bold; font-size: 10px">
        <p style="text-align: justify; text-justify: inter-word;">
        Datos del deudor
        </p>
        <p style="text-align: justify; text-justify: inter-word;">
        Nombre: ${demand.defendant?.name ?? ""} ${
          demand.defendant?.lastName ?? ""
        }
        </br>
        Domicilio: ${`${
          demand.defendant?.street ?? ""
        } ${
          demand.defendant?.number ? "NUMERO " + demand.defendant?.number : ""
        }, COLONIA ${demand.defendant?.suburb ?? ""}, CP. ${
          demand.defendant?.zipCode ?? ""
        }, ${demand.defendant?.city ?? ""}, ${
          demand.defendant?.town ?? ""
        }`}
        </br>
        Teléfono: ${
          demand.defendant?.phone ?? ""
        }
        </br>
        Correo: ${
          demand.defendant?.email ?? ""
        }
        </p>
      </div>
      <div style="display: grid; font-weight: bold; border-bottom: solid; margin-left: 20%; margin-right: 20%; height: 150px">
      <p style="text-align: center;">Acepto (amos)</br>Firma (s)</p>
      <p style="text-align: center; vertical-align:bottom">${demand.defendant?.name ?? ""} ${
        demand.defendant?.lastName ?? ""
      }</p>
      </div>
    </div>
    `;
};
