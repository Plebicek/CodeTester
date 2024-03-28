import fs from "fs"

// Define the size of the file in bytes (e.g., 11MB)
const fileSizeBytes = 11 * 1024 * 1024; // 11MB

// Create a buffer with random data to fill the file
const buffer = Buffer.alloc(fileSizeBytes, 'a'); // Fill the buffer with 'a'

// Write the buffer to a file
fs.writeFileSync('large-file.txt', buffer);