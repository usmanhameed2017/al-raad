require("dotenv").config();
const connectDB = require("./database/connection");
const app = require("./app");
const { port } = require("./constants");

connectDB()
.then(() => {
    app.on("error", (error) => console.log(`Express app is failed to listen! ${error}`));
    app.listen(port, () => console.log(`Server is listening at port ${port}`));
})
.catch(error => console.log(`Database connection failed! ${error.message}`));