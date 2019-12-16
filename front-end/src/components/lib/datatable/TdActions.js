import React from "react";
import Button from "../button/Button";

const actions = {
  pen: {
    icon: "fa-pen",
    small: true
  },
  trash: {
    icon: "fa-trash",
    small: true
  },
  clock: {
    icon: "fa-clock",
    small: true
  },
  eye: {
    icon: "fa-eye",
    small: true
  }
};

const handleLoading = (action, data) => {
  if (action.loadingValue) {
    return data[action.loadingValue];
  }

  return null;
};

function TdActions({ data, rowActions }) {
  if (!rowActions) {
    return null;
  }

  const keys = Object.keys(rowActions);

  return (
    <td className="datatable__td datatable__td--action">
      {keys.map((key, index) => (
        <Button
          key={index}
          {...actions[key]}
          loading={handleLoading(rowActions[key], data)}
          disabled={handleLoading(rowActions[key], data)}
          onClick={event => rowActions[key].action({ row: data, event })}
        />
      ))}
    </td>
  );
}

export default TdActions;
