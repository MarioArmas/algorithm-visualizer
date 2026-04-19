import { snap, fullSortedHighlight } from '../helpers/snapshots'

export function mergeSortSteps(arr) {
  const steps = []
  const a = [...arr]

  function merge(lo, mid, hi) {
    const left = a.slice(lo, mid + 1)
    const right = a.slice(mid + 1, hi + 1)
    let i = 0,
      j = 0,
      k = lo

    while (i < left.length && j < right.length) {
      steps.push(
        snap(
          a,
          { [lo + i]: 'comparing', [mid + 1 + j]: 'comparing' },
          `Comparando ${left[i]} y ${right[j]}`
        )
      )

      if (left[i] <= right[j]) {
        a[k++] = left[i++]
      } else {
        a[k++] = right[j++]
      }
      steps.push(
        snap(
          a,
          { [k - 1]: 'swapping' },
          `Colocando ${a[k - 1]} en índice ${k - 1}`
        )
      )
    }
    while (i < left.length) {
      a[k++] = left[i++]
      steps.push(snap(a, {}))
    }
    while (j < right.length) {
      a[k++] = right[j++]
      steps.push(snap(a, {}))
    }
  }

  function mergeSort(lo, hi) {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    mergeSort(lo, mid)
    mergeSort(mid + 1, hi)
    merge(lo, mid, hi)
  }

  mergeSort(0, a.length - 1)
  steps.push(snap(a, fullSortedHighlight(a.length), 'Merge Sort completado ✓'))
  return steps
}
