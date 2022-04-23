import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Selectable from "./Selectable";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Lyte/Selectable",
  component: Selectable,
} as ComponentMeta<typeof Selectable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Selectable> = (args) => (
  <Selectable {...args} />
);

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const eg = [
  { label: 1, content: "Option 1" },
  { label: 2, content: "Option 2" },
  { label: 3, content: "Option 3" },
];
HelloWorld.args = {
  width: 260,
  options: eg,
  _default: eg.map(({ label }) => label),
  multi: true,
  onChange: (values) => console.log(values),
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  width: 200,
  options: eg,
  _default: "b",
};
