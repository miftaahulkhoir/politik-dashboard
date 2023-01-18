import { Button, Col, Divider, Row, Space, Typography } from 'antd';
import { TbPlus, TbX } from 'react-icons/tb';

export default function MultiInputEditable({ listIcon, labels, setLabels }) {
  return (
    <>
      <Space
        direction="vertical"
        size={0}
        style={{
          width: '100%',
          border: '1px solid #EEEEEE',
          borderRadius: '8px',
        }}
      >
        {labels.map((label, index) => (
          <div key={index}>
            <Row
              justify="space-between"
              align="middle"
              style={{ padding: '8px 16px' }}
            >
              <Col span={21}>
                <Space>
                  {listIcon}
                  <Typography.Text
                    editable={{
                      onChange: (value) => {
                        const newLabels = [...labels];
                        newLabels[index] = value;
                        setLabels([...newLabels]);
                      },
                    }}
                  >
                    {label}
                  </Typography.Text>
                </Space>
              </Col>
              <Col span={3}>
                <Row justify="end">
                  <Button
                    type="text"
                    icon={<TbX size={20} color="red" />}
                    shape="circle"
                    onClick={() => {
                      const newLabels = labels.filter((_, i) => i !== index);
                      setLabels([...newLabels]);
                    }}
                  ></Button>
                </Row>
              </Col>
            </Row>
            {index < labels.length - 1 ? (
              <Divider style={{ margin: '0' }}></Divider>
            ) : null}
          </div>
        ))}
      </Space>
      <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
        <Col>
          <Button
            icon={<TbPlus size={16} />}
            type="primary"
            onClick={() => {
              setLabels([...labels, '']);
            }}
          >
            Tambah Opsi
          </Button>
        </Col>
      </Row>
    </>
  );
}
