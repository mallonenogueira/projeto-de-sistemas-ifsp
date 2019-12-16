import React from "react";

function TabBody({ tab, args }) {
  if (args) {
    const componentArgs = React.cloneElement(tab.component, {
      args
    });

    return <section className="tab__body">{componentArgs}</section>;
  }

  return <section className="tab__body">{tab.component}</section>;
}

export default TabBody;
