const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Question = require("./models/Question");
const Counter = require("./models/Counter");
const Global = require("./models/Global");
const Log = require("./models/Log");
const Dataset = require("./models/Dataset");
const Model = require("./models/Model");
const Data = require("./models/Data");
const Task = require("./models/Task");
const Admin = require("./models/Admin");
const Contributor = require("./models/Contributor");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/questions.json`, "utf-8")
);

const datas = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/datas.json`, "utf-8")
);

const datasets = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/datasets.json`, "utf-8")
);

const models = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/models.json`, "utf-8")
);

const counters = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/counters.json`, "utf-8")
);

const globals = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/globals.json`, "utf-8")
);

const logs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/logs.json`, "utf-8")
);

const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tasks.json`, "utf-8")
);

const admins = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/admins.json`, "utf-8")
);

const contributors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contributors.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Counter.create(counters);
    await Global.create(globals);
    await Log.create(logs);
    await Question.create(questions);
    await Data.create(datas);
    await Dataset.create(datasets);
    await Model.create(models);
    await Task.create(tasks);
    await Admin.create(admins);
    await Contributor.create(contributors);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Counter.deleteMany();
    await Global.deleteMany();
    await Log.deleteMany();
    await Question.deleteMany();
    await Data.deleteMany();
    await Dataset.deleteMany();
    await Model.deleteMany();
    await Task.deleteMany();
    await Admin.deleteMany();
    await Contributor.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
