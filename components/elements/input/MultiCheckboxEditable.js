import { TbSquare } from 'react-icons/tb';
import MultiInputEditable from './MultiInputEditable';

export default function MultiCheckboxEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<TbSquare color="#016CEE" size={20}></TbSquare>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}
