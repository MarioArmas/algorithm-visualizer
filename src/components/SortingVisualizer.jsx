import './SortingVisualizer.css'
import { useAlgorithm } from '../hooks/useAlgorithm'

const INITIAL = [22, 84, 11, 43, 64, 30, 90, 12, 54, 34, 72, 25, 40, 50]

export default function SortingVisualizer({ algorithm }) {
  const {
    array,
    highlight,
    message,
    stepIdx,
    totalSteps,
    isPlaying,
    isFinished,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
    stats,
  } = useAlgorithm(INITIAL, algorithm)

  const maxVal = Math.max(...array)
  const barKind = (i) => {
    const k = highlight[i]
    return k === 'swapping' ||
      k === 'comparing' ||
      k === 'sorted' ||
      k === 'pivot'
      ? k
      : null
  }

  return (
    <div className="sorting-visualizer">
      <div className="sorting-chart">
        {array.map((val, i) => {
          const kind = barKind(i)
          return (
            <div
              key={i}
              className={
                kind ? `sorting-bar sorting-bar--${kind}` : 'sorting-bar'
              }
              style={{ '--bar-height': `${(val / maxVal) * 100}%` }}
            />
          )
        })}
      </div>

      <p>{message}</p>
      <p>
        Paso {stepIdx + 1} / {totalSteps} | Comparaciones: {stats.comparisons} |
        Swaps: {stats.swaps}
      </p>

      <button onClick={stepBackward}>← Atrás</button>
      <button onClick={togglePlay}>{isPlaying ? '⏸ Pausa' : '▶ Play'}</button>
      <button onClick={stepForward}>Adelante →</button>
      <button onClick={reset}>↺ Reset</button>

      <input
        type="range"
        min={50}
        max={500}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>
  )
}
