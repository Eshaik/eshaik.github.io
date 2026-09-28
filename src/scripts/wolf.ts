// Desktop-pet wolf that follows the cursor, in the spirit of oneko.js.
// Starts curled up asleep in the corner, wakes up on the first click/tap
// anywhere on the page, and falls back asleep after a period of inactivity.

type SpriteName =
  | "idle"
  | "alert"
  | "scratchSelf"
  | "scratchWallN"
  | "scratchWallS"
  | "scratchWallE"
  | "scratchWallW"
  | "tired"
  | "sleeping"
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW";

const DISPLAY_SIZE = 40; // on-page rendered size
const SPRITE_URL = "/wolf-sprite.png";
const TICK_MS = 100;
const WALK_SPEED = 11;
const STOP_DISTANCE = 48;
const SLEEP_AFTER_MS = 40000;
const TAP_MOVE_THRESHOLD = 10;

// [col, row] into the 32x32 grid, for every animation.
const SPRITES: Record<SpriteName, Array<[number, number]>> = {
  idle: [[3, 3]],
  alert: [[7, 3]],
  scratchSelf: [
    [5, 0],
    [6, 0],
    [7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, 1],
  ],
  scratchWallS: [
    [7, 1],
    [6, 2],
  ],
  scratchWallE: [
    [2, 2],
    [2, 3],
  ],
  scratchWallW: [
    [4, 0],
    [4, 1],
  ],
  tired: [[3, 2]],
  sleeping: [
    [2, 0],
    [2, 1],
  ],
  N: [
    [1, 2],
    [1, 3],
  ],
  NE: [
    [0, 2],
    [0, 3],
  ],
  E: [
    [3, 0],
    [3, 1],
  ],
  SE: [
    [5, 1],
    [5, 2],
  ],
  S: [
    [6, 2],
    [7, 1],
  ],
  SW: [
    [5, 3],
    [6, 1],
  ],
  W: [
    [4, 2],
    [4, 3],
  ],
  NW: [
    [1, 0],
    [1, 1],
  ],
};

// Spawns next to the hero name if it's on screen (matches the home page
// layout), falling back to the bottom-right corner otherwise (e.g. the name
// has scrolled out of view).
function getSpawnPoint(): { x: number; y: number } {
  const anchor = document.getElementById("wolf-anchor");
  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    if (rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
      return {
        x: Math.min(window.innerWidth - 16, rect.right + 24),
        y: Math.max(16, rect.top + rect.height / 2),
      };
    }
  }
  return {
    x: Math.max(16, window.innerWidth - 60),
    y: Math.max(16, window.innerHeight - 60),
  };
}

class Wolf {
  private el: HTMLDivElement;
  private x: number;
  private y: number;
  private mouseX: number;
  private mouseY: number;
  private awake = false;
  private waking = false;
  private idleTime = 0;
  private idleAnimation: SpriteName | null = null;
  private idleAnimationFrame = 0;
  private idleAnimationTicks = 0;
  private idleAnimationLength = 0;
  private wakeTimer: ReturnType<typeof setTimeout> | undefined;
  private timer: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private touchStartY = 0;
  private touchMoved = false;

  constructor() {
    this.el = this.createElement();
    const spawn = getSpawnPoint();
    this.x = spawn.x;
    this.y = spawn.y;
    this.mouseX = this.x;
    this.mouseY = this.y;

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("click", this.handleFirstClick);
    document.addEventListener("touchstart", this.handleTouchStart, { passive: true });
    document.addEventListener("touchmove", this.handleTouchMove, { passive: true });
    document.addEventListener("touchend", this.handleTouchEnd, { passive: true });

    this.setSprite("sleeping", 0);
    this.render();

    this.timer = setInterval(() => this.tick(), TICK_MS);
  }

  private createElement(): HTMLDivElement {
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.width = `${DISPLAY_SIZE}px`;
    el.style.height = `${DISPLAY_SIZE}px`;
    el.style.position = "fixed";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.backgroundImage = `url('${SPRITE_URL}')`;
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundSize = `${8 * DISPLAY_SIZE}px ${4 * DISPLAY_SIZE}px`;
    el.style.imageRendering = "pixelated";
    el.style.zIndex = "999";
    el.style.pointerEvents = "none";
    document.body.appendChild(el);
    return el;
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private handleFirstClick = () => {
    if (this.awake) return;
    this.wakeUp();
  };

  // Mobile has no mousemove, so a tap both wakes the wolf and sets a target
  // to walk toward, matching adryd.com's touch behavior. A touchmove past
  // the threshold means the finger was scrolling, not tapping, so it's
  // ignored on touchend.
  private handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchMoved = false;
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - this.touchStartX;
    const dy = e.touches[0].clientY - this.touchStartY;
    if (Math.sqrt(dx * dx + dy * dy) > TAP_MOVE_THRESHOLD) this.touchMoved = true;
  };

  private handleTouchEnd = (e: TouchEvent) => {
    if (this.touchMoved) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;
    if (!this.awake) this.wakeUp();
  };

  private wakeUp() {
    this.awake = true;
    this.waking = true;
    this.idleTime = 0;
    this.setSprite("alert", 0);
    clearTimeout(this.wakeTimer);
    this.wakeTimer = setTimeout(() => {
      this.waking = false;
      this.idleAnimation = null;
    }, 400);
  }

  private fallAsleep() {
    this.awake = false;
    this.waking = false;
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    this.idleTime = 0;
  }

  private setSprite(name: SpriteName, frameIndex: number) {
    const frames = SPRITES[name];
    const [col, row] = frames[frameIndex % frames.length];
    this.el.style.backgroundPosition = `-${col * DISPLAY_SIZE}px -${row * DISPLAY_SIZE}px`;
  }

  private render() {
    this.el.style.left = `${Math.round(this.x - DISPLAY_SIZE / 2)}px`;
    this.el.style.top = `${Math.round(this.y - DISPLAY_SIZE / 2)}px`;
  }

  // Splits the direction to the target into 8 headings using the classic
  // oneko threshold: each axis only contributes a letter once its normalized
  // component passes 0.5 (~30 deg off-axis), so a mostly-horizontal or
  // mostly-vertical approach yields a pure N/S/E/W instead of always
  // picking a diagonal.
  private facingSprite(diffX: number, diffY: number, distance: number): SpriteName {
    const nx = diffX / distance;
    const ny = diffY / distance;
    let direction = "";
    if (ny < -0.5) direction += "N";
    else if (ny > 0.5) direction += "S";
    if (nx > 0.5) direction += "E";
    else if (nx < -0.5) direction += "W";
    return (direction || (ny > 0 ? "S" : "N")) as SpriteName;
  }

  private nearestEdgeScratch(): SpriteName {
    const distLeft = this.x;
    const distRight = window.innerWidth - this.x;
    const distTop = this.y;
    const distBottom = window.innerHeight - this.y;
    const min = Math.min(distLeft, distRight, distTop, distBottom);
    if (min === distTop) return "scratchWallN";
    if (min === distBottom) return "scratchWallS";
    if (min === distLeft) return "scratchWallW";
    return "scratchWallE";
  }

  private tick() {
    if (!this.awake) {
      this.idleAnimationFrame++;
      this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 6) % 2);
      this.render();
      return;
    }

    if (this.waking) {
      this.render();
      return;
    }

    const diffX = this.mouseX - this.x;
    const diffY = this.mouseY - this.y;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distance > STOP_DISTANCE) {
      this.idleTime = 0;
      this.idleAnimation = null;
      const angleName = this.facingSprite(diffX, diffY, distance);
      const step = Math.min(WALK_SPEED, distance);
      this.x += (diffX / distance) * step;
      this.y += (diffY / distance) * step;
      this.idleAnimationFrame++;
      this.setSprite(angleName, Math.floor(this.idleAnimationFrame / 2) % 2);
      this.render();
      return;
    }

    this.idleTime += TICK_MS;

    if (SLEEP_AFTER_MS > 0 && this.idleTime > SLEEP_AFTER_MS) {
      if (this.idleAnimation !== "tired") {
        this.idleAnimation = "tired";
        this.idleAnimationFrame = 0;
        this.setSprite("tired", 0);
        this.render();
        setTimeout(() => this.fallAsleep(), 700);
      }
      return;
    }

    if (!this.idleAnimation) {
      this.idleAnimationFrame = 0;
      const roll = Math.random();
      if (roll < 0.55) {
        this.idleAnimation = "idle";
      } else if (roll < 0.8) {
        this.idleAnimation = "scratchSelf";
      } else {
        this.idleAnimation = this.nearestEdgeScratch();
      }
      this.idleAnimationTicks = 0;
      this.idleAnimationLength = this.idleAnimation === "idle" ? 10 + Math.random() * 20 : 12;
    }

    this.idleAnimationTicks++;
    if (this.idleAnimation === "idle") {
      this.setSprite("idle", 0);
    } else {
      this.idleAnimationFrame++;
      this.setSprite(this.idleAnimation, Math.floor(this.idleAnimationFrame / 4));
    }

    if (this.idleAnimationTicks > this.idleAnimationLength) {
      this.idleAnimation = null;
    }

    this.render();
  }

  destroy() {
    clearInterval(this.timer);
    clearTimeout(this.wakeTimer);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("click", this.handleFirstClick);
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
    this.el.remove();
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function initWolf() {
  if (prefersReducedMotion()) return;
  new Wolf();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWolf);
} else {
  initWolf();
}
