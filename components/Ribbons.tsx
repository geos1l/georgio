"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Transform, Vec3, Color, Polyline } from "ogl";
import "./Ribbons.css";

interface RibbonsProps {
  colors?: string[];
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  offsetFactor?: number;
  maxAge?: number;
  pointCount?: number;
  speedMultiplier?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
  backgroundColor?: number[];
  opacity?: number;
}

const Ribbons: React.FC<RibbonsProps> = ({
  colors = ["#333", "#444", "#555", "#666"],
  baseSpring = 0.02,
  baseFriction = 0.92,
  baseThickness = 22,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.5,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0],
  opacity = 0.75,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: window.devicePixelRatio || 2,
      alpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(
      backgroundColor[0],
      backgroundColor[1],
      backgroundColor[2],
      backgroundColor[3]
    );

    gl.canvas.style.position = "absolute";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines: {
      spring: number;
      friction: number;
      mouseVelocity: Vec3;
      mouseOffset: Vec3;
      points: Vec3[];
      polyline: Polyline;
    }[] = [];

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;
      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);
        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
        if (uEnableShaderEffect > 0.5) {
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        }
        return current;
      }
      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
        float fadeFactor = 1.0;
        if (uEnableFade > 0.5) {
          fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
        }
        gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

    function resize() {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      lines.forEach((line) => line.polyline.resize());
    }
    window.addEventListener("resize", resize);

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const spring = baseSpring + (Math.random() - 0.5) * 0.01;
      const friction = baseFriction + (Math.random() - 0.5) * 0.02;
      const thickness = baseThickness + (Math.random() - 0.5) * 3;
      const mouseOffset = new Vec3(
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.1,
        0
      );

      const line = {
        spring,
        friction,
        mouseVelocity: new Vec3(),
        mouseOffset,
        points: [] as Vec3[],
        polyline: {} as Polyline,
      };

      const points: Vec3[] = [];
      for (let i = 0; i < pointCount; i++) points.push(new Vec3());
      line.points = points;

      line.polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: thickness },
          uOpacity: { value: opacity },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1.0 : 0.0 },
        },
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    resize();

    const mouse = new Vec3();
    // Listen on window so ribbons track cursor even with pointer-events: none on container
    function updateMouse(e: MouseEvent | TouchEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let x: number, y: number;
      if ("changedTouches" in e && e.changedTouches.length) {
        x = e.changedTouches[0].clientX - rect.left;
        y = e.changedTouches[0].clientY - rect.top;
      } else if (e instanceof MouseEvent) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else {
        return;
      }
      mouse.set(
        (x / container.clientWidth) * 2 - 1,
        (y / container.clientHeight) * -2 + 1,
        0
      );
    }
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("touchmove", updateMouse);

    const tmp = new Vec3();
    let frameId: number;
    let lastTime = performance.now();

    function update() {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      lines.forEach((line) => {
        tmp
          .copy(mouse)
          .add(line.mouseOffset)
          .sub(line.points[0])
          .multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
          const segmentDelay = maxAge / (line.points.length - 1);
          const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
          line.points[i].lerp(line.points[i - 1], alpha);
        }

        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    }
    update();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("touchmove", updateMouse);
      cancelAnimationFrame(frameId);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor,
  ]);

  return <div ref={containerRef} className="ribbons-container" />;
};

export default Ribbons;
