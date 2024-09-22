// Convert HHMM time format to minutes
export function timeToMinutes(time: string): number {
  const hours: number = parseInt(time.slice(0, 2), 10);
  const minutes: number = parseInt(time.slice(2), 10);
  return hours * 60 + minutes;
}

interface Job {
  startTime: number;
  endTime: number;
  profit: number;
}

/**
 * Function to find the maximum profit non-overlapping jobs using dynamic programming.
 *
 * The approach is to sort the jobs by their end time, then iterate over the sorted
 * array to find the maximum profit non-overlapping jobs. For each job, we find the
 * latest non-overlapping job using binary search, and calculate the profit including
 * the current job. If the profit is greater than the previous maximum profit, we update
 * the dp array and the selectedJobs array.
 *
 * @param {Job[]} jobs The array of jobs.
 * @returns {Object} An object with two properties, maxProfitJobs and totalProfit.
 * maxProfitJobs is an array of Job objects, and totalProfit is the total profit of
 * the selected jobs.
 */
function findMaxProfitNonOverlappingJobs(jobs: Job[]): {
  maxProfitJobs: Job[];
  totalProfit: number;
} {
  // Sort jobs by their end time to prioritize jobs that finish earlier
  const sortedJobs = [...jobs].sort((a, b) => a.endTime - b.endTime);

  const n = sortedJobs.length;
  const dp: number[] = new Array(n).fill(0);
  const selectedJobs: Job[][] = new Array(n).fill(null).map(() => []);

  // Base case: the first job's profit
  dp[0] = sortedJobs[0].profit;
  selectedJobs[0] = [sortedJobs[0]];

  // Iterate over each job and calculate the maximum profit non-overlapping jobs
  for (let i = 1; i < n; i++) {
    // Find the latest non-overlapping job using binary search
    const lastNonOverlappingJobIndex = findLastNonOverlappingJob(sortedJobs, i);

    const profitIncludingCurrent =
      lastNonOverlappingJobIndex !== -1
        ? dp[lastNonOverlappingJobIndex] + sortedJobs[i].profit
        : sortedJobs[i].profit;

    // Exclude the current job (take the previous max profit)
    const profitExcludingCurrent = dp[i - 1];

    // Choose the better option (include or exclude current job)
    if (profitIncludingCurrent > profitExcludingCurrent) {
      dp[i] = profitIncludingCurrent;
      selectedJobs[i] = [
        ...(lastNonOverlappingJobIndex !== -1
          ? [...selectedJobs[lastNonOverlappingJobIndex], sortedJobs[i]]
          : [sortedJobs[i]]),
      ];
    } else {
      dp[i] = profitExcludingCurrent;
      selectedJobs[i] = [...selectedJobs[i - 1]];
    }
  }

  // The last element of dp contains the maximum profit
  return { maxProfitJobs: selectedJobs[n - 1], totalProfit: dp[n - 1] };
}

/**
 * Finds the index of the last non-overlapping job in the sorted jobs array
 * by using binary search.
 *
 * @param {Job[]} sortedJobs The sorted jobs array
 * @param {number} currentIndex The current index to find the last non-overlapping job for
 * @returns {number} The index of the last non-overlapping job or -1 if not found
 */
function findLastNonOverlappingJob(
  sortedJobs: Job[],
  currentIndex: number
): number {
  let left = 0;
  let right = currentIndex - 1;

  // Binary search to find the last non-overlapping job
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Check if the job at mid index is non-overlapping with the current job
    if (sortedJobs[mid].endTime <= sortedJobs[currentIndex].startTime) {
      // If the job at mid index is non-overlapping, move the left pointer
      left = mid + 1;
    } else {
      // If the job at mid index is overlapping, move the right pointer
      right = mid - 1;
    }
  }

  // Return the index of the last non-overlapping job or -1 if not found
  return left - 1 >= 0 ? left - 1 : -1;
}

/**
 * Selects jobs and calculates the number of remaining jobs and their total profit.
 *
 * @param {Job[]} jobs The array of jobs to select from
 * @returns {{ remainingJobs: number, remainingProfit: number }} The number of remaining jobs and their total profit
 */
export function jobSelection(jobs: Job[]): {
  remainingJobs: number;
  remainingProfit: number;
} {
  if (!Array.isArray(jobs) || !jobs || !jobs.length) {
    // If no jobs are provided, return 0 for remaining jobs and profit
    return { remainingJobs: 0, remainingProfit: 0 };
  }
  const { maxProfitJobs, totalProfit } = findMaxProfitNonOverlappingJobs(jobs);

  // Calculate the remaining jobs and their total profit
  const remainingJobs = jobs.length - maxProfitJobs.length;
  const remainingProfit =
    jobs.reduce((acc, job) => acc + job.profit, 0) - totalProfit;

  return {
    remainingJobs,
    remainingProfit,
  };
}

/**
 * Main function to read input and process jobs.
 *
 * The function reads the number of jobs from the user, then reads the start time,
 * end time, and profit for each job. It then calls the jobSelection function to
 * select the jobs and calculate the number of remaining jobs and their total profit.
 *
 * @example
 * Enter the number of Jobs: 3
 * Enter job start time, end time, and earnings:
 * 0900 1030 100
 * 1000 1200 500
 * 1100 1200 300
 * Task: 2
 * Earnings: 400
 */
function main(): void {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let jobCount = 0;
  const jobs: Job[] = [];

  rl.question("Enter the number of Jobs: ", (n: string) => {
    jobCount = parseInt(n, 10);
    console.log("Enter job start time, end time, and earnings:");
    const inputs: string[] = [];
    rl.on("line", (line: string) => {
      inputs.push(line);
      if (inputs.length === jobCount * 3) {
        rl.close();
      }
    }).on("close", () => {
      for (let i = 0; i < inputs.length; i += 3) {
        const startTime = timeToMinutes(inputs[i]);
        const endTime = timeToMinutes(inputs[i + 1]);
        const profit = parseInt(inputs[i + 2], 10);
        jobs.push({ startTime, endTime, profit });
      }

      const result = jobSelection(jobs);
      console.log(`Task: ${result.remainingJobs}`);
      console.log(`Earnings: ${result.remainingProfit}`);
    });
  });
}

main();
