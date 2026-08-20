document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const loginBtn = document.querySelector('.btn-login');
    const loginForm = document.getElementById('loginForm');
    
    // Input focus effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        loginBtn.appendChild(ripple);
        
        // Get click position
        const rect = loginBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        // Position ripple
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulate login process
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Show success message
            showSuccessMessage('Login Successful!');
        }, 2000);
    });
    
    // Social buttons click handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const service = icon.classList.contains('fa-facebook-f') ? 'Facebook' : 
                          icon.classList.contains('fa-twitter') ? 'Twitter' : 'Google';
            
            showSuccessMessage(`Signing in with ${service}...`);
        });
    });
    
    // Show success/notification message
    function showSuccessMessage(message) {
        const existingMsg = document.querySelector('.notification-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const successMsg = document.createElement('div');
        successMsg.textContent = message;
        successMsg.classList.add('notification-message');
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.left = '50%';
        successMsg.style.transform = 'translateX(-50%)';
        successMsg.style.background = 'rgba(46, 204, 113, 0.9)';
        successMsg.style.color = 'white';
        successMsg.style.padding = '15px 30px';
        successMsg.style.borderRadius = '50px';
        successMsg.style.zIndex = '1000';
        successMsg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        successMsg.style.animation = 'fadeInOut 3s forwards';
        
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
});
