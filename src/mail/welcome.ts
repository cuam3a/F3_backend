import { User } from "../interfaces/types";

export const welcomeHtml = async (
  user: Partial<User>,
  password: string
): Promise<string> => {
  return `
    <p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;'><img src="https://perfil.mexicof3.com/images/logoColor.png" alt="image" style="width: 203px; height: 84.1px;"></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;line-height:normal;background:white;'><strong><span style='font-size:18px;font-family:"Arial",sans-serif;color:#222222;'>&iexcl;Gracias por tu confianza y apoyo!</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;line-height:normal;'><br></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Con tu afiliaci&oacute;n ya formas parte de la comunidad del Functional Fitness en M&eacute;xico, as&iacute; como t&uacute;, hay muchos atletas con sue&ntilde;os y metas a cumplir en nuestro deporte, nosotros como la M&eacute;xico Funcional Fitness Federaci&oacute;n (MexicoF3) buscamos darle peso e identidad a nuestra comunidad en el &aacute;mbito nacional e internacional, para ello debemos saber qui&eacute;nes y cuantos somos, que tantas personas le dedican sus d&iacute;as y esfuerzo a nuestra disciplina. El proceso de afiliaci&oacute;n nos permite darles legitimidad a los atletas frente a las instituciones deportivas de nuestro pa&iacute;s.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Tu afiliaci&oacute;n te da el pase para participar en el Calendario 2024 de la MexicoF3:</span></p>
<ul style="list-style-type: disc;margin-left:37.25px;">
    <li><span style='font-family:"Arial",sans-serif;'>Regional Chiapas</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Regional Mexicali</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Regional CDMX</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Regional Jalisco</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Regional Tamaulipas</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Ranking Test 2024 (Repechaje)</span></li>
    <li><span style='font-family:"Arial",sans-serif;'>Nacional 2024</span></li>
</ul>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&iexcl;Espera m&aacute;s noticias en nuestras redes y pagina web sobre nuestros avances, tu credencial f&iacute;sica y las competencias de las que podr&aacute;s formar parte en este 2024!.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'><a href="https://perfil.mexicof3.com/" target="_blank">Accede aqu&iacute; a tu Perfil&nbsp;</a></span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-size:19px;font-family:"Arial",sans-serif;color:black;background:white;'>y completa tu proceso</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;line-height:normal;background:white;'><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#222222;'>Usuario:&nbsp;</span></strong><span style="color:black;"><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#1155CC;'>${user.user}</span></strong></span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;line-height:normal;background:white;'><strong><span style='font-size:16px;font-family:"Arial",sans-serif;color:#222222;'>Contrase&ntilde;a&nbsp;${password}</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>M&eacute;xico Funcional Fitness Federaci&oacute;n.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Comit&eacute; Deportivo.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Hermosillo, Sonora, M&eacute;xico.</span></p>
    `;
};
