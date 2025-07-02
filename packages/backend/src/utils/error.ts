import type { Response } from "express";
import type { BaseError } from "../types/error";

type GenericError = Error | unknown | BaseError;

function throwError(error: Error | string, status?: number): BaseError {
  let errorMessage = "Unknown error";
  let errorStatus = 500;

  if (error instanceof Error) {
    errorMessage = error.message;
    errorStatus = (error as any).status || status || 500; // convert error to any to access status property
  }

  if (typeof error === "string") {
    errorMessage = error as string;
    errorStatus = status || 500;
  }

  return {
    message: errorMessage,
    status: errorStatus
  };
}

function handleError(error: GenericError): BaseError {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: (error as any).status || 500
    };
  } else if (typeof error === "string") {
    return {
      message: error as string,
      status: 500
    };
  } else {
    return error as BaseError;
  }
}

function packageResponseError(error: GenericError, res: Response): Response {
  const { message, status } = handleError(error);

  console.error(message);

  return res.status(status).send(message);
}

export { handleError, packageResponseError, throwError };
