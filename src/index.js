const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.get("/test", (req, res) => {
  res.send("OK APPLE");
});

app.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existedUser)
      return res.status(400).send({ message: "This email already in used" });

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

/**
 * 1. ออกแบบโครงสร้าง database ที่จะใช้ในโปรเจ็ค คร่าวๆ ใน schema.prisma
 */
