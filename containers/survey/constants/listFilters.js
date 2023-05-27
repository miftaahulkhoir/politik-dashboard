import { TbBlur, TbList, TbMapPin, TbResize } from "react-icons/tb";

const LIST_FILTERS = [
  // {
  //   id: 1,
  //   name: "Data Persebaran",
  //   icon: <TbList size={18} />,
  // },
  {
    id: 1,
    name: "Persebaran",
    value: "persebaran",
    icon: <TbMapPin size={18} />,
  },
  {
    id: 2,
    name: "Tematik",
    value: "tematik",
    icon: <TbBlur size={18} />,
  },
  // {
  //   id: 3,
  //   name: "Level Daerah",
  //   icon: <TbResize size={18} />,
  // },
];

export default LIST_FILTERS;
