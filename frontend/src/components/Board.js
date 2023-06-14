import React, { useState } from 'react'
// import '../styles/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
} from '@fortawesome/free-solid-svg-icons'



function Board() {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const [selectedColor1, setSelectedColor1] = useState('black');
  const [selectedColor2, setSelectedColor2] = useState('black');

  const [zoomLevel, setZoomLevel] = useState(100);
  const [zoomLevel1, setZoomLevel1] = useState(100);
  const [zoomLevel2, setZoomLevel2] = useState(100);
  const [zoomLevel3, setZoomLevel3] = useState(100);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
    setIsDropdownOpen2(false);
    setIsDropdownOpen3(false);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen1(false);
    setIsDropdownOpen3(false);
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsDropdownOpen1(false);
    setIsDropdownOpen2(false);
  };
  const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  };



  const handleZoomChange1 = (event) => {
    const newZoomLevel = parseInt(event.target.value);
    setZoomLevel1(newZoomLevel);
  };
  const handleZoomChange2 = (event) => {
    const newZoomLevel = parseInt(event.target.value);
    setZoomLevel2(newZoomLevel);
  };
  const handleZoomChange3 = (event) => {
    const newZoomLevel = parseInt(event.target.value);
    setZoomLevel3(newZoomLevel);
  };

  const handleZoomIn = (zoom) => {
    setZoomLevel(zoom);
    setIsDropdownOpen4(false); // Close the dropdown after selecting zoom option
  };



  const handleColorChange1 = (color) => {
    setSelectedColor1(color);
    setIsDropdownOpen1(false);
  };
  const handleColorChange2 = (color) => {
    setSelectedColor2(color);
    setIsDropdownOpen2(false);
  };



  const deleteBorad = () => {
    setIsDropdownOpen1(false);
    setIsDropdownOpen2(false);
    setIsDropdownOpen3(false);
    setIsDropdownOpen4(false);
    setSelectedColor1('black');
    setSelectedColor2('black');
    setZoomLevel(100);
    setZoomLevel1(100);
    setZoomLevel2(100);
    setZoomLevel3(100);
  }

  return (
    <div className=' w-full bg-slate-50 min-h-screen mx-2 col-span-2 text-black'>
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
          <button onClick={toggleDropdown4} type="button" className="pen-tools">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </button>
          <button onClick={toggleDropdown4} type="button" className="pen-tools">
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          {isDropdownOpen4 && (
            <div className='dropdown-content zoom'>
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
            style={{ zoom: `${zoomLevel1}%` , color: selectedColor1}}
            type="button" 
            className="pen-tools">

            <FontAwesomeIcon icon={faPencil} />
          </button>
          {isDropdownOpen1 && (
            <div className='dropdown-content pen'> 
              <input
                type="range"
                min="50"
                max="200"
                value={zoomLevel1}
                onChange={handleZoomChange1}
              />
              <div className='colors'>
                  <button onClick={() => handleColorChange1('black')} style={{ backgroundColor: 'black' }}></button>
                  <button onClick={() => handleColorChange1('#f5314b')} style={{ backgroundColor: '#f5314b' }}></button>
                  <button onClick={() => handleColorChange1('cyan')} style={{ backgroundColor: 'cyan' }}></button>
                  <button onClick={() => handleColorChange1('#31f58c')} style={{ backgroundColor: '#31f58c' }}></button>
                  <button onClick={() => handleColorChange1('#f5c131')} style={{ backgroundColor: '#f5c131' }}></button>
                  <button onClick={() => handleColorChange1('#3e31f5')} style={{ backgroundColor: '#3e31f5' }}></button>
              </div>
            </div>
      
          )}
          <button
            onClick={toggleDropdown2} 
            style={{ zoom: `${zoomLevel2}%` }} 
            type="button" 
            className="pen-tools">
            <FontAwesomeIcon icon={faEraser} />
          </button>
          {isDropdownOpen2 && (
            <div className='dropdown-content eraser'> 
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
            style={{ zoom: `${zoomLevel3}%`, color: selectedColor2 }} 
            type="button" 
            className="pen-tools">

            <FontAwesomeIcon icon={faShapes} />
          </button>
          {isDropdownOpen3 && (
            <div className='dropdown-content shapes'>
              <input
                type="range"
                min="50"
                max="200"
                value={zoomLevel3}
                onChange={handleZoomChange3}
              />
              <div className='colors'>
                  <button onClick={() => handleColorChange2('black')} style={{ backgroundColor: 'black' }}></button>
                  <button onClick={() => handleColorChange2('#f5314b')} style={{ backgroundColor: '#f5314b' }}></button>
                  <button onClick={() => handleColorChange2('cyan')} style={{ backgroundColor: 'cyan' }}></button>
                  <button onClick={() => handleColorChange2('#31f58c')} style={{ backgroundColor: '#31f58c' }}></button>
                  <button onClick={() => handleColorChange2('#f5c131')} style={{ backgroundColor: '#f5c131' }}></button>
                  <button onClick={() => handleColorChange2('#3e31f5')} style={{ backgroundColor: '#3e31f5' }}></button>
              </div>
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
      <div className="my-2 h-3/4 border-black border-2 mx-3">
          <div style={{ zoom: `${zoomLevel}%` }} ></div>
      </div>
      <div className="flex justify-center items-center my-4">
      <button className="btn btn-outline btn-error mx-4 w-36">Leave</button>
      <button className="btn btn-outline btn-info mx-4 w-40">Download <FontAwesomeIcon icon={faDownload} className='mx-1'/></button>
      <button className="btn btn-outline btn-success mx-4 w-36">Share <FontAwesomeIcon icon={faShare} className='mx-1'/></button>

      </div>
    </div>
  )
}

export default Board;
