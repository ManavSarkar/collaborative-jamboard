import React from "react";
import Utils from "../utils";
import { useNavigate } from "react-router-dom";
import { CREATE_SESSION_URL } from "../constants";

const NewSessionPage = () => {
  const navigator = useNavigate();
  const createSession = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    fetch(CREATE_SESSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // navigate to session page with id and title as query params
        navigator(`/session/${data.id}?title=${data.title}`);
      })
      .catch((err) => console.log(err));
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
