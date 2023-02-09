import { Button } from "antd";
import { TbMenu } from "react-icons/tb";

export default function MobileNavbarToggler({ setActive }) {
  return <Button type="text" shape="circle" size="large" icon={<TbMenu size={24} />} onClick={() => setActive(true)} />;
}
