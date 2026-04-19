import './SortingVisualizer.css'
import { useAlgorithm } from '../hooks/useAlgorithm'

const INITIAL = [22, 84, 11, 43, 64, 30, 90, 12, 54, 34, 72, 25, 40, 50]

export default function SortingVisualizer({ algorithm, title, complexity, complexityColor }) {
  const {
    array,
    highlight,
    message,
    stepIdx,
    totalSteps,
    isPlaying,
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
      k === 'pivot' ||
      k === 'inserted' ||
      k === 'merged'
      ? k
      : null
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: complexityColor }}>{complexity}</span>
      </div>

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

      <div className="sv-message">
        {message || '\u00A0'}
      </div>

      <div className="sv-divider"></div>

      <div className="sv-stats">
        <div className="sv-stats-left">
          <span>comparaciones <span className="sv-stat-val">{stats.comparisons}</span></span>
          <span>swaps <span className="sv-stat-val">{stats.swaps}</span></span>
        </div>
        <div className="sv-stats-right">
          <span>paso <span className="sv-stat-val">{stepIdx + 1}/{totalSteps}</span></span>
        </div>
      </div>

      <div className="sv-controls">
        <button className="sv-btn" onClick={togglePlay} aria-label="Play or Pause">
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button className="sv-btn" onClick={stepBackward} aria-label="Previous step">←</button>
        <button className="sv-btn" onClick={stepForward} aria-label="Next step">→</button>
        <button className="sv-btn" onClick={reset}>↺ Reset</button>
        <div className="sv-speed">
          <span>vel</span>
          <input type="range" min={50} max={500} defaultValue={200} onChange={(e) => setSpeed(Number(e.target.value))} />
        </div>
      </div>
    </div>
  )
}
