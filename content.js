let allowedEmail = '';

chrome.storage.sync.get(['allowedEmail'], (result) => {
  allowedEmail = result.allowedEmail || '';
  startMonitoring();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.allowedEmail) {
    allowedEmail = changes.allowedEmail.newValue || '';
    checkEmailAndUpdateButton();
  }
});

function startMonitoring() {
  const observer = new MutationObserver(() => {
    checkEmailAndUpdateButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  checkEmailAndUpdateButton();
}

function checkEmailAndUpdateButton() {
  const emailSelect = document.querySelector('select[aria-label="Select commit author email"]');
  if (!emailSelect) {
    return;
  }

  let confirmButton = null;
  const allButtons = document.querySelectorAll('button');

  for (const btn of allButtons) {
    const text = btn.textContent.trim();
    if (text === 'Confirm merge') {
      confirmButton = btn;
      break;
    }
  }

  if (!confirmButton) {
    return;
  }

  const selectedEmail = emailSelect.value;
  if (!allowedEmail) {
    confirmButton.disabled = false;
    confirmButton.style.opacity = '1';
    confirmButton.style.cursor = 'pointer';
    confirmButton.removeAttribute('title');
    return;
  }

  const isValid = selectedEmail === allowedEmail;
  if (isValid) {
    confirmButton.disabled = false;
    confirmButton.style.opacity = '1';
    confirmButton.style.cursor = 'pointer';
    confirmButton.removeAttribute('title');
  } else {
    confirmButton.disabled = true;
    confirmButton.style.opacity = '0.5';
    confirmButton.style.cursor = 'not-allowed';
    confirmButton.setAttribute('title', `Email must be: ${allowedEmail}`);
  }
}

const emailSelectObserver = new MutationObserver(() => {
  const emailSelect = document.querySelector('select[aria-label="Select commit author email"]');
  if (emailSelect) {
    emailSelect.addEventListener('change', checkEmailAndUpdateButton);
    emailSelectObserver.disconnect();
  }
});

emailSelectObserver.observe(document.body, {
  childList: true,
  subtree: true
});
