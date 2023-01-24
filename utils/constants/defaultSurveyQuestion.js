const defaultSurveyQuestion = {
  text: {
    input_type: "text",
    question_name: "",
    question_subject: "",
    section: "",
    options: null,
  },
  long_text: {
    input_type: "long_type",
    question_name: "",
    question_subject: "",
    section: "",
    options: null,
  },
  yes_no_question: {
    input_type: "yes_no_question",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "Ya",
      },
      {
        option_name: "Tidak",
      },
    ],
  },
  radio_button: {
    input_type: "radio_button",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "Opsi 1",
      },
      {
        option_name: "Opsi 2",
      },
    ],
  },
  dropdown: {
    input_type: "dropdown",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "Opsi 1",
      },
      {
        option_name: "Opsi 2",
      },
    ],
  },
};

Object.freeze(defaultSurveyQuestion);
export default defaultSurveyQuestion;
