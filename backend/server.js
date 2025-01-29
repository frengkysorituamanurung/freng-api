const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Gunakan rute untuk employees
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});