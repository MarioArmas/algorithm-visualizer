import React, { useState } from 'react'

export default function ArrayVisualizer({ title }) {
  const [array, setArray] = useState([5, 10, 15, 20])
  const [inputValue, setInputValue] = useState('')
  const [indexValue, setIndexValue] = useState('')
  const [animatingIndex, setAnimatingIndex] = useState(null)
  const [animatingColor, setAnimatingColor] = useState('')

  const handleInsert = () => {
    if (!inputValue) return
    const val = Number(inputValue)
    let idx = array.length
    if (indexValue !== '') idx = Math.min(Math.max(Number(indexValue), 0), array.length)
    
    const newArr = [...array]
    newArr.splice(idx, 0, val)
    setArray(newArr)
    setAnimatingIndex(idx)
    setAnimatingColor('add')
    setTimeout(() => setAnimatingIndex(null), 300)
    setInputValue('')
    setIndexValue('')
  }
  
  const handleRemove = () => {
    if (array.length === 0) return
    let idx = array.length - 1
    if (indexValue !== '') idx = Math.min(Math.max(Number(indexValue), 0), array.length - 1)
    
    setAnimatingIndex(idx)
    setAnimatingColor('remove')
    setTimeout(() => {
      const newArr = [...array]
      newArr.splice(idx, 1)
      setArray(newArr)
      setAnimatingIndex(null)
    }, 300)
    setIndexValue('')
  }

  const handleAccess = () => {
    if (indexValue === '' || array.length === 0) return
    const idx = Math.min(Math.max(Number(indexValue), 0), array.length - 1)
    setAnimatingIndex(idx)
    setAnimatingColor('access')
    setTimeout(() => setAnimatingIndex(null), 500)
  }

  const getBlockClass = (idx) => {
    if (idx !== animatingIndex) return ''
    if (animatingColor === 'add') return 'ds-block-animating'
    if (animatingColor === 'remove') return 'ds-block-removing'
    return ''
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: '#ffb347' }}>O(1) Acceso</span>
      </div>

      <div className="ds-chart ds-array-container">
        {array.map((val, idx) => (
          <div 
            key={idx} 
            className={`ds-block ${getBlockClass(idx)}`}
            style={animatingColor === 'access' && animatingIndex === idx ? { borderColor: '#43d9ad', boxShadow: '0 0 15px #43d9ad', background: '#43d9ad' } : {}}
          >
            {val}
            <span className="ds-pointer ds-pointer-bottom">{idx}</span>
          </div>
        ))}
        {array.length === 0 && <div className="ds-empty-msg">Empty Array</div>}
      </div>

      <div className="sv-divider"></div>

      <div className="sv-controls ds-controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Val"
          className="ds-input"
          style={{width: '60px'}}
        />
        <input 
          type="number" 
          value={indexValue} 
          onChange={(e) => setIndexValue(e.target.value)} 
          placeholder="Idx"
          className="ds-input"
          style={{width: '50px'}}
        />
        <button className="sv-btn" onClick={handleInsert}>Ins</button>
        <button className="sv-btn" onClick={handleRemove}>Del</button>
        <button className="sv-btn" onClick={handleAccess}>Acc</button>
      </div>
    </div>
  )
}
