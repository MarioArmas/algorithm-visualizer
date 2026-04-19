import React, { useState } from 'react'

export default function QueueVisualizer({ title }) {
  const [queue, setQueue] = useState([12, 45, 8])
  const [inputValue, setInputValue] = useState('')
  const [animatingIndex, setAnimatingIndex] = useState(null)
  
  const handleEnqueue = () => {
    if (!inputValue) return
    const val = Number(inputValue)
    setQueue([...queue, val])
    setAnimatingIndex(queue.length)
    setTimeout(() => setAnimatingIndex(null), 300)
    setInputValue('')
  }
  
  const handleDequeue = () => {
    if (queue.length === 0) return
    setAnimatingIndex(0) // Animar el frente
    setTimeout(() => {
      setQueue(prev => prev.slice(1))
      setAnimatingIndex(null)
    }, 300)
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: '#ff6584' }}>FIFO</span>
      </div>

      <div className="ds-chart ds-queue-container">
        {queue.map((val, idx) => (
          <div 
            key={idx} 
            className={`ds-block ${animatingIndex === idx ? 'ds-block-animating' : ''}`}
          >
            {val}
            {idx === 0 && <span className="ds-pointer ds-pointer-bottom">Front</span>}
            {idx === queue.length - 1 && <span className="ds-pointer ds-pointer-top">Rear</span>}
          </div>
        ))}
        {queue.length === 0 && <div className="ds-empty-msg">Empty Queue</div>}
      </div>

      <div className="sv-divider"></div>

      <div className="sv-controls ds-controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Valor"
          className="ds-input"
        />
        <button className="sv-btn" onClick={handleEnqueue}>Enqueue</button>
        <button className="sv-btn" onClick={handleDequeue}>Dequeue</button>
      </div>
    </div>
  )
}
