import { User } from "../interfaces/types";

export const welcomeHtml2 = async (
  user: Partial<User>,
  password: string,
): Promise<string> => {
  return `
    <p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;'><img src="https://perfil.mexicof3.com/images/logoColor.png" alt="image" style="width: 203px; height: 84.1px;"></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;line-height:normal;'><br></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>¡Hola!</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>¡Felicidades! Tu registro como atleta en la México Funcional Fitness Federación (MéxicoF3) ha sido exitoso. Ya eres parte de la comunidad.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>
¿Qué sigue?Tu afiliación te abre las puertas al Calendario 2024 de la MéxicoF3, incluyendo regionales en Chiapas, Mexicali, CDMX, Jalisco, Tamaulipas y el Nacional 2024. ¡Explora las competencias que están disponibles en tu perfil!
</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>
Acción requerida:
</span></p>
<ul style="list-style-type: disc;margin-left:37.25px;">
    <li><span style='font-family:"Arial",sans-serif;'>Completa tus datos personales.</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Sube tu foto para tu credencial física.</span></li>
</ul>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Fecha límite: Domingo 25 de febrero. Los envíos de credenciales comienzan el lunes 26 de febrero.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'><a href="https://perfil.mexicof3.com/" target="_blank">Accede aqu&iacute; a tu Perfil&nbsp;</a></span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-size:19px;font-family:"Arial",sans-serif;color:black;background:white;'>y completa tu proceso</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;line-height:normal;background:white;'><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#222222;'>Usuario:&nbsp;</span></strong><span style="color:black;"><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#1155CC;'>${user.user}</span></strong></span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;line-height:normal;background:white;'><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#222222;'>Contraseña:&nbsp;</span></strong><span style="color:black;"><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#1155CC;'>${password}</span></strong></span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>¡Nos vemos en la competencia!</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>M&eacute;xico Funcional Fitness Federaci&oacute;n.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Comit&eacute; Deportivo.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Hermosillo, Sonora, M&eacute;xico.</span></p>
    `;
};
