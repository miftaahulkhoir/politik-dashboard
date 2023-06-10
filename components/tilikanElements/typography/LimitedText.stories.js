import * as React from "react";
import LimitedText from "./LimitedText";

const meta = {
  title: "Data Display/LimitedText",
  component: LimitedText,
};
export default meta;

const Template = (args) => <LimitedText {...args} />;

// number of char in mockText: 228
const mockText =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus animi, nam autem, delectus similique voluptatibus eum et, perspiciatis provident incidunt aut! Quia asperiores eveniet culpa ullam unde alias dolore corrupti.";

export const WithElipsis = Template.bind({});
WithElipsis.args = {
  text: mockText,
};

export const NoElipsis = Template.bind({});
NoElipsis.args = {
  text: mockText,
  charLimit: mockText.length + 1,
};
