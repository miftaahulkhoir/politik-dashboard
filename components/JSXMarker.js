import React, { useState } from "react";
import { Marker } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

/**
 * React-leaflet marker that allows for fully interactive JSX in icon
 */
// eslint-disable-next-line react/display-name
export const JSXMarker = React.forwardRef(({ children, iconOptions, ...rest }, refInParent) => {
  const [ref, setRef] = useState();

  const node = React.useMemo(() => (ref ? ReactDOM.createRoot(ref.getElement()) : null), [ref]);

  return (
    <>
      {React.useMemo(
        () => (
          <Marker
            {...rest}
            ref={(r) => {
              setRef(r);
              if (refInParent) {
                // @ts-expect-error fowardref ts defs are tricky
                refInParent.current = r;
              }
            }}
            icon={L.divIcon(iconOptions)}
          />
        ),
        [iconOptions, refInParent, rest],
      )}
      {node?.render?.(children)}
    </>
  );
});
