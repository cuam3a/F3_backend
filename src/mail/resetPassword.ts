
export const resetPasswordHtml = async (
  code: string
): Promise<string> => {
  return `
    <p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;'><img src="https://perfil.mexicof3.com/images/logoColor.png" alt="image" style="width: 203px; height: 84.1px;"></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:8.0pt;font-size:11.0pt;text-align:center;line-height:normal;background:white;'><strong><span style='font-size:18px;font-family:"Arial",sans-serif;color:#222222;'>&iexcl;Recuperar Constraseña!</span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>&nbsp;</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><strong><span style='font-size:19px;font-family:"Arial",sans-serif;color:#4472C4;background:white;'><a href="https://perfil.mexicof3.com/nuevo-password?c=${code}" target="_blank">Accede aqu&iacute; para reiniciar tu contraseña&nbsp;</a></span></strong></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>M&eacute;xico Funcional Fitness Federaci&oacute;n.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Comit&eacute; Deportivo.</span></p>
<p style='margin-right:0cm;margin-left:0cm;font-size:16px;font-family:"Calibri",sans-serif;margin-top:0cm;margin-bottom:0cm;font-size:11.0pt;text-align:center;line-height:normal;'><span style='font-family:"Arial",sans-serif;color:#222222;background:white;'>Hermosillo, Sonora, M&eacute;xico.</span></p>
    `;
};
