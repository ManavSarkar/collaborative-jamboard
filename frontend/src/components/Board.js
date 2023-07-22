import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import "../styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faBackward,
  faCircle,
  faDownload,
  faEraser,
  faForward,
  faMinus,
  faPencil,
  faPlus,
  faShare,
  faSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import VoiceChat from "./VoiceChat";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
let shape = "pen";
function Board({ socket }) {
  const navigate = useNavigate();
  const params = useParams();
  let drawing = false;
  let current = {};

  // detect back button click
  useLayoutEffect(() => {
    window.addEventListener("popstate", () => {
      navigate(`/`);
      window.location.reload();
    });
  }, []);

  const roomID = params.id;

  const [pages, setPages] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(80);
  const [colour, setColour] = useState("#000000");
  const [currentShape, setCurrentShape] = useState("pen");

  const canvasRef = useRef(null);
  const saveToCurrentPage = (data) => {
    console.log(data, currentPage);
    setPages((prev) => {
      prev[currentPage].push(data);
      return prev;
    });
  };
  const drawLine = (x0, y0, x1, y1, color, size, emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.beginPath();

    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2 * (size / 100);
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    const w = canvas.width;
    const h = canvas.height;
    saveToCurrentPage({ x0, y0, x1, y1, color, size, shape, roomID });
    socket.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color,
      size,
      shape: shape,
      roomID: roomID,
    });
  };
  const drawRectangle = (x0, y0, x1, y1, color, size, emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.beginPath();
    context.rect(x1, y1, x0 - x1, y0 - y1);
    context.strokeStyle = color;
    context.lineWidth = 2 * (size / 100);
    context.stroke();
    const w = canvas.width;
    const h = canvas.height;
    if (emit) {
      saveToCurrentPage({ x0, y0, x1, y1, color, size, shape, roomID });
      socket.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        size,
        shape: shape,
        roomID: roomID,
      });
    }
  };

  const drawCircle = (x0, y0, x1, y1, color, size, emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const radius = Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2) / 2;
    context.beginPath();
    context.arc((x0 + x1) / 2, (y0 + y1) / 2, radius, 0, 2 * 3.14);
    context.strokeStyle = color;
    context.lineWidth = 2 * (size / 100);
    context.stroke();

    const w = canvas.width;
    const h = canvas.height;
    if (emit) {
      saveToCurrentPage({ x0, y0, x1, y1, color, size, shape, roomID });
      socket.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        size,
        shape: shape,
        roomID: roomID,
      });
    }
  };
  const loadPage = (index) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (pages[index] === undefined) {
      alert("Page not found");
      return;
    }
    pages[index].forEach((data) => {
      console.log(data);
      if (data.shape === "pen" || data.shape === "eraser") {
        drawLine(
          data.x0,
          data.y0,
          data.x1,
          data.y1,
          data.color,
          data.size,
          false
        );
      } else if (data.shape === "line") {
        drawLine(
          data.x0,
          data.y0,
          data.x1,
          data.y1,
          data.color,
          data.size,
          false
        );
      } else if (data.shape === "rectangle") {
        drawRectangle(
          data.x0,
          data.y0,
          data.x1,
          data.y1,
          data.color,
          data.size,
          false
        );
      } else if (data.shape === "circle") {
        drawCircle(
          data.x0,
          data.y0,
          data.x1,
          data.y1,
          data.color,
          data.size,
          false
        );
      }
    });
  };
  const onMouseDown = (e) => {
    drawing = true;
    current.x = e.nativeEvent.offsetX || e.touches[0].clientX;
    current.y = e.nativeEvent.offsetY || e.touches[0].clientY;
    current.x1 = e.nativeEvent.offsetX || e.touches[0].clientX;
    current.y1 = e.nativeEvent.offsetY || e.touches[0].clientY;
  };

  const onMouseMove = (e) => {
    if (!drawing) {
      return;
    }
    if (shape === "pen") {
      drawLine(
        current.x,
        current.y,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        colour,
        size,
        true
      );
    } else if (shape === "eraser") {
      drawLine(
        current.x,
        current.y,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        "white",
        size,
        true
      );
    }
    current.x = e.nativeEvent.offsetX || e.touches[0].clientX;
    current.y = e.nativeEvent.offsetY || e.touches[0].clientY;
  };
  const throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function () {
      const time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };
  const onMouseUp = (e) => {
    console.log(shape);
    if (!drawing) {
      return;
    }

    drawing = false;
    if (shape === "pen" || shape === "eraser") {
      drawLine(
        current.x,
        current.y,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        colour,
        size,
        true
      );
    } else if (shape === "line") {
      drawLine(
        current.x1,
        current.y1,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        colour,
        size,
        true
      );
    } else if (shape === "rectangle") {
      drawRectangle(
        current.x1,
        current.y1,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        colour,
        size,
        true
      );
    } else if (shape === "circle") {
      drawCircle(
        current.x1,
        current.y1,
        e.nativeEvent.offsetX || e.touches[0].clientX,
        e.nativeEvent.offsetY || e.touches[0].clientY,
        colour,
        size,
        true
      );
    }
  };

  const onMouseOut = (e) => {
    onMouseUp(e);
  };

  const onDrawingEvent = (data) => {
    if (data.roomID !== roomID) return;
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;
    data.x0 = data.x0 * w;
    data.y0 = data.y0 * h;
    data.x1 = data.x1 * w;
    data.y1 = data.y1 * h;

    saveToCurrentPage(data);

    if (data.shape === "pen" || data.shape === "eraser") {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
    } else if (data.shape === "line") {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
    } else if (data.shape === "rectangle") {
      drawRectangle(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
    } else if (data.shape === "circle") {
      drawCircle(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
    }
  };

  const clearCanvas = (emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const eraseCompletePage = (emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setPages((prev) => {
      prev[currentPage] = [];
      return prev;
    });
    if (!emit) return;
    socket.emit("eraseCompletePage", {
      roomID: roomID,
    });
  };

  const addPage = () => {
    let newPages = [...pages];
    newPages.push([]);
    setPages(newPages);
    setCurrentPage(newPages.length - 1);
    clearCanvas();

    socket.emit("newPage", {
      roomID: roomID,
    });
  };

  const incrementPage = () => {
    if (currentPage + 1 < pages.length) {
      loadPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
      socket.emit("incrementPage", {
        roomID: roomID,
      });
    }
  };
  const decrementPage = () => {
    if (currentPage - 1 >= 0) {
      loadPage(currentPage - 1);
      setCurrentPage(currentPage - 1);
      socket.emit("decrementPage", {
        roomID: roomID,
      });
    }
  };

  const downloadPages = async () => {
    let i = 0;

    let pdf = new jsPDF("l", "mm", "a4");
    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    const canvas = canvasRef.current;
    while (i < pages.length) {
      loadPage(i);
      let data = canvas.toDataURL("image/png");

      pdf.setPage(i + 1);
      pdf.addImage(data, "PNG", 0, 0, width, height);
      pdf.text(10, 10, `Page ${i + 1}`);
      if (i !== pages.length - 1) pdf.addPage();
      i++;
    }
    pdf.save("whiteboard.pdf");
    loadPage(currentPage);
  };

  useEffect(() => {
    socket.on("boardDrawing", (data) => {
      onDrawingEvent(data);
    });
    socket.on("clearCanvasListen", (data) => {
      if (data.roomID === roomID) clearCanvas(false);
    });
    socket.on("user-disconnected", (data) => {
      if (data.roomID !== roomID) return;
      toast.error(`${data.name} disconnected`);
    });
    socket.on("newPage", (data) => {
      if (data.roomID !== roomID) return;
      let newPages = [...pages];
      newPages.push([]);
      setPages(newPages);
      setCurrentPage(newPages.length - 1);
      clearCanvas();
    });
    socket.on("incrementPage", (data) => {
      if (data.roomID !== roomID) return;
      if (currentPage + 1 < pages.length) {
        loadPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    });
    socket.on("decrementPage", (data) => {
      if (data.roomID !== roomID) return;
      if (currentPage - 1 >= 0) {
        loadPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    });

    socket.on("eraseCompletePage", (data) => {
      if (data.roomID !== roomID) return;
      eraseCompletePage(false);
    });

    return () => {
      socket.off("boardDrawing");
      socket.off("clearCanvasListen");
      socket.off("user-disconnected");
      socket.off("newPage");
      socket.off("incrementPage");
      socket.off("eraseCompletePage");
      socket.off("decrementPage");
    };
  }, [socket, roomID, pages, currentPage]);

  return (
    <div
      className=" w-full bg-slate-50  mx-2 col-span-2 text-black"
      style={{
        height: "100vh",
      }}
    >
      <div className="flex justify-end">
        <ToastContainer />
      </div>
      <div
        className=" bg-slate-100 m-2 border-2 border-slate-400 rounded-lg"
        style={{
          height: "8%",
        }}
        id="tools"
      >
        <div className="h-full flex justify-evenly items-center w-full p-4">
          {/* colour picker */}
          <input
            type="color"
            value={colour}
            onChange={(event) => {
              setColour(event.target.value);
            }}
            className="h-12 w-16 rounded-sm "
          />
          {/* pen button fontawesome  */}
          <button
            className={
              "btn  btn-info m-2 w-20" +
              (currentShape === "pen" ? " btn-active" : " btn-outline")
            }
            onClick={() => {
              setCurrentShape("pen");
              shape = "pen";
            }}
          >
            <FontAwesomeIcon icon={faPencil} className="w-6 h-6" />
          </button>

          {/* eraser button */}
          <button
            className={
              "btn  btn-info m-2 w-20" +
              (currentShape === "eraser" ? " btn-active" : " btn-outline")
            }
            onClick={() => {
              setCurrentShape("eraser");
              shape = "eraser";
            }}
          >
            <FontAwesomeIcon icon={faEraser} className="w-6 h-6 " />
          </button>
          {/* rectangle button */}
          <button
            className={
              "btn  btn-info m-2 w-20" +
              (currentShape === "rectangle" ? " btn-active" : " btn-outline")
            }
            onClick={() => {
              setCurrentShape("rectangle");
              shape = "rectangle";
            }}
          >
            <FontAwesomeIcon icon={faSquare} className="w-6 h-6 " />
          </button>
          {/* circle */}
          <button
            className={
              "btn  btn-info m-2 w-20" +
              (currentShape === "circle" ? " btn-active" : " btn-outline")
            }
            onClick={() => {
              setCurrentShape("circle");
              shape = "circle";
            }}
          >
            <FontAwesomeIcon icon={faCircle} className="w-6 h-6 " />
          </button>
          {/* line */}
          <button
            className={
              "btn  btn-info m-2 w-20" +
              (currentShape === "line" ? " btn-active" : " btn-outline")
            }
            onClick={() => {
              setCurrentShape("line");
              shape = "line";
            }}
          >
            <FontAwesomeIcon icon={faMinus} className="w-6 h-6 " />
          </button>
          <div className="dropdown dropdown-bottom">
            <label
              tabIndex={0}
              className="btn btn-outline m-1 bg-slate-50 w-20 text-black normal-case"
            >
              Size
            </label>
            <select
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              style={{ cursor: "pointer" }}
              onChange={(event) => {
                setSize(event.target.value * 20);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>

          {/* clear canvas */}
          <button
            onClick={() => {
              eraseCompletePage(true);
            }}
            className="btn btn-outline btn-error w-20 m-2"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          {/* pages */}
          <div className="flex flex-row">
            <button
              onClick={decrementPage}
              className="btn btn-outline btn-primary w-16 m-2"
            >
              <FontAwesomeIcon icon={faBackward} />
            </button>
            {/* current page / total pages */}
            <div className="text-center m-auto font-bold text-black mx-4">
              {currentPage + 1}/{pages.length}
            </div>

            <button
              onClick={incrementPage}
              className="btn btn-outline btn-primary w-16 m-2"
            >
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>

          {/* add page */}
          <button
            onClick={addPage}
            className="btn btn-outline btn-success m-2 w-16 "
          >
            <FontAwesomeIcon icon={faPlus} className="h-5" />
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth * 0.65}
        height={window.innerHeight * 0.72}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={throttle(onMouseMove, 5)}
        onMouseOut={onMouseOut}
        className="border-2 border-slate-400 m-2 bg-white"
      />
      <div className="flex justify-center items-center my-4">
        <button
          className="btn btn-outline btn-error mx-4 w-36"
          onClick={() => {
            navigate("/");
            // refresh
            window.location.reload();
          }}
        >
          Leave
        </button>
        <VoiceChat socket={socket} />
        <button
          className="btn btn-outline btn-info mx-4 w-40"
          onClick={downloadPages}
        >
          Download <FontAwesomeIcon icon={faDownload} className="mx-1" />
        </button>
        <button
          className="btn btn-outline btn-success mx-4 w-36"
          onClick={() => {
            navigator.clipboard.writeText(roomID);
            toast.success("link copied");
          }}
        >
          Share <FontAwesomeIcon icon={faShare} className="mx-1" />
        </button>
      </div>
    </div>
  );
}

export default Board;
