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
  "my-queue",
  async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    // Example: Process job data
    return `Processed ${job.name} with data ${JSON.stringify(job.data)}`;
  },
  { connection },
);

// Listen for job events
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed with result: ${job.returnvalue}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});
