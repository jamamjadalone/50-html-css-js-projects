document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  
  // Add tilt effect on mouse move
  card.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  // Reset when mouse leaves
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    card.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      card.style.transition = 'var(--transition)';
    }, 500);
  });
  
  // Add click effect
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  });
});