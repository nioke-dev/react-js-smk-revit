import { link } from "./link.js";
export function update() {
  let id = 12;
  let data = {
    pelanggan: "pelanggan axios baruu",
    alamat: "alamat axios baru",
    telp: "012209812899999",
  };
  link.put("/pelanggan/" + id, data).then((res) => {
    console.log(res);
    let tampil = `<h1>${res.data.pesan}</h1>`;
    document.querySelector("#out").innerHTML = tampil;
  });
}
