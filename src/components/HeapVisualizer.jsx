import React, { useState } from 'react'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export default function HeapVisualizer({ title }) {
  // initial heap state (a valid max-heap)
  const [heap, setHeap] = useState([50, 40, 30, 20, 10, 5])
  const [inputValue, setInputValue] = useState('')
  const [animatingIndex, setAnimatingIndex] = useState(null)
  const [compareIndex, setCompareIndex] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  const handleInsert = async () => {
    if (!inputValue || isProcessing || heap.length >= 31) return
    setIsProcessing(true)
    const val = Number(inputValue)
    setInputValue('')
    
    // Agregamos al final
    let newHeap = [...heap, val]
    setHeap([...newHeap])
    
    let currentIdx = newHeap.length - 1
    
    setAnimatingIndex(currentIdx)
    await delay(400)

    // Heapify Up
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2)
      setCompareIndex(parentIdx)
      await delay(400)
      
      if (newHeap[currentIdx] > newHeap[parentIdx]) {
        swap(newHeap, currentIdx, parentIdx)
        setHeap([...newHeap])
        setAnimatingIndex(parentIdx)
        currentIdx = parentIdx
        await delay(400)
      } else {
        break
      }
    }
    
    setCompareIndex(null)
    setAnimatingIndex(null)
    setIsProcessing(false)
  }

  const handleExtractMax = async () => {
    if (heap.length === 0 || isProcessing) return
    setIsProcessing(true)

    let newHeap = [...heap]
    
    // Resaltamos el Max (índice 0)
    setAnimatingIndex(0)
    await delay(400)
    
    if (newHeap.length === 1) {
      setHeap([])
      setAnimatingIndex(null)
      setIsProcessing(false)
      return
    }

    // El último entra a la raíz, sacamos el anterior Root
    newHeap[0] = newHeap.pop()
    setHeap([...newHeap])
    setAnimatingIndex(0) // Ahora animamos la nueva raíz
    await delay(400)

    let currentIdx = 0
    // Heapify Down
    while (true) {
      let leftIdx = 2 * currentIdx + 1
      let rightIdx = 2 * currentIdx + 2
      let largestIdx = currentIdx

      if (leftIdx < newHeap.length) {
        setCompareIndex(leftIdx)
        await delay(300)
        if (newHeap[leftIdx] > newHeap[largestIdx]) {
          largestIdx = leftIdx
        }
      }
      
      if (rightIdx < newHeap.length) {
        setCompareIndex(rightIdx)
        await delay(300)
        if (newHeap[rightIdx] > newHeap[largestIdx]) {
          largestIdx = rightIdx
        }
      }

      setCompareIndex(null)

      if (largestIdx !== currentIdx) {
        swap(newHeap, currentIdx, largestIdx)
        setHeap([...newHeap])
        setAnimatingIndex(largestIdx)
        currentIdx = largestIdx
        await delay(400)
      } else {
        break
      }
    }

    setAnimatingIndex(null)
    setIsProcessing(false)
  }

  // Convert flat array to tree levels
  const levels = []
  let count = 0
  let levelItems = 1
  while (count < heap.length) {
    levels.push(heap.slice(count, count + levelItems))
    count += levelItems
    levelItems *= 2
  }

  const getGlobalIndex = (lvlIdx, itemIdxInLvl) => {
    return Math.pow(2, lvlIdx) - 1 + itemIdxInLvl
  }

  return (
    <div className="sv-card">
      <div className="sv-header">
        <h2 className="sv-title">{title}</h2>
        <span className="sv-complexity" style={{ color: '#b388ff' }}>Max-Heap</span>
      </div>

      <div className="ds-chart ds-heap-container">
        {levels.map((levelArr, lvlIdx) => (
          <div key={lvlIdx} className="ds-heap-level">
            {levelArr.map((val, i) => {
              const gIdx = getGlobalIndex(lvlIdx, i)
              let bClass = ''
              if (gIdx === animatingIndex) bClass = 'ds-block-active'
              else if (gIdx === compareIndex) bClass = 'ds-block-comparing'
              
              return (
                <div key={i} className={`ds-block ${bClass}`}>
                  {val}
                  {gIdx === 0 && <span className="ds-pointer ds-pointer-bottom">Root</span>}
                </div>
              )
            })}
          </div>
        ))}
        {heap.length === 0 && <div className="ds-empty-msg">Empty Heap</div>}
      </div>

      <div className="sv-divider"></div>

      <div className="sv-controls ds-controls">
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Valor"
          className="ds-input"
          disabled={isProcessing}
        />
        <button className="sv-btn" onClick={handleInsert} disabled={isProcessing}>Ins</button>
        <button className="sv-btn" onClick={handleExtractMax} disabled={isProcessing}>Ext Max</button>
      </div>
    </div>
  )
}
