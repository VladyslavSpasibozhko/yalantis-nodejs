export type ErrorType = {
  value?: any;
  msg: string;
  param: string;
  location?: string;
};

export enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}

export enum ErrorMessage {
  Success = 'success',
  Created = 'created',
  BadRequest = 'bad request',
  NotFound = 'not found',
  ServerError = 'server error',
  NotSupported = 'Unsupported image format',
  NotDefined = 'Avatar is not defined',
  AlreadyExist = 'Already exist',
  EmailInvalid = 'Email is invalid',
  FirstName = 'FirstName is invalid',
  LastName = 'LastName is invalid'
}
