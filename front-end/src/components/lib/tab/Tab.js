import React from "react";
import TabHeader from "./TabHeader";
import TabBody from "./TabBody";
import "./Tab.scss";

function accept(activeLabel, tabs) {
  return tabs.map(tab => ({
    ...tab,
    active: tab.label === activeLabel
  }));
}

function getActive(tabs) {
  return tabs.find(({ active }) => active) || tabs[0];
}

function Tab(props) {
  const { disabled, style, name, tabs, onChange, args } = props;
  const active = getActive(tabs);
  const onChangeInternal = (label, ...args) => onChange(label, accept, ...args);

  return (
    <section disabled={disabled} style={style} name={name} className="tab">
      <TabHeader tabs={tabs} onChange={onChangeInternal} />
      <TabBody tab={active} args={args} />
    </section>
  );
}

export default Tab;
