import { jobSelection, timeToMinutes } from "./index"; // Adjust path accordingly

describe("Job Selection Function", () => {
  // Test case 1: Regular case with overlapping jobs
  it("Test Case 1: 3 jobs, some overlap", () => {
    const jobs = [
      {
        startTime: timeToMinutes("0900"),
        endTime: timeToMinutes("1030"),
        profit: 100,
      },
      {
        startTime: timeToMinutes("1000"),
        endTime: timeToMinutes("1200"),
        profit: 500,
      },
      {
        startTime: timeToMinutes("1100"),
        endTime: timeToMinutes("1200"),
        profit: 300,
      },
    ];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 2, remainingProfit: 400 });
  });

  // Test case 2: All jobs overlap
  it("Test Case 2: All jobs overlap", () => {
    const jobs = [
      {
        startTime: timeToMinutes("0900"),
        endTime: timeToMinutes("1000"),
        profit: 100,
      },
      {
        startTime: timeToMinutes("0930"),
        endTime: timeToMinutes("1030"),
        profit: 200,
      },
      {
        startTime: timeToMinutes("0945"),
        endTime: timeToMinutes("1100"),
        profit: 300,
      },
    ];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 2, remainingProfit: 300 });
  });

  // Test case 3: No overlapping jobs
  it("Test Case 3: No overlapping jobs", () => {
    const jobs = [
      {
        startTime: timeToMinutes("0900"),
        endTime: timeToMinutes("1000"),
        profit: 200,
      },
      {
        startTime: timeToMinutes("1010"),
        endTime: timeToMinutes("1100"),
        profit: 300,
      },
      {
        startTime: timeToMinutes("1115"),
        endTime: timeToMinutes("1200"),
        profit: 400,
      },
    ];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 0, remainingProfit: 0 });
  });

  // Test case 4: No jobs provided
  it("Test Case 4: No jobs available", () => {
    const jobs: { startTime: number; endTime: number; profit: number }[] = [];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 0, remainingProfit: 0 });
  });

  // Test case 7: Invalid input (string values)
  it("Test Case 7: Invalid input", () => {
    // @ts-ignore: This is intentional for testing invalid inputs
    const result = jobSelection("invalid");
    expect(result).toEqual({ remainingJobs: 0, remainingProfit: 0 });
  });

  // Test case 9: Only one job available
  it("Test Case 9: Only one job", () => {
    const jobs = [
      {
        startTime: timeToMinutes("0900"),
        endTime: timeToMinutes("1000"),
        profit: 200,
      },
    ];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 0, remainingProfit: 0 });
  });

  // Test case 10: Complex job set with overlapping and non-overlapping jobs
  it("Test Case 10: Complex job set", () => {
    const jobs = [
      {
        startTime: timeToMinutes("0900"),
        endTime: timeToMinutes("1030"),
        profit: 300,
      },
      {
        startTime: timeToMinutes("1000"),
        endTime: timeToMinutes("1200"),
        profit: 500,
      },
      {
        startTime: timeToMinutes("1100"),
        endTime: timeToMinutes("1200"),
        profit: 400,
      },
      {
        startTime: timeToMinutes("1230"),
        endTime: timeToMinutes("1300"),
        profit: 200,
      },
    ];

    const result = jobSelection(jobs);
    expect(result).toEqual({ remainingJobs: 1, remainingProfit: 500 });
  });
});
