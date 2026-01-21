let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer = null
$(document).ready(() => {
  $('.details').hide() 

   function startSlideshow() {
  
   }

$('.moreIndicator').on('click', function() {
  $(this).toggleClass('rot90 rot270')
  $('.details').slideToggle()
})

$('#nextBtn').on('click', () => {
showNextPhoto()
})

$('#prevBtn').on('click', () => {
showPrevPhoto()
})


  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
url:mUrl,
method:'GET',
dataType: 'json',
success: function(data){

mImages = []

data.forEach(image => {
mImages.push(image)

})

swapPhoto()
},

error:function(err){
console.error('error loading JSON:',err)
}

  })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  
const currentImage = mImages[mCurrentIndex]

  $('#photo').attr('src', currentImage.path)
  $('.location').text(currentImage.location)
  $('.description').text(currentImage.description)
  $('.date').text(currentImage.date)

}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
 
mCurrentIndex++

if (mCurrentIndex >= mImages.length){
mCurrentIndex = 0

}

swapPhoto()

}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
 
mCurrentIndex--

if (mCurrentIndex < 0){
  mCurrentIndex = mImages.length - 1
}

swapPhoto()

}

// Starter code for the timer function
function startTimer () {
  
if (mTimer) {
  clearInterval(mTimer)
}

mTimer = setInterval(() => {
showNextPhoto()
}, mWaitTime)

}