import { Button, Grid, Row, Col, Select } from "antd";
import { useMemo } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";

function getLabel(socmed) {
  const name = socmed.displayName;
  const username = socmed.username;
  const platform = socmed.platform[0].toUpperCase() + socmed.platform.slice(1);

  if (socmed.platform == "twitter") {
    return `${name} (@${username}) | ${platform}`;
  } else {
    return `${name} | ${platform}`;
  }
}

export default function SocmedDropdownSelector({ socmeds, setSelectedSocmedID, value, addSocialmediaHandler }) {
  const options = useMemo(
    () => socmeds.map((socmed) => ({ value: socmed.platform, label: getLabel(socmed) })),
    [socmeds],
  );
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <Select
      style={{ width: "100%" }}
      showSearch
      placeholder="Pilih akun sosial media"
      optionFilterProp="children"
      value={value}
      onChange={(value, option) => {
        console.log("drpdown", value);
        setSelectedSocmedID(value);
      }}
      filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
      options={options}
    />
  );
}
