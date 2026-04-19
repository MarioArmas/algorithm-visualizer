import { useState } from 'react'
import './App.css'
import SortAlgorithms from './pages/SortAlgorithms'
import DataStructures from './pages/DataStructures'

function App() {
  const [activeTab, setActiveTab] = useState('datastructures')

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Algorithm Visualizer</h1>
        <span className="badge-demo">demo interactivo</span>
      </div>

      <div className="app-tabs">
        <button
          className={`tab-btn ${activeTab === 'datastructures' ? 'active' : ''}`}
          onClick={() => setActiveTab('datastructures')}
        >
          Estructuras de Datos
        </button>
        <button
          className={`tab-btn ${activeTab === 'sorting' ? 'active' : ''}`}
          onClick={() => setActiveTab('sorting')}
        >
          Algoritmos de Ordenamiento
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'sorting' && <SortAlgorithms />}
        {activeTab === 'datastructures' && <DataStructures />}
      </div>
    </div>
  )
}

export default App
