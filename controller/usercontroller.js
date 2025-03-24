const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");

// address  String?
const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    //password hash garne
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const saveUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        address: address,
      },
    });

    //token to be generated here

    const accesToken = jwt.sign(
      {
        id: saveUser.id,
        email: saveUser.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({
      message: "User created successfully",
      user: saveUser,
      accessToken: accesToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const login = (req, res) => {

}

module.exports = {
    signUp,
    login,
};
