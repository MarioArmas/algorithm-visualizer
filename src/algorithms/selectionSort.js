import { snap, fullSortedHighlight } from '../helpers/snapshots'

export function selectionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push(
      snap(a, { [minIdx]: 'pivot' }, `Buscando mínimo desde índice ${i}`)
    )

    for (let j = i + 1; j < n; j++) {
      steps.push(
        snap(
          a,
          { [minIdx]: 'pivot', [j]: 'comparing' },
          `¿a[${j}]=${a[j]} < mínimo actual ${a[minIdx]}?`
        )
      )

      if (a[j] < a[minIdx]) minIdx = j
    }

    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push(
        snap(
          a,
          { [i]: 'swapping', [minIdx]: 'swapping' },
          `Swap mínimo ${a[i]} → posición ${i}`
        )
      )
    }
    steps.push(snap(a, {}, `Posición ${i} fijada ✓`))
  }

  steps.push(snap(a, fullSortedHighlight(a.length), 'Array ordenado ✓'))
  return steps
}
