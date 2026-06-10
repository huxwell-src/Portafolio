/**
 * Matrix Text Transition Effect
 * 
 * When changing language, each character temporarily becomes a dynamic sequence
 * of random letters, numbers, symbols, Japanese characters, hiragana,
 * and tech symbols before resolving to the final translated text.
 */

// Character set: Latin A-Z, a-z, numbers 0-9, special symbols,
// Japanese katakana, hiragana, and tech symbols
const MATRIX_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '0123456789' +
  '@#$%&*+?!<>\\/|{}[]' +
  'カタナアイウエオツシラミネホヤユヨ' +
  'あいうえおかさたなま' +
  '▓▒█◇◆○●';

function randChar(): string {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

export interface MatrixOptions {
  /** Total duration in ms per element (default: 600) */
  duration?: number;
  /** Delay before this element starts animating in ms (default: 0) */
  delay?: number;
  /** Color used during the scramble phase (default: var(--accent)) */
  color?: string;
  /** Font size override during animation for consistent width */
  fontSize?: string;
}

/**
 * Apply Matrix transition effect to a single text element.
 * The element's text is replaced with rapidly cycling random characters
 * that gradually resolve to the target text.
 */
export function matrixText(
  el: HTMLElement,
  targetText: string,
  opts?: MatrixOptions
): Promise<void> {
  const duration = opts?.duration ?? 600;
  const delay = opts?.delay ?? 0;
  const color = opts?.color ?? 'var(--accent)';

  return new Promise((resolve) => {
    // Skip if text is identical or empty target
    if (targetText === el.textContent?.trim() && !el.dataset.matrixForce) {
      resolve();
      return;
    }

    const doStart = () => {
      const len = targetText.length;
      if (len === 0) {
        el.textContent = '';
        resolve();
        return;
      }

      // Save original styles for restoration
      const origColor = (el as HTMLElement).style.color;
      const origTS = (el as HTMLElement).style.textShadow;

      // Clear and create spans for each character
      el.textContent = '';
      const spans: HTMLSpanElement[] = [];

      for (let i = 0; i < len; i++) {
        const span = document.createElement('span');
        span.textContent = randChar();
        span.style.cssText = `color:${color};transition:color 0.15s ease;font-variant-ligatures:none;`;
        spans.push(span);
        el.appendChild(span);
      }

      const t0 = performance.now();
      // Characters resolve by 75% of total duration
      const charResolveTime = duration * 0.75;
      // Stagger between character starts (ms)
      const charStagger = Math.min(60, (duration * 0.55) / len);

      let rafId: number;

      const tick = () => {
        const elapsed = performance.now() - t0;

        if (elapsed >= duration) {
          // Animation complete - set final text cleanly
          el.textContent = targetText;
          el.style.color = origColor;
          el.style.textShadow = origTS;
          if (rafId) cancelAnimationFrame(rafId);
          resolve();
          return;
        }

        for (let i = 0; i < len; i++) {
          const charStart = i * charStagger;
          const charElapsed = elapsed - charStart;
          const progress = Math.min(Math.max(charElapsed / charResolveTime, 0), 1);

          if (progress >= 1) {
            // Character resolved to final value
            spans[i].textContent = targetText[i];
            spans[i].style.color = '';
            spans[i].style.textShadow = '';
          } else {
            // Still cycling through random characters
            spans[i].textContent = randChar();
            spans[i].style.color = color;
            // Add subtle glow during scramble phase
            if (progress < 0.5) {
              spans[i].style.textShadow = `0 0 6px ${color}`;
            } else {
              spans[i].style.textShadow = '';
            }
          }
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      setTimeout(doStart, delay);
    } else {
      doStart();
    }
  });
}

/**
 * Apply Matrix transition to multiple elements with staggered timing.
 * Returns a Promise that resolves when ALL animations complete.
 */
export async function matrixTextMany(
  items: Array<{ element: HTMLElement; text: string; delay?: number }>,
  opts?: Omit<MatrixOptions, 'delay'>
): Promise<void> {
  const promises = items.map(({ element, text, delay }) =>
    matrixText(element, text, { ...opts, delay: delay ?? 0 })
  );
  await Promise.all(promises);
}

/**
 * Apply Matrix transition to innerHTML elements (like <ul> with <li> items).
 * Replaces the container's content and animates each child element's text.
 */
export function matrixHTML(
  el: HTMLElement,
  htmlItems: string[],
  opts?: MatrixOptions
): Promise<void> {
  return new Promise((resolve) => {
    const duration = opts?.duration ?? 600;
    const delay = opts?.delay ?? 0;

    const doStart = () => {
      el.innerHTML = '';
      if (htmlItems.length === 0) { resolve(); return; }

      const liElements: HTMLElement[] = [];
      htmlItems.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = '';
        el.appendChild(li);
        liElements.push(li);
      });

      const perItemDelay = 40;
      const staggerBase = Math.min(80, (duration * 0.4) / htmlItems.length);

      const promises = liElements.map((li, i) =>
        matrixText(li, htmlItems[i], {
          duration: Math.max(300, duration - i * 30),
          delay: i * staggerBase,
          color: opts?.color,
        })
      );

      Promise.all(promises).then(() => resolve());
    };

    if (delay > 0) {
      setTimeout(doStart, delay);
    } else {
      doStart();
    }
  });
}