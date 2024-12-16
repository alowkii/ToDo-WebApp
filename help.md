# User Guide for Creating a Custom JSON File

This guide will help you create a custom JSON file to define color schemes and priority settings for your application. Follow the structure and descriptions below to ensure the JSON file works correctly.

## JSON Structure Overview
The JSON file is divided into three main sections:

1. **Light Theme Colors**
2. **Dark Theme Colors**
3. **Priority Levels**

### Example JSON Structure
```json
{
  "light": {
    "primary": "#000000",  
    "secondary": "#808080",
    "tertiary": "#D3D3D3",  
    "quaternary": "#A9A9A9",
    "quinary": "#FFFFFF"
  },
  "dark": {
    "primary": "#2F2F2F",  
    "secondary": "#696969",
    "tertiary": "#BEBEBE",  
    "quaternary": "#8B8B8B",
    "quinary": "#FFFFFF"
  },
  "priority": {
    "high": "black",
    "medium": "grey",
    "low": "white"
  }
}
```

## Key Sections Explained

### 1. Light Theme (`"light"`)
This section defines the color scheme for the light theme. Each key represents a color category and its corresponding hexadecimal color code.

- **`primary`**: The main color, typically used for primary elements (e.g., text, buttons).
- **`secondary`**: A supporting color, often used for less prominent elements.
- **`tertiary`**: An additional color for highlights or backgrounds.
- **`quaternary`**: A softer accent color.
- **`quinary`**: A fallback or background color.

### 2. Dark Theme (`"dark"`)
This section mirrors the structure of the light theme but defines colors for the dark theme.

- Follow the same rules as the light theme.
- Ensure colors are adjusted for readability on dark backgrounds.

### 3. Priority Levels (`"priority"`)
This section assigns color values for different priority levels. Values can be color names or hexadecimal codes.

- **`high`**: Indicates a high-priority item (e.g., "black").
- **`medium`**: Indicates a medium-priority item (e.g., "grey").
- **`low`**: Indicates a low-priority item (e.g., "white").

## Tips for Customizing

1. Use a [hexadecimal color picker](https://www.color-hex.com/) to select custom colors.
2. Validate your JSON file using online JSON validators like [jsonlint.com](https://jsonlint.com/).
3. Ensure all colors provide sufficient contrast for accessibility.
4. Test the colors in both light and dark modes to ensure a seamless user experience.

## Example Use Case
If you want a lighter appearance for the light theme and more contrast for the dark theme, you can customize the JSON like this:

```json
{
  "light": {
    "primary": "#1A1A1A",  
    "secondary": "#9E9E9E",
    "tertiary": "#E0E0E0",  
    "quaternary": "#BFBFBF",
    "quinary": "#FAFAFA"
  },
  "dark": {
    "primary": "#101010",  
    "secondary": "#4F4F4F",
    "tertiary": "#9C9C9C",  
    "quaternary": "#7A7A7A",
    "quinary": "#F5F5F5"
  },
  "priority": {
    "high": "#FF0000",
    "medium": "#FFA500",
    "low": "#32CD32"
  }
}
```

By following this guide, you can effectively create and customize your JSON file to suit your application's needs.
You can find a set of recommended themes under [customThemes](https://github.com/alowkii/ToDo-WebApp/tree/main/customThemes).
