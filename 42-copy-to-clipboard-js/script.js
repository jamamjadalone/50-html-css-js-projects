const copyButtons = document.querySelectorAll('.copy-btn');
const customInput = document.getElementById('customInput');
const customCopyBtn = document.getElementById('customCopyBtn');
const toast = document.getElementById('toast');

let toastTimer;

function showToast() {
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

async function copyText(text, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(button);
  } catch (err) {
    toast.textContent = 'Copy failed. Select the text manually.';
    toast.style.background = '#ef4444';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }
}

function setCopied(button) {
  const textSpan = button.querySelector('.btn-text');
  textSpan.textContent = 'Copied!';
  button.classList.add('copied');
  button.disabled = true;
  showToast();
  setTimeout(() => {
    textSpan.textContent = 'Copy';
    button.classList.remove('copied');
    button.disabled = false;
  }, 1800);
}

copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    copyText(button.dataset.copy, button);
  });
});

customCopyBtn.addEventListener('click', () => {
  const value = customInput.value.trim();
  if (!value) {
    toast.textContent = 'Nothing to copy. Type some text first.';
    toast.style.background = '#f59e0b';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    return;
  }
  toast.style.background = '#10b981';
  copyText(value, customCopyBtn);
});