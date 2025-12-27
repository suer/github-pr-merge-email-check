# GitHub PR Merge Email Check

A Chrome extension that validates commit email addresses against a specified email address before allowing Pull Request merges on GitHub.

## Features

- Monitors GitHub Pull Request merge confirmation screens
- Validates the selected commit email against a configured allowed email address
- Disables the "Confirm merge" button when email doesn't match exactly
- Easy configuration through extension options page

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension directory

## Usage

1. Click the extension icon and select "Options" (or right-click the icon and choose "Options")
2. Enter the allowed email address for merge commits
3. Click "Save Settings"
4. Navigate to any GitHub Pull Request
5. Click "Merge pull request" and enter commit details
6. The "Confirm merge" button will be disabled if the selected commit email doesn't match your configured email address exactly

## Configuration Example

Enter the exact email address you want to allow:
```
user@company.com
```

Only merge commits with this exact email address will be allowed.

## Development

### Project Structure

```
.
├── manifest.json       # Extension manifest
├── content.js          # Content script for PR page monitoring
├── options.html        # Options page UI
├── options.js          # Options page logic
└── README.md          # This file
```

### How it Works

1. The content script (`content.js`) runs on all GitHub PR pages
2. It monitors the DOM for the merge confirmation form
3. When the email selector changes, it validates against the configured allowed email address
4. If validation fails (email doesn't match exactly), it disables the confirm button and adds visual feedback

## License

MIT
