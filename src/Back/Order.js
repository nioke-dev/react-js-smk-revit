import React, { useState } from "react";
import useGet from "../Hook/useGet";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { link } from "../Axios/link";

Modal.setAppElement("#root");

const Order = () => {
  let today = new Date().toISOString().slice(0, 10);

  const [mopen, setMopen] = useState(false);

  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState("");
  const [idorder, setIdorder] = useState("");

  const [awal, setAwal] = useState(today);
  const [akhir, setAkhir] = useState(today);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  function cari(data) {
    setAwal(data.tawal);
    setAkhir(data.takhir);
  }

  const [isi] = useGet(`/order/${awal}/${akhir}`);
  let no = 1;

  function filterData(id) {
    const data = isi.filter((val) => val.idorder === id);
    setPelanggan(data[0].pelanggan);
    setTotal(data[0].total);
    setIdorder(data[0].idorder);
    setMopen(true);
  }

  function isiForm() {
    setValue("total", total);
  }

  async function simpan(data) {
    let hasil = {
      bayar: data.bayar,
      kembali: data.bayar - data.total,
      status: 1,
    };

    const res = await link.put("/order/" + idorder, hasil);
    setMopen(false);
  }

  return (
    <div>
      <Modal
        isOpen={mopen}
        onRequestClose={() => setMopen(false)}
        onAfterOpen={isiForm}
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
          <h2>Pembayaran Order {pelanggan}</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="total">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="total"
                  placeholder="Total"
                  // ref={register}
                  {...register("total", { required: true })}
                />
                {errors.total && "Kolom Total Harus Diisi"}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="bayar">
                  Bayar
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="bayar"
                  placeholder="bayar"
                  // ref={register}
                  {...register("bayar", { required: true, min: total })}
                />
                {errors.bayar && "Pembayaran kurang!"}
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
                  Bayar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div>
          <h2>Data Order</h2>
        </div>
      </div>
      <div className="row">
        <div>
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
      </div>
      <div className="row">
        <div>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No.</th>
                <th>Faktur</th>
                <th>Pelanggan</th>
                <th>Tgl. Order</th>
                <th>Total</th>
                <th>Bayar</th>
                <th>Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{val.idorder}</td>
                  <td>{val.pelanggan}</td>
                  <td>{val.tglorder}</td>
                  <td>Rp. {val.total}</td>
                  <td>Rp. {val.bayar}</td>
                  <td>Rp. {val.kembali}</td>
                  <td>
                    {val.status === 0 ? (
                      <button
                        onClick={() => filterData(val.idorder)}
                        className="btn btn-sm btn-danger"
                      >
                        Belum Bayar
                      </button>
                    ) : (
                      <p>Lunas</p>
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

export default Order;
