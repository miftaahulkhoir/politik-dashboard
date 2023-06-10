import * as React from "react";
import YesNoQuestion from "./YesNoQuestion";

const meta = {
  title: "Data Entry/YesNoQuestion",
  component: YesNoQuestion,
};
export default meta;

const Template = () => {
  const [labels, setLabels] = React.useState(["Iya", "Tidak"]);

  return <YesNoQuestion labels={labels} setLabels={setLabels} />;
};

export const Default = Template.bind({});
