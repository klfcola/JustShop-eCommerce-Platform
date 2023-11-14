import bcrypt from "bcryptjs";

const users = [
    {
        name: "Administrator",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Kevin",
        email: "kevin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Gerardo",
        email: "gerardo@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
