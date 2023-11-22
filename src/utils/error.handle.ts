import { Response } from "express";
import { ErrorResponse } from "../interfaces/types";

const handleError = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw?.message ?? "");
  const response : ErrorResponse = {
    status: error =="SESSION_NO_VALIDA" ? 401 :500,
    error: error,
    errorDetail: errorRaw?.message??""
  }
  res.send(response);
};

export { handleError };