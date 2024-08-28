import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Guest",
    email: "guest@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
