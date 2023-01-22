const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      content: Joi.string().min(3).max(512).required(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(404).json({
        code: 404,
        message: validateData.error.details,
      });
    }
    next();
  },
  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).optional(),
      content: Joi.string().min(3).max(512).optional(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(404).json({
        code: 404,
        message: validateData.error.details,
      });
    }
    next();
  },
};
