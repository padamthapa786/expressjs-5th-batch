const prisma = require("../config/prisma");
const postcreate = async (req,res)=>{
    const {userId} = req.body;
    const file = req.file
    const image = file.path
    //to do check if id is in database
    // 

    const savePost = await prisma.post.create({
        // title      String @unique
        // descrption String
        // image      String
        data:{
            title: title,
            descrption:descrption,
            image: image
        }
    })


}
const postUpdate = async (req,res) =>{

}

const postDel = async (req,res)=>[

]

module.exports = {
    postcreate,
    postUpdate,
    postDel

}