/**
 * Morphing particle system — Three.js WebGL with full 3D depth.
 * Wide distributions filling viewport, orbiting camera, depth fog,
 * spark layer, brand logo morphing on hover. Mobile-optimized.
 */

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const PARTICLE_COUNT = window.innerWidth < 768 ? 800 : 1800;

function nebulaTargets(): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const layer = i % 3;
    const radius = layer === 0 ? 180 + Math.random()*40 : layer === 1 ? 260 + Math.random()*40 : 340 + Math.random()*80;
    const n = layer === 2 ? 30 : 15;
    arr[i*3] = Math.cos(theta) * r * radius * 1.4 + (Math.random()-0.5)*n;
    arr[i*3+1] = y * radius + (Math.random()-0.5)*n;
    arr[i*3+2] = Math.sin(theta) * r * radius + (Math.random()-0.5)*n;
  }
  return arr;
}

function waveTargets(): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const layer = i % 3;
    const layerOffset = (layer - 1) * 60;
    const x = (Math.random()-0.5)*700, z = (Math.random()-0.5)*700;
    const y = Math.sin(x*0.01)*35 + Math.cos(z*0.013)*28 + Math.sin((x+z)*0.007)*18 - 10 + layerOffset;
    arr[i*3]=x+(Math.random()-0.5)*10; arr[i*3+1]=y+(Math.random()-0.5)*12; arr[i*3+2]=z+(Math.random()-0.5)*10;
  }
  return arr;
}

function vortexTargets(): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = i / PARTICLE_COUNT;
    const radius = 250 * (1 - t * 0.6) + 40;
    const angle = t * Math.PI * 12;
    const height = (t - 0.5) * 400;
    const wobble = (Math.random() - 0.5) * 40;
    arr[i*3] = Math.cos(angle) * (radius + wobble) + (Math.random()-0.5)*15;
    arr[i*3+1] = height + (Math.random()-0.5)*20;
    arr[i*3+2] = Math.sin(angle) * (radius + wobble) + (Math.random()-0.5)*15;
  }
  return arr;
}

function dissolveTargets(): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const dist = 80 + Math.pow(Math.random(), 1.5) * 420;
    arr[i*3] = Math.cos(theta) * r * dist + (Math.random()-0.5)*20;
    arr[i*3+1] = y * dist + (Math.random()-0.5)*20;
    arr[i*3+2] = Math.sin(theta) * r * dist + (Math.random()-0.5)*20;
  }
  return arr;
}

const LOGO_PATHS: Record<string, string> = {
  "Workday": "M24.8284 45.3619L24.9456 45.2761L28.7063 31.6566C28.8628 31.1609 29.1511 30.8842 29.6794 30.8278C30.6539 30.7236 33.374 30.7111 34.3317 30.8301C34.8123 30.8897 35.1314 31.1769 35.2748 31.6307L39.0983 45.4204C40.4776 40.8015 41.3628 36.0543 42.3353 31.3351C42.5032 31.0067 42.8121 30.8653 43.165 30.8278C43.9069 30.7489 45.9258 30.7396 46.6548 30.8301C47.7042 30.9601 47.3161 31.9478 47.189 32.6428C46.1705 38.2182 44.4608 44.7411 42.5145 50.0564C42.2495 50.7805 42.1186 51.8147 41.1909 51.9296C40.3685 52.0317 38.1959 52.0142 37.3528 51.9316C36.9988 51.897 36.6669 51.7969 36.4635 51.4842L32.0076 36.0034L27.5923 51.3512C27.4163 51.7033 27.1615 51.8711 26.7691 51.9229C26.1622 52.0029 23.0922 52.0177 22.572 51.8903C22.4632 51.8635 22.3157 51.7815 22.2273 51.712C21.8363 51.4045 21.084 48.9265 20.8748 48.2981C19.2864 43.5274 17.9086 38.279 16.9416 33.3401C16.7936 32.584 16.1605 30.9755 17.3001 30.8283C17.9793 30.7408 20.1627 30.7451 20.8469 30.8298C21.1846 30.8717 21.5046 31.0439 21.6551 31.3587C22.5871 36.0558 23.555 40.7465 24.8292 45.3616L24.8284 45.3619Z M31.2683 12.0146C37.8291 11.7353 43.9857 15.4922 46.6351 21.4908C46.9414 22.1841 47.9663 24.2537 46.6554 24.4372C46.2159 24.4989 43.1365 24.4948 42.8043 24.3916C42.6649 24.3482 42.5015 24.2013 42.4168 24.0817C42.1247 23.6704 41.8393 22.7729 41.5214 22.2452C37.1783 15.0337 26.481 15.1617 22.3186 22.4794C21.9512 23.1252 21.6891 24.3508 20.9062 24.4384C20.1234 24.526 18.3345 24.5265 17.5328 24.4814C15.9618 24.3927 16.891 22.5393 17.2442 21.7064C19.6198 16.1054 25.1702 12.2741 31.2683 12.0146Z",
  "Shopify Logistics": "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715zM15.009 24L1.448 21.427S3.198 7.832 3.273 7.37c.078-.638.097-.657.772-.87.097-.038.966-.309 2.16-.674C6.675 3.877 8.159 0 11.265 0c.404 0 .87.209 1.168.555h.115c1.332 0 2.085 1.137 2.508 2.37.425-.135.714-.21.714-.21",
  "Abnormal AI": "M29.5,0l13.9,43.4h-7.8L21.7,0H29.5z M0,43.4h7.8L21.7,0h-7.8L0,43.4z",
  "Freelance": "M12 2l2.2 6.8L21 11l-5.5 4.2L17.5 22 12 18l-5.5 4 2-6.8L3 11l6.8-2.2L12 2z",
  "Superteam Canada": "M275.666 69.3705H224.632V41H152L152.808 156.612C152.808 178.035 157.416 201.212 175.776 214.449C176.431 214.416 176.891 214.331 177.777 214.124L178.424 213.972L178.666 213.53C179.409 212.171 180.204 211.418 181.272 211.058C181.715 210.909 181.808 210.899 182.726 210.899C183.822 210.899 184.469 210.998 185.726 211.359C186.836 211.677 187.609 211.815 187.649 211.702C187.696 211.565 185.681 208.959 184.072 207.074C182.605 205.355 178.019 199.727 176.58 197.877C174.941 195.772 173.653 194.157 172.519 192.783C170.313 190.114 169.845 189.18 169.905 187.568C169.951 186.329 170.293 185.543 171.163 184.678C172.141 183.706 173.26 183.228 175.429 182.858C176.97 182.595 178.543 182.081 180.037 181.354L180.924 180.922L180.885 180.536C180.825 179.951 180.601 178.852 180.101 176.689C179.042 172.11 178.77 169.992 179.06 168.588C179.345 167.216 179.847 166.391 180.858 165.639C181.067 165.483 181.676 165.125 182.21 164.843C183.127 164.36 183.185 164.319 183.261 164.107C183.444 163.595 183.627 162.748 183.738 161.9C183.872 160.873 184.061 159.98 184.355 158.979C184.894 157.143 185.017 156.31 185.02 154.48C185.022 152.582 184.871 151.147 184.427 148.884C184.11 147.266 184.077 147.022 184.078 146.296C184.079 145.179 184.376 144.359 185.012 143.724C185.763 142.973 186.84 142.657 187.889 142.88C189.401 143.201 190.573 144.348 194.235 149.086C195.223 150.365 197.502 153.393 198.548 154.818C198.843 155.219 199.102 155.546 199.125 155.545C199.148 155.544 199.31 155.346 199.484 155.104C200.445 153.777 201.709 153.198 202.988 153.499C203.715 153.671 204.741 154.277 205.372 154.909C206.086 155.622 206.474 156.331 207.299 158.426C208.119 160.509 208.884 162.163 209.66 163.53C210.077 164.266 210.573 165.007 210.646 165.006C210.768 165.005 211.228 164.363 211.714 163.515C211.996 163.023 212.597 162.388 213.005 162.152C213.755 161.716 214.63 161.567 215.416 161.742C216.91 162.075 217.98 163.203 218.936 165.454C219.094 165.827 219.652 167.404 220.176 168.959C220.98 171.343 221.859 173.853 222.596 175.867C222.686 176.113 222.776 176.314 222.796 176.314C222.835 176.314 222.868 176.01 222.971 174.699C223.058 173.587 223.057 169.871 222.969 168.498C222.93 167.895 222.838 166.791 222.763 166.046C222.655 164.965 222.638 164.585 222.679 164.171C222.821 162.754 223.482 161.602 224.632 160.758V136.807H227.335C254.063 136.807 275.666 115.395 275.666 88.9037V69.3705Z M84.2206 131.727C57.7588 127.712 34 115.667 34 82.7521C34 62.4119 39.6728 41 88.2716 41H136.604V135.2H92.5895C119.325 141.894 136.604 159.284 136.604 184.175C136.604 204.515 130.938 225.927 82.3319 225.927H34V131.727H84.2206Z M273.477 135.425C273.154 135.643 271.714 137.591 270.279 139.755C267.074 144.586 265.673 146.386 264.223 147.532C262.441 148.941 260.251 149.664 258.28 150.749C255.856 152.083 255.035 152.239 253.687 151.62C253.056 151.329 252.289 151.175 251.985 151.277C251.68 151.378 250.48 152.781 249.319 154.393C246.824 157.857 246.228 158.427 244.975 158.543C243.188 158.709 239.294 155.197 237.755 152.031C237.132 150.749 236.902 150.512 236.284 150.515C235.408 150.518 235.297 150.69 235.139 152.285C234.942 154.274 233.54 158.802 232.223 161.703L230.995 164.405L229.393 164.713C227.394 165.097 227.011 165.733 227.242 168.283C227.338 169.334 227.285 171.32 227.124 172.696C226.964 174.073 226.778 175.851 226.713 176.648C226.566 178.419 226.152 181.464 225.944 182.304C225.86 182.644 225.669 183.76 225.52 184.783C225.231 186.771 223.787 189.874 223.131 189.918C222.342 189.97 221.581 188.808 220.045 185.203C218.556 181.707 217.161 177.579 215.271 171.075C214.417 168.137 213.521 167.034 212.913 168.172C212.198 169.508 210.181 170.159 208.872 169.477C207.553 168.789 205.746 166.216 204.988 163.946C204.222 161.652 203.715 160.774 202.909 160.343C202.453 160.098 202.242 160.252 201.592 161.301C200.825 162.538 200.807 162.546 199.761 162.094C199.042 161.783 198.414 161.199 197.791 160.261C197.288 159.503 195.639 157.193 194.127 155.126C190.511 150.186 189.635 149.707 190.232 152.996C190.979 157.104 190.898 160.964 190.013 163.552C189.699 164.469 189.393 165.744 189.332 166.386C189.272 167.028 189.007 168.147 188.745 168.874C188.323 170.042 188.087 170.293 186.702 171.043C185.255 171.827 185.117 171.981 184.901 173.057C184.769 173.717 185.067 176.183 185.588 178.743C186.576 183.593 186.603 184.552 185.777 185.465C185.031 186.29 182.157 187.398 179.647 187.829C177.164 188.255 176.746 188.826 177.748 190.421C178.429 191.506 178.886 192.055 182.5 196.14C184.749 198.683 189.295 204.204 194.057 210.878C194.611 211.974 194.65 212.402 194.27 213.279C193.882 214.175 193.597 214.402 192.478 214.705C190.913 215.128 188.226 215.076 186.722 214.593C186.136 214.405 185.231 214.242 184.711 214.232C183.875 214.216 183.685 214.366 183.056 215.541C182.382 216.801 182.235 216.897 180.141 217.439C178.586 217.842 177.057 217.927 174.954 217.725C173.078 217.546 171.891 217.591 171.754 217.848C171.566 218.2 172.256 218.617 176.853 220.929C179.777 222.401 182.273 223.785 182.4 224.006C182.586 224.329 182.469 224.556 181.81 225.151C180.695 226.16 180.593 226.421 181.044 227.104C181.351 227.568 182.177 227.836 184.963 228.378C189.808 229.32 192.182 230.086 192.47 230.801C192.706 231.389 191.676 233.011 190.6 233.746C190.192 234.025 189.237 235.118 189.42 235.73C189.657 236.525 189.242 236.898 193.947 237.446C196 237.685 199.587 237.78 200.706 237.965C205.642 238.097 211.691 237.284 217.78 236.162C219.114 235.916 220.244 235.847 220.292 236.009C220.341 236.171 217.893 241.456 214.955 246.947C212.258 251.988 210.808 254.148 208.337 257.288C206.728 259.334 205.049 261.843 204.777 262.002C204.6 262.107 204.4 262.24 204.955 262.537C205.728 262.951 206.232 263.759 206.599 263.317C209.824 258.747 211.019 257.765 216.582 247.502C219.47 242.172 221.697 237.164 221.892 237.05C222.126 236.913 222.711 237.739 223.613 239.483C226.456 244.977 229.982 250.451 234.174 254.971C235.808 256.734 237.99 259.189 239.022 260.427C241.295 263.153 242.22 263.643 242.819 262.441C243.047 261.984 243.379 260.934 243.558 260.107C243.951 258.288 244.558 257.817 245.832 258.341C246.725 258.709 249.761 261.497 251.991 263.995C253.477 265.66 253.618 265.749 254.11 265.321C254.563 264.927 254.931 262.466 254.559 262.267C254.416 262.19 254.486 261.873 254.713 261.561C255.176 260.929 254.558 260.734 261.974 264.978C263.897 266.078 265.352 267.014 265.789 266.883C266.227 266.752 265.893 265.809 263.835 262.63C262.867 261.134 261.892 259.453 261.668 258.895C261.444 258.336 261.065 257.588 260.826 257.232C260.487 256.727 260.518 256.347 260.965 255.511C261.629 254.269 262.344 254.477 259.773 252.223C258.775 251.429 257.395 249.836 256.3 248.213C255.461 246.97 255.484 245.85 256.362 245.174C257.135 244.581 260.232 244.251 262.56 244.514C265.922 244.895 269.913 245.241 273.612 245.472C278.361 245.769 283.622 246.626 284.904 247.312C286.627 248.234 286.795 247.24 285.284 245.051C284.234 243.529 282.798 239.079 282.876 237.584C282.937 236.389 282.982 236.311 284.079 235.519C285.683 234.36 289.606 233.018 292.669 232.582C295.921 232.118 297.226 232.363 296.64 231.279C296.406 230.845 295.694 230.314 295.372 229.878C294.998 229.678 294.329 227.866 294.332 227.072C294.333 226.565 294.26 225.255 295.703 223.743C298.386 220.935 299.769 219.474 301.38 218.262C304.777 215.706 305.411 215.615 305.594 215.273C306.061 214.401 302.249 214.325 301.794 214.345C296.592 214.578 296.654 214.269 294.904 214.112C292.732 213.917 292.246 213.992 293.322 212.048C294.002 210.819 293.454 209.633 292.172 210.099C290.868 210.441 289.581 211.05 286.423 210.428C283.118 209.777 282.819 209.621 282.326 208.284C281.99 207.374 282.047 207.022 282.733 205.739C283.693 203.945 283.808 203.289 283.214 202.986C282.609 202.677 281.98 202.825 279.376 203.894C278.156 204.395 276.722 204.889 276.19 204.991C274.702 205.278 270.928 206.482 268.025 207.597C263.743 209.242 261.714 209.689 259.822 209.406C258.689 209.237 258.578 209.161 258.487 208.494C258.175 206.214 263.609 200.757 270.847 195.484C273.944 193.226 276.375 192.514 275.378 189.88C273.397 186.848 276.163 187.34 280.012 181.619C283.386 176.606 284.369 176.538 280.249 175.925C278.146 175.611 273.384 175.049 272.422 174.172C271.544 173.37 271.207 172.853 272.146 169.304C272.605 167.569 273.072 165.803 273.182 165.38C273.571 163.886 273.216 161.987 272.315 160.738C271.824 160.057 271.247 158.707 271.034 157.738C269.714 151.741 269.838 150.658 272.713 143.062C274.357 138.72 274.856 136.891 274.653 135.957C274.458 135.058 274.198 134.94 273.477 135.425Z",
  "Penguin Robotics": "M297.460938 63.730469 C 292.109375 63.730469 287.773438 59.398438 287.773438 54.058594 C 287.773438 48.707031 292.109375 44.386719 297.460938 44.386719 C 302.800781 44.386719 307.132812 48.707031 307.132812 54.058594 C 307.132812 59.398438 302.800781 63.730469 297.460938 63.730469 M 277.242188 418.730469 L 174.277344 418.730469 L 174.277344 207.667969 L 277.242188 207.667969 Z M 152.894531 63.730469 C 147.554688 63.730469 143.21875 59.398438 143.21875 54.058594 C 143.21875 48.707031 147.554688 44.386719 152.894531 44.386719 C 158.230469 44.386719 162.566406 48.707031 162.566406 54.058594 C 162.566406 59.398438 158.230469 63.730469 152.894531 63.730469 M 342.527344 113.574219 C 342.527344 65.730469 314.574219 24.480469 274.285156 5.625 L 274.285156 77.710938 L 224.28125 124.519531 L 174.277344 77.710938 L 174.277344 6.320312 C 134.761719 25.472656 107.472656 66.304688 107.472656 113.574219 C 107.472656 148.523438 122.382812 179.949219 146.132812 201.707031 C 146.058594 202.445312 146.015625 203.183594 146.015625 203.9375 L 146.015625 421.867188 C 146.015625 434.246094 156.144531 444.378906 168.523438 444.378906 L 280.363281 444.378906 C 292.757812 444.378906 302.875 434.246094 302.875 421.867188 L 302.875 203.9375 C 302.875 203.496094 302.859375 203.066406 302.828125 202.636719 C 327.175781 180.867188 342.527344 149.039062 342.527344 113.574219",
};

export function initFlowField(canvas: HTMLCanvasElement): () => void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);

  const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
  camera.position.set(0, 0, 600);

  const targets = [nebulaTargets(), waveTargets(), vortexTargets(), dissolveTargets()];

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const randoms = new Float32Array(PARTICLE_COUNT);
  currentPositions.set(targets[0]!);

  for (let i = 0; i < PARTICLE_COUNT; i++) { sizes[i] = 3 + Math.random() * 5; randoms[i] = Math.random(); }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: dpr },
      uColorA: { value: new THREE.Color(0xff8c28) },
      uColorB: { value: new THREE.Color(0xffe0a0) },
      uColorC: { value: new THREE.Color(0x4a2090) },
    },
    vertexShader: `
      attribute float aSize; attribute float aRandom;
      uniform float uTime; uniform float uPixelRatio;
      varying float vDepth; varying float vRandom;
      void main() {
        float breath = sin(uTime * 0.5 + aRandom * 6.28) * 0.03;
        vec3 pos = position * (1.0 + breath);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp(aSize * (600.0 / max(-mv.z, 1.0)) * uPixelRatio, 3.0, 40.0 * uPixelRatio);
        vDepth = -mv.z; vRandom = aRandom;
      }
    `,
    fragmentShader: `
      varying float vDepth; varying float vRandom;
      uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uColorC;
      void main() {
        vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard;
        float core = smoothstep(0.25, 0.0, d);
        float glow = smoothstep(0.5, 0.0, d);
        float intensity = core * 0.6 + glow * 0.28;
        float scanline = 0.65 + 0.35 * sin(gl_FragCoord.y * 1.5708);
        intensity *= scanline;
        vec3 color = mix(uColorA, uColorB, vRandom * 0.7 + core * 0.3);
        float tw = 0.9 + sin(uTime * 1.5 + vRandom * 15.0) * 0.1;
        gl_FragColor = vec4(color * intensity * tw, intensity * tw);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Spark layer
  const sparkCount = window.innerWidth < 768 ? 15 : 30;
  const sparkPos = new Float32Array(sparkCount * 3);
  const sparkSizes = new Float32Array(sparkCount);
  const sparkRand = new Float32Array(sparkCount);
  for (let i = 0; i < sparkCount; i++) {
    sparkPos[i*3]=(Math.random()-0.5)*500; sparkPos[i*3+1]=(Math.random()-0.5)*500; sparkPos[i*3+2]=(Math.random()-0.5)*500;
    sparkSizes[i]=8+Math.random()*12; sparkRand[i]=Math.random();
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  sparkGeo.setAttribute("aRandom", new THREE.BufferAttribute(sparkRand, 1));
  const sparkMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: dpr } },
    vertexShader: `attribute float aSize; attribute float aRandom; uniform float uTime; uniform float uPixelRatio; varying float vRandom;
      void main() { vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv;
      float pulse = 0.7+sin(uTime*3.0+aRandom*10.0)*0.3; gl_PointSize = clamp(aSize*pulse*(350.0/max(-mv.z,1.0))*uPixelRatio, 2.0, 40.0*uPixelRatio); vRandom=aRandom; }`,
    fragmentShader: `varying float vRandom; void main() { vec2 c=gl_PointCoord-0.5; float d=length(c); if(d>0.5) discard;
      float core=smoothstep(0.1,0.0,d); float halo=pow(smoothstep(0.5,0.0,d),3.0); vec3 col=mix(vec3(1.0,0.7,0.2),vec3(1.0,0.95,0.75),vRandom);
      float a=core*0.9+halo*0.2; gl_FragColor=vec4(col*a,a); }`,
  });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparks);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  renderer.setClearColor(0x000000, 0);

  // Post-processing — bloom makes particles bleed light into space
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.1, 0.25, 0.4);
  composer.addPass(bloomPass);

  let tmx = 0, tmy = 0, mx = 0, my = 0;
  function onMove(e: MouseEvent) { tmx = (e.clientX / w - 0.5); tmy = (e.clientY / h - 0.5); }
  document.addEventListener("mousemove", onMove);

  function getActiveSection(): number {
    const sections = document.querySelectorAll<HTMLElement>("section[data-section]");
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let active = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= scrollY) active = i; });
    return active;
  }

  const companyCache = new Map<string, Float32Array>();
  let hoverTarget: Float32Array | null = null;

  function svgPathToTargets(pathData: string): Float32Array {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;";

    // Handle SVG fragments (with <g transform>) separated by |||
    if (pathData.includes("|||")) {
      const [pathPart, fragmentPart] = pathData.split("|||");
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", pathPart.trim());
      svg.appendChild(p);
      // Parse the SVG fragment (e.g. <g transform><path/></g>)
      const tmp = document.createElementNS(svgNS, "g");
      tmp.innerHTML = fragmentPart.trim();
      // Move all children from tmp into svg
      while (tmp.firstChild) svg.appendChild(tmp.firstChild);
    } else {
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", pathData);
      svg.appendChild(p);
    }

    document.body.appendChild(svg);

    // Collect ALL paths (including those inside <g transform>)
    const allPaths = svg.querySelectorAll("path");
    // Calculate total length across all paths
    let totalLen = 0;
    const lengths: number[] = [];
    allPaths.forEach((p) => { const l = p.getTotalLength(); lengths.push(l); totalLen += l; });

    // Use overall bounding box from all paths
    const bboxes = allPaths;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allPaths.forEach((p) => {
      // Use getCTM to get actual screen position including parent transforms
      const bb = p.getBBox();
      const ctm = p.getCTM();
      if (ctm) {
        const x1 = bb.x * ctm.a + bb.y * ctm.c + ctm.e;
        const y1 = bb.x * ctm.b + bb.y * ctm.d + ctm.f;
        const x2 = (bb.x + bb.width) * ctm.a + (bb.y + bb.height) * ctm.c + ctm.e;
        const y2 = (bb.x + bb.width) * ctm.b + (bb.y + bb.height) * ctm.d + ctm.f;
        minX = Math.min(minX, x1, x2); minY = Math.min(minY, y1, y2);
        maxX = Math.max(maxX, x1, x2); maxY = Math.max(maxY, y1, y2);
      } else {
        minX = Math.min(minX, bb.x); minY = Math.min(minY, bb.y);
        maxX = Math.max(maxX, bb.x + bb.width); maxY = Math.max(maxY, bb.y + bb.height);
      }
    });
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const scale = 350 / Math.max(maxX - minX, maxY - minY, 1);

    // Sample 400 points from paths (not PARTICLE_COUNT — 10x fewer DOM calls)
    const SAMPLE = 400;
    const samples: number[] = [];
    allPaths.forEach((pathEl) => {
      const ctm = pathEl.getCTM();
      const len = pathEl.getTotalLength();
      const count = Math.max(10, Math.round(SAMPLE / allPaths.length));
      for (let i = 0; i < count; i++) {
        const pt = pathEl.getPointAtLength((i / count) * len);
        let x = pt.x, y = pt.y;
        if (ctm) { x = pt.x * ctm.a + pt.y * ctm.c + ctm.e; y = pt.x * ctm.b + pt.y * ctm.d + ctm.f; }
        samples.push((x - cx) * scale, (cy - y) * scale);
      }
    });
    document.body.removeChild(svg);

    // Assign PARTICLE_COUNT particles to random sample points (fast — no DOM calls)
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const si = Math.floor(Math.random() * (samples.length / 2)) * 2;
      arr[i*3] = samples[si]! + (Math.random()-0.5)*6;
      arr[i*3+1] = samples[si+1]! + (Math.random()-0.5)*6;
      arr[i*3+2] = (Math.random()-0.5)*30;
    }
    return arr;
  }

  function onHover(e: Event) {
    const detail = (e as CustomEvent).detail as string | null;
    if (detail && LOGO_PATHS[detail]) {
      if (!companyCache.has(detail)) companyCache.set(detail, svgPathToTargets(LOGO_PATHS[detail]!));
      hoverTarget = companyCache.get(detail)!;
      hoveredCompany = detail;
    } else { hoverTarget = null; hoveredCompany = ""; }
  }
  window.addEventListener("particle-hover", onHover as EventListener);
  // Logos generated on first hover (cached after) — no background freeze

  const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
  let raf = 0, t = 0, alive = true, paused = false, needsMorph = true, lastTargetKey = "", hoveredCompany = "";
  function draw() {
    if (!alive) return;
    raf = requestAnimationFrame(draw);
    if (paused) return;
    t += 0.016;
    mx += (tmx - mx) * 0.03;
    my += (tmy - my) * 0.03;

    const aspect = w / h;
    const camRadius = (hoverTarget ? 450 : 550) / Math.max(aspect * 0.7, 0.5);
    const camAngle = t * 0.04;
    camera.position.x = Math.sin(camAngle) * camRadius + mx * 100;
    camera.position.y = Math.cos(camAngle * 0.6) * 120 + my * 80;
    camera.position.z = Math.cos(camAngle) * camRadius;
    camera.lookAt(0, 0, 0);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    material.uniforms.uTime.value = t;
    sparkMat.uniforms.uTime.value = t;

    // Only morph when target changed — skip expensive loop when settled
    const targetArr = hoverTarget ?? targets[Math.min(targets.length - 1, getActiveSection())]!;
    const targetKey = hoverTarget ? `hover:${hoveredCompany}` : String(getActiveSection());
    if (targetKey !== lastTargetKey) {
      lastTargetKey = targetKey;
      needsMorph = true;
    }
    if (needsMorph) {
      const lerpFactor = hoverTarget ? 0.08 : 0.04;
      let maxDelta = 0;
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        currentPositions[i] = lerp(currentPositions[i]!, targetArr[i]!, lerpFactor);
        positions[i] = currentPositions[i]!;
        const delta = Math.abs(currentPositions[i]! - targetArr[i]!);
        if (delta > maxDelta) maxDelta = delta;
      }
      geometry.attributes.position.needsUpdate = true;
      if (maxDelta < 0.1) needsMorph = false;

    }

    const rotSpeed = hoverTarget ? 0.02 : 0.06;
    points.rotation.y = t * rotSpeed + mx * 0.2;
    points.rotation.x = t * rotSpeed * 0.5 + my * 0.15;
    material.uniforms.uTime.value = t;

    composer.render();
  }

  const visObs = new IntersectionObserver((e) => { paused = !e[0]?.isIntersecting; }, { threshold: 0 });
  visObs.observe(canvas);
  raf = requestAnimationFrame(draw);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    visObs.disconnect();
    window.removeEventListener("particle-hover", onHover as EventListener);
    document.removeEventListener("mousemove", onMove);
    geometry.dispose(); material.dispose();
    sparkGeo.dispose(); sparkMat.dispose();
    composer.dispose(); renderer.dispose();
  };
}
