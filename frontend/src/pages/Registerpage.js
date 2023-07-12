import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { REGISTER_URL } from "../constants";

function Registerpage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.cpassword) {
      toast.error("password not matching");
      // alert("password not matching")
      return;
    }
    fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log(result);

        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Registration Unsuccessful");
        toast.error(err.toString());
        // console.log(err);
      });
  };
  return (
    <div>
      <div className="flex justify-end">
        <ToastContainer />
      </div>
      <div>
        <div className="w-full min-h-screen  bg-slate-200 flex justify-center items-center ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="my-2 mx-3 text-black font-light text-lg">
              Register Here
            </h1>
            <div className="flex justify-center items-center">
              <div className="card card-compact flex bg-slate-50 w-96 shadw-xl ">
                <div className="card-body">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full max-w-xs bg-slate-100 my-2 mx-2 text-black"
                    {...register("name")}
                  />
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered w-full max-w-xs bg-slate-100 my-2 mx-2 text-black"
                    {...register("email")}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full max-w-xs bg-slate-100 my-2 mx-2 text-black"
                    {...register("password")}
                  />
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered w-full max-w-xs bg-slate-100 my-2 mx-2 text-black"
                    {...register("cpassword")}
                  />
                  <div className="card-actions max-w-full flex items-center justify-around pt-10">
                    <button
                      className="link link-primary"
                      onClick={() => navigate("/login")}
                    >
                      Already Registered ? Login Here
                    </button>

                    <button type="submit" className="btn btn-primary my-2">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
