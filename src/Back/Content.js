import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch, useParams } from "react-router-dom";
import Kategori from "./Kategori";
import Menu from "./Menu";
import Pelanggan from "./Pelanggan";

const Content = () => {
  const { isi } = useParams();

  let tampil;

  if (isi === "kategori") {
    tampil = <Kategori />;
  }
  if (isi === "menu") {
    tampil = <Menu />;
  }
  if (isi === "pelanggan") {
    tampil = <Pelanggan />;
  }

  return <div>{tampil}</div>;
};

export default Content;
