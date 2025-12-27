const allowedEmailInput = document.getElementById('allowedEmail');
const saveButton = document.getElementById('save');
const statusDiv = document.getElementById('status');

chrome.storage.sync.get(['allowedEmail'], (result) => {
  allowedEmailInput.value = result.allowedEmail || '';
});

saveButton.addEventListener('click', () => {
  const email = allowedEmailInput.value.trim();

  chrome.storage.sync.set({ allowedEmail: email }, () => {
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

allowedEmailInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveButton.click();
  }
});
