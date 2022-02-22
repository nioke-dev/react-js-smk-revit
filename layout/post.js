import { link } from "./link.js";

export function post() {
  let data = {
    pelanggan: "pelanggan axios nurul",
    alamat: "alamat axios baru",
    telp: "012209812899999",
  };

  link.post("/pelanggan", data).then((res) => {
    console.log(res);
    let tampil = `<h1>${res.data.pesan}</h1>`;
    document.querySelector("#out").innerHTML = tampil;
  });
}
