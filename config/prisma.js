const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma
  .$connect()
  .then((value) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = prisma;
