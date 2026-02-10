const { createUserSchema } = require("../config/zodValidationShema");
const TryCatch = require("../middlewares/TryCatch");
const sanitize = require("mongo-sanitize");

const createUser = TryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);
  const validations = createUserSchema.safeParse(sanitizedBody);

  if (!validations.success) {
    const zodError = validations.error;

    // console.log(zodError);
    // console.log(zodError?.issues);

    let firstErrorMessage = "Validation failed";

    let allErrors = [];

    // error message properly formatted to display from zod errors
    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError?.issues?.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue?.message || "Validation Error",
        code: issue?.code,
      }));
      firstErrorMessage = allErrors[0]?.message || "Validation Error";
    }

    // console.log(allErrors);

    return res.status(400).json({
      message: firstErrorMessage,
      error: allErrors,
    });
  }

  const { name, email, password, phone, role } = validations.data;

  res.json({
    name,
    email,
  });
});

module.exports = { createUser };
