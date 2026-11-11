'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Mesh, PlaneGeometry, ShaderMaterial, Vector3 } from 'three';

// A scroll-driven ribbon of project screenshots that spirals past in 3D, then lands in a grid.
// The first six projects land in the grid; the rest only appear in the ribbon.
const WORK = [
  { title: 'Waldo & Lyle', image: '/work/waldoandlyle.webp' },
  { title: 'Wall To Wall Appliance Repair', image: '/work/walltowallappliancerepair.webp' },
  { title: 'AKK Painting', image: '/work/akkpainting.webp' },
  { title: 'Better View Windows and More', image: '/work/yourbetterview.webp' },
  { title: 'Grochow Law', image: '/work/grochowlaw.webp' },
  { title: 'RHA Collection', image: '/work/rhacollection.webp' },
  { title: 'Rick Barraza Real Estate', image: '/work/united23.webp' },
  { title: 'Confido CPA', image: '/work/confidocpa.webp' },
];

const CARD_W = 2.1;
const CARD_H = 1.32;
const GAP = 0.03;
const STEP = CARD_W + GAP;
const NX = 28;
const NY = 3;
const GZ = 8;
const SAMPLES = 1200;
const RIB_A = 0.14;
const RIB_B = 0.63;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - (1 - t) ** 3;
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

const VERT = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const FRAG = `uniform sampler2D map;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.02,.3,.42),texture2D(map,uv).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;

type Slot = { x: number; y: number; w: number; h: number; vw: number; vh: number; c: number; r: number };
type Card = { i: number; title: string; geo: PlaneGeometry; mat: ShaderMaterial; mesh: Mesh; rect: Slot | null };

export default function WorkRibbon() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!track || !stage || !canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) track.classList.add('is-static');

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import('three').then((THREE) => {
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      const scene = new THREE.Scene();
      const FOV = 35;
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

      // ── The rail the ribbon slides along ──
      const pathP: Vector3[] = [];
      const pathT: Vector3[] = [];
      let PATH_L = 1;
      {
        const PH0 = -1.5;
        const PH1 = Math.PI * 2 + 1.35;
        const pts: Vector3[] = [];
        for (let i = 0; i <= 160; i++) {
          const t = i / 160;
          const ph = mix(PH0, PH1, t);
          const cs = Math.cos(ph);
          const u = 2 * t - 1;
          // a shallow arc close to the camera, then long runs far behind it
          const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
          const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
          pts.push(new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63,
            -depth,
          ));
        }
        const path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
        path.arcLengthDivisions = 1500;
        PATH_L = path.getLength();
        for (let i = 0; i <= SAMPLES; i++) {
          const u = i / SAMPLES;
          pathP.push(path.getPointAt(u));
          pathT.push(path.getTangentAt(u));
        }
      }
      const at = (s: number, op: Vector3, ot: Vector3) => {
        const f = clamp(s / PATH_L) * SAMPLES;
        const i = Math.min(SAMPLES - 1, Math.floor(f));
        const k = f - i;
        op.lerpVectors(pathP[i], pathP[i + 1], k);
        ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
      };

      // ── Cards: each screenshot is cropped to its top section so the hero of the site shows ──
      const cards: Card[] = WORK.map((w, i) => {
        const cv = document.createElement('canvas');
        cv.width = 1024;
        cv.height = Math.round(1024 / (CARD_W / CARD_H));
        const tex = new THREE.CanvasTexture(cv);
        tex.colorSpace = THREE.NoColorSpace;
        tex.anisotropy = 4;
        const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          side: THREE.DoubleSide,
          uniforms: {
            map: { value: tex },
            aspect: { value: CARD_W / CARD_H },
            ready: { value: 0 },
            radius: { value: 0.018 },
          },
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.frustumCulled = false;
        mesh.visible = false;
        scene.add(mesh);

        const img = new Image();
        img.onload = () => {
          if (disposed) return;
          const sw = img.naturalWidth;
          const sh = Math.min(img.naturalHeight, sw / (CARD_W / CARD_H));
          cv.getContext('2d')?.drawImage(img, 0, 0, sw, sh, 0, 0, cv.width, cv.height);
          tex.needsUpdate = true;
          mat.uniforms.ready.value = 1;
          dirty = true;
        };
        img.src = w.image;
        return { i, title: w.title, geo, mat, mesh, rect: null };
      });

      // ── Layout ──
      let W = 1;
      let H = 1;
      let asp = 1;
      let cols = 3;
      let rows = 2;
      let tanH = 0.3153;
      let dirty = true;
      const resize = () => {
        W = stage.clientWidth;
        H = stage.clientHeight;
        asp = W / H;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, W < 700 ? 1.5 : 2));
        renderer.setSize(W, H, false);
        camera.aspect = asp;
        camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
        camera.updateProjectionMatrix();
        tanH = Math.tan((camera.fov * Math.PI) / 360);
        cols = asp < 0.9 ? 2 : 3;
        rows = asp < 0.9 ? 3 : 2;
        dirty = true;
      };
      const grid = (i: number): Slot => {
        const vh = 2 * GZ * tanH;
        const vw = vh * asp;
        const gw = vw * (cols === 3 ? 0.74 : 0.88);
        const gap = gw * 0.017;
        const cw = (gw - gap * (cols - 1)) / cols;
        const ch = cw / (CARD_W / CARD_H);
        const gh = ch * rows + gap * 1.6 * (rows - 1);
        const c = i % cols;
        const r = Math.floor(i / cols);
        return { x: -gw / 2 + cw / 2 + c * (cw + gap), y: gh / 2 - ch / 2 - r * (ch + gap * 1.6), w: cw, h: ch, vw, vh, c, r };
      };

      // ── Poses ──
      const op = new THREE.Vector3();
      const ot = new THREE.Vector3();
      const up = new THREE.Vector3();
      const Y = new THREE.Vector3(0, 1, 0);
      const vp = new THREE.Vector3();
      const poseRibbon = (c: Card, head: number) => {
        const pos = c.geo.attributes.position;
        const centre = head - c.i * STEP;
        for (let iy = 0; iy <= NY; iy++) {
          for (let ix = 0; ix <= NX; ix++) {
            const k = iy * (NX + 1) + ix;
            const lu = ix / NX - 0.5;
            const lv = 0.5 - iy / NY;
            at(centre + lu * CARD_W, op, ot);
            // keep the sheet upright, leaning a little into the turn
            up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
            vp.copy(op).addScaledVector(up, lv * CARD_H);
            pos.setXYZ(k, vp.x, vp.y, vp.z);
          }
        }
        pos.needsUpdate = true;
      };
      const poseGrid = (c: Card, q: number) => {
        const g = grid(c.i);
        const pos = c.geo.attributes.position;
        const dx = (g.c - (cols - 1) / 2) * 1.2;
        const dy = g.r < rows / 2 ? 1 : -1;
        const ox = dx * g.vw * 0.62 * (1 - q);
        const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
        const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
        const cs = Math.cos(tilt);
        const sn = Math.sin(tilt);
        for (let iy = 0; iy <= NY; iy++) {
          for (let ix = 0; ix <= NX; ix++) {
            const k = iy * (NX + 1) + ix;
            const x = (ix / NX - 0.5) * g.w;
            const y = (0.5 - iy / NY) * g.h;
            pos.setXYZ(k, g.x + ox + x * cs - y * sn, g.y + oy + x * sn + y * cs, -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI));
          }
        }
        pos.needsUpdate = true;
        c.rect = g;
      };

      // ── Scroll: everything is driven by one number, p, from 0 to 1 ──
      let target = reduced ? 1 : 0;
      let p = target;
      const readScroll = () => {
        if (reduced) return;
        const rect = track.getBoundingClientRect();
        target = clamp(-rect.top / Math.max(1, rect.height - H));
      };

      const render = () => {
        const rise = 1 - out(span(p, 0, 0.12));
        const run = mix(-50, 76, span(p, 0, 0.58));
        if (l1Ref.current) l1Ref.current.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
        if (l2Ref.current) l2Ref.current.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;
        if (capRef.current) {
          capRef.current.style.opacity = String(1 - span(p, 0.52, 0.57));
          capRef.current.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
        }
        if (ruleRef.current) ruleRef.current.style.transform = `scaleX(${ease(span(p, 0.72, 0.86))})`;
        if (moreRef.current) {
          const a = span(p, 0.8, 0.9);
          moreRef.current.style.opacity = String(a);
          moreRef.current.style.pointerEvents = a > 0.5 ? 'auto' : 'none';
        }

        const pr = span(p, RIB_A, RIB_B);
        const total = PATH_L + cards.length * STEP;
        const head = mix(0, total, pr);
        for (const c of cards) {
          const s = head - c.i * STEP;
          const end = PATH_L - CARD_W;
          if (s < end) {
            c.mesh.visible = s > CARD_W;
            c.rect = null;
            if (c.mesh.visible) poseRibbon(c, head);
          } else if (c.i < cols * rows) {
            // each card flies to its slot the moment it leaves the rail
            const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / total);
            const q = out(span(p, st, st + 0.13));
            c.mesh.visible = q > 0.001;
            if (c.mesh.visible) poseGrid(c, q);
          } else {
            c.mesh.visible = false;
            c.rect = null;
          }
        }
        renderer.render(scene, camera);
      };

      // ── Hover label once the grid has landed ──
      const hitTest = (e: PointerEvent | MouseEvent) => {
        if (p <= 0.86) return null;
        const b = stage.getBoundingClientRect();
        const nx = (e.clientX - b.left) / W - 0.5;
        const ny = 0.5 - (e.clientY - b.top) / H;
        for (const c of cards) {
          const g = c.rect;
          if (!g) continue;
          const x = nx * g.vw;
          const y = ny * g.vh;
          if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) return c;
        }
        return null;
      };
      const onMove = (e: PointerEvent) => {
        const hit = hitTest(e);
        const el = nameRef.current;
        if (!el) return;
        el.style.opacity = hit ? '1' : '0';
        if (hit) {
          const b = stage.getBoundingClientRect();
          el.textContent = hit.title;
          el.style.transform = `translate(${e.clientX - b.left + 14}px,${e.clientY - b.top + 16}px)`;
        }
      };
      stage.addEventListener('pointermove', onMove);

      // ── Loop: only runs while the section is near the screen ──
      let raf = 0;
      let active = false;
      const loop = () => {
        raf = 0;
        if (!active) return;
        readScroll();
        const prev = p;
        p += (target - p) * 0.09;
        if (Math.abs(target - p) < 0.00005) p = target;
        if (p !== prev || dirty) {
          dirty = false;
          render();
        }
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(
        ([entry]) => {
          active = entry.isIntersecting;
          if (active && !raf) raf = requestAnimationFrame(loop);
        },
        { rootMargin: '25% 0px' },
      );
      io.observe(track);

      window.addEventListener('resize', resize);
      resize();
      readScroll();
      p = target;
      render();

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('resize', resize);
        stage.removeEventListener('pointermove', onMove);
        cards.forEach((c) => {
          c.geo.dispose();
          (c.mat.uniforms.map.value as { dispose: () => void }).dispose();
          c.mat.dispose();
        });
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="ov-ribbon" id="work" ref={trackRef}>
      <div className="ov-ribbon-stage" ref={stageRef}>
        <h2 aria-label="Recent work">
          <div className="ov-ribbon-hl ov-ribbon-l1" ref={l1Ref} aria-hidden="true"><span>Recent</span></div>
          <div className="ov-ribbon-hl ov-ribbon-l2" ref={l2Ref} aria-hidden="true"><span><em>work.</em></span></div>
        </h2>
        <p className="ov-ribbon-cap" ref={capRef}>Real projects, real results.</p>
        <div className="ov-ribbon-rule" ref={ruleRef} />
        <canvas ref={canvasRef} aria-hidden="true" />
        <ul className="ov-sr">
          {WORK.map((w) => <li key={w.title}>{w.title}</li>)}
        </ul>
        <Link href="/work" className="ov-link ov-ribbon-more" ref={moreRef}>
          See all projects
          <svg className="ov-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
        </Link>
        <div className="ov-ribbon-name" ref={nameRef} aria-hidden="true" />
      </div>
    </div>
  );
}
