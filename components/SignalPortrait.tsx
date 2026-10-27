"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider";

const VERT = `
attribute vec3 position;
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime;
uniform float uProgress;
uniform vec2 uPointer;
uniform float uHover;
uniform vec2 uCenter;
uniform float uScale;
uniform vec2 uRes;
uniform float uDpr;
uniform float uPoint;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float p = smoothstep(.02, .8, uProgress);
  // Dispersed state: horizontal amber streams.
  vec3 target = vec3((aSeed - .5) * 2.5, sin(aSeed * 25.1327) * .055 + (floor(position.x * 4. + 2.) - 2.) * .18, 0.);
  vec3 pos = mix(position, target, p);
  float edge = smoothstep(.18, .5, abs(position.x));
  pos.x += sin(uTime * .3 + aSeed * 40.) * .008 * (edge + p);

  // Hover: particles near the cursor fly away from it.
  vec2 dir = pos.xy - uPointer;
  float d = length(dir);
  float f = exp(-d * d / .009) * uHover;
  pos.xy += normalize(dir + vec2(1e-4)) * f * (.05 + .09 * aSeed);
  pos.xy += vec2(sin(aSeed * 91.), cos(aSeed * 57.)) * f * .025;

  vec2 px = uCenter + vec2(pos.x, -pos.y) * uScale;
  vec2 clip = px / uRes * 2. - 1.;
  gl_Position = vec4(clip.x, -clip.y, 0., 1.);
  gl_PointSize = (1.15 + dot(aColor, vec3(.299, .587, .114)) * .9) * uDpr * uPoint;
  vColor = mix(aColor, vec3(1., .44, .18), max(p * .55, f * .6));
  vAlpha = (1. - p * .35) * smoothstep(.5, .36, abs(position.y));
}`;

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5, .27, d) * vAlpha;
  if (a < .025) discard;
  gl_FragColor = vec4(min(vColor * 1.25, vec3(1.)) * a, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

/**
 * A fixed backdrop behind the hero: the processed photo plus a field of light
 * particles sampled from it. The portrait stays put while the page scrolls;
 * particles assemble on load, scatter around the cursor and stream away into
 * amber lines as the hero leaves, while the hero copy drifts up and fades.
 *
 * It sits over the hero's [data-portrait-anchor] and moves [data-hero-content].
 */
export function SignalPortrait({ src }: { src: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { motion } = useMotion();
  const [live, setLive] = useState(false);

  // Size and place the portrait from the in-flow anchor; hide the layer once the hero is gone.
  useEffect(() => {
    const layer = layerRef.current;
    const art = artRef.current;
    const section = layer?.closest("section");
    const anchor = section?.querySelector<HTMLElement>("[data-portrait-anchor]");
    if (!layer || !art || !section || !anchor) return;

    const place = () => {
      let top = 0;
      for (let el: HTMLElement | null = anchor; el; el = el.offsetParent as HTMLElement | null) top += el.offsetTop;
      const w = anchor.offsetWidth * 1.21;
      art.style.width = `${w}px`;
      art.style.top = `${top - w * 1.25 * 0.04}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(anchor);
    window.addEventListener("resize", place);
    const io = new IntersectionObserver(([e]) => {
      layer.style.visibility = e.isIntersecting ? "visible" : "hidden";
    });
    io.observe(section);
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    const art = artRef.current;
    const canvas = canvasRef.current;
    const section = layer?.closest("section");
    const content = section?.querySelector<HTMLElement>("[data-hero-content]");
    const photo = imgRef.current;
    if (!motion || !art || !canvas || !section) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let count = 0;
    let buffers: WebGLBuffer[] = [];
    let program: WebGLProgram | null = null;
    const u: Record<string, WebGLUniformLocation | null> = {};
    const state = { progress: 1, content: 0, hover: 0, px: 0, py: 0, tx: 0, ty: 0, inside: false, last: 0, born: 0 };
    const geo = { cx: 0, cy: 0, h: 1, w: 0, hgt: 0, dpr: 1 };

    function measure() {
      // Supersample on standard screens so the dots stay round and fine.
      const dpr = Math.min(2, Math.max(1.5, window.devicePixelRatio || 1));
      const c = canvas!.getBoundingClientRect();
      const a = art!.getBoundingClientRect();
      const cw = Math.round(c.width * dpr);
      const ch = Math.round(c.height * dpr);
      if (canvas!.width !== cw || canvas!.height !== ch) {
        canvas!.width = cw;
        canvas!.height = ch;
        gl!.viewport(0, 0, cw, ch);
      }
      geo.w = c.width;
      geo.hgt = c.height;
      geo.cx = a.left - c.left + a.width / 2;
      geo.cy = a.top - c.top + a.height / 2;
      geo.h = a.height;
      geo.dpr = dpr;
    }

    function build(img: HTMLImageElement) {
      const artW = art!.getBoundingClientRect().width;
      const cols = Math.max(140, Math.min(300, Math.round(artW / 2.13)));
      const rows = Math.round(cols * 1.25);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const ctx = off.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;
      const pos: number[] = [];
      const col: number[] = [];
      const seed: number[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;
          const r = (data[i] / 255) * a;
          const g = (data[i + 1] / 255) * a;
          const b = (data[i + 2] / 255) * a;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 0.035) continue;
          const s = ((127 * x + 311 * y) % 997) / 997;
          // A little jitter breaks up the square grid into a finer, hand-printed texture.
          const jx = (((s * 7919) % 1) - 0.5) * 0.35;
          const jy = (((s * 104729) % 1) - 0.5) * 0.35;
          pos.push(((x + jx) / cols - 0.5) * 0.8, 0.5 - (y + jy) / rows, 0);
          col.push(r, g, b);
          seed.push(s);
        }
      }
      count = seed.length;

      program = gl!.createProgram()!;
      gl!.attachShader(program, compile(gl!, gl!.VERTEX_SHADER, VERT));
      gl!.attachShader(program, compile(gl!, gl!.FRAGMENT_SHADER, FRAG));
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) throw new Error("link");
      gl!.useProgram(program);

      const attr = (name: string, arr: number[], size: number) => {
        const buf = gl!.createBuffer()!;
        buffers.push(buf);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
        gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(arr), gl!.STATIC_DRAW);
        const loc = gl!.getAttribLocation(program!, name);
        gl!.enableVertexAttribArray(loc);
        gl!.vertexAttribPointer(loc, size, gl!.FLOAT, false, 0, 0);
      };
      attr("position", pos, 3);
      attr("aColor", col, 3);
      attr("aSeed", seed, 1);
      for (const name of ["uTime", "uProgress", "uPointer", "uHover", "uCenter", "uScale", "uRes", "uDpr", "uPoint"]) {
        u[name] = gl!.getUniformLocation(program!, name);
      }
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.clearColor(0, 0, 0, 0);
    }

    function frame(now: number) {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = Math.min(0.05, state.last ? (now - state.last) / 1000 : 0.016);
      state.last = now;

      // Hero scroll progress: 0 at the top, 1 once the hero has scrolled away.
      const r = section!.getBoundingClientRect();
      const target = Math.min(1, Math.max(0, -r.top / r.height));
      state.progress += (target - state.progress) * (1 - Math.exp(-3 * dt));
      state.hover += ((state.inside ? 1 : 0) - state.hover) * (1 - Math.exp(-6 * dt));
      state.px += (state.tx - state.px) * (1 - Math.exp(-14 * dt));
      state.py += (state.ty - state.py) * (1 - Math.exp(-14 * dt));

      // Hero copy drifts up and dims after the first quarter of the scroll.
      const q = Math.min(1, Math.max(0, (target - 0.25) / 0.75));
      state.content += (q - state.content) * (1 - Math.exp(-6 * dt));
      if (content) {
        content.style.transform = `translate3d(0, ${(-65 * state.content).toFixed(2)}px, 0)`;
        content.style.opacity = (1 - 0.65 * state.content).toFixed(3);
      }
      // The photo under the particles fades in once, then dims as they stream away.
      if (!state.born) state.born = now;
      if (photo) {
        const intro = Math.min(1, (now - state.born) / 1200);
        photo.style.opacity = (0.38 * intro * (1 - 0.7 * state.progress)).toFixed(3);
      }

      measure();
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(u.uTime, now / 1000);
      gl!.uniform1f(u.uProgress, state.progress);
      gl!.uniform2f(u.uPointer, state.px, state.py);
      gl!.uniform1f(u.uHover, state.hover);
      gl!.uniform2f(u.uCenter, geo.cx, geo.cy);
      gl!.uniform1f(u.uScale, geo.h);
      gl!.uniform2f(u.uRes, geo.w, geo.hgt);
      gl!.uniform1f(u.uDpr, geo.dpr);
      gl!.uniform1f(u.uPoint, Math.max(0.9, Math.min(1.1, geo.h / 640)));
      gl!.drawArrays(gl!.POINTS, 0, count);
      raf = requestAnimationFrame(frame);
    }

    const start = () => {
      if (!raf && !disposed && program) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const a = art.getBoundingClientRect();
      const x = (e.clientX - (a.left + a.width / 2)) / a.height;
      const y = -(e.clientY - (a.top + a.height / 2)) / a.height;
      state.tx = x;
      state.ty = y;
      state.inside = Math.abs(x) < 0.45 && Math.abs(y) < 0.55;
    };
    const onLeave = () => (state.inside = false);
    const onVis = () => start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      state.last = 0;
      start();
    });

    const img = new Image();
    img.onload = () => {
      if (disposed) return;
      try {
        build(img);
        measure();
        setLive(true);
        io.observe(section);
        start();
      } catch {
        setLive(false);
      }
    };
    img.src = src;

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (program) gl.deleteProgram(program);
      buffers = [];
      if (content) {
        content.style.transform = "";
        content.style.opacity = "";
      }
      if (photo) photo.style.opacity = "0.85";
      setLive(false);
    };
  }, [src, motion]);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div ref={artRef} className="absolute left-1/2 aspect-[4/5] -translate-x-1/2">
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="h-full w-full object-contain [mask-image:linear-gradient(#000_50%,transparent_93%)]"
          style={{ opacity: live ? 0 : 0.85 }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ display: motion ? "block" : "none" }} />
    </div>
  );
}
