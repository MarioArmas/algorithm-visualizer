import './App.css'
import SortingVisualizer from './components/SortingVisualizer'

import { bubbleSortSteps } from './algorithms/bubbleSort'
import { insertionSortSteps } from './algorithms/insertionSort'
import { selectionSortSteps } from './algorithms/selectionSort'
import { mergeSortSteps } from './algorithms/mergeSort'
import { quickSortSteps } from './algorithms/quickSort'

function App() {
  return (
    <>
      <SortingVisualizer algorithm={bubbleSortSteps} />
      <SortingVisualizer algorithm={insertionSortSteps} />
      <SortingVisualizer algorithm={selectionSortSteps} />
      <SortingVisualizer algorithm={mergeSortSteps} />
      <SortingVisualizer algorithm={quickSortSteps} />
    </>
  )
}

export default App
