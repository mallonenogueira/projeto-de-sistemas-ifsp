import React from "react";
import TabItem from "./TabItem";

function Tab({ tabs, onChange }) {
  return (
    <header className="tab__header">
      <ul className="tab__list">
        {tabs.map(tab => (
          <TabItem {...tab} onClick={onChange} key={tab.label} />
        ))}
      </ul>
    </header>
  );
}

export default Tab;
