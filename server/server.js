const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/conv-route"));
app.use(require("./routes/agent-route"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
    if (!err) console.log(`Server is running on port: ${port}`);
  });
  // console.log(`Server is running on port: ${port}`);
});