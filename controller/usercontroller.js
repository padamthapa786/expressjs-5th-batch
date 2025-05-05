const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");

// address  String?
const signUp = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
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
        username: username,
        email: email,
        password: hashPassword,
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

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const checkEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!checkEmail) {
    return res.status(400).json({
      message: "Email Not Exist",
    });
  }

  const checkPassword = await bcrypt.compare(password, checkEmail.password);

  if (!checkPassword) {
    return res.status(404).json({
      message: "Password does not match",
    });
  }

  //token to be generated here

  const accesToken = jwt.sign(
    {
      id: checkEmail.id,
      email: checkEmail.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return res.status(201).json({
    message: "User Loggedin",
    user: checkEmail,
    accessToken: accesToken,
  });
};

const userFetch = async (req, res) => {
  const user = req.user;
  const getuser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });
  console.log(getuser);
  return res.status(200).json({
    data: user,
    message: "user fetched",
  });
};

module.exports = {
  signUp,
  userFetch,
  login,
};
