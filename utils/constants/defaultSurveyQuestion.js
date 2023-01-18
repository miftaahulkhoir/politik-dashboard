const defaultSurveyQuestion = {
  text: {
    input_type: 'text',
    question_name: '',
    question_subject: '',
    section: '',
    options: null,
  },
  long_text: {
    input_type: 'long_type',
    question_name: '',
    question_subject: '',
    section: '',
    options: null,
  },
  yes_no_question: {
    input_type: 'yes_no_question',
    question_name: '',
    question_subject: '',
    section: '',
    options: [
      {
        option_name: 'ya',
      },
      {
        option_name: 'tidak',
      },
    ],
  },
  radio_button: {
    input_type: 'radio_button',
    question_name: '',
    question_subject: '',
    section: '',
    options: [
      {
        option_name: 'opsi 1',
      },
      {
        option_name: 'opsi 2',
      },
    ],
  },
  dropdown: {
    input_type: 'dropdown',
    question_name: '',
    question_subject: '',
    section: '',
    options: [
      {
        option_name: 'opsi 1',
      },
      {
        option_name: 'opsi 2',
      },
    ],
  },
};

Object.freeze(defaultSurveyQuestion);
export default defaultSurveyQuestion;
