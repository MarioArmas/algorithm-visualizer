import { snap, fullSortedHighlight } from '../helpers/snapshots'

export function insertionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length

  steps.push(snap(a, { 0: 'sorted' }, "Índice 0 ya está 'ordenado'"))

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1
    steps.push(
      snap(a, { [i]: 'comparing' }, `Insertando ${key} en su posición correcta`)
    )

    while (j >= 0 && a[j] > key) {
      steps.push(
        snap(
          a,
          { [j]: 'swapping', [j + 1]: 'swapping' },
          `Moviendo ${a[j]} a la derecha`
        )
      )
      a[j + 1] = a[j]
      j--
    }

    a[j + 1] = key
    steps.push(
      snap(a, { [j + 1]: 'sorted' }, `${key} insertado en índice ${j + 1} ✓`)
    )
  }

  steps.push(snap(a, fullSortedHighlight(a.length), 'Array ordenado ✓'))
  return steps
}
