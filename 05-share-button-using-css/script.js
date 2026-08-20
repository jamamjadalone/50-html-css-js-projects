const btn = document.querySelector('.share-btn');
const wrap = document.querySelector('.share-wrap');

btn.addEventListener('click', () => {
  wrap.classList.toggle('open');
  btn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!wrap.contains(e.target)) {
    wrap.classList.remove('open');
    btn.classList.remove('active');
  }
});