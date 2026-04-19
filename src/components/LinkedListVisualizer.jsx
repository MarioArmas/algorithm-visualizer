import React, { useState } from 'react'

export default function LinkedListVisualizer({ title }) {
  const [list, setList] = useState([3, 14, 25])
  const [inputValue, setInputValue] = useState('')
  const [animatingIndex, setAnimatingIndex] = useState(null)
  
  const handleAddTail = () => {
    if (!inputValue) return
    const val = Number(inputValue)
    setList([...list, val])
    setAnimatingIndex(list.length)
    setTimeout(() => setAnimatingIndex(null), 300)
    setInputValue('')
  }

  const handleAddHead = () => {
    if (!inputValue) return
    const val = Number(inputValue)
    setList([val, ...list])
    setAnimatingIndex(0)
    setTimeout(() => setAnimatingIndex(null), 300)
    setInputValue('')
  }
  
  const handleRemove = () => {
    if (list.length === 0) return
    setAnimatingIndex(list.length - 1)
    setTimeout(() => {
      setList(prev => prev.slice(0, -1))
      setAnimatingIndex(null)
    }, 300)
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: '#43d9ad' }}>Nodos</span>
      </div>

      <div className="ds-chart ds-ll-container">
        {list.map((val, idx) => (
          <div key={idx} className="ds-ll-node-wrapper">
             <div className={`ds-block ${animatingIndex === idx ? 'ds-block-animating' : ''}`}>
               {val}
               {idx === 0 && <span className="ds-pointer ds-pointer-bottom">Head</span>}
               {idx === list.length - 1 && <span className="ds-pointer ds-pointer-top">Tail</span>}
             </div>
             {idx < list.length - 1 && <span className="ds-ll-arrow">→</span>}
          </div>
        ))}
        {list.length === 0 && <div className="ds-empty-msg">Empty List</div>}
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
        <button className="sv-btn" onClick={handleAddTail}>+ Tail</button>
        <button className="sv-btn" onClick={handleAddHead}>+ Head</button>
        <button className="sv-btn" onClick={handleRemove}>- Tail</button>
      </div>
    </div>
  )
}
