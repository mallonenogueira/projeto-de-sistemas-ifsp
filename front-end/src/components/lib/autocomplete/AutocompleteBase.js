import React, { useEffect, useState } from "react";

import AutocompleteLayout from "./AutocompleteLayout";

function AutocompleteBase({
  items,
  label,
  loading,
  disabled,
  select,
  onSelect,
  onClear,
  onChange,
  onShow,
  onClose
}) {
  const [search, setSearch] = useState("");
  const [buttonValue, setButton] = useState("open");
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState();

  useEffect(() => {
    if (select) {
      setText(select.name);
      setButton("fa-times");
    } else {
      setText(search);
      setButton("fa-list");
    }
  }, [text, select, search]);

  function handleChange(value, { event }) {
    if (!select) {
      setSearch(value);
      if (onChange) onChange({ value, event });
    }
  }

  function handleSelect({ item, inputElement }) {
    setSearch("");
    if (onSelect) onSelect(item);
    inputElement.current.focus();
  }

  function handleClear({ inputElement }) {
    setSearch("");
    if (onClear) onClear();
    if (!onClear && onSelect) onSelect(null);
    inputElement.current.focus();
  }

  function handleBlur({ element }) {
    setTimeout(() => {
      if (element.current && element.current.querySelector(":focus")) {
        return;
      }

      setHidden(true);
      if (onClose) onClose();
    }, 0);
  }

  function handleFocus() {
    setHidden(false);
  }

  function handleShow({ inputElement }) {
    if (onShow) onShow({ value: search });
    setHidden(false);
    inputElement.current.focus();
  }

  function handleButton({ event }) {
    event.stopPropagation();
    event.preventDefault();

    if (select) handleClear(...arguments);
    else handleShow(...arguments);
  }

  return (
    <AutocompleteLayout
      items={select ? [] : items}
      value={text}
      onClear={handleClear}
      onChange={handleChange}
      onSelect={handleSelect}
      onShow={handleShow}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onButtonClick={handleButton}
      buttonValue={buttonValue}
      hiddenDropdown={hidden}
      label={label}
      disabled={disabled}
      loading={loading}
    />
    // hiddenCursor={!!select}
  );
}

export default AutocompleteBase;
