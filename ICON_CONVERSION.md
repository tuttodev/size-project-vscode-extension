# SVG to PNG Conversion Instructions

## Issue: SVGs can't be used as icons for VS Code extensions

When packaging a VS Code extension with `vsce package`, SVG files are not supported as icons. The error message you received:

```
SVGs can't be used as icons: images/icon.svg
```

indicates that you need to convert your icon from SVG to PNG format.

## Files to Convert

There are two SVG files in this project that should be converted to PNG:

1. **images/icon.svg** - The extension icon (required for publishing)
2. **images/screenshot.svg** - The screenshot used in README.md

## Solution

1. I've updated your `package.json` to reference `images/icon.png` instead of `images/icon.svg`.
2. The README.md already references `images/screenshot.png` instead of `images/screenshot.svg`.
3. You need to create both PNG files by converting the existing SVGs.

## How to Convert SVG to PNG

### Option 1: Using Online Converters
You can use online tools like:
- [Convertio](https://convertio.co/svg-png/)
- [CloudConvert](https://cloudconvert.com/svg-to-png)
- [SVG2PNG](https://svgtopng.com/)

### Option 2: Using Inkscape (Free Software)
1. Open your SVG file in Inkscape
2. Go to File > Export PNG Image
3. Set the export size (recommended 128x128 pixels for VS Code icons)
4. Export to `images/icon.png` in your project directory

### Option 3: Using Adobe Illustrator
1. Open your SVG file in Illustrator
2. Go to File > Export > Export As
3. Choose PNG format
4. Set the resolution and size
5. Save as `images/icon.png` in your project directory

### Option 4: Using Command Line Tools
If you have ImageMagick installed:
```bash
convert images/icon.svg images/icon.png
```

Or using librsvg:
```bash
rsvg-convert -h 128 images/icon.svg > images/icon.png
```

## After Conversion
Once you've created both PNG files:

1. **images/icon.png** - This is required for the extension to be packaged successfully
2. **images/screenshot.png** - This is needed for the README.md to display the screenshot correctly

You should be able to run `vsce package` successfully.

## VS Code Extension Icon Requirements
- Format: PNG (not SVG)
- Size: At least 128x128 pixels for the icon
- Size: Maintain the original dimensions for the screenshot (800x200)
- Background: Should look good on both light and dark backgrounds

Your current SVG designs should work well when converted to PNG.
