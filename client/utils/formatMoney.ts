import currency from "currency.js";

export const formatMoney = (amount: number, currencyCode: string) => {
  const symbol = currencyCode === "GBP" ? "£" : "$";

  return currency(amount, {
    symbol,
    precision: 2,
    separator: ",",
    decimal: ".",
  }).format();
};
