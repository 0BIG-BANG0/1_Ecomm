import { body,validationResult } from "express-validator";


const validateRequest = async(req, res, next) => {

     //1. Setup rles for validation.
     const rules = [
        body('email').notEmpty().withMessage("eemail is required"),
        // Add other validation rules for password (e.g., length, special characters, etc.)
    body('password').custom((value) => {
        // Check if the first character is a capital letter
        if (value.charAt(0) === value.charAt(0).toUpperCase()) {
          return true;
        } else {
          throw new Error('Password must start with a capital letter');
        }
      }),
    ];

    //2. run those rules.
    await Promise.all(rules.map((rule)=> rule.run(req))
    );

    //3. check if there are any errors after running the rules.

    var validationErrors = validationResult(req)
    console.log(validationErrors)

// 4. If there are errors then show them
  if (!validationErrors.isEmpty()) {
    return res.send( {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};
export default validateRequest;