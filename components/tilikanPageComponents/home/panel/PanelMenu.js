import { Button, Space, Tooltip } from "antd";
import React from "react";
import cx from "classnames";

import styles from "./panel.module.css";
import PANEL_MENUS from "./PANEL_MENUS";

function PanelMenu({ activeMenus = [], setActiveMenus, isMD }) {
  return (
    <div className={styles.menu_container}>
      <Space direction="vertical" className={styles.contents_container}>
        {PANEL_MENUS.map((menu) => {
          const active = activeMenus?.includes(menu?.id);
          return (
            <Tooltip key={menu.id} title={menu.name} placement="right" zIndex={9999}>
              <div
                className={cx(
                  "cursor-pointer text-white rounded-md text-sm font-bold flex items-center justify-center w-8 h-8",
                  {
                    "bg-primary": active,

                    "border-[1px] border-white": !active,
                  },
                )}
                onClick={() =>
                  setActiveMenus((prevMenus) => {
                    if (!active) {
                      if (isMD && prevMenus.length > 0) {
                        return [menu.id];
                      }
                      return [...prevMenus, menu.id];
                    }

                    const newMenus = prevMenus.filter((m) => m != menu.id);

                    return [...newMenus];
                  })
                }
              >
                {menu.icon}
              </div>
              {/* <Button
                icon={menu.icon}
                type={active ? "primary" : "default"}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() =>
                  setActiveMenus((prevMenus) => {
                    if (!active) {
                      if (isMD && prevMenus.length > 0) {
                        return [menu.id];
                      }
                      return [...prevMenus, menu.id];
                    }

                    const newMenus = prevMenus.filter((m) => m != menu.id);

                    return [...newMenus];
                  })
                }
              /> */}
            </Tooltip>
          );
        })}
      </Space>
    </div>
  );
}

export default PanelMenu;
