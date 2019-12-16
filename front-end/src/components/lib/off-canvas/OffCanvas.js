import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./OffCanvas.scss";
import { CSSTransition } from "react-transition-group";

function Offcanvas({ open, children, header, footer, body }) {
  const [rootEl, setRootEl] = useState(null);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!rootEl) {
      setRootEl(document.querySelector("#off-canvas-root"));
    }
  }, [open, rootEl]);

  if (!rootEl) {
    return null;
  }

  return ReactDOM.createPortal(
    <CSSTransition
      onEnter={() => setVisible(true)}
      onExited={() => setVisible(false)}
      in={open}
      timeout={300}
      classNames="off-canvas__animation"
    >
      <div>
        {visible && (
          <div className="off-canvas">
            <div className="off-canvas__opacity"></div>
            <div className="off-canvas__content">
              <header className="off-canvas__header">{header}</header>
              <div className="off-canvas__body">{children || body}</div>
              <footer className="off-canvas__footer">{footer}</footer>
            </div>
          </div>
        )}
      </div>
    </CSSTransition>,
    rootEl
  );
}

export default Offcanvas;
