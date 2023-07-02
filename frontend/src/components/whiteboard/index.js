import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const Whiteboard = () => {
  const canvasRef = useRef(null)
  const socketRef = useRef(null)
  const contextRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('black')
  const [currentSize, setCurrentSize] = useState(2)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 0.8
    canvas.height = window.innerHeight * 0.8

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    contextRef.current = context

    socketRef.current = io.connect('http://localhost:8080')

    socketRef.current.on('draw', ({ x, y, prevX, prevY, color, size }) => {
      drawLine(context, x, y, prevX, prevY, color, size, false)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)

    setDrawing(true)
    setUndoStack((prevStack) => [
      ...prevStack,
      contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      ),
    ])
    setRedoStack([])
    socketRef.current.emit('startDrawing', {
      x: offsetX,
      y: offsetY,
      color: currentColor,
      size: currentSize,
    })
  }

  const draw = ({ nativeEvent }) => {
    if (!drawing) return

    const { offsetX, offsetY } = nativeEvent
    const { offsetX: prevX, offsetY: prevY } = nativeEvent
    drawLine(
      contextRef.current,
      offsetX,
      offsetY,
      prevX,
      prevY,
      currentColor,
      currentSize,
      true,
    )

    socketRef.current.emit('draw', {
      x: offsetX,
      y: offsetY,
      prevX,
      prevY,
      color: currentColor,
      size: currentSize,
    })
  }

  const drawLine = (context, x, y, prevX, prevY, color, size, emit) => {
    context.beginPath()
    context.moveTo(prevX, prevY)
    context.lineTo(x, y)
    context.strokeStyle = color
    context.lineWidth = size
    context.stroke()
    if (emit) {
      socketRef.current.emit('draw', { x, y, prevX, prevY, color, size })
    }
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setDrawing(false)
  }

  const handleColorChange = (event) => {
    setCurrentColor(event.target.value)
  }

  const handleSizeChange = (event) => {
    setCurrentSize(parseInt(event.target.value))
  }

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1]
      setUndoStack((prevStack) => prevStack.slice(0, prevStack.length - 1))
      setRedoStack((prevStack) => [
        ...prevStack,
        contextRef.current.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        ),
      ])
      contextRef.current.putImageData(lastAction, 0, 0)
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastAction = redoStack[redoStack.length - 1]
      setRedoStack((prevStack) => prevStack.slice(0, prevStack.length - 1))
      setUndoStack((prevStack) => [
        ...prevStack,
        contextRef.current.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        ),
      ])
      contextRef.current.putImageData(lastAction, 0, 0)
    }
  }

  const handleClear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )
    setUndoStack([])
    setRedoStack([])
    socketRef.current.emit('clear')
  }

  return (
    <div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="range"
          id="size"
          min="1"
          max="20"
          value={currentSize}
          onChange={handleSizeChange}
        />
      </div>
      <div>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  )
}

export default Whiteboard
