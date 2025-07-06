import { Queue } from "bullmq";
import IORedis from "ioredis";

// Redis connection configuration
const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

// Create a queue
const myQueue = new Queue("my-queue", { connection });

// Add jobs to the queue
async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" });
  await myQueue.add("myJobName", { qux: "baz" });
  console.log("Jobs added to queue");
}

// Run the producer
addJobs().catch(console.error);
