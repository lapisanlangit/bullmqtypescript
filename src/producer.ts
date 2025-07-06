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
export async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" });
  console.log("Jobs added to queue");
}

const myQueue2 = new Queue("my-queue2", { connection });

// Add jobs to the queue
export async function addJobs2() {
  await myQueue2.add("myJobName2", { qux: "bazzzz" });
  console.log("Jobs22 added to queue");
}

// Run the producer
// addJobs().catch(console.error);
// addJobs2().catch(console.error);
