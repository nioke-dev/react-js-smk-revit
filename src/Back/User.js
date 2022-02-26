import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGet from "../Hook/useGet";
import Modal from "react-modal";
import { link } from "../Axios/link";

const User = () => {
  let no = 1;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [mopen, setMopen] = useState(false);

  const [isi] = useGet(`/user`);

  function tambah() {
    setMopen(true);
  }

  async function simpan(data) {
    let user = {
      email: data.email,
      password: data.password,
      level: data.level,
      relasi: "back",
    };

    const res = await link.post("/register", user);
    setMopen(false);
  }

  async function status(id) {
    const data = isi.filter((val) => val.id === id);

    let stat = 0;
    if (data[0].status === 1) {
      stat = 0;
    } else {
      stat = 1;
    }

    let kirim = {
      status: stat,
    };
    const res = await link.put("/user/" + id, kirim);
  }
  return (
    <div>
      <Modal
        isOpen={mopen}
        onRequestClose={() => setMopen(false)}
        // onAfterOpen={isiForm}
        style={{
          overlay: {
            background: "transparent !important",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
          },
        }}
      >
        <div className="row">
          <h2>Input data user</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Type Your Email"
                  // ref={register}
                  {...register("email", { required: true })}
                />
                {errors.email && "Kolom Email Harus Diisi"}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Type Your Password Here"
                  // ref={register}
                  {...register("password", { required: true })}
                />
                {errors.password && "kolom password harus diisi"}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="level">
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  className="form-select"
                  {...register("level", { required: true })}
                >
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="koki">Koki</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="button"
                  className="btn btn-danger me-2"
                  name="batal"
                  value="Batal"
                  onClick={() => setMopen(false)}
                />
                <button type="submit" className="btn btn-primary" name="submit">
                  Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div>
          <h2>Menu User</h2>
        </div>
      </div>
      <div className="row">
        <div>
          <input
            onClick={() => tambah()}
            type="submit"
            value="Tambah"
            className="btn btn-primary"
          />
        </div>
      </div>
      <div className="row">
        <div>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No.</th>
                <th>User</th>
                <th>level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{val.email}</td>
                  <td>{val.level}</td>
                  <td>
                    {val.status === 1 ? (
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={() => status(val.id)}
                      >
                        AKTIF
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={() => status(val.id)}
                      >
                        BANNED
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
