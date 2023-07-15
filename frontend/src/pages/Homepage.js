import React, { useState } from "react";
import { Link } from "react-daisyui";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Body() {
  const [Id, setId] = useState("");
  // const [Username, setUsername] = useState("");
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    setId(uuidv4());

    toast.success("Link Created");
  };
  const joinRoom = () => {
    if (!Id) {
      return toast.error("Join Id Required");
    }
    // if (!Username) {
    //   return toast.error("Username Required");
    // }
    // console.log(Username);
    navigate(`/session/${Id}`, {
      // state: {
      //   username: Username,
      //   roomID: Id,
      // },
    });
  };
  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="flex justify-end">
        <ToastContainer />
      </div>

      <div className="card w-96  shadow-xl ">
        <div className="card-body">
          <h2 className="card-title my-2 text-black">Session is here!</h2>

          <input
            type="text"
            placeholder="Enter a Link"
            className="input input-bordered w-full max-w-xs my-1 bg-slate-200 text-black"
            onChange={(e) => setId(e.target.value)}
            value={Id}
          />
          {/* <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs my-1 bg-slate-200 text-black"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
          /> */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary my-4" onClick={joinRoom}>
              Join here
            </button>
          </div>

          <Link
            className="link link-primary flex justify-end"
            onClick={createRoom}
          >
            Create New Session
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Body;
