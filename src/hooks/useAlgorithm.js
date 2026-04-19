import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useAlgorithm
 * Hook principal para visualizar algoritmos paso a paso.
 *
 * @param {number[]} initialArray  - Array inicial a ordenar/recorrer
 * @param {Function} stepGenerator - Función que recibe un array y devuelve Step[]
 *
 * Cada Step tiene la forma:
 *   { arr: number[], highlight: { [index]: 'comparing'|'swapping'|'sorted'|'pivot' }, msg: string }
 *
 * Índices con 'sorted' en cualquier paso ≤ actual se mantienen (salvo que el frame actual pinte
 * comparing/swapping/pivot encima). No uses 'sorted' en pasos intermedios salvo posición ya fijada
 * de verdad; para inserción/merge usa 'inserted' / 'merged'.
 *
 * @returns {object} Estado y controles del visualizador
 */
export function useAlgorithm(initialArray, stepGenerator) {
  // ── Estado central ──────────────────────────────────────────────────────────
  const [steps, setSteps] = useState([])
  const [stepIdx, setStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(200) // ms entre pasos

  const timerRef = useRef(null)

  // ── Generar pasos al montar o cuando cambia el array ────────────────────────
  useEffect(() => {
    const generated = stepGenerator([...initialArray])
    setSteps(generated)
    setStepIdx(0)
    setIsPlaying(false)
    clearInterval(timerRef.current)
  }, [initialArray, stepGenerator])

  // ── Reproductor automático ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timerRef.current)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(timerRef.current)
  }, [isPlaying, speed, steps.length])

  // ── Controles ───────────────────────────────────────────────────────────────
  const play = useCallback(() => {
    // Si ya llegamos al final, reiniciar antes de reproducir
    if (stepIdx >= steps.length - 1) setStepIdx(0)
    setIsPlaying(true)
  }, [stepIdx, steps.length])

  const pause = useCallback(() => setIsPlaying(false), [])

  const togglePlay = useCallback(() => {
    isPlaying ? pause() : play()
  }, [isPlaying, play, pause])

  const stepForward = useCallback(() => {
    setIsPlaying(false)
    setStepIdx((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const stepBackward = useCallback(() => {
    setIsPlaying(false)
    setStepIdx((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToStep = useCallback(
    (idx) => {
      setIsPlaying(false)
      setStepIdx(Math.max(0, Math.min(idx, steps.length - 1)))
    },
    [steps.length]
  )

  const reset = useCallback(() => {
    setIsPlaying(false)
    setStepIdx(0)
  }, [])

  // ── Paso actual ─────────────────────────────────────────────────────────────
  const currentStep = steps[stepIdx] ?? {
    arr: initialArray,
    highlight: {},
    msg: '',
  }

  const highlight = currentStep.highlight || {}

  // ── Estadísticas acumuladas hasta el paso actual ─────────────────────────────
  const stats = steps.slice(0, stepIdx + 1).reduce(
    (acc, s) => {
      const vals = Object.values(s.highlight ?? {})
      if (vals.includes('comparing')) acc.comparisons++
      if (vals.includes('swapping')) acc.swaps++
      return acc
    },
    { comparisons: 0, swaps: 0 }
  )

  return {
    // Estado del frame actual
    array: currentStep.arr,
    highlight,
    message: currentStep.msg,

    // Navegación
    stepIdx,
    totalSteps: steps.length,
    isPlaying,
    isFinished: stepIdx >= steps.length - 1,
    progress: steps.length > 1 ? stepIdx / (steps.length - 1) : 0,

    // Controles
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    goToStep,
    reset,

    // Velocidad (ms) — menor = más rápido
    speed,
    setSpeed,

    // Estadísticas
    stats,
  }
}
