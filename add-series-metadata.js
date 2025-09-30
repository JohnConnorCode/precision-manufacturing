#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Map filenames to series information
const seriesMapping = {
  'series-cmm': {
    seriesName: 'CMM Inspection Mastery',
    seriesSlug: 'cmm-inspection-mastery'
  },
  'series-fai': {
    seriesName: 'First Article Inspection (FAI) Excellence',
    seriesSlug: 'first-article-inspection-fai-excellence'
  },
  'series-gdt': {
    seriesName: 'GD&T Fundamentals and Application',
    seriesSlug: 'gdt-fundamentals-and-application'
  },
  'series-cnc': {
    seriesName: 'CNC Manufacturing Precision',
    seriesSlug: 'cnc-manufacturing-precision'
  },
  'series-as9100': {
    seriesName: 'AS9100 Quality Management',
    seriesSlug: 'as9100-quality-management'
  },
  'series-metbase': {
    seriesName: 'MetBase Quality Systems',
    seriesSlug: 'metbase-quality-systems'
  }
};

const articlesDir = path.join(__dirname, 'content/technical-articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

files.forEach(filename => {
  const filePath = path.join(articlesDir, filename);
  const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Extract series info from filename
  const match = filename.match(/^(series-[a-z0-9]+)-(\d+)/);
  if (match) {
    const seriesPrefix = match[1];
    const seriesOrder = parseInt(match[2], 10);

    const seriesInfo = seriesMapping[seriesPrefix];
    if (seriesInfo) {
      // Add series metadata
      article.series = seriesInfo.seriesName;
      article.seriesSlug = seriesInfo.seriesSlug;
      article.seriesOrder = seriesOrder;

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
      console.log(`✅ Updated: ${filename} (${seriesInfo.seriesName} #${seriesOrder})`);
    }
  }
});

console.log('\n✨ Series metadata added to all articles!');