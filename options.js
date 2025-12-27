const emailPatternInput = document.getElementById('emailPattern');
const saveButton = document.getElementById('save');
const statusDiv = document.getElementById('status');

chrome.storage.sync.get(['emailPattern'], (result) => {
  emailPatternInput.value = result.emailPattern || '';
});

saveButton.addEventListener('click', () => {
  const pattern = emailPatternInput.value.trim();

  if (pattern) {
    try {
      new RegExp(pattern);
    } catch (e) {
      showStatus('Invalid regular expression: ' + e.message, 'error');
      return;
    }
  }

  chrome.storage.sync.set({ emailPattern: pattern }, () => {
    showStatus('Settings saved successfully!', 'success');
  });
});

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = 'status ' + type;
  statusDiv.style.display = 'block';

  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}

emailPatternInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveButton.click();
  }
});
