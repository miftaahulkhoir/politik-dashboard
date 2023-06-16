import { Button, Form, Select, Upload } from "antd";

export default function FormAddFile() {
  const methods = Form.useForm();
  return (
    <Form layout="vertical" method={methods}>
      <Form.Item name="name" label="Kategori File">
        <Select
          options={[
            {
              value: "cat1",
              label: "Kategori 1",
            },
            {
              value: "cat2",
              label: "Kategori 2",
            },
            {
              value: "cat3",
              label: "Kategori 3",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="file" label="Unggah File">
        <Upload className="my-2 flex w-full">
          <Button className="w-full">Pilih file...</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}
