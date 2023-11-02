const fs = require("fs");

// Function to get the file size
function getFileSizeInBytes(filename: string) {
  const stats = fs.statSync(filename);
  return stats.size; // file size in bytes
}

// Paths to the image files
const imagePath1 = "./path-to-img-1";
const imagePath2 = "./path-to-img-2";

// Get file sizes for both images
const size1 = getFileSizeInBytes(imagePath1);
const size2 = getFileSizeInBytes(imagePath2);

console.log("File Size: ", size1);
console.log("File Size: ", size2);
