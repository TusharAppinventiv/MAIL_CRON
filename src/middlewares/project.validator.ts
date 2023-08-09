import Joi from 'joi';

export class ProjectValidator {
  static createProject = Joi.object({
    projectName: Joi.string().required(),
    projectSummary: Joi.string(),
    adminId: Joi.number().integer().required(),
    allocatedHours: Joi.string(),
  });
}
