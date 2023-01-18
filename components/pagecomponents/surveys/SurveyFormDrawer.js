import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultSurveyQuestion from '../../../utils/constants/defaultSurveyQuestion';
import SurveyFormCard from './SurveyFormCard';

export default function SurveyFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedSurveyId,
  apiNotification,
}) {
  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState([
    { ...defaultSurveyQuestion.text },
  ]);

  useEffect(() => {
    if (!isEdit) return;
    (async function () {
      try {
        const res = await axios.get(
          `${process.env.APP_BASEURL}api/survey/${selectedSurveyId}`
        );
        const data = res?.data?.data;
        setTitle(data?.survey_name);
        setIsActive(data?.status ? 1 : 0);
        setQuestions(data?.questions);
      } catch (error) {}
    })();
  }, [isEdit]);

  const addQuestionHandler = () => {
    setQuestions([...questions, { ...defaultSurveyQuestion.text }]);
  };

  const onClose = () => {
    setOpen(false);
  };

  const submitHandler = async () => {
    try {
      const newQuestions = questions.map((question, i) => {
        const newQuestion = question;
        newQuestion.question_number = i + 1;
        newQuestion.section = 'section1';
        newQuestion.question_subject = 'subject1';
        newQuestion.options = newQuestion?.options?.map((option, j) => {
          const newOption = option;
          newOption.value = j + 1;
          return newOption;
        });
        return newQuestion;
      });
      console.log('new quests', newQuestions);
      if (isEdit) {
        // update

        // FIXME: update ideas:
        // loop req options -> ada api update sendiri
        // loop req questions -> ada api update sendiri
        // req survey -> hanya judul
        // req status -> ada api update sendiri

        // 1. update survey name
        const survey = {
          survey_name: title,
        };

        await axios.put(
          `${process.env.APP_BASEURL}api/survey/${selectedSurveyId}`,
          survey
        );

        // // 2. update/create questions
        // const newOptions = [];
        // await Promise.all(
        //   newQuestions.forEach(async (q) => {
        //     if (q.id) {
        //       // update question
        //       await axios.put(
        //         `${process.env.APP_BASEURL}api/survey/${q.id}`,
        //         q
        //       );

        //       // menambah options yang perlu diupdate
        //       if (q.options) {
        //         q.options.forEach((o) => {
        //           o.question_id = q.id;
        //           newOptions.push(o);
        //         });
        //       }
        //       return;
        //     }
        //     // create question
        //     q.survey_id = selectedSurveyId;
        //     await axios.post(`${process.env.APP_BASEURL}api/survey`, q);
        //   })
        // );

        // // 3. update options untuk question yang sudah ada

        // console.log('options', options);
        // await Promise.all(
        //   newOptions.forEach(async (option) => {
        //     if (option.id) {
        //       // update
        //       await axios.put(
        //         `${process.env.APP_BASEURL}api/survey/${option.ques}`,
        //         survey
        //       );
        //       return;
        //     }
        //     // create
        //   })
        // );

        apiNotification.success({
          message: 'Berhasil',
          description: 'Perubahan survei telah disimpan',
        });
        setIsEdit(false);
      } else {
        // create
        const survey = {
          survey_name: title,
          status: isActive ? 1 : 0,
          questions: newQuestions || null,
        };

        const res = await axios.post(
          `${process.env.APP_BASEURL}api/survey`,
          survey
        );
        if (!res?.data?.status) throw new Error('unknown error');

        apiNotification.success({
          message: 'Berhasil',
          description: 'Survei telah ditambahkan',
        });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: 'Gagal',
        description: 'Terjadi kesalahan saat menambahkan survei',
      });
    }
  };

  return (
    <Drawer
      title={isEdit ? 'Pengubahan Survei' : 'Penambahan Survei'}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="60%"
      headerStyle={{ border: 'none', fontSize: '32px' }}
      bodyStyle={{ background: '#EEEEEE', padding: '0px', overflowX: 'hidden' }}
      stye
    >
      <Row gutter={32} style={{ padding: '24px', background: 'white' }}>
        <Col span={16}>
          <Typography.Title level={5}>Judul Survei</Typography.Title>
          <Input.TextArea
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Typography.Title level={5}>Status</Typography.Title>
          <Space>
            <Typography.Text>Tidak Aktif</Typography.Text>
            <Switch checked={isActive} onChange={setIsActive} />
            <Typography.Text>Aktif</Typography.Text>
          </Space>
        </Col>
      </Row>
      {questions.map((question, index) => (
        <SurveyFormCard
          key={index}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
        />
      ))}
      <Row justify="space-between" style={{ margin: '24px' }}>
        <Button onClick={addQuestionHandler}>Tambah pertanyaan</Button>
        <Button type="primary" onClick={submitHandler}>
          Simpan survei
        </Button>
      </Row>
    </Drawer>
  );
}
