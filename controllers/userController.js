const { redisClient } = require("../index");
const { createUserSchema } = require("../config/zodValidationShema");
const TryCatch = require("../middlewares/TryCatch");
const sanitize = require("mongo-sanitize");
const User = require("../models/userModel");

const createUser = TryCatch(async (req, res) => {
  // request sanitization and validations
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

  // rate limiting

  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

  if (await redisClient.get(rateLimitKey)) {
    return res.status(429).json({
      message: "Too Many Requests, Try Again Later",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  //http://localhost:5173

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const verifyKey = `verify:${verifyToken}`;

  res.json({
    name,
    email,
  });
});

module.exports = { createUser };
