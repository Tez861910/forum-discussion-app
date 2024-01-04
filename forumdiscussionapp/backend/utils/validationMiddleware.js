import Joi from 'joi';

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params });
    if (error) {
      console.log('Invalid request:', error.details[0].message);
      return res.status(400).json({ error: 'Invalid request' });
    }
    next();
  };
}

export { validate };
