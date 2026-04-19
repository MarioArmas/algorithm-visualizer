import React from 'react'
import StackVisualizer from '../components/StackVisualizer'
import QueueVisualizer from '../components/QueueVisualizer'
import ArrayVisualizer from '../components/ArrayVisualizer'
import LinkedListVisualizer from '../components/LinkedListVisualizer'
import HeapVisualizer from '../components/HeapVisualizer'
import '../components/DataStructureVisualizer.css'

export default function DataStructures() {
  return (
    <>
      <div className="legend">
        <div className="legend-item"><div className="legend-color normal"></div> elemento</div>
        <div className="legend-item"><div className="legend-color comparando"></div> accesando/modificando</div>
        <div className="legend-item"><div className="legend-color ordenado"></div> punteros</div>
      </div>

      <div className="algorithms-grid">
        <ArrayVisualizer title="ARRAY" />
        <LinkedListVisualizer title="LINKED LIST" />
        <StackVisualizer title="STACK (PILA)" />
        <QueueVisualizer title="QUEUE (COLA)" />
        <HeapVisualizer title="HEAP" />
      </div>
    </>
  )
}
