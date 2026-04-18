import { snap, fullSortedHighlight } from '../helpers/snapshots'

export function bubbleSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push(
        snap(
          a,
          { [j]: 'comparing', [j + 1]: 'comparing' },
          `Comparando a[${j}]=${a[j]} y a[${j + 1}]=${a[j + 1]}`
        )
      )

      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push(
          snap(
            a,
            { [j]: 'swapping', [j + 1]: 'swapping' },
            `Swap → a[${j}]=${a[j]}, a[${j + 1}]=${a[j + 1]}`
          )
        )
      }
    }
    steps.push(
      snap(a, { [n - 1 - i]: 'sorted' }, `Posición ${n - 1 - i} queda fija ✓`)
    )
  }

  steps.push(snap(a, fullSortedHighlight(a.length), 'Array ordenado ✓'))
  return steps
}
