import Joi from 'joi';

export class AdminValidator {
  static signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    session: Joi.boolean()
  });
  static loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
}
export class EmployeeValidator {
  static signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    session: Joi.boolean()
  });
  static loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
}
