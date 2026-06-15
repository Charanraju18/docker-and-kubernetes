const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const CONTENT_DIR = path.join(SRC_DIR, 'content');
const BUILD_DIR = path.join(__dirname, 'build');

// Ensure build dir exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
}

// Read template, css, js
const templateHtml = fs.readFileSync(path.join(SRC_DIR, 'template.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(SRC_DIR, 'styles.css'), 'utf8');
const appJs = fs.readFileSync(path.join(SRC_DIR, 'app.js'), 'utf8');

// Get all content files
const contentFiles = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js')) : [];
contentFiles.sort(); // ensures 01, 02, 03... order

const sectionsData = [];
let allContentHtml = '';

contentFiles.forEach((file, index) => {
    const sectionModule = require(path.join(CONTENT_DIR, file));
    
    // Build metadata for search & nav
    sectionsData.push({
        id: sectionModule.id,
        title: sectionModule.title,
        group: sectionModule.group,
        index: index + 1,
        keywords: sectionModule.keywords || []
    });

    // Build the section HTML wrapper
    allContentHtml += `\n<div id="section-${sectionModule.id}" class="section-content">`;
    allContentHtml += sectionModule.content;
    allContentHtml += `\n</div>\n`;
});

// Create Data Layer Object
const courseData = {
    sections: sectionsData
};

const dataJs = `window.COURSE_DATA = ${JSON.stringify(courseData)};`;

// Inject everything into template
let finalHtml = templateHtml
    .replace('/* INJECT_CSS */', stylesCss)
    .replace('// INJECT_DATA', dataJs)
    .replace('// INJECT_JS', appJs)
    .replace('<!-- INJECT_CONTENT -->', allContentHtml);

// Minification/cleanup could be added here, but leaving as is for clarity

const outputFilePath = path.join(BUILD_DIR, 'index.html');
fs.writeFileSync(outputFilePath, finalHtml, 'utf8');

console.log(`✅ Build completed! Generated ${outputFilePath} with ${sectionsData.length} sections.`);
