import { Response } from 'express';
import { ErrorType, StatusCode } from './types';

function errorHandling(response: Response, status: StatusCode, errors: ErrorType[] | string) {
  if (Array.isArray(errors)) response.status(status).json(errors.map(({ msg, param }) => ({ msg, param })));
  else response.status(status).json([{ msg: errors }]);
}

export default errorHandling;
