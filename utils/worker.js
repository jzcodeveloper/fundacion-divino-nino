const { Worker } = require("worker_threads");

exports.runService = (file, workerData) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(`./threads/${file}`, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
