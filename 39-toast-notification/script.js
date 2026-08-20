const container = document.getElementById('toastContainer');
const autoDismiss = document.getElementById('autoDismiss');
const stackTop = document.getElementById('stackTop');
const buttons = document.querySelectorAll('.btn[data-type]');

const config = {
  success: { title: 'Success', icon: 'S', color: 'var(--success)' },
  error: { title: 'Error', icon: 'E', color: 'var(--error)' },
  warning: { title: 'Warning', icon: 'W', color: 'var(--warning)' },
  info: { title: 'Info', icon: 'I', color: 'var(--info)' }
};

const messages = {
  success: ['Operation completed successfully.', 'Your changes were saved.', 'All systems are running.'],
  error: ['Something went wrong. Try again.', 'Request failed. Please retry.', 'Could not reach the server.'],
  warning: ['Check your internet connection.', 'Storage is almost full.', 'This action cannot be undone.'],
  info: ['A new update is available.', 'You have a new notification.', 'Remember to save your work.']
};

function showToast(type) {
  const cfg = config[type];
  const message = messages[type][Math.floor(Math.random() * messages[type].length)];

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${cfg.icon}</span>
    <div class="toast-body">
      <div class="toast-title">${cfg.title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Dismiss">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
  container.appendChild(toast);

  if (autoDismiss.checked) {
    const id = setTimeout(() => dismissToast(toast), 4000);
    toast.dataset.timer = id;
  }
}

function dismissToast(toast) {
  if (toast.dataset.dismissing) return;
  toast.dataset.dismissing = 'true';
  clearTimeout(Number(toast.dataset.timer));
  toast.classList.add('removing');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => showToast(btn.dataset.type));
});

stackTop.addEventListener('change', () => {
  container.classList.toggle('top', stackTop.checked);
});