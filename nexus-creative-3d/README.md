# Nexus Creative — Interactive 3D Technology Hub

A responsive React + Vite application using Three.js through React Three Fiber and Drei. The 3D scene is procedurally generated from code (no external `.glb` file dependency required).

## Features
- **Procedural 3D Scene**:
  - Digital Solutions Workstation with 3D laptop & brand screen
  - Dual enterprise server racks with blinking activity LEDs & switches
  - Dual security CCTV surveillance cameras
  - Animated telecom globe with dual orbital rings
  - Glowing emissive fiber optic data highways
  - Procedural floating Nexus 3D brand mark & typography
- **Interactive Controls**: Drag to orbit, scroll to zoom, touch to pan, and mouse pointer scene tilt.
- **Dual Themes**: Studio Light (`#f5f8fc`) and Cyber Dark (`#050a18`).
- **Embed & Standalone Modes**:
  - `?embed=true`: Clean full-bleed WebGL canvas with interactive floating HUD for seamless iframe integration into the main website.
  - Standalone: Full landing page with header, hero showcase, service grid, and footer.

## Integration in Main Website
The 3D site is embedded into the main landing page via `Nexus3DTechHubSection.tsx` (`#3d-hub`).
- Built files are synced to `public/3d-hub/` and `public/nexus-creative-3d/`.
- Accessible directly at `/3d-hub/index.html` or `/nexus-creative-3d/index.html`.

## Development & Build Commands
From the workspace root:
- `npm run build:3d`: Recompiles `nexus-creative-3d` and syncs production output to `public/3d-hub` & `public/nexus-creative-3d`.
- `npm run build`: Automatically builds the 3D hub, syncs assets, and builds the main site.

To run `nexus-creative-3d` independently:
```bash
cd nexus-creative-3d
npm install
npm run dev
```
