import { Space, Tooltip } from "antd";
import React, { useContext } from "react";
import cx from "classnames";

import PANEL_MENUS from "../constants/listFilters";
import { SurveyMapContext } from "../SurveyMapContext";

const SurveyMenu = () => {
  const { selectedSurveyMenu, setSelectedSurveyMenu } = useContext(SurveyMapContext);
  return (
    <div>
      <Space direction="vertical">
        {PANEL_MENUS.map((menu) => {
          return (
            <Tooltip key={menu.id} title={menu.name} placement="right" zIndex={9999}>
              <div
                className={cx(
                  "h-full cursor-pointer p-2 text-white rounded-md text-sm font-bold flex items-center justify-center",
                  {
                    "bg-primary": menu.id === selectedSurveyMenu?.id,
                    "bg-new-black border-[1px] border-white": menu.id !== selectedSurveyMenu?.id,
                  },
                )}
                onClick={() => {
                  if (menu.id === selectedSurveyMenu?.id) return setSelectedSurveyMenu(undefined);
                  setSelectedSurveyMenu(menu);
                }}
              >
                {menu.icon}
              </div>
            </Tooltip>
          );
        })}
      </Space>
    </div>
  );
};

export default SurveyMenu;
