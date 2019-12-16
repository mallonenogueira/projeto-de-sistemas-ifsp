import React, { useRef } from "react";

import Dropdown from "./Dropdown";
import DropdownWrapper from "./DropdownWrapper";
import AutocompleteItem from "./AutocompleteItem";
import Button from "../button/Button";
import Input from "../input/Input";

function AutocompleteLayout({
  hiddenDropdown,
  items,
  value,
  onSelect,
  onClear,
  onBlur,
  onShow,
  onFocus,
  onButtonClick,
  buttonValue,
  disabled,
  loading,
  ...props
}) {
  const wrapperEl = useRef();
  const inputEl = useRef();
  const isVisible = !hiddenDropdown && items && items.length > 0;
  const params = { element: wrapperEl, inputElement: inputEl };

  function handleInputActions(event) {
    if (event.keyCode === 13 && onShow) onShow({ event, ...params });
    if (event.keyCode === 40 && onShow) onShow({ event, ...params });
  }

  function handleDefaultActions(event) {
    if (event.keyCode === 27 && onClear) onClear({ event, ...params });
  }

  function handleButton(event) {
    if (onButtonClick) onButtonClick({ event, ...params });
  }

  function handleBlur(event) {
    if (onBlur) onBlur({ event, ...params });
  }

  function handleFocus(event) {
    if (onFocus) onFocus({ event, ...params });
  }

  function handleSelect({ item, event }) {
    if (onSelect) onSelect({ item, event, ...params });
  }

  const dropdown = isVisible && (
    <Dropdown style={{ width: "calc(100% - 25px)" }}>
      {items.map(item => (
        <AutocompleteItem
          key={item.id}
          item={item}
          onChooseItem={handleSelect}
        />
      ))}
    </Dropdown>
  );

  return (
    <div className="autocomplete">
      <DropdownWrapper
        onRef={wrapperEl}
        onBlur={handleBlur}
        onKeyDown={handleDefaultActions}
      >
        <Input
          onRef={inputEl}
          value={value || ""}
          onFocus={handleFocus}
          onKeyDown={handleInputActions}
          disabled={disabled}
          {...props}
        />
        <Button
          disabled={disabled}
          loading={loading}
          small
          tabIndex="-1"
          onClick={handleButton}
          icon={buttonValue}
        />
        {dropdown}
      </DropdownWrapper>
    </div>
  );
}

export default AutocompleteLayout;
