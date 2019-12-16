import React from "react";
import Spinner from "./Spinner";

export default (...args) => (
  <div className="u-fullHeight u-fullCenter">
    <Spinner {...args} />
  </div>
);
