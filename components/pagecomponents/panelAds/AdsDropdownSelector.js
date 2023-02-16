import { Button, Card, Col, Modal, Row, Select } from "antd";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX } from "react-icons/tb";

import biddingTypeFormatter from "../../../utils/helpers/biddingTypeFormatter";
import { deleteUser } from "../../../utils/services/users";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

function getLabel(ads) {
  const name = ads.campaign.name;
  return `${name}`;
}

export default function UserDataTable({
  datas,
  setSelectedAdsID,
  value,
  gProfile,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
  apiNotification,
  users,
  setUsers,
}) {
  const options = useMemo(() => datas.map((data) => ({ value: data.campaign.id, label: getLabel(data) })), [datas]);

  return (
    <Select
      style={{ width: "100%" }}
      showSearch
      placeholder="Pilih iklan"
      optionFilterProp="children"
      value={value}
      onChange={(value, option) => {
        setSelectedAdsID(value);
      }}
      filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
      options={options}
    />
  );
}
