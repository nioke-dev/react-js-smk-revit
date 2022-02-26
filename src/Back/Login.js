import React, { useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [pesan, setPesan] = useState("");

  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const gettoken = () => sessionStorage.getItem("token");

  async function simpan(data) {
    const res = await link.post("/login", data);
    //   .then((res) => setPesan(res.data.pesan));
    let token = await res.data.token;
    let email = await res.data.data.email;
    let level = await res.data.data.level;

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("level", level);
    sessionStorage.setItem("token", token);
    reset();
    if (gettoken() != "undefined") {
      history.push("/admin");
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="row">
        <div className="mx-auto col-lg-6 mt-5">
          <div>{pesan}</div>
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Email Anda"
                {...register("email", { required: true })}
              />
              {errors.email && "kolom email harus diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                placeholder="Password Anda"
                {...register("password", { required: true })}
              />
              {errors.password && "kolom password harus diisi"}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
