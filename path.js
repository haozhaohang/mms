const { resolve } = require('path');

const projectDir = process.cwd();
const srcDir = resolve(projectDir, 'src');
const distDir = resolve(projectDir, 'dist');
const mainDir = resolve(srcDir, 'main');
const loginDir = resolve(srcDir, 'login');
const browserDir = resolve(srcDir, 'browser');
const appJsPath = resolve(mainDir, 'index.js');
const loginJsPath = resolve(loginDir, 'index.jsx');
const browserJsPath = resolve(browserDir, 'index.js');
const appHtmlPath = resolve(mainDir, 'index.html');
const browserHtmlPath = resolve(browserDir, 'index.html');
const themePath = resolve(srcDir, 'assets/css/theme.json');
const faviconPath = resolve(srcDir, 'assets/favicon.ico');

const resolveModules = [srcDir, 'node_modules'];

module.exports = {
    projectDir,
    srcDir,
    distDir,
    mainDir,
    appJsPath,
    loginJsPath,
    appHtmlPath,
    browserJsPath,
    browserHtmlPath,
    themePath,
    faviconPath,
    resolveModules
};
