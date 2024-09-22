import * as fs from "fs";
import * as path from "path";

interface Goodie {
  name: string;
  price: number;
}

/**
 * Finds the selection of goodies that minimizes the price difference between the
 * highest priced goodie and the lowest priced goodie.
 *
 * @param goodies The list of goodies to select from
 * @param numberOfEmployees The number of employees to select goodies for
 * @returns An object with the selected goodies and the minimum price difference
 */
export function findMinDifferenceGoodies(
  goodies: Goodie[],
  numberOfEmployees: number
): { selectedGoodies: Goodie[]; priceDifference: number } {
  // Sort goodies by price
  goodies.sort((a, b) => a.price - b.price);

  let minDifference = Infinity;
  let selectedGoodies: Goodie[] = [];

  // Iterate over the list of goodies and find the selection that results in the
  // lowest price difference
  for (let i = 0; i <= goodies.length - numberOfEmployees; i++) {
    const currentSelection = goodies.slice(i, i + numberOfEmployees);
    const currentDifference =
      currentSelection[currentSelection.length - 1].price -
      currentSelection[0].price;

    if (currentDifference < minDifference) {
      minDifference = currentDifference;
      selectedGoodies = currentSelection;
    }
  }

  return { selectedGoodies, priceDifference: minDifference };
}

/**
 * Main function to read the input file, find the selection of goodies with the
 * minimum price difference, and write the output file.
 *
 * The function reads the input file, parses the number of employees and the list
 * of goodies, finds the selection of goodies with the minimum price difference,
 * and writes the output file with the selected goodies and the minimum price
 * difference.
 */
async function main() {
  // Read the input file
  const inputFilePath = path.join(__dirname, "data/input.txt");
  const outputFilePath = path.join(__dirname, "data/output.txt");
  const data = fs.readFileSync(inputFilePath, "utf8").trim().split("\n");

  // Parse the number of employees and the list of goodies
  const numberOfEmployees = parseInt(data[0].split(":")[1].trim(), 10);
  const goodies: Goodie[] = data.slice(2).map((line) => {
    const [name, priceStr] = line.split(":");
    console.log("name", name, "priceStr", priceStr);
    return { name: name.trim(), price: parseInt(priceStr.trim(), 10) };
  });

  // Find the selection of goodies with the minimum price difference
  const result = findMinDifferenceGoodies(goodies, numberOfEmployees);

  // Write the output file
  const outputLines = [
    "The goodies selected for distribution are:",
    ...result.selectedGoodies.map(
      (goodie) => `${goodie.name}: ${goodie.price}`
    ),
    `And the difference between the chosen goodie with highest price and the lowest price is ${result.priceDifference}`,
  ];
  fs.writeFileSync(outputFilePath, outputLines.join("\n"));
  console.log("Output written to sample_output.txt");
}

main().catch((err) => console.error(err));
