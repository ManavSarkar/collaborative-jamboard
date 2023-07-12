import React from "react";
import Utils from "../utils";
import { useNavigate } from "react-router-dom";

const NewSessionPage = () => {
  const navigator = useNavigate();
  const createSession = (e) => {
    e.preventDefault();
    console.log("createSessionPage");
  };
  const checkLoggedIn = async () => {
    const utils = new Utils();
    let res = await utils.checkLogin();
    if (!res) {
      navigator("/login");
    }
  };

  React.useEffect(() => {
    console.log("NewSessionPage");
  }, []);

  return (
    <div
      class="flex justify-center items-center"
      style={{
        height: "calc(100vh - 2rem)",
      }}
    >
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-black justify-center font-extrabold">
            New Session
          </h2>
          <form className="form-control" onSubmit={createSession}>
            <label className="label">
              <span className="label-text text-black font-bold">
                Session Name
              </span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full "
              placeholder="Enter the Session name....."
            />
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-info m-2" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSessionPage;
