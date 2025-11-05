// src/utils/invoice.util.js
export function generateInvoice() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const randomSeq = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `INV${day}${month}${year}-${randomSeq}`;
}
