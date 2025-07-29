document.addEventListener('DOMContentLoaded', function() {
  const shareWrapper = document.querySelector('.share-wrapper');
  const shareTrigger = document.querySelector('.share-trigger');
  const shareIcons = document.querySelectorAll('.share-icon');
  
  // Toggle share menu
  shareTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    shareWrapper.classList.toggle('active');
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!shareWrapper.contains(e.target)) {
      shareWrapper.classList.remove('active');
    }
  });
  
  // Share functionality
  shareIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const network = this.getAttribute('data-network');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl;
      
      switch(network) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
          break;
        default:
          return;
      }
      
      // Open share window
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      // Close the menu
      shareWrapper.classList.remove('active');
    });
  });
});