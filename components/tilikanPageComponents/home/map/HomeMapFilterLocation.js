import { Button, Card, Select, Space } from "antd";

export default function HomeMapFilterLocation({
  className,
  regencies,
  districts,
  villages,
  regency,
  district,
  village,
  setRegency,
  setDistrict,
  setVillage,
}) {
  return (
    <Card size="small" title="Lokasi" className={className}>
      <Space direction="vertical">
        <Select
          showSearch
          placeholder="Kabupaten/kota"
          value={regency}
          onChange={(value) => {
            setRegency(value);
            setDistrict(null);
            setVillage(null);
          }}
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          options={regencies?.map((regency) => ({ label: regency.name, value: regency.id }))}
        />
        <Select
          showSearch
          placeholder="Kecamatan"
          value={district}
          onChange={(value) => {
            setDistrict(value);
            setVillage(null);
          }}
          disabled={!regency}
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          options={districts?.map((district) => ({ label: district.name, value: district.id }))}
        />
        <Select
          showSearch
          placeholder="Desa/kelurahan"
          value={village}
          onChange={(value) => {
            setVillage(value);
          }}
          disabled={!district}
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          options={villages?.map((village) => ({ label: village.name, value: village.id }))}
        />
        <Button
          size="small"
          type="link"
          onClick={() => {
            setRegency(null);
            setDistrict(null);
            setVillage(null);
          }}
        >
          Hapus filter
        </Button>
      </Space>
    </Card>
  );
}
