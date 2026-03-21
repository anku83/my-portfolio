"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const count = 900;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 18;
      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(100, 100) },
        uVelocity: { value: new THREE.Vector2(0, 0) },
        uBrush: { value: 0 },
        uPointer: { value: 0 }
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uVelocity;
        uniform float uBrush;
        uniform float uPointer;
        varying float vScale;
        varying float vGlow;

        void main() {
          vec3 transformed = position;
          float wave = sin(uTime * 0.16 + transformed.x * 0.7 + transformed.z * 0.45) * 0.28;
          transformed.y += wave * (0.35 + aScale * 0.65);
          transformed.x += cos(uTime * 0.12 + transformed.y) * 0.07;

          vec2 cursorDelta = transformed.xy - uMouse;
          float dist = length(cursorDelta);
          float field = exp(-dist * dist * 0.34);
          vec2 direction = normalize(cursorDelta + vec2(0.0001));
          transformed.xy += direction * field * uBrush * (0.22 + aScale * 0.2);
          transformed.xy += uVelocity * field * (0.55 + aScale * 0.4) * uPointer;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_PointSize = (2.2 + aScale * 3.7 + field * 6.0 * uPointer) * (14.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vScale = aScale;
          vGlow = field * uPointer;
        }
      `,
      fragmentShader: `
        varying float vScale;
        varying float vGlow;

        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          float softness = smoothstep(0.5, 0.0, dist);
          float alpha = softness * (0.12 + vScale * 0.22 + vGlow * 0.24);
          vec3 colorA = vec3(0.98, 0.98, 0.99);
          vec3 colorB = vec3(0.882, 0.114, 0.282);
          vec3 color = mix(colorA, colorB, clamp(vScale + vGlow * 0.7, 0.0, 1.0));
          color += vec3(0.12, 0.03, 0.06) * vGlow;
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    const targetMouse = new THREE.Vector2(100, 100);
    const pointerVelocity = new THREE.Vector2(0, 0);
    const previousPointer = new THREE.Vector2(0, 0);
    let brushStrength = 0;
    let pointerActive = 0;

    const handlePointer = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = -((event.clientY / window.innerHeight) - 0.5) * 9;

      pointerVelocity.set((x - previousPointer.x) * 0.18, (y - previousPointer.y) * 0.18);
      previousPointer.set(x, y);
      targetMouse.set(x, y);
      brushStrength = Math.min(0.95, brushStrength + pointerVelocity.length() * 0.95);
      pointerActive = 1;
    };

    const handleLeave = () => {
      pointerActive = 0;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerleave", handleLeave);

    let frame = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.lerp(targetMouse, 0.11);
      material.uniforms.uVelocity.value.lerp(pointerVelocity, 0.06);

      brushStrength += (0 - brushStrength) * 0.08;
      pointerActive += ((pointerActive > 0 ? 1 : 0) - pointerActive) * 0.08;
      pointerVelocity.multiplyScalar(0.92);

      material.uniforms.uBrush.value = brushStrength;
      material.uniforms.uPointer.value = pointerActive;

      points.rotation.y = elapsed * 0.02;
      points.rotation.x = Math.sin(elapsed * 0.14) * 0.04;
      camera.position.x += (material.uniforms.uMouse.value.x * 0.045 - camera.position.x) * 0.04;
      camera.position.y += (material.uniforms.uMouse.value.y * 0.045 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerleave", handleLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true" />;
}
