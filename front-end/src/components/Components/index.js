import React, { useState } from "react";

import Tab from "../lib/tab/Tab";
import Card from "../lib/card/Card";
import Input from "../lib/input/Input";
import Button from "../lib/button/Button";
import Spinner from "../lib/spinner/Spinner";
import Datatable from "../lib/datatable/Datatable";
import Offcanvas from "../lib/off-canvas/OffCanvas";
import Autocomplete from "../lib/autocomplete/Autocomplete";

function TeamForm() {
  const [openCanvas, setOpenCanvas] = useState(false);
  const [active, setActive] = useState("Canvas");
  const [item, setItem] = useState({
    id: "1",
    name: "Mallone Wesley Nogueira 1"
  });

  const style = { display: "flex", padding: "15px" };

  const buttonsCols = [
    { label: "Normal" },
    { disabled: true, label: "Disabled" },
    { icon: "fa-trash" },
    { label: "Icon", icon: "fa-heart" },
    { loading: true },
    { loading: true, label: "Loading" }
  ];

  const items = [
    { id: "1", name: "Mallone Wesley Nogueira 1", nickname: "Mallone" },
    { id: "2", name: "Mallone Wesley Nogueira 2", nickname: "Mallone" },
    { id: "3", name: "Mallone Wesley Nogueira 3", nickname: "Mallone" },
    { id: "4", name: "Mallone Wesley Nogueira 4", nickname: "Mallone" }
  ];

  const buttonRows = [
    {},
    { small: true },
    { primary: true },
    {
      transparent: true,
      container: { style: { ...style, background: "var(--gray-4)" } }
    }
  ];

  const handleChange = (label, changeHelper) => setActive(label);

  return (
    <div className="u-fullPadding">
      <div style={{ background: "#FFF" }}>
        <Offcanvas
          open={openCanvas}
          header={<div className="ml-4">Titulo</div>}
          footer={<Button onClick={e => setOpenCanvas(false)}>Fechar</Button>}
        ></Offcanvas>

        <Tab
          tabs={[
            {
              label: "Canvas",
              active: "Canvas" === active,
              component: (
                <span style={style}>
                  <Button onClick={e => setOpenCanvas(true)}>
                    Abrir canvas
                  </Button>
                </span>
              )
            },
            {
              label: "Spinners",
              active: "Spinners" === active,
              component: (
                <span style={style}>
                  <Spinner />
                  <Spinner small />
                </span>
              )
            },
            {
              label: "Input",
              active: "Input" === active,
              component: (
                <span style={{ ...style, flexDirection: "column" }}>
                  <div>
                    <Input value="Value" />
                  </div>
                  <div className="mt-4">
                    <Input value="Value" label="Com label e id" />
                  </div>
                  <div className="mt-4">
                    <Input value="Value" disabled label="Disabled" />
                  </div>
                  <div className="mt-4">
                    <Input value="Value" readOnly label="ReadOnly" />
                  </div>
                </span>
              )
            },
            {
              label: "Botões",
              active: "Botões" === active,
              component: (
                <div>
                  <span style={style}>
                    <Button block label="Block"></Button>
                  </span>

                  {buttonRows.map(({ container = {}, ...args }, index) => (
                    <span style={style} {...container} key={index}>
                      {buttonsCols.map(({ ...argsC }, index) => (
                        <Button {...{ ...argsC, ...args }} key={index}></Button>
                      ))}
                    </span>
                  ))}
                </div>
              )
            },
            {
              label: "Autocomplete",
              active: "Autocomplete" === active,
              component: (
                <span style={{ ...style, flexDirection: "column" }}>
                  <div>
                    <Autocomplete
                      disabled
                      items={items}
                      label="Disabled"
                      select={item}
                      onSelect={setItem}
                    />
                  </div>
                  <div className="mt-4">
                    <Autocomplete
                      label="Items"
                      items={items}
                      select={item}
                      onSelect={setItem}
                    />
                  </div>
                </span>
              )
            },
            {
              label: "Cards",
              active: "Cards" === active,
              component: (
                <div style={style} className="row">
                  <div className="col-6">
                    <Card
                      header="Titulo"
                      body="Card com footer"
                      footer={
                        <div className="u-horizontalRight">
                          <Button primary small icon="fa-pen" />
                          <Button small icon="fa-trash" />
                        </div>
                      }
                    />
                  </div>

                  <div className="col-6">
                    <Card header="Titulo" body="Card sem footer" />
                  </div>
                </div>
              )
            },
            {
              label: "Datatable",
              active: "Datatable" === active,
              component: (
                <div style={{ height: "400px" }}>
                  <Datatable
                    columns={[
                      { field: "id", name: "Código" },
                      { field: "name", name: "Nome" },
                      { field: "nickname", name: "Apelido" }
                    ]}
                    rows={[...items, ...items, ...items, ...items, ...items]}
                    id="id"
                    rowActions={{
                      pen: {
                        action: () => {}
                      }
                    }}
                  />
                </div>
              )
            }
          ]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default TeamForm;
