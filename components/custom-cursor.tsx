"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const robotRef = useRef<HTMLDivElement | null>(null);
  const chassisRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const faceRef = useRef<HTMLDivElement | null>(null);
  const leftEyeRef = useRef<HTMLSpanElement | null>(null);
  const rightEyeRef = useRef<HTMLSpanElement | null>(null);
  const mouthRef = useRef<HTMLSpanElement | null>(null);
  const leftBrowRef = useRef<HTMLSpanElement | null>(null);
  const rightBrowRef = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const leftLegRef = useRef<HTMLSpanElement | null>(null);
  const rightLegRef = useRef<HTMLSpanElement | null>(null);
  const leftShoeRef = useRef<HTMLSpanElement | null>(null);
  const rightShoeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const robot = robotRef.current;
    const chassis = chassisRef.current;
    const head = headRef.current;
    const face = faceRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const mouth = mouthRef.current;
    const leftBrow = leftBrowRef.current;
    const rightBrow = rightBrowRef.current;
    const body = bodyRef.current;
    const leftLeg = leftLegRef.current;
    const rightLeg = rightLegRef.current;
    const leftShoe = leftShoeRef.current;
    const rightShoe = rightShoeRef.current;

    if (
      !robot ||
      !chassis ||
      !head ||
      !face ||
      !leftEye ||
      !rightEye ||
      !mouth ||
      !leftBrow ||
      !rightBrow ||
      !body ||
      !leftLeg ||
      !rightLeg ||
      !leftShoe ||
      !rightShoe ||
      window.innerWidth < 768 ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let cleanup = () => {};

    const ctx = gsap.context(() => {
      const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const position = { ...pointer };
      const motion = {
        direction: 1,
        facing: 1,
        hoverScale: 1,
        angry: 0,
        hurt: 0,
        enjoy: 0,
        smile: 1,
        blink: 0,
      };

      let lastX = pointer.x;
      let moveSpeed = 0;
      let walkCycle = 0;
      let hurtUntil = 0;
      let hoveringInteractive = false;
      let blinkTween: gsap.core.Tween | null = null;

      const setRobotX = gsap.quickSetter(robot, "x", "px");
      const setRobotY = gsap.quickSetter(robot, "y", "px");
      const setRobotScaleX = gsap.quickSetter(robot, "scaleX");
      const setRobotScaleY = gsap.quickSetter(robot, "scaleY");
      const setChassisRotate = gsap.quickSetter(chassis, "rotate", "deg");
      const setHeadRotate = gsap.quickSetter(head, "rotate", "deg");
      const setHeadY = gsap.quickSetter(head, "y", "px");
      const setFaceX = gsap.quickSetter(face, "x", "px");
      const setBodyY = gsap.quickSetter(body, "y", "px");
      const setBodyRotate = gsap.quickSetter(body, "rotate", "deg");
      const setMouthScaleX = gsap.quickSetter(mouth, "scaleX");
      const setMouthScaleY = gsap.quickSetter(mouth, "scaleY");
      const setMouthY = gsap.quickSetter(mouth, "y", "px");
      const setMouthRotate = gsap.quickSetter(mouth, "rotate", "deg");
      const setLeftEyeScaleY = gsap.quickSetter(leftEye, "scaleY");
      const setRightEyeScaleY = gsap.quickSetter(rightEye, "scaleY");
      const setLeftEyeScaleX = gsap.quickSetter(leftEye, "scaleX");
      const setRightEyeScaleX = gsap.quickSetter(rightEye, "scaleX");
      const setLeftBrowRotate = gsap.quickSetter(leftBrow, "rotate", "deg");
      const setRightBrowRotate = gsap.quickSetter(rightBrow, "rotate", "deg");
      const setLeftBrowY = gsap.quickSetter(leftBrow, "y", "px");
      const setRightBrowY = gsap.quickSetter(rightBrow, "y", "px");
      const setLeftLegRotate = gsap.quickSetter(leftLeg, "rotate", "deg");
      const setRightLegRotate = gsap.quickSetter(rightLeg, "rotate", "deg");
      const setLeftLegY = gsap.quickSetter(leftLeg, "y", "px");
      const setRightLegY = gsap.quickSetter(rightLeg, "y", "px");
      const setLeftShoeRotate = gsap.quickSetter(leftShoe, "rotate", "deg");
      const setRightShoeRotate = gsap.quickSetter(rightShoe, "rotate", "deg");
      const setLeftShoeY = gsap.quickSetter(leftShoe, "y", "px");
      const setRightShoeY = gsap.quickSetter(rightShoe, "y", "px");

      gsap.set(robot, {
        xPercent: -50,
        yPercent: -50,
        x: position.x,
        y: position.y,
        force3D: true,
        transformOrigin: "50% 50%",
        willChange: "transform",
      });
      gsap.set([chassis, head, face, body, leftLeg, rightLeg, leftShoe, rightShoe, mouth, leftBrow, rightBrow], {
        force3D: true,
        willChange: "transform",
      });
      gsap.set([leftEye, rightEye], {
        transformOrigin: "50% 50%",
        force3D: true,
        willChange: "transform",
      });
      gsap.set([leftLeg, rightLeg], {
        transformOrigin: "50% 0%",
      });
      gsap.set([leftShoe, rightShoe], {
        transformOrigin: "50% 50%",
      });

      const blink = () => {
        const delay = gsap.utils.random(1.6, 3.4);
        blinkTween = gsap.delayedCall(delay, () => {
          gsap.timeline({
            onComplete: blink,
          })
            .to(motion, {
              blink: 1,
              duration: 0.08,
              ease: "power2.out",
              overwrite: true,
            })
            .to(motion, {
              blink: 0,
              duration: 0.14,
              ease: "power2.inOut",
              overwrite: true,
            });
        });
      };

      blink();

      const handleMove = (event: PointerEvent) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;

        const deltaX = event.clientX - lastX;
        lastX = event.clientX;

        if (Math.abs(deltaX) > 0.35) {
          motion.direction = deltaX > 0 ? 1 : -1;
        }
      };

      const handleHover = (event: PointerEvent) => {
        const target = event.target as HTMLElement | null;
        hoveringInteractive = Boolean(target?.closest('[data-cursor="hover"]'));

        gsap.to(motion, {
          hoverScale: hoveringInteractive ? 1.1 : 1,
          duration: 0.22,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const handlePress = () => {
        hurtUntil = performance.now() + 220;
      };

      const tick = () => {
        position.x += (pointer.x - position.x) * 0.42;
        position.y += (pointer.y - position.y) * 0.42;

        const velocityX = pointer.x - position.x;
        const velocityY = pointer.y - position.y;
        const instantaneousSpeed = Math.min(1, Math.hypot(velocityX, velocityY) / 24);

        moveSpeed += (instantaneousSpeed - moveSpeed) * 0.22;
        motion.facing += (motion.direction - motion.facing) * 0.18;

        const now = performance.now();
        const hurtTarget = now < hurtUntil ? 1 : 0;
        const enjoyTarget = hurtTarget > 0 ? 0 : hoveringInteractive ? 1 : 0;
        const angryTarget = hurtTarget > 0 || enjoyTarget > 0 ? 0 : gsap.utils.clamp(0, 1, (moveSpeed - 0.22) / 0.48);
        const smileTarget = 1 - Math.max(hurtTarget, enjoyTarget, angryTarget);

        motion.hurt += (hurtTarget - motion.hurt) * 0.22;
        motion.enjoy += (enjoyTarget - motion.enjoy) * 0.16;
        motion.angry += (angryTarget - motion.angry) * 0.18;
        motion.smile += (smileTarget - motion.smile) * 0.14;

        walkCycle += 0.08 + moveSpeed * 0.45;

        const gait = Math.sin(walkCycle);
        const counterGait = Math.sin(walkCycle + Math.PI);
        const leftForward = Math.max(0, gait);
        const rightForward = Math.max(0, counterGait);
        const leftBack = Math.max(0, -gait);
        const rightBack = Math.max(0, -counterGait);
        const bounce = Math.abs(Math.sin(walkCycle * 2)) * (0.9 + moveSpeed * 2.6);
        const stride = 10 + moveSpeed * 22;
        const legLift = 0.9 + moveSpeed * 3.4;
        const tilt = motion.facing * (4 + moveSpeed * 8);
        const hurtJolt = motion.hurt * 3.5;

        const smileBlend = motion.smile + motion.enjoy * 0.65;
        const angryBlend = motion.angry;
        const hurtBlend = motion.hurt;
        const mouthScaleX = 1 + smileBlend * 0.35 - hurtBlend * 0.2 + angryBlend * 0.05;
        const mouthScaleY = 0.7 + smileBlend * 0.45 + hurtBlend * 0.18 - angryBlend * 0.12;
        const mouthY = smileBlend * 1.1 + motion.enjoy * 0.9 - angryBlend * 0.5 - hurtBlend * 1.8;
        const mouthRotate = motion.facing * (angryBlend * 3 - motion.enjoy * 1.6);
        const eyeScaleX = 1 + motion.enjoy * 0.18 - angryBlend * 0.12;
        const baseEyeScaleY = Math.max(0.5, 1 - angryBlend * 0.32 - hurtBlend * 0.24);
        const eyeScaleY = Math.max(0.08, baseEyeScaleY * (1 - motion.blink * 0.92));
        const browAngle = angryBlend * 18 + hurtBlend * 8 - motion.enjoy * 4;
        const browY = -angryBlend * 1.5 - hurtBlend * 0.6 + motion.enjoy * 0.4;

        setRobotX(position.x);
        setRobotY(position.y);
        setRobotScaleX(motion.hoverScale * motion.facing);
        setRobotScaleY(motion.hoverScale);
        setChassisRotate(tilt * 0.16 + gait * moveSpeed * 1.5 - hurtJolt * motion.facing);
        setHeadRotate(tilt * 0.22 - gait * moveSpeed * 1.1 - hurtJolt * 0.5);
        setHeadY(-bounce * 0.5 - hurtBlend * 1.1);
        setFaceX(motion.facing * (1.2 + moveSpeed * 1.6));
        setBodyY(bounce * 0.42 + hurtBlend * 0.8);
        setBodyRotate(-tilt * 0.08 + counterGait * moveSpeed * 0.8);

        setMouthScaleX(mouthScaleX);
        setMouthScaleY(mouthScaleY);
        setMouthY(mouthY);
        setMouthRotate(mouthRotate);
        setLeftEyeScaleX(eyeScaleX);
        setRightEyeScaleX(eyeScaleX);
        setLeftEyeScaleY(eyeScaleY);
        setRightEyeScaleY(eyeScaleY);
        setLeftBrowRotate(-browAngle);
        setRightBrowRotate(browAngle);
        setLeftBrowY(browY);
        setRightBrowY(browY);

        setLeftLegRotate(gait * stride - tilt * 0.15);
        setRightLegRotate(counterGait * stride - tilt * 0.15);
        setLeftLegY(-(rightForward * legLift) + leftBack * 0.6);
        setRightLegY(-(leftForward * legLift) + rightBack * 0.6);
        setLeftShoeRotate(-gait * (stride * 0.5) + leftForward * 6);
        setRightShoeRotate(-counterGait * (stride * 0.5) + rightForward * 6);
        setLeftShoeY(-(rightForward * legLift * 0.7) + leftBack * 0.8);
        setRightShoeY(-(leftForward * legLift * 0.7) + rightBack * 0.8);
      };

      document.addEventListener("pointermove", handleMove, { passive: true });
      document.addEventListener("pointerover", handleHover, { passive: true });
      document.addEventListener("pointerdown", handlePress, { passive: true });
      gsap.ticker.add(tick);

      cleanup = () => {
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerover", handleHover);
        document.removeEventListener("pointerdown", handlePress);
        gsap.ticker.remove(tick);
        blinkTween?.kill();
        gsap.killTweensOf(motion);
      };
    });

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={robotRef} className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block">
      <div ref={chassisRef} className="relative h-[54px] w-11">
        <div
          ref={headRef}
          className="absolute left-1/2 top-0 h-7 w-9 -translate-x-1/2 rounded-[11px] border border-[rgba(225,29,72,0.35)] bg-[linear-gradient(180deg,rgba(250,250,250,0.96),rgba(250,250,250,0.82))] shadow-[0_0_18px_rgba(250,250,250,0.18)]"
        >
          <span className="absolute left-1/2 top-[-5px] h-2 w-[1px] -translate-x-1/2 bg-[rgba(250,250,250,0.7)]" />
          <span className="absolute left-1/2 top-[-8px] h-2 w-2 -translate-x-1/2 rounded-full border border-[rgba(225,29,72,0.45)] bg-[rgba(225,29,72,0.18)]" />
          <span
            ref={leftBrowRef}
            className="absolute left-[9px] top-[7px] h-[1px] w-[7px] bg-[rgba(11,11,12,0.8)]"
          />
          <span
            ref={rightBrowRef}
            className="absolute right-[9px] top-[7px] h-[1px] w-[7px] bg-[rgba(11,11,12,0.8)]"
          />
          <div ref={faceRef} className="absolute inset-x-0 top-[10px] flex justify-center gap-[6px]">
            <span ref={leftEyeRef} className="block h-[6px] w-[6px] rounded-full bg-[#0B0B0C]" />
            <span ref={rightEyeRef} className="block h-[6px] w-[6px] rounded-full bg-[#0B0B0C]" />
          </div>
          <span
            ref={mouthRef}
            className="absolute left-1/2 top-[19px] h-[4px] w-[13px] -translate-x-1/2 rounded-b-full border-b border-[rgba(11,11,12,0.82)]"
          />
        </div>

        <div
          ref={bodyRef}
          className="absolute left-1/2 top-[28px] h-[14px] w-7 -translate-x-1/2 rounded-[7px] border border-[rgba(225,29,72,0.35)] bg-[linear-gradient(180deg,rgba(225,29,72,0.92),rgba(190,18,60,0.85))] shadow-[0_0_20px_rgba(225,29,72,0.22)]"
        >
          <span className="absolute left-[-4px] top-1/2 h-[1px] w-[5px] -translate-y-1/2 bg-[rgba(250,250,250,0.65)]" />
          <span className="absolute right-[-4px] top-1/2 h-[1px] w-[5px] -translate-y-1/2 bg-[rgba(250,250,250,0.65)]" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(250,250,250,0.9)]" />
        </div>

        <span
          ref={leftLegRef}
          className="absolute left-[14px] top-[40px] h-[12px] w-[2px] rounded-full bg-[rgba(250,250,250,0.92)]"
        />
        <span
          ref={rightLegRef}
          className="absolute right-[14px] top-[40px] h-[12px] w-[2px] rounded-full bg-[rgba(250,250,250,0.92)]"
        />
        <span
          ref={leftShoeRef}
          className="absolute left-[10px] top-[51px] h-[5px] w-[10px] rounded-full border border-[rgba(225,29,72,0.3)] bg-[#0B0B0C] shadow-[0_0_8px_rgba(11,11,12,0.25)]"
        />
        <span
          ref={rightShoeRef}
          className="absolute right-[10px] top-[51px] h-[5px] w-[10px] rounded-full border border-[rgba(225,29,72,0.3)] bg-[#0B0B0C] shadow-[0_0_8px_rgba(11,11,12,0.25)]"
        />
      </div>
    </div>
  );
}
