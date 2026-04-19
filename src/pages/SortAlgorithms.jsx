import SortingVisualizer from '../components/SortingVisualizer'
import { bubbleSortSteps } from '../algorithms/bubbleSort'
import { insertionSortSteps } from '../algorithms/insertionSort'
import { selectionSortSteps } from '../algorithms/selectionSort'
import { mergeSortSteps } from '../algorithms/mergeSort'
import { quickSortSteps } from '../algorithms/quickSort'

export default function SortAlgorithms() {
  return (
    <>

      <div className="legend">
        <div className="legend-item"><div className="legend-color normal"></div> normal</div>
        <div className="legend-item"><div className="legend-color comparando"></div> comparando</div>
        <div className="legend-item"><div className="legend-color intercambiando"></div> intercambiando</div>
        <div className="legend-item"><div className="legend-color pivot"></div> pivot</div>
        <div className="legend-item"><div className="legend-color ordenado"></div> ordenado</div>
      </div>

      <div className="algorithms-grid">
        <SortingVisualizer algorithm={bubbleSortSteps} title="BUBBLE SORT" complexity="O(N²)" complexityColor="#6c63ff" />
        <SortingVisualizer algorithm={selectionSortSteps} title="SELECTION SORT" complexity="O(N²)" complexityColor="#ff6584" />
        <SortingVisualizer algorithm={insertionSortSteps} title="INSERTION SORT" complexity="O(N²)" complexityColor="#ffb347" />
        <SortingVisualizer algorithm={quickSortSteps} title="QUICK SORT" complexity="O(N²)" complexityColor="#43d9ad" />
        <SortingVisualizer algorithm={mergeSortSteps} title="MERGE SORT" complexity="O(N log N)" complexityColor="#a371f7" />
      </div>
    </>
  )
}
