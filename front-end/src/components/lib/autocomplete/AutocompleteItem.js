import React from "react";
import DropdownItem from "./DropdownItem";

const AutocompleteItem = ({ item, onChooseItem }) => (
  <DropdownItem>
    <div
      tabIndex="0"
      className="autocomplete__item"
      onClick={event => onChooseItem({ item, event })}
      onKeyDown={event => {
        if (event.keyCode === 13) onChooseItem({ item, event });
      }}
    >
      {item.name}
    </div>
  </DropdownItem>
);

export default AutocompleteItem;
