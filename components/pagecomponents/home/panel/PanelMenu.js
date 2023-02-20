import { Button, Space, Tooltip } from "antd";
import React from "react";

import styles from "./panel.module.css";
import PANEL_MENUS from "./PANEL_MENUS";

function PanelMenu({ activeMenus = [], setActiveMenus }) {
  return (
    <div className={styles.menu_container}>
      <Space direction="vertical">
        {/* <Button icon={<TbMapPin size={18} />} type="primary" onClick={() => setActiveMenu(1)} />
        <Button icon={<TbBlur size={18} />} type="primary" onClick={() => setActiveMenu(2)} /> */}
        {PANEL_MENUS.map((menu) => {
          const active = activeMenus?.includes(menu?.id);
          return (
            <Tooltip key={menu.id} title={menu.name} placement="right" zIndex={9999}>
              <Button
                icon={menu.icon}
                type={active ? "primary" : "default"}
                onClick={() =>
                  setActiveMenus((prevMenus) => {
                    if (!active) return [...prevMenus, menu.id];
                    const newMenus = prevMenus.filter((m) => m != menu.id);
                    return [...newMenus];
                  })
                }
              />
            </Tooltip>
          );
        })}
      </Space>
    </div>
  );
}

export default PanelMenu;
