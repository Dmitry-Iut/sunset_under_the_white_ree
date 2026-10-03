(() => {
  "use strict";

  /* =====================================================================
     СЦЕНАРИЙ
     who:  n — рассказчик, l — Эйра, d — Рэйн
     cam:  камера над фоном [x%, y%, приближение, (где на экране, x), (где на экране, y)]
     mood: 0 — закат … 1 — глубокая ночь
     fx:   leaves | lanterns | hearts
     lamp: dim | lit (фонарик Тихого Света)
     ===================================================================== */
  const cam = (x, y, s, tx = 0.5, ty = 0.3) => [x, y, s, tx, ty];

  const WIDE   = cam(55, 48, 1.15, 0.5, 0.34);
  const CASTLE = cam(76, 36, 1.7);
  const SUN    = cam(26, 40, 1.7, 0.5, 0.33);
  const GIRL   = cam(16, 66, 1.8, 0.5, 0.34);
  const GIRL2  = cam(14, 64, 2.0, 0.5, 0.33);
  const TREE   = cam(18, 16, 1.7);
  const TOWN   = cam(56, 58, 1.7);
  const RIVER  = cam(38, 62, 1.7);
  const BOY    = cam(80, 72, 1.8, 0.5, 0.34);
  const BOTH   = cam(47, 68, 1.45, 0.5, 0.36);
  const BOTH2  = cam(46, 70, 1.7, 0.5, 0.34);
  const SKY    = cam(72, 14, 1.6);

  const NAMES = { n: "", l: "Эйра", d: "Рэйн" };

  const scenes = [
    { title: true, who: "n", cam: WIDE, mood: 0,
      text: "Листай историю кнопками «Вперёд» и «Назад» или просто касайся экрана. Устраивайся поудобнее — начинаем." },

    { who: "n", cam: CASTLE, mood: 0,
      text: "В далёкой стране, где река течёт прямо к закату, стоял тихий город, а над ним — старый замок с развевающимися флагами." },
    { who: "n", cam: SUN, mood: 0,
      text: "Каждый вечер, когда небо становилось медовым, на холм приходила Эйра." },
    { who: "n", cam: TREE, mood: 0, fx: "leaves",
      text: "Она садилась под Белым деревом — самым добрым деревом на всём холме. Весной оно цвело белоснежными цветами, а к осени одевалось в золото." },
    { who: "l", cam: GIRL, mood: 0.02, fx: "leaves",
      text: "Как же тихо… Кажется, весь мир задержал дыхание, чтобы не спугнуть этот закат." },
    { who: "n", cam: TREE, mood: 0.04, fx: "leaves",
      text: "В городе рассказывали: на закате Белое дерево слышит самое маленькое и самое важное желание." },
    { who: "l", cam: GIRL2, mood: 0.05, fx: "leaves",
      text: "Знаешь, дерево, у меня совсем простое желание. Пусть тот, кто мне дорог, придёт сегодня. Просто придёт — и мы вместе досмотрим закат." },
    { who: "n", cam: TREE, mood: 0.06, fx: "leaves",
      text: "Ветер качнул ветви, и на траву упал один золотой лист — будто дерево кивнуло в ответ." },

    { who: "n", cam: TOWN, mood: 0.1,
      text: "А по тропинке от городских ворот уже спешил тот, о ком она думала." },
    { who: "n", cam: BOY, mood: 0.1,
      text: "Рэйн почти бежал, и зелёный плащ развевался у него за спиной. В кармане он нёс маленький секрет и боялся растерять по дороге все нужные слова." },
    { who: "d", cam: BOY, mood: 0.12,
      text: "Только бы успеть, пока солнце не село… Только бы успеть." },
    { who: "d", cam: BOTH, mood: 0.14,
      text: "Эйра! Прости, я задержался!" },
    { who: "l", cam: GIRL, mood: 0.16,
      text: "Ты как раз вовремя. Солнце ещё не ушло — мне кажется, оно тебя ждало." },
    { who: "n", cam: BOTH, mood: 0.2,
      text: "Рэйн опустился на траву рядом с ней, и луг ответил тихим шорохом, будто и он был рад гостю." },
    { who: "d", cam: BOTH2, mood: 0.22,
      text: "Пока шёл к тебе, придумал целую речь. А теперь вижу тебя — и все слова разбежались. Остался один вопрос: как тебе удаётся делать любой вечер волшебным?" },
    { who: "l", cam: GIRL, mood: 0.24,
      text: "(смеётся) Это не я. Просто когда рядом ты, вечер сам становится волшебным. Я тут вообще ни при чём." },

    { who: "n", cam: RIVER, mood: 0.3,
      text: "Внизу, в городе, зажигались первые окна. Над мельницами тянулся дымок, на воде покачивались лодки, а мост отражался в реке золотой дугой." },
    { who: "d", cam: BOTH2, mood: 0.33,
      text: "Смотри, сколько в мире огней. Домов, окон, фонарей… А мой любимый свет — вот этот. Рядом." },
    { who: "n", cam: GIRL2, mood: 0.35,
      text: "Эйра улыбнулась и отвела глаза к реке — чтобы он не заметил, как у неё потеплели щёки. Но он, конечно, заметил." },
    { who: "d", cam: BOTH, mood: 0.38,
      text: "У меня для тебя кое-что есть." },
    { who: "n", cam: BOTH, mood: 0.4, lamp: "dim",
      text: "Он разжал ладонь. На ней лежал крошечный стеклянный фонарик, а внутри — спящая звёздочка." },
    { who: "d", cam: BOTH, mood: 0.45, lamp: "dim",
      text: "Это Фонарик Тихого Света. Мастер на рынке сказал, что звёздочка проснётся только от самых искренних слов. Поэтому слушай." },
    { who: "n", cam: SUN, mood: 0.5, lamp: "dim",
      text: "Эйра затаила дыхание. Солнце коснулось вершин гор и замерло, будто тоже слушало." },
    { who: "d", cam: BOTH, mood: 0.55, lamp: "dim",
      text: "Эйра, ты — моё самое тёплое место на свете. Рядом с тобой усталость превращается в тишину, а тишина — в счастье." },
    { who: "d", cam: BOTH, mood: 0.6, lamp: "dim",
      text: "Я хочу проживать с тобой закаты. Много-много. Столько, сколько нам подарит судьба. И каждый — только с тобой." },
    { who: "n", cam: BOTH, mood: 0.65, lamp: "lit",
      text: "И в этот миг звёздочка в фонарике вспыхнула мягким золотым светом." },
    { who: "l", cam: GIRL, mood: 0.68, lamp: "lit",
      text: "Она проснулась… Рэйн, я загадала желание, и оно уже сбылось. Ты пришёл." },
    { who: "l", cam: GIRL2, mood: 0.7, lamp: "lit",
      text: "Я тоже хочу все закаты. И рассветы. И обычные вторники с чаем. И тебя — в каждом из них." },
    { who: "n", cam: TREE, mood: 0.74, fx: "leaves", lamp: "lit",
      text: "Белое дерево тихо зашумело листвой — словно захлопало в ладоши от счастья." },

    { who: "n", cam: SKY, mood: 0.86,
      text: "Солнце ушло за горы, и небо стало глубоким и синим. Над замком одна за другой проснулись звёзды." },
    { who: "n", cam: TOWN, mood: 0.9, fx: "lanterns",
      text: "А из города в небо поднялись тёплые огоньки — люди отпускали бумажные фонарики на счастье." },
    { who: "d", cam: BOTH, mood: 0.92, fx: "lanterns",
      text: "Смотри, будто весь город загадывает желание вместе с нами." },
    { who: "l", cam: BOTH, mood: 0.94, fx: "lanterns",
      text: "Пусть сбудется всё, что мы сегодня загадали." },
    { who: "n", cam: BOTH2, mood: 0.96, fx: "lanterns",
      text: "Они сидели под Белым деревом, плечом к плечу, пока над холмом не стало совсем тихо и звёздно." },
    { who: "n", cam: WIDE, mood: 1, fx: "lanterns",
      text: "Так заканчивается Сказание о замке на закате. Но у историй, в которых двое любят друг друга, нет конца — они просто продолжаются." },

    { finale: true, who: "n", cam: SKY, mood: 1, fx: "hearts", text: "" }
  ];

  /* ===================================================================== */

  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), bg = $("bg"), dusk = $("dusk");
  const panel = $("panel"), nameEl = $("name"), textEl = $("text");
  const backBtn = $("back"), nextBtn = $("next"), more = $("more");
  const bar = $("bar"), lamp = $("lamp"), finale = $("finale");
  const intro = $("intro"), beginBtn = $("begin"), musicBtn = $("musicBtn");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const IMG = { w: 853, h: 1844 }; // размеры фоновой картинки
  const BASE_DELAY = 32;           // мс на символ — не быстро и не медленно

  let i = 0;
  let started = false;
  let typing = false;
  let typeTimer = 0;
  let chars = [];
  let shown = 0;
  let visSpan = null, restSpan = null;
  let mood = 0, targetMood = 0, starLevel = 0;
  let fxMode = null;

  /* ---------------- Камера ---------------- */
  function applyCamera(sc) {
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const k = Math.max(W / IMG.w, H / IMG.h);
    const iw = IMG.w * k, ih = IMG.h * k;
    const ox = (W - iw) / 2, oy = (H - ih) / 2;
    const [fx, fy, s, tx, ty] = sc.cam;
    const px = ox + (fx / 100) * iw;
    const py = oy + (fy / 100) * ih;
    let x = W * tx - s * px;
    let y = H * ty - s * py;
    x = Math.min(0, Math.max(W * (1 - s), x));
    y = Math.min(0, Math.max(H * (1 - s), y));
    bg.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s})`;
  }

  /* ---------------- Печать текста ---------------- */
  function renderText(n) {
    visSpan.textContent = chars.slice(0, n).join("");
    restSpan.textContent = chars.slice(n).join("");
  }

  function startTyping(text, instant) {
    clearTimeout(typeTimer);
    chars = Array.from(text);
    shown = 0;
    textEl.textContent = "";
    visSpan = document.createElement("span");
    restSpan = document.createElement("span");
    restSpan.className = "rest";
    textEl.append(visSpan, restSpan);
    more.classList.remove("on");

    if (instant || !text) {
      shown = chars.length;
      renderText(shown);
      typing = false;
      afterTyping();
      return;
    }
    typing = true;
    renderText(0);
    typeTimer = setTimeout(tick, 380);
  }

  function tick() {
    shown++;
    renderText(shown);
    if (shown >= chars.length) {
      typing = false;
      afterTyping();
      return;
    }
    const c = chars[shown - 1];
    let d = BASE_DELAY;
    if (".!?…".includes(c)) d += 260;
    else if (",;:—".includes(c)) d += 120;
    typeTimer = setTimeout(tick, d);
  }

  function finishTyping() {
    clearTimeout(typeTimer);
    shown = chars.length;
    renderText(shown);
    typing = false;
    afterTyping();
  }

  function afterTyping() {
    if (i < scenes.length - 1) more.classList.add("on");
  }

  /* ---------------- Показ сцены ---------------- */
  function show(n, instant = false) {
    i = Math.max(0, Math.min(scenes.length - 1, n));
    const sc = scenes[i];

    stage.classList.toggle("is-title", !!sc.title);
    stage.classList.toggle("is-finale", !!sc.finale);
    finale.classList.toggle("show", !!sc.finale);

    applyCamera(sc);
    targetMood = sc.mood || 0;
    dusk.style.opacity = String(Math.min(1, targetMood));
    setFx(sc.fx || null);

    lamp.classList.toggle("dim", sc.lamp === "dim");
    lamp.classList.toggle("lit", sc.lamp === "lit");

    panel.dataset.who = sc.who;
    nameEl.textContent = NAMES[sc.who] || "";
    bar.style.width = (i / (scenes.length - 1)) * 100 + "%";
    backBtn.disabled = i === 0;
    nextBtn.disabled = i === scenes.length - 1;

    if (!sc.finale) startTyping(sc.text, instant);
    else { clearTimeout(typeTimer); typing = false; more.classList.remove("on"); }
  }

  function next() {
    if (!started) return;
    if (typing) { finishTyping(); return; }
    if (i < scenes.length - 1) show(i + 1);
  }

  function prev() {
    if (!started || i === 0) return;
    show(i - 1, true);
  }

  /* ---------------- События ---------------- */
  backBtn.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); next(); });
  $("fBack").addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  $("restart").addEventListener("click", (e) => { e.stopPropagation(); show(0); });

  stage.addEventListener("click", (e) => {
    if (!started || e.target.closest("button") || scenes[i].finale) return;
    next();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  });

  let resizeRaf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      bg.classList.add("no-trans");
      resizeFx();
      applyCamera(scenes[i]);
      requestAnimationFrame(() => bg.classList.remove("no-trans"));
    });
  });

  /* ---------------- Заставка ---------------- */
  const introLines = Array.from(document.querySelectorAll(".il"));
  let introStep = 0;
  let introTimer = 0;

  function revealIntro() {
    if (introStep < introLines.length) {
      introLines[introStep++].classList.add("on");
      const gap = introStep === 1 ? 1700 : 2700;
      introTimer = setTimeout(revealIntro, gap);
    } else {
      beginBtn.classList.add("on");
    }
  }
  function revealAllIntro() {
    clearTimeout(introTimer);
    introLines.forEach((l) => l.classList.add("on"));
    introStep = introLines.length;
    beginBtn.classList.add("on");
  }
  intro.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    revealAllIntro();
  });
  introTimer = setTimeout(revealIntro, 700);

  beginBtn.addEventListener("click", () => {
    if (started) return;
    Music.start();            // старт музыки должен быть внутри касания (iOS)
    started = true;
    intro.classList.add("gone");
    show(0);
  });

  /* ---------------- Кнопка музыки ---------------- */
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const m = !Music.isMuted();
    Music.setMuted(m);
    musicBtn.classList.toggle("off", m);
  });

  /* =====================================================================
     ЭФФЕКТЫ: светлячки, звёзды, листья, фонарики, сердца
     ===================================================================== */
  const cv = $("fx");
  const cx = cv.getContext("2d");
  let W = 0, H = 0, DPR = 1;
  let fireflies = [], stars = [], leaves = [], lanterns = [], hearts = [];
  let spawnLeaf = 0, spawnLantern = 0, spawnHeart = 0;

  const glow = makeGlow(64, [255, 222, 150]);
  const lanternSprite = makeLantern();

  function makeGlow(size, rgb) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`);
    grad.addColorStop(0.25, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.45)`);
    grad.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }

  function makeLantern() {
    const w = 90, h = 110;
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    const halo = g.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, 44);
    halo.addColorStop(0, "rgba(255,190,110,.55)");
    halo.addColorStop(1, "rgba(255,170,90,0)");
    g.fillStyle = halo;
    g.fillRect(0, 0, w, h);
    const bw = 26, bh = 36, x = (w - bw) / 2, y = (h - bh) / 2;
    const body = g.createLinearGradient(0, y, 0, y + bh);
    body.addColorStop(0, "#ffe2a8");
    body.addColorStop(1, "#e88f4c");
    g.fillStyle = body;
    g.beginPath();
    g.moveTo(x + 3, y);
    g.lineTo(x + bw - 3, y);
    g.lineTo(x + bw, y + bh - 4);
    g.quadraticCurveTo(x + bw / 2, y + bh + 2, x, y + bh - 4);
    g.closePath();
    g.fill();
    g.fillStyle = "rgba(120,60,30,.55)";
    g.fillRect(x + 3, y - 2, bw - 6, 3);
    return c;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function resizeFx() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth;
    H = stage.clientHeight;
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const nf = reduceMotion ? 8 : Math.round((W * H) / 15000);
    fireflies = Array.from({ length: nf }, () => ({
      x: rand(0, W), y: rand(H * 0.25, H * 0.95),
      s: rand(5, 11), vx: rand(-6, 6), vy: rand(-5, 3),
      ph: rand(0, 6.28), tw: rand(0.6, 1.6)
    }));
    stars = Array.from({ length: 70 }, () => ({
      x: rand(0, W), y: rand(0, H * 0.5),
      r: rand(0.4, 1.4), ph: rand(0, 6.28), tw: rand(0.8, 2.2)
    }));
  }

  function setFx(mode) {
    if (mode === fxMode) return;
    fxMode = mode;
    if (mode === "lanterns" && lanterns.length < 4) {
      for (let k = 0; k < 7; k++) lanterns.push(newLantern(rand(H * 0.25, H * 0.95)));
    }
  }

  function newLantern(y) {
    return {
      x: rand(W * 0.08, W * 0.95), y: y === undefined ? H + 50 : y,
      vy: rand(14, 26), sw: rand(8, 18), ph: rand(0, 6.28),
      sc: rand(0.55, 1.1), a: 0
    };
  }

  function drawHeart(c, x, y, s) {
    c.beginPath();
    c.moveTo(x, y + s * 0.9);
    c.bezierCurveTo(x - s * 1.3, y, x - s * 0.7, y - s * 0.9, x, y - s * 0.35);
    c.bezierCurveTo(x + s * 0.7, y - s * 0.9, x + s * 1.3, y, x, y + s * 0.9);
    c.fill();
  }

  const LEAF_COLORS = ["#d9a441", "#c47f2c", "#a8a648", "#e0b45a"];
  let last = performance.now();
  let t = 0;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;

    mood += (targetMood - mood) * Math.min(1, dt * 0.7);
    const starTarget = Math.max(0, (targetMood - 0.45) / 0.55);
    starLevel += (starTarget - starLevel) * Math.min(1, dt * 0.8);

    cx.clearRect(0, 0, W, H);

    // звёзды
    if (starLevel > 0.01) {
      cx.fillStyle = "#fff6e0";
      for (const s of stars) {
        const a = starLevel * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
        cx.globalAlpha = a;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, 6.283);
        cx.fill();
      }
    }

    // светлячки
    cx.globalCompositeOperation = "lighter";
    const level = 0.3 + 0.7 * mood;
    for (const f of fireflies) {
      f.x += (f.vx + Math.sin(t * 0.6 + f.ph) * 6) * dt;
      f.y += (f.vy + Math.cos(t * 0.5 + f.ph) * 5) * dt;
      if (f.x < -20) f.x = W + 20; else if (f.x > W + 20) f.x = -20;
      if (f.y < H * 0.2) f.y = H * 0.98; else if (f.y > H + 20) f.y = H * 0.3;
      const a = (0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * f.tw + f.ph))) * level * 0.8;
      cx.globalAlpha = a;
      const s = f.s * 2.6;
      cx.drawImage(glow, f.x - s / 2, f.y - s / 2, s, s);
    }
    cx.globalCompositeOperation = "source-over";

    // листья
    if (fxMode === "leaves" && !reduceMotion) {
      spawnLeaf -= dt;
      if (spawnLeaf <= 0 && leaves.length < 9) {
        spawnLeaf = rand(0.9, 1.8);
        leaves.push({
          x: rand(-10, W * 0.7), y: -12, vy: rand(20, 34), vx: rand(6, 16),
          rot: rand(0, 6.28), vr: rand(-1.4, 1.4), ph: rand(0, 6.28),
          s: rand(4, 7.5), c: LEAF_COLORS[(Math.random() * LEAF_COLORS.length) | 0]
        });
      }
    }
    for (let k = leaves.length - 1; k >= 0; k--) {
      const l = leaves[k];
      l.y += l.vy * dt;
      l.x += (l.vx + Math.sin(t * 1.3 + l.ph) * 14) * dt;
      l.rot += l.vr * dt;
      if (l.y > H * 0.62 || l.x > W + 20) { leaves.splice(k, 1); continue; }
      cx.save();
      cx.globalAlpha = 0.85 * Math.min(1, l.y / 40) * Math.max(0, 1 - Math.max(0, l.y - H * 0.5) / (H * 0.12));
      cx.translate(l.x, l.y);
      cx.rotate(l.rot);
      cx.fillStyle = l.c;
      cx.beginPath();
      cx.ellipse(0, 0, l.s, l.s * 0.5, 0, 0, 6.283);
      cx.fill();
      cx.restore();
    }

    // бумажные фонарики
    if (fxMode === "lanterns") {
      spawnLantern -= dt;
      if (spawnLantern <= 0 && lanterns.length < (reduceMotion ? 6 : 16)) {
        spawnLantern = rand(0.7, 1.4);
        lanterns.push(newLantern());
      }
    }
    for (let k = lanterns.length - 1; k >= 0; k--) {
      const l = lanterns[k];
      l.y -= l.vy * dt;
      const x = l.x + Math.sin(t * 0.7 + l.ph) * l.sw;
      l.a = Math.min(1, l.a + dt * 0.6);
      if (l.y < -60) { lanterns.splice(k, 1); continue; }
      const fade = Math.min(1, Math.max(0, l.y / (H * 0.18)));
      cx.globalAlpha = l.a * fade * 0.95;
      const w = lanternSprite.width * l.sc, h = lanternSprite.height * l.sc;
      cx.drawImage(lanternSprite, x - w / 2, l.y - h / 2, w, h);
    }

    // сердечки
    if (fxMode === "hearts") {
      spawnHeart -= dt;
      if (spawnHeart <= 0 && hearts.length < (reduceMotion ? 6 : 14)) {
        spawnHeart = rand(0.5, 1.1);
        hearts.push({
          x: rand(W * 0.05, W * 0.95), y: H + 20, vy: rand(16, 32),
          sw: rand(6, 16), ph: rand(0, 6.28), s: rand(5, 11), a: rand(0.35, 0.7)
        });
      }
    }
    for (let k = hearts.length - 1; k >= 0; k--) {
      const h = hearts[k];
      h.y -= h.vy * dt;
      if (h.y < -30) { hearts.splice(k, 1); continue; }
      const x = h.x + Math.sin(t * 0.8 + h.ph) * h.sw;
      cx.globalAlpha = h.a * Math.min(1, h.y / (H * 0.25));
      cx.fillStyle = "#e7a9bb";
      drawHeart(cx, x, h.y, h.s);
    }

    cx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  /* =====================================================================
     МУЗЫКА
     1) Если рядом лежит music.mp3 — играет он.
     2) Если файла нет — звучит спокойная музыка, сочинённая прямо в браузере.
     ===================================================================== */
  const Music = (() => {
    let ctx = null, started = false, muted = false;
    let el = null, fileOk = false;
    let master = null, bus = null, synthOn = false, sched = 0;
    let nextChord = 0, nextPluck = 0, chordIdx = 0, scaleIdx = 2;

    const VOL = 0.55;
    const CHORDS = [
      [146.83, 185.00, 220.00, 293.66],  // D
      [110.00, 138.59, 164.81, 220.00],  // A
      [123.47, 146.83, 185.00, 246.94],  // Bm
      [98.00, 123.47, 146.83, 196.00]    // G
    ];
    const SCALE = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];

    function unlock() {
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) { /* ignore */ }
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = ctx || new AC();
        if (ctx.resume) ctx.resume();
        const b = ctx.createBuffer(1, 1, 22050);
        const s = ctx.createBufferSource();
        s.buffer = b; s.connect(ctx.destination); s.start(0);
      } catch (e) { /* ignore */ }
    }

    function start() {
      if (started) return;
      started = true;
      unlock();

      el = new Audio("music.mp3");
      el.loop = true;
      el.preload = "auto";
      el.setAttribute("playsinline", "");
      let fell = false;
      const fallback = () => { if (fell || fileOk) return; fell = true; startSynth(); };
      el.addEventListener("error", fallback);
      const p = el.play();
      if (p && p.then) {
        p.then(() => {
          fileOk = true;
          if (muted) el.pause();
        }).catch(fallback);
      }
    }

    function impulse(sec) {
      const r = ctx.sampleRate, n = Math.floor(r * sec);
      const b = ctx.createBuffer(2, n, r);
      for (let ch = 0; ch < 2; ch++) {
        const d = b.getChannelData(ch);
        for (let k = 0; k < n; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / n, 2.4);
      }
      return b;
    }

    function startSynth() {
      if (synthOn || !ctx) return;
      synthOn = true;
      master = ctx.createGain();
      master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      const dry = ctx.createGain(); dry.gain.value = 0.75;
      const wet = ctx.createGain(); wet.gain.value = 0.55;
      const conv = ctx.createConvolver(); conv.buffer = impulse(3.2);
      bus = ctx.createGain();
      bus.connect(dry); bus.connect(conv); conv.connect(wet);
      dry.connect(master); wet.connect(master);
      master.connect(comp); comp.connect(ctx.destination);
      master.gain.setTargetAtTime(muted ? 0 : VOL, ctx.currentTime, 2);

      nextChord = ctx.currentTime + 0.1;
      nextPluck = ctx.currentTime + 3;
      sched = setInterval(schedule, 200);
      schedule();
    }

    function schedule() {
      if (!ctx || ctx.state === "closed") return;
      const now = ctx.currentTime;
      while (nextChord < now + 1.5) {
        playChord(CHORDS[chordIdx % CHORDS.length], nextChord, 8);
        chordIdx++;
        nextChord += 8;
      }
      while (nextPluck < now + 1.5) {
        playPluck(nextPluck);
        nextPluck += Math.random() < 0.18 ? rand(2.6, 4) : rand(0.8, 1.9);
      }
    }

    function playChord(notes, t0, dur) {
      for (const f of notes) {
        for (const [type, det, peak, cut] of [["sine", 0, 0.07, 1400], ["triangle", 6, 0.025, 700]]) {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          const lp = ctx.createBiquadFilter();
          o.type = type;
          o.frequency.value = f;
          o.detune.value = det + rand(-2, 2);
          lp.type = "lowpass";
          lp.frequency.value = cut;
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(peak, t0 + 2.4);
          g.gain.linearRampToValueAtTime(peak * 0.8, t0 + dur - 1);
          g.gain.linearRampToValueAtTime(0, t0 + dur + 2.6);
          o.connect(lp); lp.connect(g); g.connect(bus);
          o.start(t0);
          o.stop(t0 + dur + 2.8);
        }
      }
    }

    function playPluck(t0) {
      const steps = [-2, -1, -1, 1, 1, 2];
      scaleIdx = Math.max(0, Math.min(SCALE.length - 1, scaleIdx + steps[(Math.random() * steps.length) | 0]));
      const f = SCALE[scaleIdx];
      for (const [mul, peak] of [[1, 0.10], [2, 0.018]]) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f * mul;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(peak, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0005, t0 + 2.8);
        o.connect(g); g.connect(bus);
        o.start(t0);
        o.stop(t0 + 3);
      }
    }

    function setMuted(m) {
      muted = m;
      if (el && fileOk) { m ? el.pause() : el.play().catch(() => {}); }
      if (synthOn && master) master.gain.setTargetAtTime(m ? 0 : VOL, ctx.currentTime, 0.4);
    }

    document.addEventListener("visibilitychange", () => {
      if (!started) return;
      if (document.hidden) {
        if (el && fileOk) el.pause();
        if (ctx && ctx.suspend) ctx.suspend();
      } else if (!muted) {
        if (el && fileOk) el.play().catch(() => {});
        if (ctx && ctx.resume) ctx.resume();
      }
    });

    return { start, setMuted, isMuted: () => muted };
  })();

  /* ---------------- Запуск ---------------- */
  resizeFx();
  applyCamera(scenes[0]);
  requestAnimationFrame(() => requestAnimationFrame(() => bg.classList.remove("no-trans")));
  requestAnimationFrame(frame);
})();
