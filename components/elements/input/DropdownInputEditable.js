import MultiInputEditable from './MultiInputEditable';

export default function DropdownInputEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<></>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}
