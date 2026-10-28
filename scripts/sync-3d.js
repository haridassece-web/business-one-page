import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nexus3dDir = path.join(rootDir, 'nexus-creative-3d');
const nodeModules3d = path.join(nexus3dDir, 'node_modules');
const dist3dDir = path.join(nexus3dDir, 'dist');
const public3dHub = path.join(rootDir, 'public', '3d-hub');
const publicNexus3d = path.join(rootDir, 'public', 'nexus-creative-3d');

if (!fs.existsSync(nodeModules3d)) {
  console.log('📦 Installing nexus-creative-3d dependencies...');
  execSync('npm install', { cwd: nexus3dDir, stdio: 'inherit', shell: true });
}

console.log('🚀 Building nexus-creative-3d...');
execSync('npm run build', { cwd: nexus3dDir, stdio: 'inherit', shell: true });

console.log('📦 Syncing 3D build to public/3d-hub and public/nexus-creative-3d...');
fs.rmSync(public3dHub, { recursive: true, force: true });
fs.mkdirSync(public3dHub, { recursive: true });
fs.cpSync(dist3dDir, public3dHub, { recursive: true });

fs.rmSync(publicNexus3d, { recursive: true, force: true });
fs.mkdirSync(publicNexus3d, { recursive: true });
fs.cpSync(dist3dDir, publicNexus3d, { recursive: true });

console.log('✅ Nexus 3D Tech Hub synced successfully!');
