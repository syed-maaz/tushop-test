
# Coding Assignment: Job Selection and Goodie Distribution

## Overview

This repository contains the solutions for two distinct problems:

- **Problem 1**: A job selection optimization problem to maximize John's earnings from non-overlapping jobs and calculate what remains for other employees.
- **Problem 2**: A goodie distribution problem to minimize the price difference between the highest and lowest priced goodies distributed among employees.

Both problems are implemented in **TypeScript** and can be run via **npm** commands. Additionally, test cases are provided using **Jest** for validating the solutions.

## Folder Structure

```
.
├── job_selection
│   ├── job_selection.ts
│   ├── job_selection.test.ts
│   ├── data
│   └── sample_input.txt
├── gift_distribution
│   ├── gift_distribution.ts
│   ├── gift_distribution.test.ts
│   ├── data
│   ├── sample_input.txt
│   └── sample_output.txt
├── build.js
├── jest.config.js
├── package.json
└── README.md
```

## Problem 1: Job Selection and Distribution

### Problem Description
A factory has a list of jobs where each job has a start time, end time, and profit. John must select jobs to maximize his earnings without overlap, and we need to compute the number of remaining jobs and the total earnings available for other employees.

### How to Run Problem 1

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Run Problem 1**:
   ```bash
   npm run job_selection
   ```

3. **Sample Input** (to be entered):
   ```
   3
   0900
   1030
   100
   1000
   1200
   500
   1100
   1200
   300
   ```

4. **Expected Output**:
   ```
   The number of tasks and earnings available for others
   Task: 2
   Earnings: 400
   ```

### Tests for Problem 1

To run the test cases for Problem 1, use:

```bash
npm run test:job_selection
```

Test cases include:
- Handling jobs that overlap.
- Handling jobs that do not overlap.
- Edge cases with no jobs.

## Problem 2: Goodie Distribution

### Problem Description
HR needs to distribute goodies among `M` employees such that the difference between the highest and lowest prices among the selected goodies is minimized.

### How to Run Problem 2

1. **Place Input File**: Ensure that `sample_input.txt` is in the `data/` folder under `gift_distribution`.
2. **Build the Project**:
   ```bash
   npm run build
   ```

3. **Run Problem 2**:
   ```bash
   npm run gift_distribution
   ```

4. **Input File Format (`data/sample_input.txt`)**:
   ```
   Number of employees: 4
   Goodies and Prices:
   Fitbit Plus: 7980
   IPods: 22349
   MI Band: 999
   Cult Pass: 2799
   Macbook Pro: 229900
   Digital Camera: 11101
   Alexa: 9999
   Sandwich Toaster: 2195
   Microwave Oven: 9800
   Scale: 4999
   ```

5. **Output File**: The selected goodies and the price difference will be written to `sample_output.txt`.

6. **Sample Output (`data/sample_output.txt`)**:
   ```
   The goodies selected for distribution are:
   Fitbit Plus: 7980
   Microwave Oven: 9800
   Alexa: 9999
   Digital Camera: 11101
   And the difference between the chosen goodie with highest price and the lowest price is 3121
   ```

### Tests for Problem 2

To run the test cases for Problem 2, use:

```bash
npm run test:gift_distribution
```

Test cases include:
- Finding the minimum price difference.
- Handling edge cases where the number of employees exceeds the available goodies.
- Handling cases where all goodies have the same price.

## Project Setup

### Install Dependencies

Before running the problems or tests, ensure that dependencies are installed:

```bash
npm install
```

### Build the Project

To build the project:

```bash
npm run build
```

This will compile TypeScript into JavaScript and place the compiled files in the `dist` folder.

### Running Tests

To run tests for both problems:

```bash
npm test
```

You can also run tests for specific problems:
- Problem 1: `npm run test`
- Problem 2: `npm run test`

## Notes

- The project assumes that input files are placed in the `data/` folder within the respective problem directories.
- A post-build script automatically copies the `data` folder into the `dist` folder for file handling purposes.
