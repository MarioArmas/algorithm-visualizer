/** Pasos del visualizador: copia del array + highlight + mensaje. */
export function snap(arr, highlight = {}, msg = '') {
  return { arr: [...arr], highlight, msg }
}

/** Highlight con todos los índices 0..n-1 en 'sorted' (p. ej. paso final). */
export function fullSortedHighlight(n) {
  const highlight = {}
  for (let i = 0; i < n; i++) highlight[i] = 'sorted'
  return highlight
}
