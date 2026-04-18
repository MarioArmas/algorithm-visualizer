import { snap, fullSortedHighlight } from '../helpers/snapshots'

export function quickSortSteps(arr) {
  const steps = []
  const a = [...arr]

  function partition(lo, hi) {
    const pivot = a[hi]
    steps.push(snap(a, { [hi]: 'pivot' }, `Pivot = ${pivot}`))
    let p = lo

    for (let k = lo; k < hi; k++) {
      steps.push(
        snap(
          a,
          { [hi]: 'pivot', [k]: 'comparing', [p]: 'swapping' },
          `¿a[${k}]=${a[k]} ≤ pivot ${pivot}?`
        )
      )

      if (a[k] <= pivot) {
        if (p !== k) {
          ;[a[p], a[k]] = [a[k], a[p]]
          steps.push(
            snap(
              a,
              { [p]: 'swapping', [k]: 'swapping', [hi]: 'pivot' },
              `Swap a[${p}]=${a[p]} ↔ a[${k}]=${a[k]}`
            )
          )
        }
        p++
      }
    }
    ;[a[p], a[hi]] = [a[hi], a[p]]
    steps.push(
      snap(a, { [p]: 'sorted' }, `Pivot ${a[p]} en posición final ${p} ✓`)
    )
    return p
  }

  function quickSort(lo, hi) {
    if (lo >= hi) return
    const p = partition(lo, hi)
    quickSort(lo, p - 1)
    quickSort(p + 1, hi)
  }

  quickSort(0, a.length - 1)
  steps.push(snap(a, fullSortedHighlight(a.length), 'Quick Sort completado ✓'))
  return steps
}
