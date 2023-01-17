import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { TbPlus, TbSearch } from 'react-icons/tb';

export default function SurveySearchBar({
  filterSearchHandler,
  filterActiveHandler,
  filterDateHandler,
  addSurveyHandler,
}) {
  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Pencarian"
              prefix={<TbSearch />}
              onChange={filterSearchHandler}
            />
          </Col>
          <Col span={8}>
            <Select
              defaultValue="-1"
              style={{ width: '100%' }}
              onChange={filterActiveHandler}
              options={[
                {
                  value: '-1',
                  label: 'Semua',
                },
                {
                  value: '1',
                  label: 'Aktif',
                },
                {
                  value: '0',
                  label: 'Tidak aktif',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Tanggal"
              onChange={filterDateHandler}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type="primary" onClick={addSurveyHandler}>
          Tambah Survei
        </Button>
      </Col>
    </Row>
  );
}
