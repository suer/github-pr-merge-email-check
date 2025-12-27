let emailPattern = '';

chrome.storage.sync.get(['emailPattern'], (result) => {
  emailPattern = result.emailPattern || '';
  startMonitoring();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.emailPattern) {
    emailPattern = changes.emailPattern.newValue || '';
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
  if (!emailPattern) {
    confirmButton.disabled = false;
    confirmButton.style.opacity = '1';
    confirmButton.style.cursor = 'pointer';
    confirmButton.removeAttribute('title');
    return;
  }

  let regex;
  try {
    regex = new RegExp(emailPattern);
  } catch (e) {
    confirmButton.disabled = false;
    confirmButton.style.opacity = '1';
    confirmButton.style.cursor = 'pointer';
    confirmButton.removeAttribute('title');
    return;
  }

  const isValid = regex.test(selectedEmail);
  if (isValid) {
    confirmButton.disabled = false;
    confirmButton.style.opacity = '1';
    confirmButton.style.cursor = 'pointer';
    confirmButton.removeAttribute('title');
  } else {
    confirmButton.disabled = true;
    confirmButton.style.opacity = '0.5';
    confirmButton.style.cursor = 'not-allowed';
    confirmButton.setAttribute('title', `Email does not match pattern: ${emailPattern}`);
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
