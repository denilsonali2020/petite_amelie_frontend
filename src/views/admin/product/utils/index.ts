export const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(Number(amount));
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  const siblings = 3;

  if (totalPages <= siblings * 2 + 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - siblings);
  let end = Math.min(totalPages, currentPage + siblings);

  if (start <= 3) {
    start = 1;
    end = 1 + siblings * 2 + 2;
  }

  if (end >= totalPages - 2) {
    end = totalPages;
    start = totalPages - (siblings * 2 + 2);
  }

  const items: (number | string)[] = [];

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("...");
  }

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) items.push("...");
    items.push(totalPages);
  }

  return items;
};


