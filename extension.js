// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Status bar item to display the line count
let statusBarItem;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Activating "size-project" extension');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'size-project.calculateSize';
    statusBarItem.tooltip = 'Click to recalculate project size';
    context.subscriptions.push(statusBarItem);

    // Register the command to calculate project size
    let disposable = vscode.commands.registerCommand('size-project.calculateSize', () => {
        updateLineCount();
    });
    context.subscriptions.push(disposable);

    // Calculate initial line count
    updateLineCount();

    // Set up file system watcher to update count when files change
    const watcher = vscode.workspace.createFileSystemWatcher('**/*.*');
    
    // Update on file changes
    watcher.onDidChange(() => updateLineCount());
    watcher.onDidCreate(() => updateLineCount());
    watcher.onDidDelete(() => updateLineCount());
    
    context.subscriptions.push(watcher);
}

/**
 * Count non-empty lines in the project and update the status bar
 */
async function updateLineCount() {
    try {
        const lineCount = await countNonEmptyLines();
        statusBarItem.text = `$(file-code) ${lineCount} lines`;
        statusBarItem.show();
    } catch (error) {
        console.error('Error updating line count:', error);
        statusBarItem.text = '$(error) Error counting lines';
        statusBarItem.show();
    }
}

/**
 * Count non-empty lines in all files in the workspace
 * @returns {Promise<number>} The total number of non-empty lines
 */
async function countNonEmptyLines() {
    // Check if there's an open workspace
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
        return 0;
    }

    const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let totalLines = 0;

    // Get all files in the workspace
    const files = await getAllFiles(workspaceRoot);

    // Process each file
    for (const file of files) {
        try {
            // Skip node_modules, .git, and other common directories to avoid performance issues
            if (shouldSkipFile(file)) {
                continue;
            }

            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');
            
            // Count non-empty lines
            const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;
            totalLines += nonEmptyLines;
        } catch (error) {
            console.warn(`Error reading file ${file}:`, error);
            // Continue with other files
        }
    }

    return totalLines;
}

/**
 * Get all files in a directory recursively
 * @param {string} dir Directory to scan
 * @returns {Promise<string[]>} Array of file paths
 */
async function getAllFiles(dir) {
    const files = [];

    // Use vscode API to get files to respect .gitignore and other exclusions
    const pattern = new vscode.RelativePattern(dir, '**/*');
    const uris = await vscode.workspace.findFiles(pattern, '**/node_modules/**');
    
    for (const uri of uris) {
        files.push(uri.fsPath);
    }

    return files;
}

/**
 * Check if a file should be skipped
 * @param {string} filePath Path to the file
 * @returns {boolean} True if the file should be skipped
 */
function shouldSkipFile(filePath) {
    const skipPatterns = [
        /node_modules/,
        /\.git/,
        /\.vscode/,
        /\.DS_Store/,
        /\.idea/,
        /dist/,
        /build/,
        /\.png$/,
        /\.jpg$/,
        /\.jpeg$/,
        /\.gif$/,
        /\.svg$/,
        /\.ico$/,
        /\.woff$/,
        /\.ttf$/,
        /\.eot$/
    ];

    return skipPatterns.some(pattern => pattern.test(filePath));
}

// This method is called when your extension is deactivated
function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = {
    activate,
    deactivate,
    // Export for testing
    countNonEmptyLines
};