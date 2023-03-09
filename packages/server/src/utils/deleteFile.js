const fs = require('fs');

async function deleteFile(filePaht) {
  return new Promise((resolve, reject) => {
    fs.exists(filePaht, exists => {
      if (exists) {
        fs.unlink(filePaht, err => {
          if (err) throw reject(err);
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

module.exports = deleteFile;
