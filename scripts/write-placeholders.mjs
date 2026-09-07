import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const files = [
  ["pgwhite", "01", "pgwhite · video poster"],
  ["pgwhite", "02", "pgwhite · browse"],
  ["pgwhite", "03", "pgwhite · search"],
  ["pgwhite", "04", "pgwhite · entry"],
  ["vr-game", "01", "VR game · video poster"],
  ["vr-game", "02", "VR game · grasp"],
  ["vr-game", "03", "VR game · space"],
  ["print-3d", "01", "3D print · bench"],
  ["print-3d", "02", "3D print · iteration"],
  ["ai-ethics", "01", "AI ethics · still"],
  ["figma-app", "01", "Figma app · flow"],
  ["figma-app", "02", "Figma app · variant"],
  ["intern-1", "01", "Internship 01 · site"],
  ["intern-1", "02", "Internship 01 · artifact"],
  ["intern-2", "01", "Internship 02 · site"],
  ["intern-3", "01", "Internship 03 · site"],
];

function svg(label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${label}">
  <rect width="1600" height="900" fill="#E8D5B8"/>
  <rect x="48" y="48" width="1504" height="804" fill="#F6EDE0" stroke="#D9C4A8" stroke-width="2"/>
  <g stroke="#B5442A" stroke-width="1.5" fill="none" opacity="0.45">
    <rect x="120" y="120" width="1360" height="660" stroke-dasharray="14 12"/>
    <line x1="120" y1="450" x2="1480" y2="450"/>
    <line x1="800" y1="120" x2="800" y2="780"/>
  </g>
  <rect x="160" y="160" width="220" height="36" fill="#B5442A"/>
  <text x="172" y="184" fill="#FFF8F0" font-family="Segoe UI, Arial, sans-serif" font-size="18">placeholder</text>
  <text x="800" y="430" text-anchor="middle" fill="#2A1F16" font-family="Segoe UI, Arial, sans-serif" font-size="40">${label}</text>
  <text x="800" y="486" text-anchor="middle" fill="#5C4A3A" font-family="Segoe UI, Arial, sans-serif" font-size="22">Replace this file in public/media/</text>
</svg>
`;
}

for (const [id, name, label] of files) {
  const path = join(root, "public", "media", id, `${name}.svg`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg(label));
}

writeFileSync(
  join(root, "public", "media", "README.md"),
  `# Media folders

Put real photos and videos next to these placeholders, then point \`src\` in \`src/content/site.ts\` at the new files.

Suggested names (already referenced):

- \`pgwhite/01.mp4\` plus stills \`02.svg\`–\`04.svg\`
- \`vr-game/01.mp4\` plus stills
- \`print-3d/\`, \`ai-ethics/\`, \`figma-app/\`
- \`intern-1/\`, \`intern-2/\`, \`intern-3/\`

Resume PDF: \`public/resume.pdf\`
`,
);

mkdirSync(join(root, "public", "media", "about"), { recursive: true });
writeFileSync(
  join(root, "public", "media", "about", "portrait.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="Portrait placeholder">
  <rect width="800" height="1000" fill="#e3ddd6"/>
  <circle cx="400" cy="380" r="160" fill="#f7f5f2" stroke="#a84a36" stroke-width="4"/>
  <rect x="220" y="580" width="360" height="280" rx="180" fill="#f7f5f2" stroke="#a84a36" stroke-width="4"/>
  <text x="400" y="930" text-anchor="middle" fill="#5c4a3a" font-family="Segoe UI, Arial, sans-serif" font-size="28">Your photo</text>
</svg>
`,
);

function schoolIcon(label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="${label}">
  <rect width="160" height="160" rx="16" fill="#fff8f0" stroke="#d9c4a8" stroke-width="4"/>
  <polygon points="80,28 140,68 20,68" fill="#b5442a"/>
  <rect x="44" y="72" width="72" height="56" fill="#ead7bf"/>
  <text x="80" y="148" text-anchor="middle" fill="#2a1f16" font-size="14" font-family="Segoe UI, Arial, sans-serif">${label}</text>
</svg>
`;
}

writeFileSync(join(root, "public", "media", "about", "school-a.svg"), schoolIcon("School A"));
writeFileSync(join(root, "public", "media", "about", "school-b.svg"), schoolIcon("School B"));
writeFileSync(join(root, "public", "media", "about", "school-c.svg"), schoolIcon("School C"));
writeFileSync(join(root, "public", "media", "about", "school-d.svg"), schoolIcon("School D"));

console.log(`Wrote ${files.length} placeholder stills.`);
