const express = require("express");
const app = express();
const cors = require("cors");
const clientRoutes = require("./routes/client")
require("dotenv").config();

app.use(cors());

app.use(cors({
  origin: [process.env.API_PORT_URL],
  methods: "GET, POST, PUT, DELETE, OPTIONS"
}));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup Routes For Which The Server Is Listening
app.use("/", clientRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});