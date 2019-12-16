import React, { useState } from "react";
import "./Aside.scss";
import Navbar from "./Navbar";
import Button from "../lib/button/Button";

function Aside() {
  const [openAside, setOpenAside] = useState(true);

  return (
    <aside className={`aside ${openAside ? "aside--expanded" : ""}`}>
      <header className="aside__header">
        <span className="aside__logo">Fisiotime</span>
        <Button
          transparent
          big
          icon={`fa-angle-double-${openAside ? "left" : "right"}`}
          onClick={() => setOpenAside(!openAside)}
        ></Button>
      </header>

      <Navbar expanded={openAside} />
    </aside>
  );
}

export default Aside;
