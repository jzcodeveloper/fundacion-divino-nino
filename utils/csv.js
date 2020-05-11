const { createWriteStream } = require("fs");
const { readFile } = require("fs").promises;

exports.writeCSV = async (path, array) => {
  try {
    const stream = createWriteStream(path);

    array.forEach(({ data }, index) => {
      let line = [];

      if (index === 0) {
        line = Object.keys(data);
        stream.write(line.join(",") + "\n");
      }

      line = Object.values(data);
      stream.write(line.join(",") + "\n");
    });

    stream.end();

    return "CSV file created succesfully.";
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.parseCSV = async (path) => {
  try {
    const file = await readFile(path, "utf8");
    const array = file.split("\n");

    let headers = [];
    let parse = [];

    array.forEach((data, index) => {
      let line = data.split(",");

      if (index === 0 || index === array.length - 1) {
        return (headers = data.split(","));
      }

      const obj = line.reduce((acc, val, index) => {
        acc[headers[index]] = val;
        return acc;
      }, {});

      parse.push(obj);
    });

    return parse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
