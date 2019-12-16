import React from "react";
import "./Autocomplete.scss";

import AutocompleteBase from "./AutocompleteBase";

function localFilter(value, items) {
  value = value.toUpperCase();

  return items.filter(item =>
    item.name
      .split(" ")
      .filter(s => s.toUpperCase().startsWith(value))
      .join("")
  );
}

function Autocomplete({
  items,
  label,
  disabled,
  select,
  onSelect,
  onClear,
  onResponse,
  onFetch,
  onFetchError
}) {
  const [visibleItems, setVisibleItems] = React.useState([]);
  const [loading, setLoading] = React.useState();

  function fetch({ value }) {
    if (onFetch) {
      setLoading(true);

      onFetch(value)
        .then(data => {
          if (onResponse) {
            const i = onResponse(data);
            setVisibleItems(i);
          } else {
            setVisibleItems(data);
          }
          setLoading(false);
        })
        .catch(onFetchError);
    }
  }

  function handleChange({ value, showAll }) {
    if (!showAll && (!value || value === "" || select)) {
      setVisibleItems([]);
      return;
    }

    if (!items) {
      fetch(...arguments);
      return;
    }

    if (!items.length) {
      setVisibleItems([]);
      return;
    }

    if (!showAll) {
      items = localFilter(value, items);
    }

    setVisibleItems(items);
  }

  function handleClear() {
    setVisibleItems([]);
    if (onClear) onClear();
  }

  function handleSelect() {
    setVisibleItems([]);
    if (onSelect) onSelect(...arguments);
  }

  function handleShow(args) {
    handleChange({ ...args, showAll: !args.value || args.value === "" });
  }

  function handleClose() {
    setVisibleItems([]);
  }

  return (
    <AutocompleteBase
      items={visibleItems}
      select={select}
      onClear={onClear ? handleClear : handleSelect}
      onChange={handleChange}
      onShow={handleShow}
      onClose={handleClose}
      onSelect={handleSelect}
      label={label}
      disabled={disabled}
      loading={loading}
    />
  );
}

export default Autocomplete;
