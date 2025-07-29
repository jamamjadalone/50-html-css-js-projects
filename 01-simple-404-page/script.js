document.addEventListener('DOMContentLoaded', ()=>{
const digits = document.querySelectorAll('.digit');
digits.forEach(d => d.addEventListener('mouseover', ()=>{
d.style.color = '#FFC107';
setTimeout(()=> d.style.color = '', 300);
}));
});
