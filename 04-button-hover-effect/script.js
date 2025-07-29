document.addEventListener('DOMContentLoaded', function() {
  // Ripple effect
  const rippleButtons = document.querySelectorAll('.ripple-effect');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Get click position
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Add to button
      this.appendChild(ripple);
      
      // Remove after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add styles for ripple
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add click effect to all buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
});