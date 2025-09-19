import { Response, Request, NextFunction } from "express";

interface IResponse {
  status: "error";
  success: boolean;
  message: string;
  stack?: string;
}
export default function errorMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  const status = err.statusCode || err.status || 500;

  const response: IResponse = {
    status: "error",
    success: false,
    message: err.message || "Internal Server Error"
  };

  if (err.name === "JsonWebTokenError") {
    response.message = "invalid token";
  }
  if (err.name === "TokenExpiredError") {
    response.message = "token expired";
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.error(err);
  return res.status(status).json(response);
}
