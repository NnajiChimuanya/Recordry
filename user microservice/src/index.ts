import cluster from "cluster";
import os from "os";
import { workerData } from "worker_threads";

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus}`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !workerData.exitedAfterDiconnect) {
      console.log(`worker ${worker.id} crashed`);
      console.log(`Starting new worker`);
      cluster.fork();
    }
  });
} else {
  require("./server.ts");
}
