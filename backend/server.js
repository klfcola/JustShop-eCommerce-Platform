import app from "./app.js";
import colors from "colors";
import connectDB from "./config/db.js";

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5001;

app.listen(port, () =>
    console.log(`Server running on port ${port}!`.green.inverse)
);
