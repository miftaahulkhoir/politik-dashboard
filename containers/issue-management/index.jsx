import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Button, Modal, Input, ColorPicker, Upload, Form, Select } from "antd";
import { TbPlus } from "react-icons/tb";

const dummyIssue = [
  {
    id: "toz59tr7hw",
    label: "Bencana",
    value: "bencana",
  },
  {
    id: "iqoo2i5z95",
    label: "Kriminalitas",
    value: "kriminalitas",
  },
  {
    id: "2e3fjte8eu",
    label: "Terorisme",
    value: "terorisme",
  },
];

const subIssue = [
  {
    id: "mxkjjr0i4p",
    issue_id: "toz59tr7hw",
    label: "Abrasi",
    value: "abrasi",
  },
  {
    id: "teuomi170b",
    issue_id: "toz59tr7hw",
    label: "Banjir",
    value: "banjir",
  },
  {
    id: "6qvl2gpqn6",
    issue_id: "toz59tr7hw",
    label: "Gempa Bumi Tsunami",
    value: "gempa_bumi_tsunami",
  },
  {
    id: "mi62r7px0d",
    issue_id: "toz59tr7hw",
    label: "Gempa Bumi",
    value: "gempa_bumi",
  },
  {
    id: "7y7cwzgl7l",
    issue_id: "toz59tr7hw",
    label: "Gunung Meletus",
    value: "gunung_meletus",
  },
  {
    id: "67to16dnqt",
    issue_id: "toz59tr7hw",
    label: "Kebakaran Hutan",
    value: "kebakaran_hutan",
  },
  {
    id: "k0ul0k9km4",
    issue_id: "toz59tr7hw",
    label: "Kekeringan",
    value: "kekeringan",
  },
  {
    id: "jhiw1jstoq",
    issue_id: "toz59tr7hw",
    label: "Puting Beliung",
    value: "puting_beliung",
  },
  {
    id: "2krqkd5hjc",
    issue_id: "toz59tr7hw",
    label: "Tanah Longsor",
    value: "tanah_lognsor",
  },
  {
    id: "f1a9nuj4cg",
    issue_id: "iqoo2i5z95",
    label: "Pembunuhan",
    value: "pembunuhan",
  },
  {
    id: "8yts1pn10i",
    issue_id: "iqoo2i5z95",
    label: "Penganiayaan Berat",
    value: "penganiayaan_berat",
  },
  {
    id: "tbnalv77pq",
    issue_id: "iqoo2i5z95",
    label: "Penganiayaan Ringan",
    value: "penganiayaan_ringan",
  },
  {
    id: "xr4g1pfa19",
    issue_id: "iqoo2i5z95",
    label: "KDRT",
    value: "kdrt",
  },
  {
    id: "v8anptthcg",
    issue_id: "iqoo2i5z95",
    label: "Perkosaan",
    value: "perkosaan",
  },
  {
    id: "r9axkje5eo",
    issue_id: "iqoo2i5z95",
    label: "Pencabulan",
    value: "pencabulan",
  },
  {
    id: "8sdp9decf3",
    issue_id: "iqoo2i5z95",
    label: "Penculikan",
    value: "penculikan",
  },
  {
    id: "0gablr8dmn",
    issue_id: "iqoo2i5z95",
    label: "Mempekerjakan Anak di Bawah Umur",
    value: "mempekerjakan_anak_di_bawah_umur",
  },
  {
    id: "xmftrehpyu",
    issue_id: "iqoo2i5z95",
    label: "Pencurian dengan Kekerasan",
    value: "pencurian_dengan_kekerasan",
  },
  {
    id: "qxoebpwk8p",
    issue_id: "iqoo2i5z95",
    label: "Pencurian dengan Kekerasan Senpi",
    value: "pencurian_dengan_kekerasan_senpi",
  },
  {
    id: "caxepez74a",
    issue_id: "iqoo2i5z95",
    label: "Pencurian dengan Kekerasan Sajam",
    value: "pencurian_dengan_kekerasan_sajam",
  },
  {
    id: "52bibqzyj7",
    issue_id: "iqoo2i5z95",
    label: "Pencurian",
    value: "pencurian",
  },
  {
    id: "au46co5vmb",
    issue_id: "iqoo2i5z95",
    label: "Pencurian dengan Pemberatan",
    value: "pencurian_dengan_pemberatan",
  },
  {
    id: "nwfc3u2mdt",
    issue_id: "iqoo2i5z95",
    label: "Pencurian Kendaraan Bermotor",
    value: "tanah_lognsor",
  },
  {
    id: "9azqpt6jba",
    issue_id: "iqoo2i5z95",
    label: "Pencurian/Penghancuran Barang",
    value: "pencurian_penghancuran_barang",
  },
  {
    id: "ef7wfp3ln0",
    issue_id: "iqoo2i5z95",
    label: "Pembakaran dengan Sengaja",
    value: "pembakaran_dengan_sengaja",
  },
  {
    id: "pkx9cr2120",
    issue_id: "iqoo2i5z95",
    label: "Penadahan",
    value: "penadahan",
  },
  {
    id: "m0pjjsjfur",
    issue_id: "iqoo2i5z95",
    label: "Narkotika dan Psikotropika",
    value: "narkotika_dan_psikotropika",
  },
  {
    id: "p11ffqbtiv",
    issue_id: "iqoo2i5z95",
    label: "Penipuan/Perbuatan Curang",
    value: "penipuan_perbuatan_curang",
  },
  {
    id: "f69bh5qo0h",
    issue_id: "iqoo2i5z95",
    label: "Penggelapan",
    value: "penggelapan",
  },
  {
    id: "zfnw4oqyyl",
    issue_id: "iqoo2i5z95",
    label: "Korupsi",
    value: "korupsi",
  },
  {
    id: "d2k9zyayxb",
    issue_id: "iqoo2i5z95",
    label: "Terhadap Ketertiban Umum",
    value: "terhadap_ketertiban_umum",
  },
  {
    id: "q21sq3nizn",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 1",
    value: "terorisme_1",
  },
  {
    id: "1aq0hweavn",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 2",
    value: "terorisme_2",
  },
  {
    id: "bjuay4exnh",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 3",
    value: "terorisme_3",
  },
  {
    id: "ac8knks2ym",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 4",
    value: "terorisme_4",
  },
  {
    id: "1hd5oxxmll",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 5",
    value: "terorisme_5",
  },
  {
    id: "076gehy2ek",
    issue_id: "2e3fjte8eu",
    label: "Terorisme 6",
    value: "terorisme_6",
  },
  {
    id: "dc7hfadwgk",
    issue_id: "0p9vgw3oar",
    label: "Ini Value Sub Issue update",
    value: "ini_value_sub_issue_update",
  },
  {
    id: "t26kvb2upx",
    issue_id: "0p9vgw3oar",
    label: "Ini Sub Value Issue",
    value: "ini_sub_value_issue",
  },
];
export default function IssueManagement() {
  const [issueData, setIssueData] = useState(dummyIssue);
  const [subIssueData, setSubIssueData] = useState(subIssue);
  const [selectedSubIssue, setSelectedSubIssue] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({
    id: "toz59tr7hw",
    label: "Bencana",
    value: "bencana",
  });

  const [showModalIssue, setModalIssue] = useState(false);
  const [showModalSubIssue, setModalSubIssue] = useState(false);

  const handleModalIssue = () => setModalIssue((prev) => !prev);
  const handleModalSubIssue = () => setModalSubIssue((prev) => !prev);

  useEffect(() => {
    const filteredSubIssue = subIssueData.filter((item) => item.issue_id === selectedIssue.id);
    setSelectedSubIssue(filteredSubIssue);
  }, [selectedIssue]);

  const [formIssue] = Form.useForm();
  const [formSubIssue] = Form.useForm();

  const handleSubmitIssue = (data) => {
    const { issue } = data;
    setIssueData((prev) =>
      prev.concat({
        id: data.length,
        label: issue,
        value: issue,
      }),
    );
    handleModalIssue();
  };

  const handleSubmitSubIssue = (data) => {
    const { sub_issue, issue_id } = data;

    setSubIssueData((prev) =>
      prev.concat({
        id: data.length,
        issue_id,
        label: sub_issue,
        value: sub_issue,
      }),
    );
    handleModalSubIssue();
  };

  const AddIssueContent = ({ form }) => {
    return (
      <Form form={form} onFinish={(data) => handleSubmitIssue(data)}>
        <label>Nama Isu:</label>
        <Form.Item name="issue">
          <Input className="my-2" />
        </Form.Item>
        <label>Warna Isu:</label>
        <Form.Item name="color">
          <ColorPicker className="my-2" />
        </Form.Item>
      </Form>
    );
  };

  const AddSubIssueContent = ({ form }) => {
    return (
      <Form form={form} onFinish={handleSubmitSubIssue}>
        <label>Pilih Isu</label>
        <Form.Item name="issue_id">
          <Select className="my-2" options={issueData.map((item) => ({ label: item.label, value: item.id }))} />
        </Form.Item>
        <label>Nama Sub Isu:</label>
        <Form.Item name="sub_issue">
          <Input className="my-2" />
        </Form.Item>
        <label>Upload File:</label>
        <Form.Item name="file">
          <Upload className="my-2 flex w-full">
            <Button className="w-full">Choose file...</Button>
          </Upload>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="h-[calc(100%-48px)] w-full mt-4">
      <Modal open={showModalIssue} onOk={formIssue.submit} onCancel={handleModalIssue} title="Tambah Isu">
        <AddIssueContent form={formIssue} />
      </Modal>
      <Modal open={showModalSubIssue} onOk={formSubIssue.submit} onCancel={handleModalSubIssue} title="Tambah Sub Isu">
        <AddSubIssueContent form={formSubIssue} />
      </Modal>
      <div className="flex col w-full h-full border-t border-t-neutral-500">
        <div className="w-1/3 overflow-auto flex flex-col border-r border-r-neutral-500">
          <div className="header flex justify-between items-center bg-new-black py-3 px-8">
            <div className="text-white text-sm font-semibold">Isu</div>
            <Button icon={<TbPlus />} className="btn-primary" onClick={handleModalIssue}>
              Tambah Isu
            </Button>
          </div>
          <div key={issueData.length} className="flex flex-col px-4 py-6 cursor-pointer">
            {issueData?.map((data) => (
              <div
                className={cx("px-2 py-6 rounded", { "!bg-neutral-700 border-l-4": selectedIssue?.id === data?.id })}
                onClick={() => setSelectedIssue(data)}
              >
                <h1>{data.label}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/3 overflow-auto flex flex-col border-r border-r-neutral-500">
          <div className="header flex justify-between items-center bg-new-black py-3 px-8">
            <div className="text-white text-sm font-semibold">Sub Isu</div>
            <Button icon={<TbPlus />} className="btn-primary" onClick={handleModalSubIssue}>
              Tambah Sub Isu
            </Button>
          </div>
          <div key={selectedSubIssue.length} className="w-full h-full px-4 py-6 flex flex-col">
            {selectedSubIssue?.map((data) => (
              <div className={cx("p-2 !bg-neutral-700 mb-1 rounded")}>
                <h1>{data.label}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
