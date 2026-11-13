import { execSync } from 'node:child_process'
import { rmSync, cpSync, mkdtempSync, existsSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const REPO = 'https://github.com/rohanondkar/rohanondkar.github.io.git'

if (!existsSync(DIST)) {
  console.error('dist/ missing — run npm run build first')
  process.exit(1)
}

const dir = mkdtempSync(join(tmpdir(), 'portfolio-pages-'))
console.log('Cloning Pages repo to', dir)
execSync(`git clone --depth 1 ${REPO} "${dir}"`, { stdio: 'inherit' })

for (const name of readdirSync(dir)) {
  if (name === '.git') continue
  rmSync(join(dir, name), { recursive: true, force: true })
}

cpSync(DIST, dir, { recursive: true })
execSync('git add -A', { cwd: dir, stdio: 'inherit' })
try {
  execSync('git commit -m "Deploy motorsports 3D portfolio"', {
    cwd: dir,
    stdio: 'inherit',
  })
} catch {
  console.log('No changes to commit')
  rmSync(dir, { recursive: true, force: true })
  process.exit(0)
}
execSync('git push origin HEAD', { cwd: dir, stdio: 'inherit' })
console.log('Deployed to https://rohanondkar.github.io')
rmSync(dir, { recursive: true, force: true })
