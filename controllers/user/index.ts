import userValidator from './validations';
import errorHandling from '../../errors';
import path from 'path';
import sharp from 'sharp';
import models from '../../models';
import { v4 } from 'uuid';

import { UserRequestBody } from './types';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ErrorMessage, StatusCode } from '../../errors/types';

const { UserModel } = models;
const { createUserValidation } = userValidator;

async function createUser(request: Request, response: Response): Promise<void> {
  try {
    const errors = await createUserValidation(request);

    if (errors.length) return errorHandling(response, StatusCode.BadRequest, errors);

    const avatar = request.files.photo as UploadedFile;

    const filePath = path.join(path.resolve('./'), '/public/', v4() + avatar.name);
    sharp(avatar.data)
      .resize({ width: 200, height: 200 })
      .toFile(filePath, async err => {
        if (!err) {
          const { email, firstName, lastName } = request.body as UserRequestBody;

          const user = await UserModel.create({
            email,
            firstName,
            lastName,
            photo: filePath
          });

          response.status(StatusCode.Created).json({ id: user._id });
        }
      });
  } catch (err) {
    errorHandling(response, StatusCode.ServerError, ErrorMessage.ServerError);
  }
}

async function getUser(request: Request, response: Response): Promise<void> {
  try {
    const { id } = request.params;
    const user = await UserModel.findOne({ _id: id });
    response.json(user);
  } catch (err) {
    errorHandling(response, StatusCode.NotFound, ErrorMessage.NotFound);
  }
}

export default {
  createUser,
  getUser
};
