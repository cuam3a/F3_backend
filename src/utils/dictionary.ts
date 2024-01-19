export const paymentError = (msg: string): string => {
  switch (msg) {
    case "cc_rejected_bad_filled_card_number":
      return "REVISA EL NÚMERO DE TARJETA.";
    case "cc_rejected_bad_filled_date	":
      return "REVISA LA FECHA DE VENCIMIENTO.";
    case "cc_rejected_bad_filled_other":
      return "REVISA LOS DATOS.";
    case "cc_rejected_bad_filled_security_code":
      return "REVISA EL NÚMERO DE TARJETA.";
    case "cc_rejected_blacklist":
      return "BLACKLIST	NO PUDIMOS PROCESAR TU PAGO.";
    case "cc_rejected_call_for_authorize":
      return "DEBES AUTORIZAR EL PAGO.";
    case "cc_rejected_card_disabled":
      return "DEBES ACTIVAR TU TARJETA O USA OTRO MEDIO DE PAGO.";
    case "cc_rejected_card_error":
      return "NO PUDIMOS PROCESAR TU PAGO.";
    case "cc_rejected_duplicated_payment":
      return "YA HICISTE UN PAGO POR ESE VALOR, USA OTRA TARJETA U OTRO MEDIO DE PAGO.";
    case "cc_rejected_high_risk":
      return "TU PAGO FUE RECHAZADO, ELIGE OTRO DE LOS MEDIOS DE PAGO.";
    case "cc_rejected_insufficient_amount":
      return "NO TIENE FONDOS SUFICIENTES.";
    case "cc_rejected_invalid_installments":
      return "NO PROCESA PAGOS EN INSTALLMENTS CUOTAS";
    case "cc_rejected_max_attempts":
      return "LLEGASTE AL LÍMITE DE INTENTOS PERMITIDOS.";
    case "cc_rejected_other_reason":
      return "NO PROCESÓ EL PAGO.";
      case "pending_contingency":
      return "ESTAMOS PROCESANDO TU PAGO.";
    case "pending_review_manual":
      return "ESTAMOS PROCESANDO TU PAGO.";
  }
  return "";
};
