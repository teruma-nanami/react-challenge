import React from "react";
import styles from "./CssModules.module.scss";

export const CssModules = () => {
  const { container, title, description, button } = styles;
  return (
    <div className={container}>
      <h1 className={title}>CSSモジュール</h1>
      <p className={description}>
        CSSモジュールに関する情報をここに記述します。
      </p>
      <button className={button}>クリック me!</button>
    </div>
  );
};
