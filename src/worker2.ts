import { Worker } from "bullmq";
import IORedis from "ioredis";

// Redis connection configuration
const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

// Create a worker
const worker = new Worker(
  "my-queue2",
  async (job) => {
    console.log(`Processing job2 ${job.id} with data:`, job.data);
    // Example: Process job data
    return `Processed2 ${job.name} with data ${JSON.stringify(job.data)}`;
  },
  { connection },
);

// Listen for job events
worker.on("completed", (job) => {
  console.log(`Job2 ${job.id} completed with result: ${job.returnvalue}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job2 ${job?.id} failed with error: ${err.message}`);
});
