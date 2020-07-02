const fs = require('fs');
const cheerio = require('cheerio');

const patterns = {
  BLOG: /\/\d\d\d\d\/\d\d\/\d\d\/([\w\d-]+)\/index.html/gi
};

const PATHS = {
  new_blog: "import/blog"
};

function importBlog(fileName) {
  const html = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'}); 
  const $ = cheerio.load(html);
  const contents = $(".content.single .post .field.content .value").html();
  console.log(fileName, contents);
}

function importFile(fileName) {
  if (patterns.BLOG.test(fileName)) {
    importBlog(fileName)
  }
}

function importDir(dir, filelist) {
  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      importDir(dir + file + '/');
    } else {
      importFile(dir + file);
    }
  });
}

console.log("RUN IT");
importDir("import/old_raw/");
