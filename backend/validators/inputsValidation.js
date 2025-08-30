import { body, validationResult } from 'express-validator';
export const validatorRegister = [
    body("username").isEmpty().withMessage("username is required"),
    body("email").isEmpty().withMessage("email is required").isEmail().withMessage("invalid email"),
    body("password").isEmpty().withMessage("password is required").isLenght({ min: 12 }).withMessage("password must be at least 12 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]