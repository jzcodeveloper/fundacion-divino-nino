const { parseCSV } = require("./utils/csv");
const { writeFile } = require("fs").promises;

(async () => {
  const dir = `files`;
  const parsed = await parseCSV(`${dir}/laboratorio.csv`);
  await writeFile(`${dir}/laboratorio.json`, JSON.stringify(parsed), "binary");
})();
