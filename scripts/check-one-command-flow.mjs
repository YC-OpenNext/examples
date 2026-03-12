import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const legacyCommandPattern =
  /next-yc\s+(bootstrap|analyze|build|upload|deploy-manifest|plan)\b/;
const requiredCommand = 'next-yc deploy --project . --verbose';

async function readFile(filePath) {
  return fs.readFile(filePath, 'utf8');
}

function assertIncludes(content, needle, filePath) {
  if (!content.includes(needle)) {
    throw new Error(`${filePath} is missing required one-command snippet: "${needle}"`);
  }
}

function assertNoLegacyCommands(content, filePath) {
  const match = content.match(legacyCommandPattern);
  if (!match) {
    return;
  }
  throw new Error(`${filePath} contains legacy CLI command reference: "${match[0]}"`);
}

async function main() {
  const filesToCheck = [
    path.join(root, 'README.md'),
    path.join(root, 'next13-app-router', 'README.md'),
    path.join(root, 'next14-mixed', 'README.md'),
    path.join(root, 'next15-modern', 'README.md'),
  ];

  for (const filePath of filesToCheck) {
    const content = await readFile(filePath);
    assertIncludes(content, requiredCommand, filePath);
    assertNoLegacyCommands(content, filePath);
  }

  console.log(
    `[one-command-check] ok: ${filesToCheck.length} readme files use one-command deploy flow`,
  );
}

void main().catch((error) => {
  console.error(
    `[one-command-check] failed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  process.exit(1);
});
