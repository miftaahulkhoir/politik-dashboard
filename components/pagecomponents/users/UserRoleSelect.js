import { Menu } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function UserRoleSelect({ currentUser, activeLevel, setActiveLevel }) {
  const [occupations, setOccupations] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/occupations`)
      .then((res) => {
        setOccupations([...res.data.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  useEffect(() => {
    setActiveLevel(currentUser?.occupation?.level + 1);
  }, [currentUser, setActiveLevel]);

  const filteredOccupations = useMemo(() => {
    return occupations.filter((o) => o.level > currentUser.occupation?.level);
  }, [currentUser.occupation?.level, occupations]);

  const items = filteredOccupations.map(
    (occupation) => {
      return {
        // key: occupation?.id,
        label: occupation?.name,
        key: occupation?.level,
      };
    },
    [filteredOccupations],
  );

  const onClick = (e) => {
    setActiveLevel(Number(e?.key));
  };

  return <Menu mode="horizontal" onClick={onClick} items={items} selectedKeys={[String(activeLevel)]} />;
}
