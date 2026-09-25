import React from "react";
import SwiperDemo from "./SwiperDemo";
import ProductList from "./ProductList";
import { CATEGORIES } from "../config";
import "../styles/home.css";

const PREVIEW_SIZE = 3;

const HomePage = () => {
  return (
    <div className="home">
      <SwiperDemo />
      <ProductList category={CATEGORIES.mens} limit={PREVIEW_SIZE} />
      <ProductList category={CATEGORIES.womens} limit={PREVIEW_SIZE} />
      <ProductList category={CATEGORIES.kids} limit={PREVIEW_SIZE} />
    </div>
  );
};

export default HomePage;
