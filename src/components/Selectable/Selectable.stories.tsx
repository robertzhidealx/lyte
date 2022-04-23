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
  // { label: "a", content: " adsfjf" },
  // { label: "b", content: "a adsfjf" },
  { label: "a", content: "ayo what afjaldfks asdfljadfl adsfjf" },
  { label: "b", content: "ayo what afjaldfks" },
];
HelloWorld.args = {
  width: 200,
  options: eg,
  _default: eg.map(({ label }) => label),
  multi: true,
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  width: 200,
  options: eg,
  _default: "b",
};
