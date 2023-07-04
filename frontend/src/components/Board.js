import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import '../styles/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import whiteBoard from './whiteBoard'

import io from 'socket.io-client'

import {
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faEraser,
  faFont,
  faMagnifyingGlassPlus,
  faPencil,
  faRedo,
  faShapes,
  faTrash,
  faUndo,
  faUpload,
  faDownload,
  faShare,
  faSquare,
  faCircle,
  faRectangleAd,
  faMinus,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'

var colorPen = 'black',
  zoomval = 100
let shapeDr = 'pen'
function Board() {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false)
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false)
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false)

  const [selectedColor1, setSelectedColor1] = useState('black')
  const [currentShape, setCurrentShape] = useState('pen')
  // const [selectedColor2, setSelectedColor2] = useState('black');

  const [zoomLevel, setZoomLevel] = useState(100)
  const [zoomLevel1, setZoomLevel1] = useState(100)
  const [zoomLevel2, setZoomLevel2] = useState(100)
  const [zoomLevel3, setZoomLevel3] = useState(100)

  const notoggleDropdown = () => {
    setIsDropdownOpen1(false)
    setIsDropdownOpen2(false)
    setIsDropdownOpen3(false)
  }

  const toggleDropdown1 = () => {
    colorPen = 'black'
    zoomval = 100
    shapeDr = 'pen'
    setCurrentShape('pen')
    setIsDropdownOpen1(!isDropdownOpen1)
    setIsDropdownOpen2(false)
    setIsDropdownOpen3(false)
  }
  const toggleDropdown2 = () => {
    colorPen = 'white'
    // zoomval = 500;
    shapeDr = 'eraser'
    setCurrentShape('eraser')
    setIsDropdownOpen2(!isDropdownOpen2)
    setIsDropdownOpen1(false)
    setIsDropdownOpen3(false)
  }
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3)
    setIsDropdownOpen1(false)
    setIsDropdownOpen2(false)
  }
  const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4)
  }

  const handleZoomChange1 = (event) => {
    zoomval = parseInt(event.target.value)
    shapeDr = 'pen'
    setCurrentShape('pen')
    const newZoomLevel = parseInt(event.target.value)
    setZoomLevel1(newZoomLevel)
  }
  const handleZoomChange2 = (event) => {
    zoomval = parseInt(event.target.value) + 5000
    shapeDr = 'eraser'
    setCurrentShape('eraser')
    const newZoomLevel = parseInt(event.target.value)
    setZoomLevel2(newZoomLevel)
  }
  const handleZoomChange3 = (event) => {
    const newZoomLevel = parseInt(event.target.value)
    setZoomLevel3(newZoomLevel)
  }

  const handleZoomIn = (zoom) => {
    setZoomLevel(zoom)
    setIsDropdownOpen4(false) // Close the dropdown after selecting zoom option
  }

  const handleColorChange1 = (color) => {
    colorPen = color
    setSelectedColor1(color)
    setIsDropdownOpen1(false)
  }

  const deleteBorad = () => {
    setIsDropdownOpen1(false)
    setIsDropdownOpen2(false)
    setIsDropdownOpen3(false)
    setIsDropdownOpen4(false)
    setSelectedColor1('black')
    setZoomLevel(100)
    setZoomLevel1(100)
    setZoomLevel2(100)
    setZoomLevel3(100)
  }

  const canvasRef = useRef(null)
  const colorsRef = useRef(null)
  const socketRef = useRef()
  const bsize = useRef(null)

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current
    const test = colorsRef.current
    const context = canvas.getContext('2d')

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName('color')
    console.log(colors, 'the colors')
    console.log(test)
    // set the current color
    const current = {
      color: 'black',
    }

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1]
    }

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false)
    }
    let drawing = false

    // ------------------------------- create the drawing ----------------------------
    console.log(colorPen)
    const drawLine = (x0, y0, x1, y1, color, size, emit) => {
      context.beginPath()

      context.moveTo(x0, y0)
      context.lineTo(x1, y1)
      context.strokeStyle = color
      context.lineWidth = 2 * (size / 100)
      context.stroke()
      context.closePath()

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        size,
        shape: shapeDr,
      })
    }

    const drawRectangle = (x0, y0, x1, y1, color, size, emit) => {
      context.beginPath()
      context.rect(x1, y1, x0 - x1, y0 - y1)
      context.strokeStyle = color
      context.lineWidth = 2 * (size / 100)
      context.stroke()
      const w = canvas.width
      const h = canvas.height

      if (emit) {
        socketRef.current.emit('drawing', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color,
          size,
          shape: shapeDr,
        })
      }
    }

    const drawCircle = (x0, y0, x1, y1, color, size, emit) => {
      const radius = Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2) / 2
      context.beginPath()
      context.arc((x0 + x1) / 2, (y0 + y1) / 2, radius, 0, 2 * 3.14)
      context.strokeStyle = color
      context.lineWidth = 2 * (size / 100)
      context.stroke()

      const w = canvas.width
      const h = canvas.height
      if (emit) {
        socketRef.current.emit('drawing', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color,
          size,
          shape: shapeDr,
        })
      }
    }

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      notoggleDropdown()
      drawing = true
      current.x = e.clientX || e.touches[0].clientX
      current.y = e.clientY || e.touches[0].clientY
      current.x1 = e.clientX || e.touches[0].clientX
      current.y1 = e.clientY || e.touches[0].clientY
    }

    const onMouseMove = (e) => {
      if (!drawing) {
        return
      }
      if (shapeDr === 'pen' || shapeDr === 'eraser') {
        drawLine(
          current.x,
          current.y,
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY,
          colorPen,
          zoomval,
          true,
        )
      }
      current.x = e.clientX || e.touches[0].clientX
      current.y = e.clientY || e.touches[0].clientY
    }

    const onMouseUp = (e) => {
      console.log(shapeDr)
      if (!drawing) {
        return
      }

      drawing = false
      if (shapeDr === 'pen' || shapeDr === 'eraser') {
        drawLine(
          current.x,
          current.y,
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY,
          colorPen,
          zoomval,
          true,
        )
      } else if (shapeDr === 'line') {
        drawLine(
          current.x1,
          current.y1,
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY,
          colorPen,
          zoomval,
          true,
        )
      } else if (shapeDr === 'rectangle') {
        drawRectangle(
          current.x1,
          current.y1,
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY,
          colorPen,
          zoomval,
          true,
        )
      } else if (shapeDr === 'circle') {
        drawCircle(
          current.x1,
          current.y1,
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY,
          colorPen,
          zoomval,
          true,
        )
      }
    }

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime()
      return function () {
        const time = new Date().getTime()

        if (time - previousCall >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mouseout', onMouseUp, false)
    canvas.addEventListener('mousemove', throttle(onMouseMove, 5), false)

    // Touch support for mobile devices
    // canvas.addEventListener('touchstart', onMouseDown, false);
    // canvas.addEventListener('touchend', onMouseUp, false);
    // canvas.addEventListener('touchcancel', onMouseUp, false);
    // canvas.addEventListener('touchmove', throttle(onMouseMove, 5), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = bsize.current.offsetWidth
      canvas.height = bsize.current.offsetHeight
    }

    window.addEventListener('resize', onResize, false)
    onResize()

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width
      const h = canvas.height
      console.log(data, 'the data')
      drawLine(
        data.x0 * w,
        data.y0 * h,
        data.x1 * w,
        data.y1 * h,
        data.color,
        data.size,
      )
    }

    socketRef.current = io.connect('http://localhost:8080')
    socketRef.current.on('drawing', onDrawingEvent)
  }, [])

  return (
    <div className=" w-full bg-slate-50 min-h-screen mx-2 col-span-2 text-black">
      <div
        ref={bsize}
        id="container"
        className="my-2 h-5/6 border-black border-2 mx"
      >
        <canvas
          style={{
            zoom: `${zoomLevel}%`,
          }}
          id="canvas"
          ref={canvasRef}
          className="whiteboard "
        />

        <div className="tools">
          <div className="un-redo">
            <button type="button" className="pen-tools ">
              <FontAwesomeIcon icon={faUndo} />
            </button>

            <button type="button" className="pen-tools redo">
              <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>

          <div className="zoomin">
            <button
              onClick={toggleDropdown4}
              type="button"
              className="pen-tools"
            >
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </button>
            <button
              onClick={toggleDropdown4}
              type="button"
              className="pen-tools"
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {isDropdownOpen4 && (
              <div className="dropdown-content zoom">
                <button onClick={() => handleZoomIn(75)}>75%</button>
                <button onClick={() => handleZoomIn(100)}>100%</button>
                <button onClick={() => handleZoomIn(150)}>150%</button>
                <button onClick={() => handleZoomIn(200)}>200%</button>
              </div>
            )}
          </div>

          <div className="pages">
            <button type="button" className="pen-tools">
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <div className="pageNo">1/1</div>
            <button type="button" className="pen-tools">
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>

          <div className="rest-tools">
            <button
              onClick={toggleDropdown1}
              style={{ zoom: `${zoomLevel1}%`, color: selectedColor1 }}
              type="button"
              className={'pen-tools'}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className={
                  currentShape === 'pen' ? 'bg-gray-400 p-2 rounded-lg' : ''
                }
              />
            </button>
            {isDropdownOpen1 && (
              <div className="dropdown-content pen">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoomLevel1}
                  onChange={handleZoomChange1}
                />
                <div className="colors">
                  <button
                    onClick={() => handleColorChange1('black')}
                    style={{ backgroundColor: 'black' }}
                  ></button>
                  <button
                    onClick={() => handleColorChange1('#f5314b')}
                    style={{ backgroundColor: '#f5314b' }}
                  ></button>
                  <button
                    onClick={() => handleColorChange1('cyan')}
                    style={{ backgroundColor: 'cyan' }}
                  ></button>
                  <button
                    onClick={() => handleColorChange1('#31f58c')}
                    style={{ backgroundColor: '#31f58c' }}
                  ></button>
                  <button
                    onClick={() => handleColorChange1('#f5c131')}
                    style={{ backgroundColor: '#f5c131' }}
                  ></button>
                  <button
                    onClick={() => handleColorChange1('#3e31f5')}
                    style={{ backgroundColor: '#3e31f5' }}
                  ></button>
                </div>
              </div>
            )}
            <button
              onClick={toggleDropdown2}
              style={{ zoom: `${zoomLevel2}%` }}
              type="button"
              className="pen-tools"
            >
              <FontAwesomeIcon
                icon={faEraser}
                className={
                  currentShape === 'eraser' ? 'bg-gray-400 rounded-lg p-2' : ''
                }
              />
            </button>
            {isDropdownOpen2 && (
              <div className="dropdown-content eraser">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoomLevel2}
                  onChange={handleZoomChange2}
                />
              </div>
            )}
            <button
              onClick={toggleDropdown3}
              style={{ zoom: `${zoomLevel3}%` }}
              type="button"
              className="pen-tools"
            >
              <FontAwesomeIcon icon={faShapes} />
            </button>
            {isDropdownOpen3 && (
              <div className={'dropdown-content shapes'}>
                {/* three different shapes to chose pen, rectangle, circle */}
                <button
                  onClick={() => {
                    shapeDr = 'line'
                    setCurrentShape('line')
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className={
                      currentShape === 'line'
                        ? 'bg-gray-400 p-2 rounded-lg'
                        : ''
                    }
                  />
                </button>
                <button
                  onClick={() => {
                    shapeDr = 'rectangle'
                    setCurrentShape('rectangle')
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquare}
                    className={
                      currentShape === 'rectangle'
                        ? 'bg-gray-400 p-2 rounded-lg'
                        : ''
                    }
                  />
                </button>
                <button
                  onClick={() => {
                    console.log(currentShape)
                    shapeDr = 'circle'
                    setCurrentShape('circle')
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={
                      currentShape === 'circle'
                        ? 'bg-gray-400 p-2 rounded-lg'
                        : ''
                    }
                  />
                </button>
              </div>
            )}
            <button type="button" className="pen-tools">
              <FontAwesomeIcon icon={faUpload} />
            </button>
            <button type="button" className="pen-tools">
              <FontAwesomeIcon icon={faFont} />
            </button>

            <button onClick={deleteBorad} type="button" className="pen-tools">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>

        {/* <div ref={colorsRef} className="colors">
              <div className="color black" />
              <div className="color red" />
              <div className="color green" />
              <div className="color blue" />
              <div className="color yellow" />
            </div> */}
      </div>
      {/* <canvas 
      onClick={notoggleDropdown} 
      className="whiteBoard"

        id='canvas'
        width={1000}
        height={950}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        >
      </canvas> */}

      <div className="flex justify-center items-center my-4">
        <button className="btn btn-outline btn-error mx-4 w-36">Leave</button>
        <button className="btn btn-outline btn-info mx-4 w-40">
          Download <FontAwesomeIcon icon={faDownload} className="mx-1" />
        </button>
        <button className="btn btn-outline btn-success mx-4 w-36">
          Share <FontAwesomeIcon icon={faShare} className="mx-1" />
        </button>
      </div>
    </div>
  )
}

export default Board
