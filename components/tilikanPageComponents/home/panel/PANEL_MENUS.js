import { TbList, TbMapPin } from "react-icons/tb";
import { IoContrastOutline } from "react-icons/io5";

const PANEL_MENUS = [
  // {
  //   id: 4,
  //   name: "Level Daerah",
  //   icon: <TbResize size={18} />,
  // },
  {
    id: 1,
    name: "Data Persebaran",
    icon: <TbList size={18} />,
  },
  {
    id: 2,
    name: "Persebaran",
    icon: <TbMapPin size={18} />,
  },
  {
    id: 3,
    name: "Tematik",
    icon: <IoContrastOutline size={16} />,
  },
];

export default PANEL_MENUS;
