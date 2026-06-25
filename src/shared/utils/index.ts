export const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(Number(amount));
};