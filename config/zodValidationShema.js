const { z } = require("zod");

const createUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "name must be at least 3 characters long")
    .max(70, "Name cannot exceed 70 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  //   "Password must contain uppercase, lowercase, number, and special character",
  // )
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number")
    .optional(),
  role: z.enum(["user", "admin"]).default("user").optional(),
});

module.exports = { createUserSchema };
