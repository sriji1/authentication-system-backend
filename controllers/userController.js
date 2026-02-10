import TryCatch from "../middlewares/TryCatch.js"

export const createUser =  TryCatch(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  res.json({
    name,
    phone
  })
})
