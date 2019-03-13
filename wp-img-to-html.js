const path = require('path');
const fs = require('fs');
//joining path of directory - change 'portfolio' to the name of the directory to be scanned
const directoryPath = path.join(__dirname, 'portfolio');
//passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all category folders
    files.forEach(function (file) {
      let imgHtml = '';
      // get category directory path
      let categoryPath = path.join(directoryPath, file);

      fs.readdir(categoryPath, function (err, imgs) {
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          }
          // for each img file
          imgs.forEach(function (img) {
            imgHtml = imgHtml.concat(`
              <div class="col-xs-12 col-sm-4 col-md-3 text-center" style="height: 255px"><a class="fancybox" rel="${file}" href="/portfolio/${file}/${img}"><img class="glow" src="/portfolio/${file}/${img}" alt="Custom Homes" style="object-fit: cover;"></a></div>
            `);
          });
          // write html file with all html for all imgs in category
          fs.writeFile(`${__dirname}/image-html-files/${file}.html`, imgHtml, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('html saved!');
          });
      });
    });
});
