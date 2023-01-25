import { TbCircle } from "react-icons/tb";

import MultiInputEditable from "./MultiInputEditable";

export default function MultiRadioEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<TbCircle color="#016CEE" size={20}></TbCircle>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}
