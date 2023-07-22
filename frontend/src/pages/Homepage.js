import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { nanoid } from "nanoid";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Body() {
  const [Id, setId] = useState("");
  // const [Username, setUsername] = useState("");
  const navigate = useNavigate();
  const [editable, setEditable] = useState(true);

  const createRoom = (e) => {
    e.preventDefault();
    let id = nanoid(10);
    setId(id);
    setEditable(false);
    toast.success("Link Created");
    toast.success("Joining Room " + id);
    setTimeout(() => {
      joinRoom(id);
    }, 3000);
  };
  const joinRoom = (id) => {
    if (!Id && !id) {
      return toast.error("Join Id Required");
    }
    id = id || Id;

    navigate(`/session/${id}`, {});
  };
  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="flex justify-end">
        <ToastContainer />
      </div>

      <div className="card w-fit  shadow-xl ">
        <div className="card-body">
          <h2 className="card-title my-2 text-black">Session is here!</h2>

          <input
            type="text"
            placeholder="Enter a Link"
            className="input input-bordered w-full max-w-xs my-1 bg-slate-200 text-black"
            onChange={(e) => setId(e.target.value)}
            value={Id}
            readOnly={!editable}
          />
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary my-4"
              onClick={() => {
                if (editable) {
                  joinRoom();
                }
              }}
            >
              {editable ? "Join Session" : "Joining"}
              {/* loading icon */}{" "}
              <svg
                className={`animate-spin h-5 w-5 ${
                  editable ? "hidden" : "inline-block"
                } text-white`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
                ></path>
              </svg>
            </button>
            {editable ? (
              <button className="btn btn-primary my-4" onClick={createRoom}>
                Create New Session
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
