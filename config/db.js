const mongoose = require("mongoose");

require("../models/bank");
require("../models/currency_exchange");
require("../models/currency");
require("../models/docperm");
require("../models/doctype");
require("../models/healthcare_practitioner_item");
require("../models/healthcare_practitioner");
require("../models/item");
require("../models/mode_of_payment");
require("../models/municipality_parish");
require("../models/municipality");
require("../models/parish");
require("../models/patient");
require("../models/role");
require("../models/sales_invoice_service");
require("../models/sales_invoice_payment");
require("../models/sales_invoice");
require("../models/service_healthcare_practitioner");
require("../models/service");
require("../models/user");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
