# Publishing the Size Project Extension to VS Code Marketplace

This document provides step-by-step instructions for publishing the Size Project extension to the Visual Studio Code Marketplace.

## Prerequisites

Before you can publish the extension, you'll need:

1. **Microsoft Azure DevOps Account**: You need this to get a Personal Access Token (PAT) for publishing.
2. **Visual Studio Code Extension Manager (vsce)**: The command-line tool for managing VS Code extensions.

## Step 1: Install vsce

If you haven't already installed vsce, you can do so with npm:

```bash
npm install -g @vscode/vsce
```

## Step 2: Create a Publisher

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Sign in with your Microsoft account or create a new one
3. Create a new organization if you don't have one already
4. Go to "User settings" (top right corner) > "Personal access tokens"
5. Click "New Token"
6. Name it something like "VSCode Marketplace Publishing"
7. Set the organization to "All accessible organizations"
8. Set the expiration as desired
9. For scopes, select "Custom defined" and then check "Marketplace > Manage"
10. Click "Create" and **save the token** that is generated (you won't be able to see it again)

## Step 3: Update package.json

1. Replace "YourPublisherName" in package.json with the publisher name you want to use
2. Update the "author" field with your name or organization
3. Update the "repository" URL if you have a GitHub repository for the extension

```json
{
  "publisher": "your-publisher-name",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/size-project"
  }
}
```

## Step 4: Login to vsce

Use the Personal Access Token (PAT) you created to login to vsce:

```bash
vsce login your-publisher-name
```

When prompted, enter the PAT you saved from Step 2.

## Step 5: Package the Extension

Before publishing, you might want to create a .vsix package to test:

```bash
vsce package
```

This will create a .vsix file in your project directory.

## Step 6: Publish the Extension

Once you're ready to publish:

```bash
vsce publish
```

This will:
1. Increment the version in package.json (if you use the -p flag)
2. Create a .vsix package
3. Upload it to the VS Code Marketplace

## Step 7: Verify the Publication

1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)
2. Search for "Size Project" or your extension name
3. Verify that your extension appears and all information is correct

## Updating the Extension

When you want to update the extension:

1. Make your changes
2. Update the version in package.json
3. Update CHANGELOG.md with the changes
4. Run `vsce publish` again

## Troubleshooting

If you encounter issues during publishing:

- Make sure your PAT hasn't expired
- Verify that the publisher name in package.json matches the one you logged in with
- Check that all required fields in package.json are filled out
- Ensure your icon path is correct
- Make sure there are no validation errors in your extension

## Additional Resources

- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) in the VS Code documentation
- [vsce documentation](https://github.com/microsoft/vscode-vsce)