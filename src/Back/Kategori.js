import React, { useState, useEffect } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import useGet from "../Hook/useGet";
import { useHistory } from "react-router-dom";

const Kategori = () => {
  const [pesan, setPesan] = useState("");
  const [idkategori, setIdkategori] = useState("");
  const [pilihan, setPilihan] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [isi] = useGet("/kategori");
  let history = useHistory();

  if (sessionStorage.getItem("level") != "admin") {
    return history.goBack();
  }

  function simpan(data) {
    if (pilihan) {
      link.post("/kategori", data).then((res) => setPesan(res.data.pesan));
    } else {
      link
        .put("/kategori/" + idkategori, data)
        .then((res) => setPesan(res.data.pesan));
      setPilihan(true);
    }
    reset();
    // fetchData();
  }

  async function hapus(id) {
    if (window.confirm("yakin akan menghapus?")) {
      const res = await link.delete("/kategori/" + id);
      setPesan(res.data.pesan);
    }
  }

  async function showData(id) {
    const res = await link.get("/kategori/" + id);
    setValue("kategori", res.data[0].kategori);
    setValue("keterangan", res.data[0].keterangan);
    setIdkategori(res.data[0].idkategori);
    setPilihan(false);
  }

  // fungsi async ini adalah semua fungsi ketika melakukan permintaan dia akan diterima oleh servernya
  // dia nanti

  let no = 1;
  return (
    <div>
      <div className="row">
        <h2>Data Kategori</h2>
      </div>
      <div className="row">
        <p>{pesan}</p>
      </div>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="kategori">
                Kategori
              </label>
              <input
                type="text"
                className="form-control"
                name="kategori"
                placeholder="kategori"
                // ref={register}
                {...register("kategori", { required: true })}
              />
              {errors.kategori && "Kolom Kategori Harus Diisi"}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="keterangan">
                keterangan
              </label>
              <input
                type="text"
                className="form-control"
                name="keterangan"
                placeholder="keterangan"
                // ref={register}
                {...register("keterangan", { required: true })}
              />
              {errors.keterangan && "Kolom Keterangan harus diisi"}
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary" name="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.keterangan}</td>
                <td>
                  <button
                    onClick={() => hapus(val.idkategori)}
                    className="btn btn-danger me-3"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => showData(val.idkategori)}
                    className="btn btn-warning"
                  >
                    Ubah
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

export default Kategori;
