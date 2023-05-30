import { Fragment, useContext, useEffect } from "react";
import SURVEYS from "../../data/surveys";
import { Listbox, Transition } from "@headlessui/react";
import { BsCaretDownFill } from "react-icons/bs";
import { SurveyMapContext } from "../../SurveyMapContext";
import SURVEY_QUESTION from "../../data/surveyQuestion";

const getLabel = (survey) => {
  if (!survey) return;
  const name = survey.survey_name;
  const createdAt = new Date(survey.created_at);
  const date = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(createdAt);

  return `${name} (${date})`;
};

const inputTypes = ["yes_no_question", "radio_button", "dropdown"];

const ListSurveys = () => {
  const {
    selectedSurveyQuestion,
    setSelectedSurveyQuestion,
    tempSelectedSurvey,
    setTempSelectedSurvey,
    selectedSurvey,
    setSelectedSurvey,
    setSelectedProvince,
    setSelectedKabkot,
    setKabkotGeom,
  } = useContext(SurveyMapContext);
  const listBoxButtonText =
    tempSelectedSurvey || selectedSurvey ? getLabel(tempSelectedSurvey ?? selectedSurvey) : "Pilih Survey";

  useEffect(() => {
    if (selectedSurvey) setTempSelectedSurvey(selectedSurvey);
  }, [selectedSurvey, setTempSelectedSurvey]);

  return (
    <div className="flex flex-col gap-4">
      <Listbox
        value={tempSelectedSurvey}
        onChange={(value) => setTempSelectedSurvey(SURVEYS.find((survey) => survey.id === value))}
      >
        <div className="relative mt-1 w-full">
          <Listbox.Button
            className="relative w-full cursor-pointer text-sm bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2"
            title={listBoxButtonText}
          >
            <span className="block truncate text-white font-bold">{listBoxButtonText}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsCaretDownFill className="h-3 w-3 text-white" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-new-black-secondary border-[1px] border-white text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {SURVEYS.map((survey) => (
                <Listbox.Option
                  key={survey.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                      active && "font-bold"
                    } hover:bg-gray-50 hover:text-new-black-secondary`
                  }
                  value={survey.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {getLabel(survey)}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {tempSelectedSurvey && (
        <div className="flex flex-col gap-4 overflow-auto max-h-[calc(100vh-380px)]">
          {tempSelectedSurvey?.questions
            ?.filter((question) => inputTypes.includes(question.input_type))
            ?.map((question) => (
              <label
                htmlFor={question.question_id}
                className="flex gap-2 cursor-pointer items-center"
                key={question.question_id}
              >
                <input
                  type="checkbox"
                  id={question.question_id}
                  name="survey_question"
                  checked={selectedSurveyQuestion?.id === question.question_id}
                  onChange={() => {
                    if (selectedSurveyQuestion?.id === question.question_id) {
                      setSelectedProvince({});
                      setSelectedKabkot({});
                      setKabkotGeom({});
                      return setSelectedSurveyQuestion(undefined);
                    }
                    setSelectedSurvey(tempSelectedSurvey);
                    setSelectedSurveyQuestion(SURVEY_QUESTION[tempSelectedSurvey.id].questions[question.question_id]);
                  }}
                />
                <span>{question.question_name}</span>
              </label>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListSurveys;
