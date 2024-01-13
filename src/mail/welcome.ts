import { User } from "../interfaces/types"

export const welcomeHtml = async (user: Partial<User>): Promise<string> => {
    return `
      <body style="width: 100%;">
        <div style="display: flex; text-align:center; margin-inline: 20px;">
          <h3><b>¡Gracias por tu confianza y apoyo!</b></h3><br/>
          <p align="justify">Con tu afiliación ya formas parte de la comunidad del Functional Fitness en México, así como tú, hay muchos atletas con sueños y metas a cumplir en nuestro deporte, nosotros como la México Funcional Fitness Federación (MexicoF3) buscamos darle peso e identidad a nuestra comunidad en el ámbito nacional e internacional, para ello debemos saber quiénes y cuantos somos, que tantas personas le dedican sus días y esfuerzo a nuestra disciplina.
            El proceso de afiliación nos permite darles legitimidad a los atletas frente a las instituciones deportivas de nuestro país.
            </p><br/>
            <p align="center">Tu afiliación te da el pase para participar en el Calendario 2024 de la MexicoF3.
              </p><br/>
              <ul align="justify" style="margin-inline: 30%;">
                <li>Regional Chiapas</li>
                <li>Regional Mexicali </li>
                <li>Regional CDMX </li>
                <li>Regional Jalisco </li>
                <li>Regional Tamaulipas </li>
                <li>Ranking Test 2024 (Repechaje)  </li>
                <li>Nacional 2024  </li>
              </ul><br/>
              <p align="center">¡Espera más noticias en nuestras redes y pagina web sobre nuestros avances, tu credencial física y las competencias de las que podrás formar parte en este 2024!.
              </p><br/>
              <br/>
              <br/>
              <p align="center">
                México Funcional Fitness Federación.<br/>
Comité Deportivo.<br/>
Hermosillo, Sonora, México.

              </p>
          <a href="https://mexicof3.com/">MexicoF3<a>
        </div>
      </body>
    `
} 