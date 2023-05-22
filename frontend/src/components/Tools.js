import React from "react";
import '../styles/main.css';

import pencil from '../Icons/pencil.png';
import eraser from '../Icons/eraser.png';
import shape from '../Icons/shape.png';
import redo from '../Icons/redo.png';
import undo from '../Icons/undo.png';
import upload from '../Icons/upload.png';
import text from '../Icons/text.png';
import zoom from '../Icons/zoom.png';
import dropdown from '../Icons/dropdown.png';
import dustbin from '../Icons/dustbin.png';
import next from '../Icons/next.png';
import prev from '../Icons/previous.png';


function Tools()
{
    return(
        <div className="tools">
            <div className="un-redo">
                <button type="button" className="pen-tools">
                    <img src={undo} alt="undo"></img>
                </button>
                <button type="button" className="pen-tools redo">
                    <img src={redo} alt="redo"></img>
                </button>
            </div>

            <div className="zoomin">
                <button type="button" className="pen-tools">
                    <img src={zoom} alt="zoom"></img>
                </button>
                <button type="button" className="pen-tools">
                    <img src={dropdown} alt="dropdown"></img>
                </button>
            </div>

            <div className="pages">
                <button type="button" className="pen-tools">
                    <img src={prev} alt="dropdown"></img>
                </button>
                <div className="pageNo">1/1</div>
                <button type="button" className="pen-tools">
                    <img src={next} alt="dustbin"></img>
                </button>
            </div>
            
            <div className="rest-tools">
                <button type="button" className="pen-tools">
                    <img src={pencil} alt="pencil"></img>
                </button>
                <button type="button" className="pen-tools">
                    <img src={eraser} alt="eraser"></img>
                </button>
                <button type="button" className="pen-tools">
                    <img src={shape} alt="shape"></img>
                </button>
                <button type="button" className="pen-tools">
                    <img src={upload} alt="upload"></img>
                </button>
                <button type="button" className="pen-tools">
                    <img src={text} alt="text"></img>
                </button>

                <button type="button" className="pen-tools">
                    <img src={dustbin} alt="dustbin"></img>
                </button>
            </div>
            
        </div>
    )
}

export default Tools;
