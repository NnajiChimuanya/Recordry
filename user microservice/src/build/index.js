"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const worker_threads_1 = require("worker_threads");
if (cluster_1.default.isMaster) {
    const cpus = os_1.default.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker_threads_1.workerData.exitedAfterDiconnect) {
            console.log(`worker ${worker.id} crashed`);
            console.log(`Starting new worker`);
            cluster_1.default.fork();
        }
    });
}
else {
    require("./server.ts");
}
