const selectBtn = document.getElementById('selectBtn');
const options = document.getElementById('options');
const selectedLabel = document.getElementById('selectedLabel');
const result = document.getElementById('result');
const items = Array.from(options.querySelectorAll('li'));

selectBtn.addEventListener('click', () => {
  const isOpen = options.classList.toggle('open');
  selectBtn.classList.toggle('open', isOpen);
  selectBtn.setAttribute('aria-expanded', isOpen);
});

items.forEach(item => {
  item.addEventListener('click', () => {
    selectedLabel.textContent = item.textContent;
    result.textContent = 'Selected: ' + item.dataset.value;
    items.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    closeDropdown();
  });
});

function closeDropdown() {
  options.classList.remove('open');
  selectBtn.classList.remove('open');
  selectBtn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (e) => {
  if (!selectBtn.contains(e.target) && !options.contains(e.target)) {
    closeDropdown();
  }
});