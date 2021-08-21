import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { check, ValidationError, validationResult } from 'express-validator';
import { ErrorMessage } from '../../errors/types';
import { fileExtension } from '../../utils';
import models from '../../models';

const { UserModel } = models;

async function createUserValidation(req: Request): Promise<ValidationError[]> {
  await check('firstName', ErrorMessage.FirstName).notEmpty().run(req);
  await check('lastName', ErrorMessage.LastName).notEmpty().run(req);
  await check('email', ErrorMessage.EmailInvalid)
    .isEmail()
    .custom(value => {
      return UserModel.findOne({ email: value }).then(res => {
        if (res) return Promise.reject(ErrorMessage.AlreadyExist);
      });
    })
    .run(req);

  const errors = validationResult(req).array();

  if (!req.files || !req.files.photo) {
    errors.push({
      msg: ErrorMessage.NotDefined,
      param: 'photo'
    } as ValidationError);

    return errors;
  }

  const avatar = req.files.photo as UploadedFile;
  const isSupported = fileExtension(avatar.mimetype);

  if (!isSupported) {
    errors.push({
      msg: ErrorMessage.NotSupported,
      param: 'photo'
    } as ValidationError);
  }

  return errors;
}

export default {
  createUserValidation
};
