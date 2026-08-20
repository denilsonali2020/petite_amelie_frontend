export function generatePagination(
  currentPage: number,
  totalPages: number,
): number[] {
  // si el total de paginas es 10 o igual se muestran del 1 al 10
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // si no definimos el maximo de botones que queremos
  const maxButtons = 10;

  // calcular el inicio central calculanto la pagina actual
  let start = currentPage - 5;

  // ajustamos el inicio para que no se desborde por la izquierda
  if (start < 1) {
    start = 1;
  }

  // ajustamos el inicio si se desborda por la derecha
  if (start + maxButtons - 1 > totalPages) {
    start = totalPages - maxButtons + 1;
  }

  // generamos el arreglo con los 10 numeros secuenciales exactos
  return Array.from({ length: maxButtons }, (_, i) => start + i);
}
