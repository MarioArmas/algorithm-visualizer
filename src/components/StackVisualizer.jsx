import React, { useState } from 'react'

export default function StackVisualizer({ title }) {
  const [stack, setStack] = useState([10, 24, 7])
  const [inputValue, setInputValue] = useState('')
  const [animatingIndex, setAnimatingIndex] = useState(null)
  
  const handlePush = () => {
    if (!inputValue) return
    const val = Number(inputValue)
    setStack([...stack, val])
    setAnimatingIndex(stack.length)
    setTimeout(() => setAnimatingIndex(null), 300)
    setInputValue('')
  }
  
  const handlePop = () => {
    if (stack.length === 0) return
    setAnimatingIndex(stack.length - 1)
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1))
      setAnimatingIndex(null)
    }, 300)
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: '#6c63ff' }}>LIFO</span>
      </div>

      <div className="ds-chart ds-stack-container">
        {stack.map((val, idx) => (
          <div 
            key={idx} 
            className={`ds-block ${animatingIndex === idx ? (stack.length > idx && animatingIndex === idx && !inputValue ? 'ds-block-removing' : 'ds-block-animating') : ''}`}
          >
            {val}
            {idx === stack.length - 1 && <span className="ds-pointer ds-pointer-left">Top →</span>}
          </div>
        ))}
        {stack.length === 0 && <div className="ds-empty-msg">Empty Stack</div>}
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
        <button className="sv-btn" onClick={handlePush}>Push</button>
        <button className="sv-btn" onClick={handlePop}>Pop</button>
      </div>
    </div>
  )
}
