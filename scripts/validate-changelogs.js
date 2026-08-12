const fs = require('fs');
const path = require('path');

const CHANGELOGS_DIR = path.join(__dirname, '..', 'changelogs');

function validate() {
  console.log('🔍 Starting changelogs validation...');

  if (!fs.existsSync(CHANGELOGS_DIR)) {
    console.error('❌ Error: `changelogs` directory does not exist.');
    process.exit(1);
  }

  const versionDirs = fs.readdirSync(CHANGELOGS_DIR).filter(item => {
    return fs.statSync(path.join(CHANGELOGS_DIR, item)).isDirectory();
  });

  if (versionDirs.length === 0) {
    console.warn('⚠️ Warning: No version directories found in `changelogs/`.');
    return;
  }

  let hasError = false;
  const versionRegex = /^v?\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;

  versionDirs.forEach(verDir => {
    if (!versionRegex.test(verDir)) {
      console.error(`❌ Error: Directory name "${verDir}" does not match version format (e.g. v1.0.0).`);
      hasError = true;
    }

    const fullVerPath = path.join(CHANGELOGS_DIR, verDir);
    const files = fs.readdirSync(fullVerPath);

    if (files.length === 0) {
      console.error(`❌ Error: Version directory "${verDir}" is empty.`);
      hasError = true;
    }

    files.forEach(file => {
      if (!file.endsWith('.md')) {
        console.error(`❌ Error: File "${file}" in "${verDir}" must be a markdown (.md) file.`);
        hasError = true;
        return;
      }

      const filePath = path.join(fullVerPath, file);
      const content = fs.readFileSync(filePath, 'utf8').trim();

      if (content.length === 0) {
        console.error(`❌ Error: File "${verDir}/${file}" is empty.`);
        hasError = true;
      }
    });
  });

  if (hasError) {
    console.error('\n❌ Changelog validation failed.');
    process.exit(1);
  }

  console.log('✅ All changelog files validated successfully!');
}

validate();
