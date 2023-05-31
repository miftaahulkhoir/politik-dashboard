import dynamic from "next/dynamic";

import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import surveys from "./data/surveys";
import surveyDetail from "./data/survey-detail";
import SurveyAnalyticHeader from "./components/SurveyAnalyticHeader";

const SurveyAnalyticChart = dynamic(() => import("./components/SurveyAnalyticChart/SurveyAnalyticChart"));

function getLabel(survey) {
  const name = survey.survey_name;
  const createdAt = new Date(survey.created_at);
  const date = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(createdAt);

  return `${name} (${date})`;
}

const SurveyAnalysisContainer = () => {
  const router = useRouter();
  const [selected, setSelected] = useState();

  return (
    <DashboardLayout
      title="Survey · Patrons"
      topBarConfig={{
        isShowSearchRegion: true,
        title: "Survey",
        onClickMap: () => router.push("/survey"),
        buttonActive: "analysis",
      }}
    >
      <div className="flex flex-col mt-14 ml-[62px] p-10 bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        <span className="text-4xl font-semibold">Analisis Survei</span>
        <Listbox
          className="mt-8"
          value={selected}
          onChange={(value) => setSelected(surveyDetail.find((item) => item.id === value))}
        >
          <div className="relative mt-1 w-full">
            <Listbox.Button className="relative w-full cursor-pointer border-[1px] border-[#d9d9d9] rounded py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
              <span className="block truncate  font-bold">{selected ? getLabel(selected) : "Pilih Survei"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsCaretDownFill className="h-3 w-3 " aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-[#222222] border-[1px] border-[#d9d9d9] rounded py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {surveys.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-4  ${
                        active && "font-bold"
                      } hover:bg-gray-50 hover:text-new-black-secondary`
                    }
                    value={item.id}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {getLabel(item)}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {selected?.id ? (
          <>
            <SurveyAnalyticHeader survey={selected} />
            <SurveyAnalyticChart survey={selected} />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center flex-1">
            <img className="w-[30%] max-h-72" src="/images/people_with_up.svg" alt="select" />
            <div className="mt-4">Tolong pilih survei terlebih dahulu</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SurveyAnalysisContainer;
