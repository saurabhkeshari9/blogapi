const validate = (schema) => {
    
    return (req, res, next) => {
        console.log("Request Body:", req);
      const { error } = schema.validate(req.body);
      
      if (error) {
        return res.status(400).json({ statusCode: 400, message: error.details[0].message, data: {} });
      }
      next();
    };
  };
  
  module.exports = validate;