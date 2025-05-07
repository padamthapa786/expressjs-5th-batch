const prisma = require("../config/prisma");
const postcreate = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files;
    const userid = req.user.id;
    const images = [];
    image.map((value, index) => {
      const path = value.path;
      images.push(path);
    });

    const savePost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        image: images,
        userId: userid,
      },
    });
    return res.status(201).json({
      message: "Post Created Successfully",
      data: savePost,
    });
  } catch (error) {
    console.log(error);
  }
};

const postGet = async(req,res)=>{
  const getPost = await prisma.post.findMany();
  return res.status(200).json({
    message:"Post Fetched",
    data:getPost
  })
}

const postUpdate = async (req, res) => {};

const postDel = async (req, res) => [];

module.exports = {
  postcreate,
  postUpdate,
  postDel,
  postGet
};
