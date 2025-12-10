import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BaseButton } from "./components/BaseButton";

function App() {
  return (
    <>
      <h1>Reactアプリケーション</h1>
      <p>このアプリケーションは、Reactの基本を学ぶためのものです。</p>
      <p>
        <Link to="/rendering">レンダリングの教材へ</Link>
      </p>
      <p>
        <Link to="/inline-style">CSSの教材へ</Link>
      </p>
      <p>
        <Link to="/css-modules">CSSモジュールの教材へ</Link>
      </p>
      <p>
        <Link to="/styled-jsx">Styled JSXの教材へ</Link>
      </p>
      <p>
        <Link to="/styled-components">Styled Componentsの教材へ</Link>
      </p>
      <BaseButton color="primary">Primary Button</BaseButton>
    </>
  );
}

export default App;
