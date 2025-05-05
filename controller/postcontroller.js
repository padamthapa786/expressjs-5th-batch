const prisma = require("../config/prisma");
const postcreate = async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;
  const image = file.path;
  const userId = req.user.id;

  const savepost = await prisma.post.create({
    data: {
      title: title,
      content: content,
      image: image,
      userId: userId,
    },
  });
  res.status(200).json({
    messgae: "post created",
    data: savepost,
  });
};
const postUpdate = async (req, res) => {};

const postDel = async (req, res) => [];

module.exports = {
  postcreate,
  postUpdate,
  postDel,
};
