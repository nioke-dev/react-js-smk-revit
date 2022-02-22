import useGet from "../Hook/useGet";
import React, { useState, useEffect } from "react";
import useDelete from "../Hook/useDelete";
import { useForm } from "react-hook-form";
import { link } from "../Axios/link";

const Menu = () => {
  const [isi] = useGet("/menu");
  const { hapus, pesan, setPesan } = useDelete("/menu/");
  const [kategori, setKategori] = useState([]);

  let no = 1;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get("/kategori");
      if (ambil) {
        setKategori(res.data);
      }
    }

    fetchData();

    return () => {
      ambil = false;
    };
  }, [kategori]);

  function simpan(data) {
    console.log(data);
    console.log(data.gambar);

    const formData = new FormData();
    formData.append("idkategori", data.idkategori);
    formData.append("menu", data.menu);
    formData.append("harga", data.harga);
    formData.append("gambar", data.gambar[0]);
    link.post("/menu", formData).then((res) => setPesan(res.data.pesan));
    reset();
  }

  return (
    <div>
      <div className="row">
        <h2>Data Menu</h2>
      </div>

      <div className="row">
        <div>
          <p>{pesan}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="kategori">
                Kategori
              </label>
              <select
                name="idkategori"
                className="form-select"
                id="kategori"
                {...register("idkategori", { required: true })}
              >
                {kategori.map((val, index) => (
                  <option key={index} value={val.idkategori}>
                    {val.kategori}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="menu">
                Menu
              </label>
              <input
                type="text"
                className="form-control"
                name="menu"
                placeholder="Menu"
                // ref={register}
                {...register("menu", { required: true })}
              />
              {errors.menu && "Kolom Menu Harus Diisi"}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="harga">
                Harga
              </label>
              <input
                type="text"
                className="form-control"
                name="harga"
                placeholder="harga"
                // ref={register}
                {...register("harga", { required: true })}
              />
              {errors.harga && "Kolom Harga harus diisi"}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="gambar">
                Gambar
              </label>
              <input
                type="file"
                className="form-control"
                name="gambar"
                // ref={register}
                {...register("gambar")}
              />
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary" name="submit" />
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Menu</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.menu}</td>
                <td>
                  <img src={val.gambar} alt="gambar" width="100px" />
                </td>
                <td>{val.harga}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hapus(val.idmenu)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
