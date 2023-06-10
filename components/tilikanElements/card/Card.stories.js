import * as React from "react";
import Card from "./Card";

const meta = {
  title: "Data Display/Card",
  component: Card,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
export default meta;

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <h1>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi ipsum, dolorum nostrum atque laboriosam, minus odit
      necessitatibus quae voluptatum porro quo est dolore, illo accusamus a commodi nobis numquam placeat?
    </h1>
  ),
};
