import React from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Menu = ({ topBarConfig }) => {
  return (
    <>
      <Sidebar />
      <TopBar {...topBarConfig} />
    </>
  );
};

export default Menu;
