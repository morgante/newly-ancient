const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const patterns = {
  BLOG: /\/\d\d\d\d\/\d\d\/\d\d\/([\w\d-]+)\/index.html/gi
};

const PATHS = {
  old_raw: "import/old_raw/",
  new_blog: "content/blog"
};

function importBlog(fileName) {
  const html = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'}); 
  const $ = cheerio.load(html);
  const contents = $(".content.single .post .field.content .value").html();
  const slug = path.basename(path.dirname(fileName));

  const newFileContents = `---
title: test
date: "2009-09-25T12:02:03.284Z"
tags: [education, advertising, finance]
---

${contents}
`;

  const newDir = path.join(PATHS.new_blog, slug);
  fs.mkdirSync(newDir, { recursive: true });

  fs.writeFileSync(path.join(newDir, "index.md"), newFileContents);
  console.log(fileName, slug);
}

function importFile(fileName) {
  if (patterns.BLOG.test(fileName)) {
    importBlog(fileName)
  }
}

function importDir(dir) {
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
importDir(PATHS.old_raw);
