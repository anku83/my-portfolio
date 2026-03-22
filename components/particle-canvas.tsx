"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Particle = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  seed: number;
  size: number;
  drift: number;
  parallax: number;
  interaction: number;
  tint: number;
};

const LAYER_CONFIG = [
  { depth: -12, speed: 0.12, size: 1.15, interaction: 0.45, tint: 0.0 },
  { depth: -6, speed: 0.2, size: 1.6, interaction: 0.72, tint: 0.08 },
  { depth: 0, speed: 0.32, size: 2.2, interaction: 1, tint: 0.16 }
] as const;

const GOLD_LIGHT = new THREE.Color("#f8e7a0");
const GOLD_BASE = new THREE.Color("#d4af37");
const GOLD_DEEP = new THREE.Color("#8f6a16");

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computeParticleCount(width: number, height: number) {
  const area = width * height;
  const density = window.matchMedia("(pointer: coarse)").matches ? 1 / 11000 : 1 / 6800;
  return clamp(Math.round(area * density), 220, 1180);
}

function createParticles(width: number, height: number) {
  const count = computeParticleCount(width, height);
  const particles: Particle[] = [];
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const layerShare = [0.32, 0.36, 0.32];

  let created = 0;

  LAYER_CONFIG.forEach((layer, layerIndex) => {
    let layerCreated = 0;
    const targetCount =
      layerIndex === LAYER_CONFIG.length - 1
        ? count - created
        : Math.round(count * layerShare[layerIndex]);

    const aspect = width / height;
    const cols = Math.max(1, Math.round(Math.sqrt(targetCount * aspect)));
    const rows = Math.max(1, Math.ceil(targetCount / cols));
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const xMin = -width / 2;
    const yMin = -height / 2;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (created >= count || layerCreated >= targetCount) {
          break;
        }

        const jitterX = (Math.random() - 0.5) * cellWidth * 0.52;
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.52;
        const originX = xMin + col * cellWidth + cellWidth * 0.5 + jitterX;
        const originY = yMin + row * cellHeight + cellHeight * 0.5 + jitterY;
        const size = layer.size + Math.random() * (1.1 + layerIndex * 0.45);
        const tint = clamp(layer.tint + (Math.random() - 0.5) * 0.1, 0, 1);

        const particle: Particle = {
          originX,
          originY,
          x: originX,
          y: originY,
          z: layer.depth,
          vx: 0,
          vy: 0,
          seed: Math.random() * Math.PI * 2,
          size,
          drift: layer.speed * (0.7 + Math.random() * 0.9),
          parallax: 0.12 + layerIndex * 0.12,
          interaction: layer.interaction,
          tint
        };

        const i3 = created * 3;
        particles.push(particle);

        positions[i3] = particle.x;
        positions[i3 + 1] = particle.y;
        positions[i3 + 2] = particle.z;

        const color = GOLD_BASE.clone().lerp(GOLD_LIGHT, tint * 0.8).lerp(GOLD_DEEP, (1 - tint) * 0.18);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        sizes[created] = size;

        created += 1;
        layerCreated += 1;
      }
    }
  });

  return { particles, positions, colors, sizes };
}

export function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    let viewportWidth = 0;
    let viewportHeight = 0;
    let worldWidth = 0;
    let worldHeight = 0;
    let pointsGeometry: THREE.BufferGeometry | null = null;
    let pointsMaterial: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;
    let lineGeometry: THREE.BufferGeometry | null = null;
    let lineMaterial: THREE.LineBasicMaterial | null = null;
    let lines: THREE.LineSegments | null = null;
    let linePositions = new Float32Array(0);
    let lineColors = new Float32Array(0);
    let particles: Particle[] = [];
    let positionAttribute: THREE.BufferAttribute | null = null;

    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerVelocity = new THREE.Vector2();
    const lastPointer = new THREE.Vector2(Number.NaN, Number.NaN);
    const parallax = new THREE.Vector2();
    const parallaxTarget = new THREE.Vector2();
    let pointerActive = false;

    const rebuildScene = () => {
      if (points) {
        scene.remove(points);
        pointsGeometry?.dispose();
        pointsMaterial?.dispose();
      }

      if (lines) {
        scene.remove(lines);
        lineGeometry?.dispose();
        lineMaterial?.dispose();
      }

      const generated = createParticles(worldWidth, worldHeight);
      particles = generated.particles;

      pointsGeometry = new THREE.BufferGeometry();
      positionAttribute = new THREE.BufferAttribute(generated.positions, 3);
      pointsGeometry.setAttribute("position", positionAttribute);
      pointsGeometry.setAttribute("color", new THREE.BufferAttribute(generated.colors, 3));
      pointsGeometry.setAttribute("aSize", new THREE.BufferAttribute(generated.sizes, 1));

      pointsMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uPixelRatio: { value: renderer.getPixelRatio() }
        },
        vertexShader: `
          attribute float aSize;
          uniform float uPixelRatio;
          varying vec3 vColor;

          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = aSize * uPixelRatio;
            vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float dist = length(uv);
            float core = smoothstep(0.18, 0.0, dist);
            float halo = smoothstep(0.52, 0.16, dist);
            float alpha = core * 0.95 + halo * 0.28;

            if (alpha <= 0.01) discard;

            vec3 color = vColor * (0.9 + core * 0.75) + vec3(0.18, 0.13, 0.04) * halo;
            gl_FragColor = vec4(color, alpha);
          }
        `
      });

      points = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(points);

      const maxConnections = Math.min(180, Math.max(90, Math.round(particles.length * 0.2)));
      linePositions = new Float32Array(maxConnections * 2 * 3);
      lineColors = new Float32Array(maxConnections * 2 * 3);
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
      lineGeometry.setDrawRange(0, 0);

      lineMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.18,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
    };

    const resize = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      worldWidth = viewportWidth / 92;
      worldHeight = viewportHeight / 92;

      camera.left = -worldWidth / 2;
      camera.right = worldWidth / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(viewportWidth, viewportHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (pointsMaterial) {
        pointsMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      }

      rebuildScene();
    };

    const syncPointerFromEvent = (event: PointerEvent) => {
      const x = (event.clientX / viewportWidth - 0.5) * worldWidth;
      const y = -((event.clientY / viewportHeight) - 0.5) * worldHeight;

      if (Number.isFinite(lastPointer.x) && Number.isFinite(lastPointer.y)) {
        pointerVelocity.set(x - lastPointer.x, y - lastPointer.y);
      }

      lastPointer.set(x, y);
      pointerTarget.set(x, y);
      pointer.set(x, y);
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      pointerVelocity.set(0, 0);
      pointerTarget.set(0, 0);
      lastPointer.set(Number.NaN, Number.NaN);
    };

    const handleResize = () => resize();

    resize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", syncPointerFromEvent, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const positionAttr = positionAttribute;
      const positions = positionAttr?.array as Float32Array | undefined;
      if (!positionAttr || !positions || !lineGeometry) {
        frame = requestAnimationFrame(animate);
        return;
      }

      if (!pointerActive) {
        pointer.lerp(pointerTarget, 0.08);
      }

      parallaxTarget.set(
        clamp(pointer.x / (worldWidth * 0.5), -1, 1),
        clamp(pointer.y / (worldHeight * 0.5), -1, 1)
      );
      parallax.lerp(parallaxTarget, 0.08);

      const interactionRadius = Math.min(worldWidth, worldHeight) * 0.24;
      const connectionRadius = Math.min(worldWidth, worldHeight) * 0.17;
      const cursorConnectionRadius = interactionRadius * 1.1;
      const cursorIndices: number[] = [];

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const i3 = i * 3;
        const noiseX = Math.sin(elapsed * particle.drift + particle.seed) * 0.085;
        const noiseY = Math.cos(elapsed * (particle.drift * 0.82) + particle.seed * 1.37) * 0.085;
        const orbitX = Math.sin(elapsed * (0.12 + particle.drift * 0.18) + particle.seed * 0.5) * 0.12;
        const orbitY = Math.cos(elapsed * (0.1 + particle.drift * 0.16) + particle.seed * 0.8) * 0.1;
        const anchorX = particle.originX + parallax.x * particle.parallax + orbitX;
        const anchorY = particle.originY + parallax.y * particle.parallax + orbitY;

        let forceX = 0;
        let forceY = 0;

        if (pointerActive) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadius * interactionRadius) {
            const dist = Math.sqrt(distSq) || 0.0001;
            const influence = 1 - dist / interactionRadius;
            const directionX = dx / dist;
            const directionY = dy / dist;
            const velocityBoost = clamp(pointerVelocity.length() * 0.8, 0, 1.6);
            const pull = Math.sin(elapsed * 0.9 + particle.seed) * 0.08;
            const strength = (0.016 + velocityBoost * 0.02 + pull * 0.01) * particle.interaction * influence;

            forceX += directionX * strength;
            forceY += directionY * strength;

            if (dist < cursorConnectionRadius) {
              cursorIndices.push(i);
            }
          }
        }

        particle.vx += (anchorX - particle.x) * 0.016 + forceX + noiseX * 0.015;
        particle.vy += (anchorY - particle.y) * 0.016 + forceY + noiseY * 0.015;
        particle.vx *= 0.93;
        particle.vy *= 0.93;
        particle.x += particle.vx;
        particle.y += particle.vy;

        positions[i3] = particle.x;
        positions[i3 + 1] = particle.y;
        positions[i3 + 2] = particle.z;
      }

      positionAttr.needsUpdate = true;

      const linePositionAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      const lineColorAttr = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
      let segmentCount = 0;
      const maxSegments = linePositions.length / 6;

      const writeSegment = (
        ax: number,
        ay: number,
        az: number,
        bx: number,
        by: number,
        bz: number,
        alpha: number
      ) => {
        if (segmentCount >= maxSegments) return;
        const offset = segmentCount * 6;
        linePositions[offset] = ax;
        linePositions[offset + 1] = ay;
        linePositions[offset + 2] = az;
        linePositions[offset + 3] = bx;
        linePositions[offset + 4] = by;
        linePositions[offset + 5] = bz;

        const color = GOLD_BASE.clone().lerp(GOLD_LIGHT, clamp(alpha * 1.4, 0, 1));
        lineColors[offset] = color.r * alpha;
        lineColors[offset + 1] = color.g * alpha;
        lineColors[offset + 2] = color.b * alpha;
        lineColors[offset + 3] = color.r * alpha;
        lineColors[offset + 4] = color.g * alpha;
        lineColors[offset + 5] = color.b * alpha;
        segmentCount += 1;
      };

      const limitedCursorIndices = cursorIndices
        .sort((a, b) => {
          const dxA = particles[a].x - pointer.x;
          const dyA = particles[a].y - pointer.y;
          const dxB = particles[b].x - pointer.x;
          const dyB = particles[b].y - pointer.y;
          return dxA * dxA + dyA * dyA - (dxB * dxB + dyB * dyB);
        })
        .slice(0, 26);

      for (let i = 0; i < limitedCursorIndices.length; i += 1) {
        const a = particles[limitedCursorIndices[i]];
        const cursorDx = a.x - pointer.x;
        const cursorDy = a.y - pointer.y;
        const cursorDist = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy) || 0.0001;
        const cursorAlpha = clamp(1 - cursorDist / cursorConnectionRadius, 0, 1) * 0.48;
        if (pointerActive && cursorAlpha > 0.03) {
          writeSegment(pointer.x, pointer.y, 1.5, a.x, a.y, a.z, cursorAlpha);
        }

        for (let j = i + 1; j < limitedCursorIndices.length; j += 1) {
          const b = particles[limitedCursorIndices[j]];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = clamp(1 - dist / connectionRadius, 0, 1) * 0.34;
          if (alpha > 0.04) {
            writeSegment(a.x, a.y, a.z, b.x, b.y, b.z, alpha);
          }
        }
      }

      lineGeometry.setDrawRange(0, segmentCount * 2);
      linePositionAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", syncPointerFromEvent);
      window.removeEventListener("pointerleave", handlePointerLeave);
      pointsGeometry?.dispose();
      pointsMaterial?.dispose();
      lineGeometry?.dispose();
      lineMaterial?.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-90" aria-hidden="true" />;
}
