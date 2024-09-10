const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'application/pdf': 'pdf',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'model/gltf+json': 'gltf',
  'model/gltf-binary': 'glb', 
  'application/octet-stream': 'glb', // default to glb instead of obj
  'video/mp4': 'mp4',   // Video MIME types
  'video/x-msvideo': 'avi',
  'video/webm': 'webm'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("MIME type detected:", file.mimetype);
    let folder = '';
    if (file.mimetype.startsWith('image/')) {
      folder = '../api/src/assets/images';
    } else if (file.mimetype === 'application/pdf') {
      folder = '../api/src/assets/pdf';
    } else if (file.mimetype.startsWith('audio/')) {
      folder = '../api/src/assets/audio';
    } else if (file.mimetype.startsWith('model/')) {
      folder = '../api/src/assets/objects';
    } else if (file.mimetype.startsWith('application/octet-stream')) {
      folder = '../api/src/assets/objects';
    } else if (file.mimetype.startsWith('video/')) {
      folder = '../api/src/assets/videos';  // New folder for video files
    }
    callback(null, folder); 
  },
  filename: (req, file, callback) => {
    let extension = MIME_TYPES[file.mimetype];
    // Check if the file has a known extension in case the MIME type is octet-stream
    if (file.mimetype === 'application/octet-stream' && file.originalname.endsWith('.glb')) {
      extension = 'glb';
    }
    const name = file.originalname.replace(/\s+/g, '_').replace(/\.[^/.]+$/, '');
    callback(null, `${name}_${Date.now()}.${extension}`);
  }  
});

// Allow any type of file upload including videos
module.exports = multer({ storage: storage }).any();
