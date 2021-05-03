// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
let canvas = document.getElementById('user-image');
let context = canvas.getContext('2d');

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  
  const dims = getDimmensions(canvas.width,canvas.height,img.width, img.height);
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width, canvas.height);
  context.drawImage(img, dims.startX, dims.startY, dims.imageWidth, dims.imageHeight); 
  document.getElementsByTagName('button')[0].disabled = false; //submit
  document.getElementsByTagName('button')[1].disabled = true; //reset
  document.getElementsByTagName('button')[2].disabled = true; //button- read
  

   
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});



const upload = document.getElementById('image-input');
upload.addEventListener('change', () => {
 img.src = URL.createObjectURL(upload.files[0]);
 let length =  document.getElementById('image-input').value.split("\\").length;
 let sourceImg = document.getElementById('image-input').value.split("\\");
 img.alt = sourceImg[length-1];
 document.getElementsByTagName('button')[1].disabled = false;

});

let top = document.getElementById('text-top').value;
let bottom = document.getElementById('text-bottom').value;
const subButton = document.getElementById('generate-meme');
subButton.addEventListener('submit', generator);

function generator(event)  {

  document.getElementsByTagName('button')[0].disabled = true; //submit
  document.getElementsByTagName('button')[1].disabled = false; //reset
  document.getElementsByTagName('button')[2].disabled = false; //button- read

top = document.getElementById('text-top').value;
bottom = document.getElementById('text-bottom').value;



context.textAlign = "center";
context.textBaseline = "middle";
context.fillStyle = 'white';
context.font = "60px Impact";
context.fillText(top, canvas.width / 2, canvas.height / 8);
context.fillText(bottom, canvas.width / 2, canvas.height - canvas.height / 8); //

event.preventDefault() ;
}

document.getElementsByTagName('button')[1].addEventListener('click', () => {
  context.fillStyle = 'black';
  contxt.fillRect(0,0, canvas.width, canvas.height);
  document.getElementsByTagName('button')[0].disabled = false; //submit
  document.getElementsByTagName('button')[1].disabled = true; //reset
  document.getElementsByTagName('button')[2].disabled = true; //button- read
});

const range = document.getElementsByTagName('input')[3];//volume range
let volume = 1;
range.addEventListener('change', function() {
  if (range.value <= 0) {
    volume = 0;
  }
  else if (range.value > 0 && range.value <= 33) {
    volume = 0.3;
  }
  else if (range.value > 33 && range.value <= 66) {
    volume = 0.6;
  }
  else {
    volume = 1;
  }
});



/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
