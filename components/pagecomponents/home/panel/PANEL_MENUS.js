import { TbBlur, TbList, TbMapPin, TbResize } from "react-icons/tb";

const PANEL_MENUS = [
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
    icon: <TbBlur size={18} />,
  },
  {
    id: 4,
    name: "Level Daerah",
    icon: <TbResize size={18} />,
  },
];

export default PANEL_MENUS;
