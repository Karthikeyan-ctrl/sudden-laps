import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { generateLapCurvePoints } from '../utils/trackMath';

export const ThreeLapScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to safeguard headless environments & low-power devices
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Group holding the full-size 3D Lap elements in background
    const trackGroup = new THREE.Group();
    scene.add(trackGroup);

    // Position track nicely framed in viewport
    trackGroup.position.set(0, 0.2, 0);
    trackGroup.rotation.x = 0.52;
    trackGroup.rotation.y = -0.32;
    trackGroup.rotation.z = 0.08;

    // Generate full-size 3D Lap Curve with wider scale for full-screen backdrop
    const rawPoints = generateLapCurvePoints(120, 3.6, 3.2, 0.85);
    const curvePoints = rawPoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    const curve = new THREE.CatmullRomCurve3(curvePoints, true, 'centripetal');

    // Primary extruded metallic ribbon/tube
    const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.18, 24, true);

    // Custom vertex colors along the loop tailored for crisp light mode:
    // Electric Purple (#7c3aed) -> Vibrant Blue (#2563eb) -> Vivid Coral (#e11d48)
    const count = tubeGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const colorPurple = new THREE.Color('#7c3aed');
    const colorBlue = new THREE.Color('#2563eb');
    const colorCoral = new THREE.Color('#e11d48');

    const tempColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const u = (i / count) % 1;
      if (u < 0.5) {
        tempColor.copy(colorPurple).lerp(colorBlue, u * 2);
      } else {
        tempColor.copy(colorBlue).lerp(colorCoral, (u - 0.5) * 2);
      }
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
    tubeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const tubeMat = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      metalness: 0.82,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.88,
    });

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    trackGroup.add(tubeMesh);

    // Secondary inner luminous guideline rail
    const innerTubeGeo = new THREE.TubeGeometry(curve, 100, 0.035, 12, true);
    const innerTubeMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.45,
    });
    const innerRail = new THREE.Mesh(innerTubeGeo, innerTubeMat);
    trackGroup.add(innerRail);

    // Orbiting "Level / Pulse" Beacon (vivid coral marker)
    const beaconGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xe11d48,
      emissiveIntensity: 1.4,
      roughness: 0.15,
      metalness: 0.2,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    trackGroup.add(beaconMesh);

    // Soft beacon halo for light theme
    const haloGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.18,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    beaconMesh.add(haloMesh);

    // Floating micro-particles in 3D volume
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7c3aed,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Studio Lighting for light theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x7c3aed, 2.2);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x2563eb, 1.8);
    fillLight.position.set(-6, -4, 5);
    scene.add(fillLight);

    const coralLight = new THREE.PointLight(0xe11d48, 2.8, 14);
    coralLight.position.set(4, -3, 4);
    scene.add(coralLight);

    // Mouse pointer interaction
    let mouseX = 0;
    let mouseY = 0;
    const targetRotX = 0.52;
    let currentSpinY = -0.32;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Scroll-driven reaction
    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.0012;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    let frameId = 0;
    let beaconProgress = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      const now = performance.now();
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Move beacon along lap
      beaconProgress = (beaconProgress + delta * 0.18) % 1;
      const pointOnCurve = curve.getPointAt(beaconProgress);
      beaconMesh.position.copy(pointOnCurve);

      // Gentle continuous spin
      currentSpinY += delta * 0.25;

      // Smooth damp toward target rotation + mouse tilt + scroll
      trackGroup.rotation.x += (targetRotX - mouseY * 0.35 + scrollOffset * 0.4 - trackGroup.rotation.x) * 0.05;
      trackGroup.rotation.y += (currentSpinY + mouseX * 0.45 + scrollOffset * 0.6 - trackGroup.rotation.y) * 0.05;

      // Ambient particle slow drift
      particleSystem.rotation.y += 0.0008;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isSoftwareGl) {
      afterDraw(animate);
    } else {
      frameId = requestAnimationFrame(animate);
    }

    // Window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      tubeGeo.dispose();
      tubeMat.dispose();
      innerTubeGeo.dispose();
      innerTubeMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
    >
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
