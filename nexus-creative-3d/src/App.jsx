import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Html, OrbitControls, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const blue = '#087cf0';
const navy = '#102b4d';
const cyan = '#00d2ff';

function GlowLine({ points, radius = 0.018 }) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, radius, 8, false]} />
      <meshStandardMaterial color="#28aaff" emissive="#168cff" emissiveIntensity={2.5} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

function Platform({ position = [0, 0, 0], size = [3.8, 0.24, 2.5], isDark = false }) {
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.12} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={isDark ? '#0d182b' : '#fdfefe'}
          metalness={isDark ? 0.6 : 0.22}
          roughness={0.2}
          clearcoat={0.8}
        />
      </RoundedBox>
      <mesh position={[0, -size[1] / 2 + 0.025, 0]}>
        <boxGeometry args={[size[0] * 0.92, 0.025, size[2] * 0.91]} />
        <meshStandardMaterial color={cyan} emissive={blue} emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

function Laptop({ position, isDark = false }) {
  return (
    <group position={position} rotation={[-0.08, 0.22, 0]}>
      {/* Base */}
      <RoundedBox args={[1.15, 0.055, 0.72]} radius={0.035} position={[0, 0.13, 0.15]} castShadow>
        <meshStandardMaterial color={isDark ? '#1e293b' : '#b8c5d2'} metalness={0.85} roughness={0.24} />
      </RoundedBox>
      {/* Screen Lid */}
      <RoundedBox args={[1.08, 0.68, 0.055]} radius={0.035} position={[0, 0.48, -0.19]} rotation={[-0.12, 0, 0]}>
        <meshStandardMaterial color={isDark ? '#0f172a' : '#77899b'} metalness={0.7} roughness={0.25} />
      </RoundedBox>
      {/* Screen display */}
      <mesh position={[0, 0.48, -0.154]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[0.97, 0.56]} />
        <meshBasicMaterial color="#041226" />
      </mesh>
      <Text position={[0, 0.55, -0.146]} rotation={[-0.12, 0, 0]} fontSize={0.09} color="#eaf7ff" anchorX="center">
        NEXUS CREATIVE
      </Text>
      <Text position={[0, 0.38, -0.145]} rotation={[-0.12, 0, 0]} fontSize={0.055} color="#38bdf8" anchorX="center">
        Build Your Digital Future
      </Text>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[-0.43 + i * 0.12, 0.164, 0.1]}>
          <boxGeometry args={[0.075, 0.006, 0.19]} />
          <meshStandardMaterial color={isDark ? '#334155' : '#708397'} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Rack({ position, tall = true, isDark = false }) {
  const h = tall ? 1.75 : 0.75;
  return (
    <group position={position}>
      <RoundedBox args={[0.78, h, 0.72]} radius={0.055} position={[0, h / 2, 0]} castShadow>
        <meshStandardMaterial color={isDark ? '#0f172a' : '#d9e1e9'} metalness={0.75} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, h / 2, 0.368]}>
        <planeGeometry args={[0.65, h * 0.91]} />
        <meshStandardMaterial color="#081426" metalness={0.5} roughness={0.3} />
      </mesh>
      {Array.from({ length: tall ? 7 : 3 }, (_, i) => (
        <group key={i} position={[0, h * 0.13 + i * (h * 0.105), 0.39]}>
          <RoundedBox args={[0.59, 0.12, 0.035]} radius={0.012}>
            <meshStandardMaterial color={isDark ? '#1e293b' : '#354c62'} metalness={0.7} roughness={0.25} />
          </RoundedBox>
          {Array.from({ length: 8 }, (_, j) => (
            <mesh key={j} position={[-0.23 + j * 0.065, 0, 0.022]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial
                color={j % 3 === 0 ? '#38bdf8' : '#34d399'}
                emissive={j % 3 === 0 ? '#0284c7' : '#059669'}
                emissiveIntensity={2.0}
              />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0.1, 0.08, 0.415]}>
        <boxGeometry args={[0.12, 0.025, 0.012]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

function CCTV({ position, rotation = [0, 0, 0], isDark = false }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.22, 20]} />
        <meshStandardMaterial color={isDark ? '#334155' : '#bfcbd7'} metalness={0.8} />
      </mesh>
      <RoundedBox args={[0.32, 0.16, 0.17]} radius={0.065} position={[0, -0.02, 0.08]} castShadow>
        <meshStandardMaterial color={isDark ? '#1e293b' : '#f7fafc'} metalness={0.5} roughness={0.2} />
      </RoundedBox>
      <mesh position={[0, -0.02, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.018, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.02, 0.185]}>
        <sphereGeometry args={[0.036, 18, 18]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

function Globe({ position }) {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.22;
  });
  return (
    <group position={position}>
      <Float speed={1.1} floatIntensity={0.12}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.47, 32, 24]} />
          <meshPhysicalMaterial color="#cbe9fe" metalness={0.35} roughness={0.2} clearcoat={1} />
        </mesh>
        <mesh rotation={[0.7, 0.2, 0.2]}>
          <torusGeometry args={[0.58, 0.018, 8, 90]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.8} />
        </mesh>
        <mesh rotation={[1.2, 0.4, 0.8]}>
          <torusGeometry args={[0.64, 0.009, 8, 90]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#0369a1" emissiveIntensity={1.3} />
        </mesh>
      </Float>
      <mesh position={[0, -0.57, 0]}>
        <cylinderGeometry args={[0.38, 0.48, 0.15, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.22} />
      </mesh>
    </group>
  );
}

function BrandMark({ isDark = false }) {
  return (
    <group position={[0, 2.45, -0.55]}>
      <RoundedBox args={[1.35, 0.95, 0.12]} radius={0.08}>
        <meshStandardMaterial color={isDark ? '#0f172a' : '#ffffff'} metalness={0.4} roughness={0.2} />
      </RoundedBox>
      <Text position={[0, 0.07, 0.075]} fontSize={0.58} color={isDark ? '#38bdf8' : blue} anchorX="center" anchorY="middle">
        N
      </Text>
      <Text position={[0, -0.34, 0.075]} fontSize={0.13} color={isDark ? '#e2e8f0' : navy} anchorX="center">
        NEXUS CREATIVE
      </Text>
    </group>
  );
}

function Scene({ isDark = false }) {
  const hub = useRef();
  useFrame((state, delta) => {
    if (hub.current) {
      const targetY = state.pointer.x * 0.1;
      const targetX = -state.pointer.y * 0.045;
      hub.current.rotation.y = THREE.MathUtils.damp(hub.current.rotation.y, targetY, 2.2, delta);
      hub.current.rotation.x = THREE.MathUtils.damp(hub.current.rotation.x, targetX, 2.2, delta);
    }
  });

  const textColor = isDark ? '#e2e8f0' : navy;
  const subTextColor = isDark ? '#94a3b8' : '#50677e';

  return (
    <>
      <ambientLight intensity={isDark ? 0.9 : 1.35} />
      <directionalLight position={[4, 8, 6]} intensity={isDark ? 1.8 : 2.1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 3, 2]} color="#38bdf8" intensity={isDark ? 45 : 35} />
      <pointLight position={[4, 2, -1]} color="#818cf8" intensity={isDark ? 30 : 24} />
      <group ref={hub}>
        <Platform position={[-2.05, 0, 0]} size={[3.5, 0.22, 2.4]} isDark={isDark} />
        <Platform position={[2.05, 0, 0]} size={[3.5, 0.22, 2.4]} isDark={isDark} />
        <BrandMark isDark={isDark} />
        <Laptop position={[-2.35, 0.18, 0.15]} isDark={isDark} />
        <Rack position={[1.3, 0.13, -0.52]} tall isDark={isDark} />
        <Rack position={[2.2, 0.13, -0.48]} tall isDark={isDark} />
        <Rack position={[2.95, 0.13, 0.25]} tall={false} isDark={isDark} />
        <CCTV position={[2.55, 1.6, -0.35]} rotation={[0.2, -0.45, 0]} isDark={isDark} />
        <CCTV position={[3.25, 1.48, -0.05]} rotation={[0.15, 0.4, 0]} isDark={isDark} />
        <Globe position={[0, 0.82, 0.2]} />
        <GlowLine
          points={[
            [-2.4, 0.35, -0.7],
            [-1.6, 0.65, -0.85],
            [-0.7, 0.7, -0.65],
            [0, 0.7, -0.4],
            [0.7, 0.65, -0.7],
            [1.4, 0.45, -0.55],
          ]}
        />
        <GlowLine
          points={[
            [2.55, 0.2, 0.85],
            [2.2, 0.24, 1.02],
            [1.6, 0.25, 1.03],
            [1.0, 0.26, 0.9],
          ]}
          radius={0.024}
        />
        <Text position={[-2.05, 0.16, 1.18]} fontSize={0.19} color={textColor} anchorX="center">
          DIGITAL SOLUTIONS
        </Text>
        <Text position={[2.05, 0.16, 1.18]} fontSize={0.18} color={textColor} anchorX="center">
          NETWORK INFRASTRUCTURE
        </Text>
        <Text position={[0, 3.15, -0.5]} fontSize={0.21} color={textColor} anchorX="center">
          DIGITAL SOLUTIONS & NETWORK INFRASTRUCTURE
        </Text>
        <Text position={[0, 2.88, -0.5]} fontSize={0.14} color={subTextColor} anchorX="center">
          Connecting Businesses. Empowering Growth.
        </Text>
      </group>
      <ContactShadows position={[0, -0.19, 0]} opacity={isDark ? 0.4 : 0.25} scale={10} blur={2.5} far={4.5} />
    </>
  );
}

function Service({ symbol, title }) {
  return (
    <div className="service">
      <span>{symbol}</span>
      <small>{title}</small>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'cyber';
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') || 'cyber';
  });

  const [isEmbed] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('embed') === 'true';
  });

  const [showEmbedControls] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('controls') === 'true';
  });

  const isDark = theme === 'cyber';
  const bgColor = isDark ? '#050a18' : '#f5f8fc';

  const controlsRef = useRef();
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Embed Mode (Clean full-bleed canvas for iframe embedding in main website)
  if (isEmbed) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: bgColor,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Canvas shadows camera={{ position: [5.2, 4.4, 7.8], fov: 36 }} dpr={[1, 1.7]}>
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={[bgColor, 12, 24]} />
          <Suspense
            fallback={
              <Html center>
                <div style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Initializing 3D Tech Hub…
                </div>
              </Html>
            }
          >
            <Scene isDark={isDark} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan={false}
            minDistance={4.5}
            maxDistance={14}
            minPolarAngle={Math.PI / 4.5}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 1.2, 0]}
          />
        </Canvas>

        {/* Optional Controls Bar (only when controls=true is explicitly requested) */}
        {showEmbedControls && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  pointerEvents: 'auto',
                  background: isDark ? 'rgba(5, 10, 24, 0.85)' : 'rgba(255, 255, 255, 0.88)',
                  border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(8, 124, 240, 0.25)'}`,
                  borderRadius: '12px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00d2ff',
                    boxShadow: '0 0 10px #00d2ff',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: isDark ? '#f8fafc' : '#102b4d',
                    textTransform: 'uppercase',
                  }}
                >
                  Nexus 3D Tech Hub
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'cyber')}
                  title="Toggle Theme"
                  style={{
                    background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(203, 213, 225, 0.8)'}`,
                    color: isDark ? '#38bdf8' : '#087cf0',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {isDark ? '☀️ Studio' : '🌙 Cyber'}
                </button>
                <button
                  onClick={resetCamera}
                  title="Reset Camera Angle"
                  style={{
                    background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(203, 213, 225, 0.8)'}`,
                    color: isDark ? '#e2e8f0' : '#334155',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '16px',
                pointerEvents: 'none',
                background: isDark ? 'rgba(5, 10, 24, 0.85)' : 'rgba(255, 255, 255, 0.88)',
                border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(203, 213, 225, 0.8)'}`,
                borderRadius: '10px',
                padding: '5px 12px',
                fontSize: '10px',
                fontWeight: 600,
                color: isDark ? '#94a3b8' : '#64748b',
                backdropFilter: 'blur(8px)',
              }}
            >
              Drag to orbit • Scroll to zoom
            </div>
          </>
        )}
      </div>
    );
  }

  // Standalone Full Landing Page Mode
  return (
    <main className="page" style={{ backgroundColor: bgColor, color: isDark ? '#e2e8f0' : '#122b47' }}>
      <header className="topbar" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#dce5ef' }}>
        <div className="brand">
          <span className="brand-icon">N</span>
          <div>
            <strong style={{ color: isDark ? '#f8fafc' : '#122b47' }}>NEXUS CREATIVE</strong>
            <small style={{ color: isDark ? '#94a3b8' : '#6b7d90' }}>Digital Solutions & Network Infrastructure</small>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'cyber')}
            style={{
              padding: '6px 14px',
              borderRadius: '10px',
              border: `1px solid ${isDark ? 'rgba(56,189,248,0.4)' : '#dce5ef'}`,
              background: isDark ? '#0f172a' : '#fff',
              color: isDark ? '#38bdf8' : '#087cf0',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            {isDark ? '☀️ Studio Mode' : '🌙 Cyber Mode'}
          </button>
          <a
            href="https://www.nexuscreative.site/"
            target="_blank"
            rel="noreferrer"
            style={{ color: isDark ? '#38bdf8' : '#31516f' }}
          >
            nexuscreative.site <span>↗</span>
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="intro">
          <span className="eyebrow">3D INTERACTIVE SHOWCASE</span>
          <h1 style={{ color: isDark ? '#f8fafc' : '#122b47' }}>
            Technology that
            <br />
            <em>connects business.</em>
          </h1>
          <p style={{ color: isDark ? '#94a3b8' : '#64768a' }}>
            Explore our digital solutions and network infrastructure in a responsive, real-time 3D experience.
          </p>
          <div className="hint" style={{ color: isDark ? '#94a3b8' : '#6b7d90' }}>
            <span className="pulse" /> Drag to rotate · Scroll to zoom
          </div>
        </div>

        <div
          className="canvas-wrap"
          style={{
            borderColor: isDark ? 'rgba(56,189,248,0.25)' : '#e0e8f1',
            background: isDark
              ? 'radial-gradient(ellipse at 52% 44%, #0b152d 0%, #050a18 70%)'
              : 'radial-gradient(ellipse at 52% 44%, #fff 0%, #f4f8fc 70%)',
          }}
        >
          <Canvas shadows camera={{ position: [6, 5.2, 8.5], fov: 38 }} dpr={[1, 1.7]}>
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" args={[bgColor, 11, 22]} />
            <Suspense
              fallback={
                <Html center>
                  <span className="loading" style={{ color: isDark ? '#38bdf8' : '#54718b' }}>
                    Building 3D hub…
                  </span>
                </Html>
              }
            >
              <Scene isDark={isDark} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              ref={controlsRef}
              makeDefault
              enablePan={false}
              minDistance={6}
              maxDistance={13}
              minPolarAngle={Math.PI / 4.5}
              maxPolarAngle={Math.PI / 2.05}
              target={[0, 1.15, 0]}
            />
          </Canvas>
          <div className="canvas-label" style={{ color: isDark ? '#94a3b8' : '#71859a' }}>
            NEXUS TECH HUB <span>• LIVE 3D</span>
          </div>
        </div>
      </section>

      <section className="services" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#dce5ef' }}>
        <div className="section-title">
          <span>WHAT WE DO</span>
          <h2 style={{ color: isDark ? '#f8fafc' : '#122b47' }}>One partner. Two technology divisions.</h2>
        </div>
        <div className="service-grid">
          <Service symbol="⌘" title="Website Development" />
          <Service symbol="↗" title="Digital Marketing" />
          <Service symbol="⌁" title="Routers & Switches" />
          <Service symbol="⬡" title="Firewalls" />
          <Service symbol="◉" title="CCTV & Surveillance" />
          <Service symbol="⟿" title="Fiber & Cabling" />
          <Service symbol="⚙" title="Installation & Commissioning" />
        </div>
      </section>

      <footer style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#dce5ef', color: isDark ? '#94a3b8' : '#718398' }}>
        <span>© {new Date().getFullYear()} Nexus Creative</span>
        <span>Connecting Businesses. Empowering Growth.</span>
        <a href="https://www.nexuscreative.site/">Visit website ↗</a>
      </footer>
    </main>
  );
}