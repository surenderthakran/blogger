'use strict';

// Global requires.
const fs = require('fs');
const path = require('path');
const url = require('url');

// NPM requires.
const glob = require('glob');
const mustache = require('mustache');

// Local requires.
const articleStore = require(__root + '/datastore/articlestore');
const rendererConfig = require(__root + '/renderer/config');

const templatesPath = path.join(__root, '/views/templates/');
const partialsPath = path.join(__root, '/views/templates/partials/');
const publicPath = path.join(__root, '/public/');

const sitemapUrlList = [];
const sitemapDomainBase = 'https://www.surenderthakran.com';

const registerPartials = () => {
  console.log('Registering partials...');
  let options = {
    nodir: true,
    strict: true,
    cwd: process.cwd(),
  };
  const files = glob.sync(path.join(partialsPath, '*.html'), options);

  files.forEach((filePath) => {
    let partialName = path.basename(filePath, '.html');

    rendererConfig.partials[partialName] = fs.readFileSync(filePath, 'utf8');
  });
};

const deleteAllHtmlPages = (directory=publicPath) => {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    if (fs.lstatSync(path.join(directory, file)).isDirectory()) {
      deleteAllHtmlPages(path.join(directory, file));
    } else if (path.extname(file) === '.html') {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath);
    }
  });
};

const renderPages = () => {
  console.log('Rendering pages...');
  rendererConfig.pages.forEach((page) => {
    const file = fs.readFileSync(path.join(templatesPath, page.src), 'utf8');

    const output = mustache.render(
      file, page.viewData, rendererConfig.partials);

    fs.writeFileSync(path.join(publicPath, page.target), output);

    // Add page to sitemapUrlList to get them added to sitemap.xml
    const parsedTargetPath = path.parse(page.target);
    let urlPathName = path.join(parsedTargetPath.dir, parsedTargetPath.name);
    // Don't use 'index' pathnames in urls.
    if (urlPathName === 'index') {
      urlPathName = '';
    }
    const sitemapLoc = url.resolve(sitemapDomainBase, urlPathName);
    sitemapUrlList.push({
      loc: sitemapLoc,
    });
  });
};

const renderArticles = () => {
  console.log('Rendering article pages...');

  // Iterate over all articles listed in the store.
  articleStore.forEach((article) => {
    // Make deep copy of the article object to be discarded later.
    const articleData = JSON.parse(JSON.stringify(article));

    // Path of the article's body's html.
    const bodyTemplatePath = path.join(
        templatesPath, articleData.url + '.html');
    // Target path of the rendered html file.
    const targetPath = path.join(publicPath, articleData.url + '.html');

    // Read article's body.
    const bodyTemplate = fs.readFileSync(bodyTemplatePath, 'utf-8');

    // Render article body.
    const body = mustache.render(bodyTemplate, articleData);

    // Save article body in article object.
    articleData.article.body = body;

    // Read article page's template.
    const articleTemplate = fs.readFileSync(
        path.join(templatesPath, 'article.html'), 'utf-8');

    // Render final page.
    const output = mustache.render(
        articleTemplate, articleData, rendererConfig.partials);

    // Write final page at target path.
    fs.writeFileSync(targetPath, output);

    // Add articles to sitemapUrlList to get them added to sitemap.xml
    const sitemapLoc = url.resolve(sitemapDomainBase, article.url);
    sitemapUrlList.push({
      loc: sitemapLoc,
    });
  });
};

module.exports = () => {
  console.log('\nGenerating Public Content...');

  registerPartials();

  deleteAllHtmlPages();

  renderPages();
  renderArticles();
};
