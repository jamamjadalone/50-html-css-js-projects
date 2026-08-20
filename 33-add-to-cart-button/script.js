const cartBtn = document.getElementById('cartBtn');
const feedback = document.getElementById('feedback');

let added = false;
cartBtn.addEventListener('click', () => {
  if (added) return;
  added = true;
  cartBtn.classList.add('added');
  feedback.textContent = 'Item added to cart!';
  setTimeout(() => {
    cartBtn.classList.remove('added');
    feedback.textContent = '';
    added = false;
  }, 2500);
});