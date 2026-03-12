import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const matrixPath = path.join(repoRoot, 'compat-matrix.json');
const workflowPath = path.join(repoRoot, '.github', 'workflows', 'ci.yml');
const readmePath = path.join(repoRoot, 'README.md');

function parseWorkflowExamples(workflowSource) {
  const lines = workflowSource.split('\n');
  const startIndex = lines.findIndex((line) => line.includes('matrix:'));
  if (startIndex < 0) {
    throw new Error('CI workflow is missing matrix section.');
  }

  const entries = [];
  let inExampleList = false;
  for (const line of lines.slice(startIndex + 1)) {
    if (!inExampleList) {
      if (line.includes('example:')) {
        inExampleList = true;
      }
      continue;
    }

    const itemMatch = line.match(/^\s*-\s+([a-z0-9-]+)\s*$/);
    if (itemMatch) {
      entries.push(itemMatch[1]);
      continue;
    }

    if (line.trim().length > 0 && !line.startsWith(' ')) {
      break;
    }
  }

  return entries;
}

function assertExamplePackageMajor(exampleDir, expectedMajor, packageSource) {
  let parsed;
  try {
    parsed = JSON.parse(packageSource);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid package.json for ${exampleDir}: ${message}`);
  }

  const deps = parsed.dependencies ?? {};
  const next = deps['next'];
  if (typeof next !== 'string') {
    throw new Error(`${exampleDir} package.json must include dependencies.next.`);
  }

  const majorMatch = next.match(/(\d+)/);
  if (!majorMatch) {
    throw new Error(`${exampleDir} has unparsable next version: ${next}`);
  }

  const actualMajor = Number.parseInt(majorMatch[1], 10);
  if (actualMajor !== expectedMajor) {
    throw new Error(
      `${exampleDir} declares Next.js ${actualMajor}, expected ${expectedMajor} from compat-matrix.json.`,
    );
  }
}

const [matrixRaw, workflowRaw, readmeRaw] = await Promise.all([
  fs.readFile(matrixPath, 'utf8'),
  fs.readFile(workflowPath, 'utf8'),
  fs.readFile(readmePath, 'utf8'),
]);

const matrix = JSON.parse(matrixRaw);
const exampleRows = matrix.examples;
if (!Array.isArray(exampleRows) || exampleRows.length === 0) {
  throw new Error('compat-matrix.json examples must be a non-empty array.');
}

const matrixExampleNames = exampleRows.map((row) => row.name);
const workflowExamples = parseWorkflowExamples(workflowRaw);

if (matrixExampleNames.join(',') !== workflowExamples.join(',')) {
  throw new Error(
    `Workflow example matrix mismatch. compat-matrix.json=${matrixExampleNames.join(',')} workflow=${workflowExamples.join(',')}`,
  );
}

for (const row of exampleRows) {
  if (typeof row?.name !== 'string' || typeof row?.nextMajor !== 'number') {
    throw new Error('Each compat-matrix example entry must have name:string and nextMajor:number.');
  }

  if (!readmeRaw.includes(`| \`${row.name}\` | ${row.nextMajor}.x |`)) {
    throw new Error(
      `README.md table must include row for ${row.name} with Next.js ${row.nextMajor}.x`,
    );
  }

  const packagePath = path.join(repoRoot, row.name, 'package.json');
  const packageRaw = await fs.readFile(packagePath, 'utf8');
  assertExamplePackageMajor(row.name, row.nextMajor, packageRaw);
}

console.log(
  `[compat-check] ok: ${exampleRows.length} examples aligned with matrix and CI workflow`,
);
