"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
// Redis connection configuration
const connection = new ioredis_1.default({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});
// Create a queue
const myQueue = new bullmq_1.Queue("my-queue", { connection });
// Add jobs to the queue
async function addJobs() {
    await myQueue.add("myJobName", { foo: "bar" });
    console.log("Jobs added to queue");
}
const myQueue2 = new bullmq_1.Queue("my-queue2", { connection });
// Add jobs to the queue
async function addJobs2() {
    await myQueue2.add("myJobName2", { qux: "baz" });
    console.log("Jobs2 added to queue");
}
// Run the producer
addJobs().catch(console.error);
addJobs2().catch(console.error);
