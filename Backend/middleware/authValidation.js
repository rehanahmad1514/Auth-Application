const joy = require('joi');
const signUnValidation = async (req, res, next) => {
    const schema = joy.object({
        name: joy.string().min(3).max(30).required(),
        email: joy.string().email().required(),
        password: joy.string().min(6).required(),
    });
   const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

// login validation
const loginValidation = async (req, res, next) => {
    const schema = joy.object({
        email: joy.string().email().required(),
        password: joy.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}   

module.exports = {
    signUnValidation,
    loginValidation
};