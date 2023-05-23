import React from 'react'
import '../styles/main.css'
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

function Tools() {
  return (
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
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
        </button>
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
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
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faShapes} />
        </button>
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faUpload} />
        </button>
        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faFont} />
        </button>

        <button type="button" className="pen-tools">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default Tools
