import React from "react";
import "./App.scss";
import Aside from "./Aside/Aside";
import Components from "./Components";
import Team from "../containers/TeamContainer";
import Athlete from "../containers/AthleteContainer";
import Agility from "../containers/AgilityContainer";
import Rast from "../containers/RastContainer";
import { Route } from "react-router-dom";

// window.serialData = {
//   porta: "/dev/pts/2",
//   velocidade: 19200
// };

function App() {
  const { serialData } = window;

  const Header = !serialData ? null : (
    <div>
      <div>
        <strong>Porta:</strong> <span>{serialData.porta}</span>
      </div>
      <div>
        <strong>Velocidade:</strong> <span>{serialData.velocidade}</span>
      </div>
    </div>
  );

  return (
    <section className="root">
      <Aside />

      <section className="app">
        <header className="app__header ">{Header}</header>

        <main className="app__main ">
          <Route exact path="/" render={() => <div>Dashboard</div>} />
          <Route path="/teams" component={Team} />
          <Route path="/athletes" component={Athlete} />
          <Route path="/agility" component={Agility} />
          <Route path="/rast" component={Rast} />
          <Route path="/components" component={Components} />
        </main>
      </section>

      <div id="off-canvas-root"></div>
    </section>
  );
}

export default App;
