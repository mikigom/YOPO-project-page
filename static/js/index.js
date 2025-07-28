$(document).ready(function() {
  console.log('Document ready, initializing carousel...');
  
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: false,
    breakpoints: [{
      changePoint: 480,
      slidesToShow: 1,
      slidesToScroll: 1
    }, {
      changePoint: 640,
      slidesToShow: 1,
      slidesToScroll: 1
    }, {
      changePoint: 768,
      slidesToShow: 1,
      slidesToScroll: 1
    }]
  };

  // Initialize all div with carousel class
  var carousels = [];
  
  if (typeof bulmaCarousel !== 'undefined') {
    carousels = bulmaCarousel.attach('.carousel', options);
    console.log('Carousels initialized:', carousels.length);
    
    // Loop on each carousel initialized
    if (carousels && carousels.length > 0) {
      for(var i = 0; i < carousels.length; i++) {
        // Add listener to  event
        carousels[i].on('before:show', state => {
          console.log('Carousel state:', state);
        });
      }
    }
  } else {
    console.error('bulmaCarousel is not defined. Make sure the library is loaded.');
    // Fallback: try again after a short delay
    setTimeout(function() {
      if (typeof bulmaCarousel !== 'undefined') {
        carousels = bulmaCarousel.attach('.carousel', options);
        console.log('Carousels initialized on retry:', carousels.length);
        
        // Loop on each carousel initialized
        if (carousels && carousels.length > 0) {
          for(var i = 0; i < carousels.length; i++) {
            carousels[i].on('before:show', state => {
              console.log('Carousel state:', state);
            });
          }
        }
      }
    }, 1000);
  }
  
  // Specifically check for results carousel
  var resultsCarousel = document.querySelector('#results-carousel');
  if (resultsCarousel) {
    console.log('Results carousel found');
    // Force video autoplay on carousel change
    var videos = resultsCarousel.querySelectorAll('video');
    videos.forEach(function(video) {
      video.muted = true; // Ensure muted for autoplay
      video.play().catch(function(error) {
        console.log('Video autoplay error:', error);
      });
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function(state) {
      console.log(state);
    });
  }

  // Removed undefined functions that were causing errors

})