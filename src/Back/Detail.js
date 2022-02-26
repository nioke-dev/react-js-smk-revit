import React, { useState } from "react";
import useGet from "../Hook/useGet";
import { useForm } from "react-hook-form";

const Detail = () => {
  let today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [awal, setAwal] = useState(today);
  const [akhir, setAkhir] = useState(today);

  const [isi] = useGet(`/detail/${awal}/${akhir}`);

  let no = 1;

  function cari(data) {
    setAwal(data.tawal);
    setAkhir(data.takhir);
  }
  return (
    <div>
      <div className="row">
        <div>
          <h2>Detail Penjualan</h2>
        </div>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(cari)}>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="awal">
                Tanggal Awal
              </label>
              <input
                type="date"
                className="form-control"
                name="tawal"
                // ref={register}
                {...register("tawal")}
              />
              {/* {errors.tawal && "Kolom Kategori Harus Diisi"} */}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="akhir">
                Tanggal Akhir
              </label>
              <input
                type="date"
                className="form-control"
                name="takhir"
                // ref={register}
                {...register("takhir")}
              />
              {/* {errors.takhir && "Kolom Kategori Harus Diisi"} */}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
      <div className="row">
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Faktur</th>
                <th>Tgl. Order</th>
                <th>Menu</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{val.idorder}</td>
                  <td>{val.tglorder}</td>
                  <td>{val.menu}</td>
                  <td>{val.hargajual}</td>
                  <td>{val.jumlah}</td>
                  <td>{val.jumlah * val.hargajual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Detail;
