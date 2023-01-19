import { Button, Space } from 'antd';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './users.module.css';

export default function UserRoleSelect({
  currentUser,
  activeLevel,
  setActiveLevel,
}) {
  const [occupations, setOccupations] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.APP_BASEURL}api/occupations`)
      .then((res) => {
        setOccupations([...res.data.data]);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setActiveLevel(currentUser?.occupation?.level + 1);
  }, [currentUser]);

  const filteredOccupations = useMemo(() => {
    return occupations.filter((o) => o.level > currentUser.occupation?.level);
  }, [occupations]);

  return (
    <Space size="middle">
      {filteredOccupations.map((occupation) => (
        <Button
          className={clsx(
            styles.button,
            activeLevel === occupation?.level ? styles.button_active : ''
          )}
          type="link"
          onClick={() => setActiveLevel(occupation?.level)}
          key={occupation?.level}
        >
          {occupation.name}
        </Button>
      ))}
    </Space>
  );
}
