import { link } from "../Axios/link";
import React, { useState, useEffect } from "react";

const useDelete = (url) => {
  const [pesan, setPesan] = useState("");
  async function hapus(id) {
    if (window.confirm("yakin akan menghapus?")) {
      const res = await link.delete(url + id);
      setPesan(res.data.pesan);
    }
  }
  return { hapus, pesan, setPesan };
};

export default useDelete;
