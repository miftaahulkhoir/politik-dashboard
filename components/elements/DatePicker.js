import { useRef } from "react";

export default function DatePicker(props) {
  const ref = useRef();
  return (
    <input type="date" className="form-control" ref={ref} onFocus={() => (ref.current.type = "date")} onBlur={() => (ref.current.type = "text")} {...props} />
  );
}
