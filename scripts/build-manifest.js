const fs = require('fs');
const path = require('path');

const CHANGELOGS_DIR = path.join(__dirname, '..', 'changelogs');
const MANIFEST_PATH = path.join(CHANGELOGS_DIR, 'index.json');

function semverCompare(a, b) {
  const parse = v => v.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
  const pa = parse(a);
  const pb = parse(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return -1;
    if (na < nb) return 1;
  }
  return 0;
}

function buildManifest() {
  console.log('📦 Building changelogs manifest index (index.json)...');

  if (!fs.existsSync(CHANGELOGS_DIR)) {
    fs.mkdirSync(CHANGELOGS_DIR, { recursive: true });
  }

  const versionDirs = fs.readdirSync(CHANGELOGS_DIR).filter(item => {
    return fs.statSync(path.join(CHANGELOGS_DIR, item)).isDirectory();
  });

  // Sort versions descending (latest first)
  versionDirs.sort(semverCompare);

  const versionsList = [];

  versionDirs.forEach(ver => {
    const verPath = path.join(CHANGELOGS_DIR, ver);
    const files = fs.readdirSync(verPath).filter(f => f.endsWith('.md'));

    const languages = {};
    files.forEach(file => {
      const langCode = path.basename(file, '.md');
      const filePath = path.join(verPath, file);
      const stat = fs.statSync(filePath);
      
      languages[langCode] = {
        file: `changelogs/${ver}/${file}`,
        updatedAt: stat.mtime.toISOString()
      };
    });

    versionsList.push({
      version: ver,
      availableLanguages: Object.keys(languages),
      languages: languages
    });
  });

  const manifest = {
    updatedAt: new Date().toISOString(),
    latestVersion: versionsList.length > 0 ? versionsList[0].version : null,
    totalVersions: versionsList.length,
    versions: versionsList
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✅ Manifest successfully created at ${MANIFEST_PATH}`);
  console.log(`📌 Latest Version: ${manifest.latestVersion || 'None'}`);
  console.log(`📊 Total Versions: ${manifest.totalVersions}`);
}

buildManifest();
