// Slide to previous/next carousel image if user swipes screen left/right

// x-coordinate of user's touch on screen
var startX = null;


// Get x-coordinate of user's touch when user first touches screen
$('#banner').on('touchstart', function (event) {
  var e = event.originalEvent;

  if (e.touches.length == 1) {
    startX = e.touches[0].clientX;
  }

  return;
})

  /* Get x-coordinate as user moves across screen to determine if carousel
  should slide to previous or next image */
  .on('touchmove', function (event) {
    var e = event.originalEvent;

    if (startX != null) {
      // Get current x-coordinate after initial touch
      var currentX = e.changedTouches[0].clientX;

      /* Go to previous image if user swiped left and reset starting
      x-coordinate to detect next swipe */
      if (currentX - startX > 60) {
        startX = null;
        $('#banner').carousel('prev');
      }

      /* Go to next image if user swiped right and reset starting x-coordinate
      to detect next swipe */
      else if (startX - currentX > 60) {
        startX = null;
        $('#banner').carousel('next');
      }
    }

    return;
  })

  /* Reset starting x-coordinate to detect next swipe when swipe ends if it
  wasn't already reset (i.e., if touch was too short to be a swipe) */
  .on('touchend', function () {
    return startX = null;
  });
