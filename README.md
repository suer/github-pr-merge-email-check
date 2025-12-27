# GitHub PR Merge Email Check

A Chrome extension that validates commit email addresses against a configurable regular expression pattern before allowing Pull Request merges on GitHub.

## Features

- Monitors GitHub Pull Request merge confirmation screens
- Validates the selected commit email against a custom regex pattern
- Disables the "Confirm merge" button when email doesn't match the pattern
- Easy configuration through extension options page

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension directory

## Usage

1. Click the extension icon and select "Options" (or right-click the icon and choose "Options")
2. Enter a regular expression pattern for valid email addresses
3. Click "Save Settings"
4. Navigate to any GitHub Pull Request
5. Click "Merge pull request" and enter commit details
6. The "Confirm merge" button will be disabled if the selected commit email doesn't match your pattern

## Configuration Examples

### Match specific domain
```
.*@example\.com$
```
Matches any email ending with `@example.com`

### Match multiple users
```
^(user1|user2)@.*
```
Matches emails starting with `user1@` or `user2@`

### Match multiple domains
```
.*@(company1|company2)\.com$
```
Matches emails from `company1.com` or `company2.com`

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
3. When the email selector changes, it validates against the stored regex pattern
4. If validation fails, it disables the confirm button and adds visual feedback

## License

MIT
