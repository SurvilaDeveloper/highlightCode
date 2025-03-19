# HighlightCode

## Overview
`HighlightCode` is a React component that highlights code syntax in an editor or viewer. It supports multiple programming languages and allows customization of themes, font size, and dimensions.

## Features
- Syntax highlighting for HTML, PHP, CSS, JavaScript, and TypeScript.
- Supports both `dark` and `light` themes.
- Allows custom themes.
- Adjustable width, height, and font size.

## Installation
To use this component in your project, import it as follows:

```tsx
import HighlightCode from "./highlightCode";
```

## Usage
```tsx
<HighlightCode
    code={`const x = 10;`}
    language="ts"
    theme="dark"
    width="100%"
    height="auto"
    fontSize="14px"
/>
```

## Props
| Prop          | Type                          | Description |
|--------------|-----------------------------|-------------|
| `code`       | `string`                      | The source code to be highlighted. |
| `language`   | `"html" | "php" | "css" | "js" | "ts"` | The programming language of the code. |
| `theme`      | `"light" | "dark"`          | The color theme for the syntax highlighting. Defaults to `dark`. |
| `width`      | `string`                      | The width of the component (e.g., `"500px"`, `"100%"`). |
| `height`     | `string`                      | The height of the component (e.g., `"300px"`, `"auto"`). |
| `fontSize`   | `string`                      | The font size of the displayed code. |
| `customerTheme` | `Theme`                     | A custom theme to override the default colors. |

## Custom Themes
The component supports custom themes, which can be passed via the `customerTheme` prop. A theme should have the following structure:

```tsx
const myCustomTheme: Theme = {
    container: {
        display: "flex",
        backgroundColor: "#282c34",
        color: "#abb2bf",
        fontFamily: "Consolas, monospace",
        borderRadius: "8px",
        padding: "10px",
        overflowX: "auto",
        width: "100%",
        height: "100%"
    },
    ts: {
        keyword: { color: "#c678dd" },
        function: { color: "#61afef" },
        string: { color: "#98c379" },
        comment: { color: "#5c6370" }
    }
};

<HighlightCode code={`const x = 10;`} language="ts" customerTheme={myCustomTheme} />;
```

## Author
Gabriel Survila
surviladeveloper@gmail.com

## License
This project is licensed under the MIT License.

## Contributing
Feel free to submit issues or contribute via pull requests!

