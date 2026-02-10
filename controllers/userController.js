const TryCatch = require("../middlewares/TryCatch");

const createUser = TryCatch(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  res.json({
    name,
    phone,
  });
});

module.exports = { createUser };
