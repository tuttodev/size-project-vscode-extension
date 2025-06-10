# Size Project

A Visual Studio Code extension that shows the total number of non-empty lines of code in your project.

![Size Project Extension](images/screenshot.png)

## Features

- Displays the total number of non-empty lines of code in your project in the status bar
- Updates automatically when files are modified, created, or deleted
- Excludes common non-code files and directories (like node_modules, .git, images, etc.)
- Counts only lines that contain actual content (not empty lines)

## Installation

You can install this extension directly from the Visual Studio Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Size Project"
4. Click Install

Alternatively, you can download the VSIX file from the [releases page](https://github.com/yourusername/size-project/releases) and install it manually:

```bash
code --install-extension size-project-1.0.0.vsix
```

## Usage

Once installed, the extension automatically activates when you open a workspace. You'll see the line count in the status bar at the bottom right of your VS Code window.

The count updates automatically when:
- You modify a file
- You create a new file
- You delete a file

You can also manually recalculate the project size by clicking on the line count in the status bar.

## Performance Considerations

For very large projects, the initial calculation might take a few seconds. The extension is designed to be as efficient as possible by:

- Skipping binary files and common non-code directories
- Using VS Code's built-in file system watcher to only update when necessary
- Respecting .gitignore patterns

## Development

### Icon Conversion for Publishing
If you're planning to package and publish this extension, please refer to [ICON_CONVERSION.md](ICON_CONVERSION.md) for instructions on converting the icon from SVG to PNG format.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icon made by [Freepik](https://www.freepik.com) from [Flaticon](https://www.flaticon.com/)

## Release Notes

### 1.0.0

- Initial release
- Count non-empty lines in the project
- Display count in status bar
- Auto-update on file changes
