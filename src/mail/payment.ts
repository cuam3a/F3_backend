import { User } from "../interfaces/types";

export const payment = async (
  user: Partial<User>,
): Promise<string> => {
  return `
    <p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;'><img src="https://perfil.mexicof3.com/images/logoColor.png" alt="image" style="width: 203px; height: 150px;"></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;line-height:normal;'><br></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>¡Hola!</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Atleta tu pago será conciliado te enviaremos correo de confirmación para tu inscripción.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>

<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'><a href="https://perfil.mexicof3.com/" target="_blank">Accede aqu&iacute; a tu Perfil&nbsp;</a></span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:justify;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'>&nbsp;</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>M&eacute;xico Funcional Fitness Federaci&oacute;n.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Comit&eacute; Deportivo.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Hermosillo, Sonora, M&eacute;xico.</span></p>
    `;
};
