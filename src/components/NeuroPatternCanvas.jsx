import { useEffect, useRef } from "react";
import { useAccentTheme } from "../context/AccentThemeContext.jsx";

const POINT_SIZE = 5;
const MAX_NODES = 700;
const BASE_NODE_COUNT = 400;
const LINK_DISTANCE = 0.24;
const CLICK_RADIUS = 0.52;
const RADIUS_DECAY = 0.1;
const SPEED_MIN = 0.01;
const SPEED_MAX = 0.03;
const HOVER_RADIUS = 0.3;
const CLICK_SPAWN = 3;
const CLICK_SPEED_MIN = 0.01;
const CLICK_SPEED_MAX = 0.03;

function rand(lo, hi) {
  return lo + Math.random() * (hi - lo);
}

/**
 * @param {object} props
 * @param {string} [props.className]
 */
export default function NeuroPatternCanvas({ className = "" }) {
  const accent = useAccentTheme();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const nodes = [];
    const connected = new Uint8Array(MAX_NODES);

    let mouseX = null;
    let mouseY = null;

    function createNode(x = rand(-1, 1), y = rand(-1, 1)) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(SPEED_MIN, SPEED_MAX);
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        cr: LINK_DISTANCE,
      };
    }

    function createBurstNode(x, y, angle) {
      const speed = rand(CLICK_SPEED_MIN, CLICK_SPEED_MAX);
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        cr: CLICK_RADIUS,
      };
    }

    const targetNodes =
      wrap.clientWidth < 480 ? 180 : wrap.clientWidth < 768 ? 260 : BASE_NODE_COUNT;
    for (let i = 0; i < targetNodes; i++) nodes.push(createNode());

    function makeShader(type, src) {
      const s = gl.createShader(type);
      if (!s) throw new Error("createShader failed");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s) || "shader compile");
      }
      return s;
    }

    function makeProgram(vSrc, fSrc) {
      const p = gl.createProgram();
      if (!p) throw new Error("createProgram failed");
      gl.attachShader(p, makeShader(gl.VERTEX_SHADER, vSrc));
      gl.attachShader(p, makeShader(gl.FRAGMENT_SHADER, fSrc));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || "program link");
      }
      return p;
    }

    const LINE_VERT = `
attribute vec2 aPos;
varying vec2 vPos;
void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
    vPos = aPos;
}`;

    const LINE_FRAG = `
precision mediump float;
uniform vec4 uColor;
varying vec2 vPos;
void main() {
    float d = length(vPos);
    float fade = 1.0 - smoothstep(0.5, 1.0, d);
    if (fade <= 0.001) discard;
    gl_FragColor = vec4(uColor.rgb, uColor.a * fade);
}`;

    const POINT_VERT = `
attribute vec2 aPos;
uniform float uSize;
varying vec2 vPos;
void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
    gl_PointSize = uSize;
    vPos = aPos;
}`;

    const POINT_FRAG = `
precision mediump float;
uniform vec4 uColor;
varying vec2 vPos;
void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float d = length(vPos);
    float fade = 1.0 - smoothstep(0.5, 1.0, d);
    if (fade <= 0.001) discard;
    float soften = 1.0 - smoothstep(0.3, 0.5, r);
    gl_FragColor = vec4(uColor.rgb, soften * uColor.a * fade);
}`;

    const lineProg = makeProgram(LINE_VERT, LINE_FRAG);
    const ptProg = makeProgram(POINT_VERT, POINT_FRAG);

    const lineAPos = gl.getAttribLocation(lineProg, "aPos");
    const lineCol = gl.getUniformLocation(lineProg, "uColor");

    const ptAPos = gl.getAttribLocation(ptProg, "aPos");
    const ptCol = gl.getUniformLocation(ptProg, "uColor");
    const ptSize = gl.getUniformLocation(ptProg, "uSize");

    const nodeBuf = gl.createBuffer();
    const linkBuf = gl.createBuffer();

    const nodeArr = new Float32Array(MAX_NODES * 2);
    const linkArr = new Float32Array(MAX_NODES * MAX_NODES * 4);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let effectivePointSize = POINT_SIZE;
    let raf = 0;
    let lastTime = performance.now();

    function resize() {
      const isNarrow = wrap.clientWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.25 : 2);
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr));
      const h = Math.max(1, Math.floor(wrap.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      effectivePointSize = POINT_SIZE * dpr;
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    function onLeave() {
      mouseX = null;
      mouseY = null;
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const count = Math.min(CLICK_SPAWN, MAX_NODES - nodes.length);
      for (let i = 0; i < count; i++) {
        const angle =
          (i / count) * Math.PI * 2 + rand(0, (Math.PI * 2) / count);
        nodes.push(createBurstNode(x, y, angle));
      }
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    function updateNodes(dt) {
      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        if (node.x > 1) {
          node.x = 1;
          node.vx *= -1;
        } else if (node.x < -1) {
          node.x = -1;
          node.vx *= -1;
        }
        if (node.y > 1) {
          node.y = 1;
          node.vy *= -1;
        } else if (node.y < -1) {
          node.y = -1;
          node.vy *= -1;
        }

        if (node.cr > LINK_DISTANCE) {
          node.cr = Math.max(LINK_DISTANCE, node.cr - RADIUS_DECAY * dt);
        }
      }
    }

    function buildGeometry() {
      const n = nodes.length;

      for (let i = 0; i < n; i++) {
        nodeArr[i * 2] = nodes[i].x;
        nodeArr[i * 2 + 1] = nodes[i].y;
      }

      let lo = 0;
      connected.fill(0, 0, n);

      for (let i = 0; i < n; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j];
          const threshold = a.cr > b.cr ? a.cr : b.cr;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy <= threshold * threshold) {
            linkArr[lo++] = a.x;
            linkArr[lo++] = a.y;
            linkArr[lo++] = b.x;
            linkArr[lo++] = b.y;
            connected[i] = 1;
            connected[j] = 1;
          }
        }
      }

      for (let i = 0; i < n; i++) {
        if (connected[i]) continue;
        let minD = Infinity;
        let nearest = -1;
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = dx * dx + dy * dy;
          if (d < minD) {
            minD = d;
            nearest = j;
          }
        }
        if (nearest !== -1) {
          linkArr[lo++] = nodes[i].x;
          linkArr[lo++] = nodes[i].y;
          linkArr[lo++] = nodes[nearest].x;
          linkArr[lo++] = nodes[nearest].y;
        }
      }

      const regularLinkEnd = lo;

      if (mouseX !== null) {
        const hr2 = HOVER_RADIUS * HOVER_RADIUS;
        for (let i = 0; i < n; i++) {
          const dx = nodes[i].x - mouseX;
          const dy = nodes[i].y - mouseY;
          if (dx * dx + dy * dy <= hr2) {
            linkArr[lo++] = nodes[i].x;
            linkArr[lo++] = nodes[i].y;
            linkArr[lo++] = mouseX;
            linkArr[lo++] = mouseY;
          }
        }
      }

      return { nodeCount: n, regularLinkEnd, linkFloatCount: lo };
    }

    const nodeColor =
      accent === "lime"
        ? [0.78, 0.98, 0.22, 1.0]
        : [59 / 255, 130 / 255, 246 / 255, 1.0];

    function draw({ nodeCount, regularLinkEnd, linkFloatCount }) {
      gl.clearColor(0.015, 0.03, 0.078, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(lineProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, linkBuf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        linkArr.subarray(0, linkFloatCount),
        gl.DYNAMIC_DRAW,
      );
      gl.enableVertexAttribArray(lineAPos);
      gl.vertexAttribPointer(lineAPos, 2, gl.FLOAT, false, 0, 0);

      if (regularLinkEnd > 0) {
        gl.uniform4f(lineCol, 1.0, 1.0, 1.0, 0.28);
        gl.drawArrays(gl.LINES, 0, regularLinkEnd / 2);
      }

      const cursorLinkStart = regularLinkEnd / 2;
      const cursorLinkCount = (linkFloatCount - regularLinkEnd) / 2;
      if (cursorLinkCount > 0) {
        gl.uniform4f(lineCol, 1.0, 1.0, 1.0, 0.28);
        gl.drawArrays(gl.LINES, cursorLinkStart, cursorLinkCount);
      }

      gl.disableVertexAttribArray(lineAPos);

      gl.useProgram(ptProg);
      gl.enableVertexAttribArray(ptAPos);

      gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        nodeArr.subarray(0, nodeCount * 2),
        gl.DYNAMIC_DRAW,
      );
      gl.vertexAttribPointer(ptAPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4f(ptCol, nodeColor[0], nodeColor[1], nodeColor[2], nodeColor[3]);
      gl.uniform1f(ptSize, effectivePointSize);
      gl.drawArrays(gl.POINTS, 0, nodeCount);

      gl.disableVertexAttribArray(ptAPos);
    }

    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;
      resize();
      updateNodes(dt);
      draw(buildGeometry());
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [accent]);

  return (
    <div ref={wrapRef} className={`relative h-full min-h-[220px] w-full sm:min-h-[280px] ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-hidden
      />
    </div>
  );
}
