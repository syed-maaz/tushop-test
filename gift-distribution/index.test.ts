import { findMinDifferenceGoodies } from "./index"; // Adjust the import as necessary

interface Goodie {
  name: string;
  price: number;
}

describe("findMinDifferenceGoodies", () => {
  it("should return the correct selection and difference for 4 goodies", () => {
    const goodies: Goodie[] = [
      { name: "Fitbit Plus", price: 7980 },
      { name: "IPods", price: 22349 },
      { name: "MI Band", price: 999 },
      { name: "Cult Pass", price: 2799 },
      { name: "Digital Camera", price: 11101 },
      { name: "Alexa", price: 9999 },
      { name: "Sandwich Toaster", price: 2195 },
      { name: "Microwave Oven", price: 9800 },
      { name: "Scale", price: 4999 },
    ];
    const { selectedGoodies, priceDifference } = findMinDifferenceGoodies(
      goodies,
      4
    );
    expect(selectedGoodies.length).toBe(4);
    expect(priceDifference).toBe(3121); // Expected difference
  });

  it("should return the correct selection and difference for 2 goodies", () => {
    const goodies: Goodie[] = [
      { name: "Microwave Oven", price: 9800 },
      { name: "Alexa", price: 9999 },
      { name: "Cult Pass", price: 2799 },
    ];
    const { selectedGoodies, priceDifference } = findMinDifferenceGoodies(
      goodies,
      2
    );
    expect(selectedGoodies.length).toBe(2);
    expect(priceDifference).toBe(199); // Expected difference
  });

  it("should return an empty selection and 0 difference if no goodies available", () => {
    const goodies: Goodie[] = [];
    const { selectedGoodies, priceDifference } = findMinDifferenceGoodies(
      goodies,
      1
    );
    expect(selectedGoodies.length).toBe(0);
    expect(priceDifference).toBe(Infinity); // No selection possible
  });

  it("should handle the case where number of employees exceeds available goodies", () => {
    const goodies: Goodie[] = [
      { name: "Goodie1", price: 1000 },
      { name: "Goodie2", price: 2000 },
    ];
    const { selectedGoodies, priceDifference } = findMinDifferenceGoodies(
      goodies,
      3
    );
    expect(selectedGoodies.length).toBe(0); // No selection possible
    expect(priceDifference).toBe(Infinity); // No selection possible
  });

  it("should return the correct selection for 3 goodies with same prices", () => {
    const goodies: Goodie[] = [
      { name: "GoodieA", price: 1000 },
      { name: "GoodieB", price: 1000 },
      { name: "GoodieC", price: 1000 },
      { name: "GoodieD", price: 1000 },
    ];
    const { selectedGoodies, priceDifference } = findMinDifferenceGoodies(
      goodies,
      3
    );
    expect(selectedGoodies.length).toBe(3);
    expect(priceDifference).toBe(0); // All goodies have the same price
  });
});
