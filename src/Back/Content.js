import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch, useParams } from "react-router-dom";
import Detail from "./Detail";
import Kategori from "./Kategori";
import Menu from "./Menu";
import Order from "./Order";
import Pelanggan from "./Pelanggan";
import User from "./User";

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
  if (isi === "order") {
    tampil = <Order />;
  }
  if (isi === "detail") {
    tampil = <Detail />;
  }
  if (isi === "user") {
    tampil = <User />;
  }

  return <div>{tampil}</div>;
};

export default Content;
