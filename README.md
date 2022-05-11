# Lyte

A collection of highly extensible React components, including Selectable, a beautiful (multi)select dropdown you've been looking for.

![showcase](https://github.com/robertzhidealx/lyte/blob/main/static/showcase.png)

## Installation

```bash
npm install @robertz65/lyte
```

## Selectable

🔘 Multiselect <br />
🔭 Full TypeScript support <br />
🌓 Dark mode (Tailwind CSS) <br />

### Import

```js
import { Selectable } from "@robertz65/lyte";
```

### Documentation

| Prop            | Type                                                                         | Requirement | Description                                                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width`         | number \| string                                                             | required    | The width of the Selectable component. Either a number corresponding to a number of pixels or `"100%"` to match the width of its parent.                                      |
| `options`       | {label: string \| number; content?: ReactNode \| string}[]                   | required    | The collection of options to select from.                                                                                                                                     |
| `defaultValue`  | string \| number \| string[] \| number[]                                     | required    | The label of the value(s) that are selected by default. When `multi` is not specified or set to `false`, `_default ` is a single string or number. Otherwise, it is an array. |
| `multi`         | boolean                                                                      | optional    | Whether Selectable can select multiple options. Defaults to `false`.                                                                                                          |
| `onChange`      | (values: {label: string \| number; content?: ReactNode \| string}[]) => void | optional    | Tracks changes to the selected options. When `multi` is not specified or set to `false`, `values` is a one-item array with the single selected option.                        |
| `allowClear`    | boolean                                                                      | optional    | Whether to show clear button to unselect all options. Defaults to `false`. Only works under `multi` mode.                                                                     |
| `allowRefill`   | boolean                                                                      | optional    | Whether to show refill button to select all options. Defaults to `false`. Only works under `multi` mode.                                                                      |
| `className`     | string                                                                       | optional    | A list of classes applied to Selectable.                                                                                                                                      |
| `menuPlacement` | `"top"` \| `"bottom"`                                                        | optional    | Whether the options menu appears above or below Selectable. Defaults to `"bottom"`. Only works under single selection mode.                                                   |

### Example Usage

```ts
import { Selectable } from "@robertz65/lyte";

const SelectableOptions = [
  { label: 1, content: "Option 1" },
  { label: 2, content: "Option 2" },
  { label: 3, content: "Option 3" },
];

const DemoComponent = () => {
  return (
    <Selectable
      width={260}
      multi
      allowClear
      allowRefill
      options={SelectableOptions}
      defaultValue={SelectableOptions.map(({ label }) => label)}
      onChange={(values) => console.log(values)}
    />
  );
};

export default DemoComponent;
```
