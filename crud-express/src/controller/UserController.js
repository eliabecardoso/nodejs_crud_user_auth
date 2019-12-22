const moongose = require("mongoose");
const User = moongose.model("User");

module.exports = {
  async register(req, res) {
    const { userName, email, password } = req.body;

    const user = await User.create({ userName, email, password });

    return res.json(user);
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ error: "Usuário não encontrado." });

    if (typeof password !== "string" || !(await user.compareHash(password)))
      return res.status(400).json({ error: "Senha inválida." });

    return res.json({
      user,
      token: "Bearer " + user.generateToken()
    });
  },

  async index(req, res) {
    const users = await User.paginate({}, { page: 1, limit: 10 });

    return res.json(users);
  },

  async detail(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  },

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  }
};
