import Openpay from "openpay";
import { OpenpayCard, OpenpayCharge, OpenpayCustomer } from "../interfaces/types";

export const createCustomer = async (customer: Partial<OpenpayCustomer>) => {
  console.log(process.env.OPENPAY_ID)
  console.log(process.env.OPENPAY_PROD)
  return new Promise((resolve) => {
    var openpay = new Openpay(
      process.env.OPENPAY_ID ?? "",
      process.env.OPENPAY_KEY ?? "",
      //true
    );
    openpay.customers.create(customer, function (error, body) {
      let response;
      if (error) {
        response = { error: error };
      }
      if (body) {
        response = { success: body };
      }
      resolve(response);
    });
  });
};

export const createCard = async (card: Partial<OpenpayCard>) => {
    return new Promise((resolve) => {
      var openpay = new Openpay(
        process.env.OPENPAY_ID ?? "",
        process.env.OPENPAY_KEY ?? "",
        //true
      );
      openpay.cards.create(card, function (error, body) {
        let response;
        if (error) {
          response = { error: error };
        }
        if (body) {
          response = { success: body };
        }
        resolve(response);
      });
    });
  };

export const createCharge = async (charge: Partial<OpenpayCharge>) => {
    return new Promise((resolve) => {
      var openpay = new Openpay(
        process.env.OPENPAY_ID ?? "",
        process.env.OPENPAY_KEY ?? "",
        //true
      );
      openpay.charges.create(charge, function (error, body) {
        let response;
        if (error) {
          response = { error: error };
        }
        if (body) {
          response = { success: body };
        }
        resolve(response);
      });
    });
  };