// 愛生博士クイズゲーム — ゲームロジック
// サーバー不要・localStorage完結のフェーズ1モックアップ

const STORAGE_KEY = 'meiHakaseSave';
const QUESTION_TIME_LIMIT = 8; // 秒（タイムアタック・エンドレスのみ）
const TIME_ATTACK_SECONDS = 60;
const TIME_ATTACK_QUESTIONS = 10;

const INTRO_QUESTIONS = [
  {
    question: "あなたが好きなのは？",
    choices: ["めいちゃん", "パンダさん"],
    answerIndex: 0, // どちらを選んでも正解扱い（絶対に間違えられない導入）
    alwaysCorrect: true
  },
  {
    question: "パンダさんの色は？",
    choices: ["白と黒", "赤と青"],
    answerIndex: 0,
    alwaysCorrect: true
  }
];

function defaultSave() {
  return {
    version: 1,
    nickname: null,
    onboarded: false,
    streak: { count: 0, lastPlayedDate: null },
    highScores: { timeAttack: 0, endless: 0 },
    wrongQuestions: {},
    totalStats: { totalAnswered: 0, totalCorrect: 0 },
    daily: null,
    badges: {},
    settings: { sound: true },
    // Wave 2 追加分
    power: { value: 60, lastDate: null },
    cards: {},
    sasa: 0,
    outfit: null,
    unlockedOutfits: {},
    omikuji: null,
    lastVisitDate: null,
    anniversarySeenDate: null
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return defaultSave();
    // 古いセーブにフィールドが無い場合の防御的ガード
    parsed.badges = parsed.badges || {};
    parsed.settings = parsed.settings || { sound: true };
    if (typeof parsed.settings.sound !== 'boolean') parsed.settings.sound = true;
    // Wave 2: 旧セーブ（power/cards/sasa/outfit/omikuji未所持）への防御ガード
    if (!parsed.power || typeof parsed.power.value !== 'number') {
      parsed.power = { value: 60, lastDate: null };
    }
    parsed.cards = parsed.cards || {};
    if (typeof parsed.sasa !== 'number' || isNaN(parsed.sasa)) parsed.sasa = 0;
    if (typeof parsed.outfit === 'undefined') parsed.outfit = null;
    parsed.unlockedOutfits = parsed.unlockedOutfits || {};
    if (typeof parsed.omikuji === 'undefined') parsed.omikuji = null;
    if (typeof parsed.lastVisitDate === 'undefined') parsed.lastVisitDate = null;
    if (typeof parsed.anniversarySeenDate === 'undefined') parsed.anniversarySeenDate = null;
    return parsed;
  } catch (e) {
    return defaultSave();
  }
}

function writeSave(save) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

let save = loadSave();

// ==================== J1: 効果音（WebAudio合成） ====================
const sfx = (function () {
  let ctx = null;
  let unlocked = false;

  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  }

  // 初回ユーザー操作でAudioContextを初期化・再開する（ブラウザの自動再生制限対応）
  function unlockOnFirstInteraction() {
    if (unlocked) return;
    unlocked = true;
    const c = ensureContext();
    if (c && c.state === 'suspended') c.resume().catch(() => {});
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, unlockOnFirstInteraction, { once: true, passive: true });
  });

  function isEnabled() {
    return !!(save && save.settings && save.settings.sound);
  }

  // 1音鳴らす。type: oscillator波形, freq: 周波数(Hz), start: 開始時刻オフセット(秒), dur: 長さ(秒), gain: 音量(0〜1), glideTo: 指定時はfreqへ滑らかに変化
  function tone(c, { type = 'sine', freq = 440, start = 0, dur = 0.15, gain = 0.15, glideTo = null }) {
    const osc = c.createOscillator();
    const amp = c.createGain();
    osc.type = type;
    const t0 = c.currentTime + start;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.linearRampToValueAtTime(glideTo, t0 + dur);
    amp.gain.setValueAtTime(0, t0);
    amp.gain.linearRampToValueAtTime(gain, t0 + 0.015);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(amp);
    amp.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function playSafe(fn) {
    if (!isEnabled()) return;
    const c = ensureContext();
    if (!c) return;
    if (c.state === 'suspended') c.resume().catch(() => {});
    try { fn(c); } catch (e) { /* 音が鳴らなくてもゲーム進行は止めない */ }
  }

  return {
    // 正解ピンポン：2音上昇。comboLevel(2以上)が渡された場合は基準音を半音ずつ上げる
    correct(comboLevel) {
      playSafe(c => {
        const semitoneUp = Math.max(0, (comboLevel || 1) - 1);
        const shift = Math.pow(2, semitoneUp / 12);
        tone(c, { type: 'sine', freq: 523.25 * shift, start: 0, dur: 0.12, gain: 0.16 });
        tone(c, { type: 'sine', freq: 784.0 * shift, start: 0.1, dur: 0.16, gain: 0.18 });
      });
    },
    // 不正解ぽよん：優しい下降
    wrong() {
      playSafe(c => {
        tone(c, { type: 'sine', freq: 330, start: 0, dur: 0.22, gain: 0.14, glideTo: 220 });
      });
    },
    // ボタンtapポップ音
    tap() {
      playSafe(c => {
        tone(c, { type: 'triangle', freq: 600, start: 0, dur: 0.06, gain: 0.08 });
      });
    },
    // リザルトのドラムロール（短い連打音）
    drumroll() {
      playSafe(c => {
        for (let i = 0; i < 14; i++) {
          tone(c, { type: 'square', freq: 140 + Math.random() * 20, start: i * 0.055, dur: 0.05, gain: 0.06 });
        }
      });
    },
    // ファンファーレ
    fanfare() {
      playSafe(c => {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((f, i) => {
          tone(c, { type: 'triangle', freq: f, start: i * 0.13, dur: 0.22, gain: 0.17 });
        });
      });
    },
    // ベスト更新・バッジ解放きらきらアルペジオ
    sparkle() {
      playSafe(c => {
        const notes = [880, 1046.5, 1318.5, 1568, 2093];
        notes.forEach((f, i) => {
          tone(c, { type: 'sine', freq: f, start: i * 0.07, dur: 0.18, gain: 0.12 });
        });
      });
    }
  };
})();

// ==================== J2: ハプティクス ====================
const haptics = {
  correct() {
    if (navigator.vibrate) navigator.vibrate(30);
  },
  wrong() {
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
  },
  celebrate() {
    if (navigator.vibrate) navigator.vibrate([30, 40, 30, 40, 80]);
  }
};

// ==================== サウンドトグル（🔊/🔇） ====================
function refreshSoundToggleUI() {
  const on = !!(save.settings && save.settings.sound);
  document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
    btn.textContent = on ? '🔊' : '🔇';
  });
}

function toggleSound() {
  save.settings = save.settings || { sound: true };
  save.settings.sound = !save.settings.sound;
  writeSave(save);
  refreshSoundToggleUI();
  if (save.settings.sound) sfx.tap();
}

// ==================== 画面切り替え ====================
const TABBED_SCREENS = { home: 'screen-home', 'play-select': 'screen-play-select', collection: 'screen-collection' };
const SCREENS_WITH_TABBAR = new Set(Object.values(TABBED_SCREENS));

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active', 'screen-enter');
  });
  const target = document.getElementById(id);
  target.classList.add('active', 'screen-enter');

  const app = document.getElementById('app');
  const showTabBar = SCREENS_WITH_TABBAR.has(id);
  document.getElementById('tab-bar').classList.toggle('show', showTabBar);
  app.classList.toggle('has-tabbar', showTabBar);
  if (showTabBar) {
    const tabName = Object.keys(TABBED_SCREENS).find(k => TABBED_SCREENS[k] === id);
    setActiveTabUI(tabName);
  }
  refreshSoundToggleUI();
}

let activeTab = 'home';

function setActiveTabUI(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const map = { home: 'tab-btn-home', 'play-select': 'tab-btn-play', collection: 'tab-btn-collection' };
  const btn = document.getElementById(map[tabName]);
  if (btn) btn.classList.add('active');
}

// J6: タブ切替（ホーム/あそぶ/コレクション）。切替にtap音を鳴らす
function goToTab(tabName) {
  sfx.tap();
  if (tabName === 'home') {
    renderHome();
  } else if (tabName === 'play-select') {
    renderPlaySelect();
  } else if (tabName === 'collection') {
    renderCollection();
  }
}

// ==================== 起動処理 ====================
function boot() {
  if (!save.onboarded) {
    startIntro();
  } else {
    renderHome();
  }
}

// ==================== 導入クイズ（初回のみ） ====================
let introIndex = 0;

function startIntro() {
  introIndex = 0;
  showScreen('screen-intro');
  renderIntroQuestion();
}

function renderIntroQuestion() {
  const q = INTRO_QUESTIONS[introIndex];
  document.getElementById('intro-question').textContent = q.question;
  const box = document.getElementById('intro-choices');
  box.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.onclick = () => answerIntro(i);
    box.appendChild(btn);
  });
}

function answerIntro(i) {
  sfx.correct(1);
  haptics.correct();
  introIndex++;
  if (introIndex < INTRO_QUESTIONS.length) {
    renderIntroQuestion();
  } else {
    showScreen('screen-name');
  }
}

function submitName() {
  const input = document.getElementById('name-input');
  const nickname = input.value.trim();
  save.nickname = nickname || '名無しのパンダさん';
  save.onboarded = true;
  writeSave(save);
  goToModes();
}

function skipName() {
  save.nickname = '名無しのパンダさん';
  save.onboarded = true;
  writeSave(save);
  goToModes();
}

// ==================== ランク（累計正解数で愛生博士に近づく） ====================
const RANKS = [
  { min: 0, title: '愛生博士見習い' },
  { min: 10, title: '愛生ファン' },
  { min: 25, title: '愛生マニア' },
  { min: 50, title: '愛生博士候補' },
  { min: 100, title: '愛生博士🎓' }
];

function getRank(totalCorrect) {
  let current = RANKS[0];
  let next = null;
  for (const rank of RANKS) {
    if (totalCorrect >= rank.min) current = rank;
    else { next = rank; break; }
  }
  return { current, next };
}

// ==================== L4: 語録カードコレクション ====================
const CARD_CATEGORIES = new Set(['quotes', 'style']);

function isCardEligible(q) {
  return q && CARD_CATEGORIES.has(q.category);
}

function cardPool() {
  return QUIZ_DATA.filter(isCardEligible);
}

function cardTextFor(q) {
  return q.choices[q.answerIndex];
}

// 正解時に呼ぶ。初解放なら解放してtrueを返す（リザルトの「語録カードGET」表示判定用）
function tryUnlockCard(q) {
  if (!isCardEligible(q)) return false;
  if (save.cards[q.id]) return false;
  save.cards[q.id] = localDateString();
  writeSave(save);
  return true;
}

function renderQuoteCardGrid() {
  const grid = document.getElementById('quote-card-grid');
  const progressEl = document.getElementById('card-progress-text');
  if (!grid) return;
  const pool = cardPool();
  const unlockedCount = pool.filter(q => save.cards[q.id]).length;
  if (progressEl) progressEl.textContent = `${unlockedCount}/${pool.length}枚`;

  grid.innerHTML = '';
  pool.forEach(q => {
    const cell = document.createElement('div');
    const unlocked = !!save.cards[q.id];
    if (unlocked) {
      cell.className = 'quote-card' + (q.difficulty >= 4 ? ' shiny' : '');
      cell.textContent = cardTextFor(q);
      cell.onclick = () => toggleCardExpand(cell);
    } else {
      cell.className = 'quote-card locked';
      cell.textContent = '？？？';
    }
    grid.appendChild(cell);
  });
}

function toggleCardExpand(cell) {
  const wasExpanded = cell.classList.contains('expanded');
  document.querySelectorAll('.quote-card.expanded').forEach(c => c.classList.remove('expanded'));
  if (!wasExpanded) cell.classList.add('expanded');
}

// ==================== L5: ささポイント＋着せ替え ====================
const OUTFITS = [
  { id: 'hat', emoji: '🎓', name: 'はかせ帽', cost: 30 },
  { id: 'ribbon', emoji: '🎀', name: 'リボン', cost: 50 },
  { id: 'flower', emoji: '🌸', name: 'お花', cost: 80 },
  { id: 'crown', emoji: '👑', name: 'クラウン', cost: 150 },
  { id: 'sasakanzashi', emoji: '🎋', name: '笹かんざし', cost: 100 }
];

// 正解1問=1、コンボ3以上の正解=2 のささ加算
function awardSasa(combo) {
  const amount = (combo && combo >= 3) ? 2 : 1;
  save.sasa += amount;
  writeSave(save);
}

function renderOutfitGrid() {
  const grid = document.getElementById('outfit-grid');
  if (!grid) return;
  save.unlockedOutfits = save.unlockedOutfits || {};
  grid.innerHTML = '';
  OUTFITS.forEach(o => {
    const cell = document.createElement('div');
    const unlocked = !!save.unlockedOutfits[o.id];
    const equipped = save.outfit === o.id;
    if (equipped) {
      cell.className = 'outfit-cell equipped';
      cell.innerHTML = `<span class="outfit-emoji">${o.emoji}</span>${o.name}<div class="outfit-cost">装着中</div>`;
    } else if (unlocked) {
      cell.className = 'outfit-cell';
      cell.innerHTML = `<span class="outfit-emoji">${o.emoji}</span>${o.name}<div class="outfit-cost">タップで装着</div>`;
    } else {
      cell.className = 'outfit-cell locked';
      const remain = Math.max(0, o.cost - save.sasa);
      cell.innerHTML = `<span class="outfit-emoji">${o.emoji}</span>${o.name}<div class="outfit-cost">${remain > 0 ? `あと${remain}🎋` : `${o.cost}🎋`}</div>`;
    }
    cell.onclick = () => onOutfitCellTap(o);
    grid.appendChild(cell);
  });
}

function onOutfitCellTap(outfit) {
  save.unlockedOutfits = save.unlockedOutfits || {};
  const unlocked = !!save.unlockedOutfits[outfit.id];

  if (!unlocked) {
    if (save.sasa < outfit.cost) {
      renderOutfitGrid(); // あと◯🎋表示のまま。特に何もしない
      return;
    }
    save.sasa -= outfit.cost;
    save.unlockedOutfits[outfit.id] = true;
    save.outfit = outfit.id;
    writeSave(save);
    sfx.fanfare();
    spawnOutfitConfetti();
    renderOutfitGrid();
    renderSasaBalance();
    return;
  }

  // 解放済み：装着中なら外す、そうでなければ付け替え
  save.outfit = (save.outfit === outfit.id) ? null : outfit.id;
  writeSave(save);
  sfx.tap();
  renderOutfitGrid();
}

function spawnOutfitConfetti() {
  const app = document.getElementById('app');
  const grid = document.getElementById('outfit-grid');
  if (!app || !grid) return;
  const rect = grid.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();
  const layer = document.createElement('div');
  layer.className = 'celebration-layer';
  app.appendChild(layer);
  spawnBurst(layer, (rect.left + rect.right) / 2 - appRect.left, rect.top - appRect.top + 20, true, 0);
  setTimeout(() => layer.remove(), 1000);
}

// ==================== L6: パンダさんおみくじ ====================
function omikujiDoneToday() {
  return !!(save.omikuji && save.omikuji.date === localDateString());
}

function renderOmikujiCard() {
  const btn = document.getElementById('omikuji-draw-btn');
  const resultBox = document.getElementById('omikuji-result');
  const rollingEl = document.getElementById('omikuji-rolling');
  rollingEl.style.display = 'none';

  if (omikujiDoneToday()) {
    btn.style.display = 'none';
    resultBox.style.display = 'block';
    showOmikujiResult(save.omikuji.rankIndex, false);
  } else {
    btn.style.display = 'inline-block';
    btn.disabled = false;
    resultBox.style.display = 'none';
  }
}

function drawOmikuji() {
  if (omikujiDoneToday()) return;
  const btn = document.getElementById('omikuji-draw-btn');
  const rollingEl = document.getElementById('omikuji-rolling');
  const resultBox = document.getElementById('omikuji-result');

  btn.disabled = true;
  btn.style.display = 'none';
  resultBox.style.display = 'none';
  rollingEl.style.display = 'block';
  sfx.drumroll();
  haptics.correct();

  setTimeout(() => {
    rollingEl.style.display = 'none';
    const rankIndex = Math.floor(Math.random() * MEI_CONTENT.omikuji.length);
    save.omikuji = { date: localDateString(), rankIndex };
    writeSave(save);
    resultBox.style.display = 'block';
    showOmikujiResult(rankIndex, true);
  }, 900);
}

function showOmikujiResult(rankIndex, isFreshDraw) {
  const entry = MEI_CONTENT.omikuji[rankIndex];
  const message = pickRandom(entry.messages);
  document.getElementById('omikuji-rank').textContent = entry.rank;
  document.getElementById('omikuji-message').textContent = message;
  document.getElementById('omikuji-lucky').textContent = `ラッキーアイテム: ${entry.luckyItem}`;
  document.getElementById('omikuji-done-msg').textContent = `今日は${entry.rank}だったよ！また明日ね🐼`;

  // 上位ランク（前半3つ）は紙吹雪＋ファンファーレ
  const isTopRank = rankIndex < 3;
  if (isFreshDraw) {
    if (isTopRank) {
      sfx.fanfare();
      haptics.celebrate();
      spawnOmikujiConfetti();
    } else {
      sfx.sparkle();
    }
  }
}

function spawnOmikujiConfetti() {
  const app = document.getElementById('app');
  const card = document.querySelector('.omikuji-card');
  if (!app || !card) return;
  const rect = card.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();
  const layer = document.createElement('div');
  layer.className = 'celebration-layer';
  app.appendChild(layer);
  spawnBurst(layer, (rect.left + rect.right) / 2 - appRect.left, rect.top - appRect.top + 30, true, 0);
  setTimeout(() => layer.remove(), 1000);
}

function shareOmikuji() {
  if (!save.omikuji) return;
  const entry = MEI_CONTENT.omikuji[save.omikuji.rankIndex];
  const text = `愛生博士のパンダさんおみくじ🎋 今日の運勢は【${entry.rank}】でした🐼\n#愛生博士クイズ #山﨑愛生`;
  const url = location.href.split('?')[0].split('#')[0];
  const intent = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
  window.open(intent, '_blank', 'noopener');
}

// ==================== R2: パンダさんバッジコレクション ====================
const CORRECT_BADGES = [
  { id: 'correct_010', min: 10, emoji: '🐼', name: 'どさんこパンダさんバッジ' },
  { id: 'correct_025', min: 25, emoji: '⚡', name: 'ウルトラパンダさんバッジ' },
  { id: 'correct_050', min: 50, emoji: '✨', name: 'スペシャルパンダさんバッジ' },
  { id: 'correct_100', min: 100, emoji: '🎀', name: 'パンダコさんバッジ' },
  { id: 'correct_200', min: 200, emoji: '🥳', name: 'ハッピーパンダさんバッジ' },
  { id: 'correct_365', min: 365, emoji: '🎊', name: '楽しい思い出パンパンパンダさんバッジ' }
];

const STREAK_BADGES = [
  { id: 'streak_003', min: 3, emoji: '🐼', name: '3日連続パンダさん' },
  { id: 'streak_007', min: 7, emoji: '🐼', name: '7日連続パンダさん' },
  { id: 'streak_014', min: 14, emoji: '🐼', name: '14日連続パンダさん' },
  { id: 'streak_030', min: 30, emoji: '🐼', name: '30日連続パンダさん' },
  { id: 'streak_050', min: 50, emoji: '🐼', name: '50日連続パンダさん' },
  { id: 'streak_100', min: 100, emoji: '🐼', name: '100日連続パンダさん' }
];

// 現在のセーブ状態から、まだ解放されていないが条件を満たしたバッジを解放し、新規解放分を返す
function evaluateNewBadges() {
  const newlyUnlocked = [];
  const today = localDateString();

  CORRECT_BADGES.forEach(b => {
    if (!save.badges[b.id] && save.totalStats.totalCorrect >= b.min) {
      save.badges[b.id] = today;
      newlyUnlocked.push(b);
    }
  });

  STREAK_BADGES.forEach(b => {
    if (!save.badges[b.id] && save.streak.count >= b.min) {
      save.badges[b.id] = today;
      newlyUnlocked.push(b);
    }
  });

  if (newlyUnlocked.length) writeSave(save);
  return newlyUnlocked;
}

// ==================== S1: 博士度診断（timeAttack/endless共通） ====================
const DIAGNOSIS_TITLES = [
  { max: 19, title: 'パンダさん見習い🐼', comment: 'だいじょうぶ、パンダさんも最初は笹の見分けがつかなかったんだよ〜。一緒に博士を目指そうね！' },
  { max: 39, title: '愛生ちゃんのおともだち', comment: 'へへへ、いい線いってるよ〜！ブログを読んだらもっと仲良くなれるかも！' },
  { max: 59, title: 'パンダさん研究員🔬', comment: 'なかなかやるね〜！パンダさんパワー感じるよ！' },
  { max: 79, title: '愛生博士候補生📝', comment: 'すごーい！博士まであとちょっとだよ〜！' },
  { max: 99, title: 'りっぱな愛生博士🎓', comment: 'と〜っても すごい！愛生博士の皆さんの仲間入りだね！' },
  { max: 100, title: 'ウルトラ愛生博士パワーMAX🎓🐼', comment: 'パーフェクト！！ウルトラスペシャルどさんこパンダさんパワーMAXだよ〜！！' }
];

function getDiagnosis(mode, score) {
  let percent;
  if (mode === 'timeAttack') {
    percent = Math.round(score / TIME_ATTACK_QUESTIONS * 100);
  } else if (mode === 'endless') {
    percent = Math.min(100, score * 10);
  } else {
    return null;
  }
  percent = Math.max(0, Math.min(100, percent));
  const entry = DIAGNOSIS_TITLES.find(d => percent <= d.max) || DIAGNOSIS_TITLES[DIAGNOSIS_TITLES.length - 1];
  return { percent, title: entry.title, comment: entry.comment };
}

function renderRank(titleElId, progressElId) {
  const { current, next } = getRank(save.totalStats.totalCorrect);
  document.getElementById(titleElId).textContent = current.title;
  if (progressElId) {
    const progressEl = document.getElementById(progressElId);
    progressEl.textContent = next
      ? `あと${next.min - save.totalStats.totalCorrect}問正解で「${next.title}」へ`
      : '最高ランクに到達！';
  }
}

// ==================== J6: ホーム／あそぶ／コレクション タブ ====================

// 後方互換：旧コードやonclick属性から呼ばれても壊れないようホームへ委譲する
function goToModes() {
  goToTab('home');
}

function renderHome() {
  const isFirstHomeShowToday = save.lastVisitDate !== localDateString();

  applyPowerDecay();
  renderGreeting();
  renderAnniversaryBanner(isFirstHomeShowToday);
  renderPowerGauge();
  renderMascotOutfit();
  document.getElementById('home-streak').textContent = save.streak.count;
  renderRank('home-rank', 'home-rank-progress');
  renderDailyCard();
  renderOmikujiCard();

  save.lastVisitDate = localDateString();
  writeSave(save);

  showScreen('screen-home');
}

// ==================== L1: 生きてるマスコット ====================
function daysBetween(dateStrA, dateStrB) {
  const a = new Date(dateStrA + 'T00:00:00');
  const b = new Date(dateStrB + 'T00:00:00');
  return Math.round((b - a) / 86400000);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTimeBand() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'daytime';
  if (h >= 17 && h < 22) return 'evening';
  return 'night';
}

// 優先度: 記念日 > 久しぶり歓迎 > 時間帯あいさつ
function renderGreeting() {
  const el = document.getElementById('home-greeting');
  const todayAnniv = getTodaysAnniversary();
  const namePrefix = save.nickname ? `${save.nickname}、` : '';

  if (todayAnniv) {
    el.textContent = todayAnniv.message;
    return;
  }

  const today = localDateString();
  const last = save.streak.lastPlayedDate;
  if (last && daysBetween(last, today) >= 3) {
    el.textContent = namePrefix + pickRandom(MEI_CONTENT.welcomeBack);
    return;
  }

  const band = getTimeBand();
  el.textContent = namePrefix + pickRandom(MEI_CONTENT.greetings[band]);
}

let mascotTapCount = 0;
let mascotTapResetTimer = null;

function showMascotBubble(text) {
  const bubble = document.getElementById('mascot-bubble');
  bubble.textContent = text;
  bubble.classList.remove('show');
  void bubble.offsetWidth;
  bubble.classList.add('show');
  clearTimeout(showMascotBubble._hideTimer);
  showMascotBubble._hideTimer = setTimeout(() => bubble.classList.remove('show'), 2500);
}

function bounceMascot() {
  const img = document.getElementById('home-mascot-img');
  img.classList.remove('bounce');
  void img.offsetWidth;
  img.classList.add('bounce');
}

// L1: マスコットタップ（連打で隠しセリフ・sfx・紙吹雪）
function tapMascot() {
  mascotTapCount++;
  clearTimeout(mascotTapResetTimer);
  // 一定時間タップが無ければ連打カウントをリセット（セッション内の「連続」タップ想定）
  mascotTapResetTimer = setTimeout(() => { mascotTapCount = 0; }, 4000);

  bounceMascot();
  sfx.tap();
  haptics.correct();

  if (mascotTapCount === 10) {
    showMascotBubble(pickRandom(MEI_CONTENT.tapSecret10));
    sfx.sparkle();
    spawnMascotSparkle();
    return;
  }
  if (mascotTapCount === 30) {
    showMascotBubble(pickRandom(MEI_CONTENT.tapSecret30));
    sfx.sparkle();
    spawnMascotSparkle();
    return;
  }
  showMascotBubble(pickRandom(MEI_CONTENT.tapReactions));
}

function spawnMascotSparkle() {
  const wrap = document.getElementById('mascot-live-wrap');
  const app = document.getElementById('app');
  if (!wrap || !app) return;
  const wrapRect = wrap.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();
  const layer = document.createElement('div');
  layer.className = 'celebration-layer';
  app.appendChild(layer);
  const x = (wrapRect.left + wrapRect.right) / 2 - appRect.left;
  const y = (wrapRect.top + wrapRect.bottom) / 2 - appRect.top;
  spawnBurst(layer, x, y, true, 0);
  setTimeout(() => layer.remove(), 1000);
}

// ==================== L3: 記念日システム ====================
function getTodaysAnniversary() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return MEI_CONTENT.anniversaries.find(a => a.month === month && a.day === day) || null;
}

function renderAnniversaryBanner(isFirstHomeShowToday) {
  const banner = document.getElementById('anniversary-banner');
  const anniv = getTodaysAnniversary();
  if (!anniv) {
    banner.style.display = 'none';
    return;
  }
  document.getElementById('anniversary-deco').textContent = anniv.decoration;
  document.getElementById('anniversary-label').textContent = anniv.label;
  document.getElementById('anniversary-message').textContent = anniv.message;
  banner.style.display = 'block';

  // 1日1回・ホーム初回表示時のみファンファーレ
  const today = localDateString();
  if (isFirstHomeShowToday && save.anniversarySeenDate !== today) {
    save.anniversarySeenDate = today;
    writeSave(save);
    sfx.fanfare();
  }
}

// ==================== L2: パンダさんパワーゲージ ====================
const POWER_MAX = 100;
const POWER_MIN_FLOOR = 10;
const POWER_DAILY_DECAY = 35;
const POWER_SESSION_BONUS = 30;
const POWER_DAILY3_BONUS = 40;

// 日付が変わるごとに-35（最低10で下げ止まり）。何日分空いても一度だけ計算する
function applyPowerDecay() {
  const today = localDateString();
  if (!save.power.lastDate) {
    save.power.lastDate = today;
    writeSave(save);
    return;
  }
  if (save.power.lastDate === today) return;

  const gapDays = Math.max(1, daysBetween(save.power.lastDate, today));
  save.power.value = Math.max(POWER_MIN_FLOOR, save.power.value - POWER_DAILY_DECAY * gapDays);
  save.power.lastDate = today;
  writeSave(save);
}

function addPower(amount) {
  const today = localDateString();
  const wasFull = save.power.value >= POWER_MAX;
  save.power.value = Math.min(POWER_MAX, save.power.value + amount);
  save.power.lastDate = today;
  writeSave(save);
  return !wasFull && save.power.value >= POWER_MAX;
}

function renderPowerGauge() {
  const bar = document.getElementById('power-gauge-bar');
  const valueEl = document.getElementById('power-gauge-value');
  const commentEl = document.getElementById('power-gauge-comment');
  const v = save.power.value;
  bar.style.width = v + '%';
  valueEl.textContent = `${v}/${POWER_MAX}`;

  let band;
  if (v >= 70) band = 'full';
  else if (v >= 30) band = 'mid';
  else band = 'low';
  commentEl.textContent = pickRandom(MEI_CONTENT.powerGauge[band]);
}

function celebratePowerFull() {
  const bar = document.getElementById('power-gauge-bar');
  bar.classList.remove('is-full');
  void bar.offsetWidth;
  bar.classList.add('is-full');
  sfx.sparkle();
}

// ==================== L5: 着せ替え（マスコットへの反映） ====================
function renderMascotOutfit() {
  const el = document.getElementById('mascot-outfit');
  const outfit = OUTFITS.find(o => o.id === save.outfit);
  if (outfit) {
    el.textContent = outfit.emoji;
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function renderPlaySelect() {
  document.getElementById('modes-best-timeattack').textContent = save.highScores.timeAttack;
  document.getElementById('modes-best-endless').textContent = save.highScores.endless;
  document.getElementById('modes-streak').textContent = save.streak.count;
  showScreen('screen-play-select');
}

function renderCollection() {
  renderBadgeGrid('badge-grid-correct-home', CORRECT_BADGES, min => `累計${min}問正解で解放`);
  renderBadgeGrid('badge-grid-streak-home', STREAK_BADGES, min => `連続${min}日プレイで解放`);
  renderSasaBalance();
  renderQuoteCardGrid();
  renderOutfitGrid();
  showScreen('screen-collection');
}

function renderSasaBalance() {
  const el = document.getElementById('collection-sasa-value');
  if (el) el.textContent = save.sasa;
}

function renderDailyCard() {
  const btn = document.getElementById('daily-card');
  const desc = document.getElementById('daily-desc');
  if (dailyDoneToday()) {
    btn.disabled = true;
    btn.classList.add('daily-done');
    const results = normalizeDailyResults(save.daily);
    if (results.length >= 3) {
      const correctCount = results.filter(Boolean).length;
      desc.textContent = `今日は${correctCount}/3だったよ！また明日ね🐼`;
    } else {
      // 旧形式データ（1問時代）の名残。詳細不明のため汎用文言でフォールバック
      desc.textContent = '挑戦済み！また明日リベンジしてね🐼';
    }
  } else {
    btn.disabled = false;
    btn.classList.remove('daily-done');
    desc.textContent = '毎日変わる3問に挑戦。みんな同じ問題だよ';
  }
}

// ==================== クイズ本体 ====================
let session = null; // 現在のプレイセッション状態

function pickQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function weightedPoolForTimeAttack() {
  // 最初の3問は必ず易問（プロフィール）＝最初の成功体験を保証する設計
  const easiest = QUIZ_DATA.filter(q => q.difficulty === 1);
  const opener = pickQuestions(easiest, 3);
  const openerIds = opener.map(q => q.id);
  const mid = QUIZ_DATA.filter(q => q.difficulty <= 2 && !openerIds.includes(q.id));
  const hard = QUIZ_DATA.filter(q => q.difficulty >= 3);
  const rest = [...pickQuestions(mid, 5), ...pickQuestions(hard, 2)].sort(() => Math.random() - 0.5);
  return [...opener, ...rest];
}

// ==================== 今日の1問（日替わり・全員同じ問題） ====================
function localDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 日付文字列から決定的な種を作る（同じ日は誰がやっても同じ値になる）
function dateSeed(dateStr) {
  let h = 0;
  for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h >>> 0;
}

// mulberry32: シード値から決定的な擬似乱数列を作る軽量PRNG
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 通算日番号（2026-07-01を第1日目とする）
function dailyDayNumber() {
  const epoch = new Date(2026, 6, 1); // 月は0始まりなので7月=6
  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((todayMid - epoch) / 86400000);
  return diffDays + 1;
}

// 今日の3問：難易度ミックス（1-2から1問／2-3から1問／3以上から1問）を重複なしで選ぶ
function dailyQuestions() {
  const today = localDateString();
  const rand = mulberry32(dateSeed(today));
  const pickOne = (pool, excludeIds) => {
    const candidates = pool.filter(q => !excludeIds.includes(q.id));
    const usable = candidates.length ? candidates : pool;
    const idx = Math.floor(rand() * usable.length);
    return usable[idx];
  };

  const bandLow = QUIZ_DATA.filter(q => q.difficulty >= 1 && q.difficulty <= 2);
  const bandMid = QUIZ_DATA.filter(q => q.difficulty >= 2 && q.difficulty <= 3);
  const bandHigh = QUIZ_DATA.filter(q => q.difficulty >= 3);

  const picked = [];
  const q1 = pickOne(bandLow, []);
  picked.push(q1);
  const q2 = pickOne(bandMid, picked.map(q => q.id));
  picked.push(q2);
  const q3 = pickOne(bandHigh, picked.map(q => q.id));
  picked.push(q3);

  return picked;
}

function dailyDoneToday() {
  if (!save.daily || save.daily.date !== localDateString()) return false;
  // 旧形式 { date, correct } が残っている場合も「プレイ済み」として扱う（後方互換ガード）
  return true;
}

// save.daily が旧形式 { date, correct } の場合に results 配列へ正規化する
function normalizeDailyResults(daily) {
  if (!daily) return null;
  if (Array.isArray(daily.results)) return daily.results;
  if (typeof daily.correct === 'boolean') return [daily.correct]; // 旧形式の名残
  return [];
}

function endlessQueueForDifficulty(level, excludeIds) {
  const targetDifficulty = Math.min(level, 4);
  // 最高難度(文体5問)は母数が小さくすぐ一周してしまうので、語録も合わせて母数を増やす
  const basePool = targetDifficulty >= 4
    ? QUIZ_DATA.filter(q => q.difficulty >= 3)
    : QUIZ_DATA.filter(q => q.difficulty === targetDifficulty);
  const fresh = basePool.filter(q => !excludeIds.includes(q.id));
  const pool = fresh.length ? fresh : basePool; // 出し切ったら除外をリセットして再度回す
  return pool[Math.floor(Math.random() * pool.length)];
}

function reviewPool() {
  const wrongIds = Object.keys(save.wrongQuestions);
  const wrongOnes = QUIZ_DATA.filter(q => wrongIds.includes(q.id))
    .sort((a, b) => (save.wrongQuestions[b.id].wrongCount) - (save.wrongQuestions[a.id].wrongCount));
  const rest = QUIZ_DATA.filter(q => !wrongIds.includes(q.id));
  return [...wrongOnes, ...pickQuestions(rest, Math.max(0, 10 - wrongOnes.length))];
}

// J3: コンボ加点対象モード（学習モードは対象外）
const COMBO_ENABLED_MODES = new Set(['timeAttack', 'endless', 'daily']);

function startMode(mode) {
  session = {
    mode,
    index: 0,
    correctCount: 0,
    answeredCount: 0,
    endlessLevel: 1,
    recentIds: [],
    questions: [],
    timerHandle: null,
    clockHandle: null,
    remainingClock: TIME_ATTACK_SECONDS,
    combo: 0,
    comboEnabled: COMBO_ENABLED_MODES.has(mode),
    newCards: []
  };

  if (mode === 'timeAttack') {
    session.questions = weightedPoolForTimeAttack();
    document.getElementById('play-clock-wrap').style.display = 'block';
    startOverallClock();
  } else if (mode === 'endless') {
    session.questions = [endlessQueueForDifficulty(1, session.recentIds)];
    session.recentIds.push(session.questions[0].id);
    document.getElementById('play-clock-wrap').style.display = 'none';
  } else if (mode === 'study') {
    session.questions = reviewPool();
    document.getElementById('play-clock-wrap').style.display = 'none';
  } else if (mode === 'daily') {
    session.questions = dailyQuestions();
    session.dailyResults = [];
    document.getElementById('play-clock-wrap').style.display = 'none';
  }

  showScreen('screen-play');
  renderQuestion();
}

function startOverallClock() {
  session.remainingClock = TIME_ATTACK_SECONDS;
  updateClockDisplay();
  session.clockHandle = setInterval(() => {
    session.remainingClock--;
    updateClockDisplay();
    if (session.remainingClock <= 0) {
      clearInterval(session.clockHandle);
      endSession();
    }
  }, 1000);
}

function updateClockDisplay() {
  document.getElementById('play-clock').textContent = session.remainingClock;
}

function currentQuestion() {
  if (session.mode === 'endless') {
    return session.questions[0];
  }
  return session.questions[session.index];
}

function renderQuestion() {
  const q = currentQuestion();
  if (!q) {
    endSession();
    return;
  }
  session.locked = false;

  document.getElementById('play-category').textContent = categoryLabel(q.category);
  const qEl = document.getElementById('play-question');
  qEl.textContent = q.question;
  qEl.classList.remove('shake');
  document.getElementById('play-feedback').textContent = '';
  document.getElementById('play-feedback').className = 'feedback';
  const comboEl = document.getElementById('combo-display');
  comboEl.classList.remove('show');
  comboEl.style.display = 'none';

  const progressText = session.mode === 'endless'
    ? `連続正解 ${session.correctCount}問目`
    : `${session.index + 1} / ${session.questions.length}問`;
  document.getElementById('play-progress').textContent = progressText;

  session.shuffledChoices = shuffleChoices(q);
  const box = document.getElementById('play-choices');
  box.innerHTML = '';
  session.shuffledChoices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.onclick = () => answerQuestion(i);
    box.appendChild(btn);
  });

  if (session.mode !== 'study') {
    startQuestionTimer();
  }
}

function shuffleChoices(q) {
  const pairs = q.choices.map((text, i) => ({ text, isCorrect: i === q.answerIndex }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

function categoryLabel(cat) {
  return { profile: 'プロフィール', timeline: '年表', quotes: '語録', style: '文体' }[cat] || cat;
}

function startQuestionTimer() {
  clearQuestionTimer();
  let remaining = QUESTION_TIME_LIMIT;
  const bar = document.getElementById('play-timer-bar');
  bar.style.width = '100%';
  session.timerHandle = setInterval(() => {
    remaining -= 0.1;
    bar.style.width = Math.max(0, (remaining / QUESTION_TIME_LIMIT) * 100) + '%';
    if (remaining <= 0) {
      clearQuestionTimer();
      answerQuestion(-1); // 時間切れ＝不正解扱い
    }
  }, 100);
}

function clearQuestionTimer() {
  if (session.timerHandle) {
    clearInterval(session.timerHandle);
    session.timerHandle = null;
  }
}

function answerQuestion(choiceIndex) {
  if (session.locked) return;
  session.locked = true;
  clearQuestionTimer();
  const q = currentQuestion();
  const correct = choiceIndex >= 0 && !!session.shuffledChoices[choiceIndex] && session.shuffledChoices[choiceIndex].isCorrect;

  session.answeredCount++;
  if (correct) session.correctCount++;
  if (session.mode === 'daily') session.dailyResults.push(correct);

  const newCardUnlocked = recordAnswerResult(q, correct, session.comboEnabled ? (session.combo || 0) + (correct ? 1 : 0) : 0);
  if (newCardUnlocked) {
    session.newCards = session.newCards || [];
    session.newCards.push(q);
  }

  // J3: コンボ更新（対象モードのみ。正解+1、不正解/時間切れは0に戻る）
  if (session.comboEnabled) {
    if (correct) {
      session.combo = (session.combo || 0) + 1;
    } else {
      session.combo = 0;
    }
  }

  const feedbackEl = document.getElementById('play-feedback');
  feedbackEl.textContent = correct ? correctFlavorText(session.combo) : q.wrongComment;
  feedbackEl.className = 'feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');

  document.querySelectorAll('#play-choices .choice-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (session.shuffledChoices[i].isCorrect) {
      btn.classList.add('is-correct');
      if (correct) btn.classList.add('glow'); // J5: 正解ボタンがふわっと光る
    }
    if (i === choiceIndex && !correct) btn.classList.add('is-wrong');
  });

  const playScreen = document.getElementById('screen-play');
  if (correct) {
    sfx.correct(session.combo);
    haptics.correct();
    if (session.comboEnabled && session.combo >= 2) {
      showComboDisplay(session.combo);
    }
    if (session.comboEnabled && session.combo >= 3) {
      // 3コンボ以上の正解は軽いフラッシュ＋紙吹雪
      playScreen.classList.remove('screen-flash');
      void playScreen.offsetWidth;
      playScreen.classList.add('screen-flash');
      const rect = playScreen.getBoundingClientRect();
      const appRect = document.getElementById('app').getBoundingClientRect();
      const layer = document.createElement('div');
      layer.className = 'celebration-layer';
      document.getElementById('app').appendChild(layer);
      spawnBurst(layer, (rect.left + rect.right) / 2 - appRect.left, 120, true, 0);
      setTimeout(() => layer.remove(), 1000);
    }
  } else {
    sfx.wrong();
    haptics.wrong();
    // J5: 不正解時の問題カードプルプル
    const qEl = document.getElementById('play-question');
    qEl.classList.remove('shake');
    void qEl.offsetWidth;
    qEl.classList.add('shake');
  }

  setTimeout(() => advance(correct), 1100);
}

// J3: コンボ表示「🔥N COMBO!」。数字が大きいほど文字サイズ・色を豪華にする
function showComboDisplay(combo) {
  const el = document.getElementById('combo-display');
  const scale = Math.min(1.8, 1 + (combo - 2) * 0.12);
  el.style.fontSize = (26 * scale) + 'px';
  el.style.color = combo >= 7 ? 'var(--wrong)' : (combo >= 4 ? 'var(--gold)' : 'var(--mei)');
  el.textContent = `🔥${combo} COMBO!`;
  el.classList.remove('show');
  void el.offsetWidth;
  el.style.display = 'block';
  el.classList.add('show');
}

// 正解フィードバック文言：コンボ段階に応じてどんどん豪華にする
const CORRECT_FLAVORS_BASE = [
  'パンダさんパワーMAXです！正解〜！',
  'ウルトラパンダさんパワーMAX！大正解！',
  'どさんこパンダさんパワーMAXで正解〜！',
  'スペシャルパンダさんパワーMAX！やったね！',
  'と〜〜っても正解！パンダさんパワー充電中です🐼'
];
const COMBO_FLAVORS = {
  2: ['その調子〜！2連続正解だよ！🐼'],
  3: ['なまら すごい！3連続正解！パンダさんパワー上昇中〜！'],
  4: ['どさんこパンダさんパワー全開！4連続正解〜！！'],
  5: ['ウルトラパンダさんパワー発動！5連続正解、と〜っても すごい！！'],
  6: ['スペシャルどさんこパンダさんパワーMAX！！6連続正解だよ〜！！']
};
function correctFlavorText(combo) {
  if (combo && combo >= 7) {
    return 'どさんこウルトラスペシャルパンダさんパワーMAX！！';
  }
  if (combo && COMBO_FLAVORS[combo]) {
    return COMBO_FLAVORS[combo][0];
  }
  return CORRECT_FLAVORS_BASE[Math.floor(Math.random() * CORRECT_FLAVORS_BASE.length)];
}

// 戻り値：この解答で語録カードが新規解放されたかどうか
function recordAnswerResult(q, correct, comboAtAnswer) {
  save.totalStats.totalAnswered++;
  let newCardUnlocked = false;
  if (correct) {
    save.totalStats.totalCorrect++;
    if (save.wrongQuestions[q.id]) {
      // 復習で正解できたら履歴から軽くする
      delete save.wrongQuestions[q.id];
    }
    // L5: ささポイント付与（正解1問=1、コンボ3以上の正解=2）
    awardSasa(comboAtAnswer);
    // L4: 語録カード解放判定（quotes/style正解のみ）
    newCardUnlocked = tryUnlockCard(q);
  } else {
    const today = new Date().toISOString().slice(0, 10);
    const existing = save.wrongQuestions[q.id];
    save.wrongQuestions[q.id] = {
      wrongCount: (existing ? existing.wrongCount : 0) + 1,
      lastWrongDate: today
    };
  }
  writeSave(save);
  return newCardUnlocked;
}

function advance(lastWasCorrect) {
  if (session.mode === 'timeAttack') {
    session.index++;
    if (session.index >= session.questions.length || session.index >= TIME_ATTACK_QUESTIONS) {
      endSession();
    } else {
      renderQuestion();
    }
  } else if (session.mode === 'endless') {
    if (!lastWasCorrect) {
      endSession();
      return;
    }
    session.endlessLevel = 1 + Math.floor(session.correctCount / 3);
    session.questions = [endlessQueueForDifficulty(session.endlessLevel, session.recentIds)];
    session.recentIds.push(session.questions[0].id);
    if (session.recentIds.length > 10) session.recentIds.shift(); // 直近10問だけ覚えておけば十分
    renderQuestion();
  } else if (session.mode === 'study') {
    session.index++;
    if (session.index >= session.questions.length) {
      endSession();
    } else {
      renderQuestion();
    }
  } else if (session.mode === 'daily') {
    session.index++;
    if (session.index >= session.questions.length) {
      endSession();
    } else {
      renderQuestion();
    }
  }
}

function endSession() {
  clearQuestionTimer();
  if (session.clockHandle) clearInterval(session.clockHandle);
  session.combo = 0; // J3: セッション終了でコンボをリセット

  const reachedMilestone = updateStreakOnPlay();

  let score, bestKey, label;
  if (session.mode === 'timeAttack') {
    score = session.correctCount;
    bestKey = 'timeAttack';
    label = 'タイムアタック';
  } else if (session.mode === 'endless') {
    score = session.correctCount;
    bestKey = 'endless';
    label = 'エンドレス';
  } else if (session.mode === 'daily') {
    score = session.correctCount;
    bestKey = null;
    label = '今日の3問';
    save.daily = { date: localDateString(), results: session.dailyResults.slice() };
    writeSave(save);
  } else {
    score = session.correctCount;
    bestKey = null;
    label = '学習モード';
  }

  let isNewBest = false;
  if (bestKey) {
    if (score > save.highScores[bestKey]) {
      save.highScores[bestKey] = score;
      isNewBest = true;
    }
    writeSave(save);
  }

  document.getElementById('result-mode-label').textContent = label;
  document.getElementById('result-best-wrap').style.display = bestKey ? 'block' : 'none';
  if (bestKey) {
    document.getElementById('result-best').textContent = save.highScores[bestKey];
  }
  document.getElementById('result-streak').textContent = save.streak.count;
  document.getElementById('result-rank').textContent = `現在のランク：${getRank(save.totalStats.totalCorrect).current.title}`;

  // S1: 博士度診断（timeAttack/endlessのみ）の計算
  let diagnosis = null;
  if (session.mode === 'timeAttack' || session.mode === 'endless') {
    diagnosis = getDiagnosis(session.mode, score);
  }

  // R1/R2: ストリーク節目・新バッジ解放判定（スコア確定後に実行）
  const newBadges = evaluateNewBadges();

  // L2: パンダさんパワーゲージ加算（1セッション完了+30、今日の3問完了+40、上限100）
  const powerBonus = session.mode === 'daily' ? POWER_DAILY3_BONUS : POWER_SESSION_BONUS;
  const becameFull = addPower(powerBonus);

  lastResult = {
    mode: session.mode,
    score,
    answeredCount: session.answeredCount,
    isNewBest,
    diagnosis,
    dailyResults: session.mode === 'daily' ? session.dailyResults.slice() : null,
    dailyDayNumber: session.mode === 'daily' ? dailyDayNumber() : null
  };

  showScreen('screen-result');
  currentSessionMode = session.mode;

  playResultSequence({
    score,
    answeredCount: session.answeredCount,
    bestKey,
    isNewBest,
    diagnosis,
    dailyResults: session.mode === 'daily' ? session.dailyResults : null,
    reachedMilestone,
    newBadges,
    newCards: session.newCards || [],
    becameFull
  });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// J4: リザルト演出 (1)ドラムロール＋スコアカウントアップ → (2)ファンファーレ＋称号・メーター → (3)バッジ等スライドイン
function playResultSequence(r) {
  const scoreEl = document.getElementById('result-score');
  const diagnosisEl = document.getElementById('result-diagnosis');
  const dailyGridEl = document.getElementById('result-daily-grid');
  const newBestEl = document.getElementById('result-newbest');
  const streakBadgeEl = document.getElementById('result-streak-badge');
  const newBadgeEl = document.getElementById('result-newbadge');
  const newCardEl = document.getElementById('result-newcard');

  // 続く演出のために一旦すべて隠す
  diagnosisEl.style.display = 'none';
  dailyGridEl.style.display = 'none';
  newBestEl.style.display = 'none';
  streakBadgeEl.style.display = 'none';
  newBadgeEl.style.display = 'none';
  newCardEl.style.display = 'none';
  [diagnosisEl, dailyGridEl, newBestEl, streakBadgeEl, newBadgeEl, newCardEl].forEach(el => el.classList.remove('result-slide-in'));

  const finalScoreText = `${r.score} / ${r.answeredCount}問`;

  const showTitleAndBadges = () => {
    if (r.diagnosis) {
      document.getElementById('result-diagnosis-title').textContent = r.diagnosis.title;
      document.getElementById('result-diagnosis-comment').textContent = r.diagnosis.comment;
      document.getElementById('result-diagnosis-percent').textContent = `博士度 ${r.diagnosis.percent}%`;
      const bar = document.getElementById('result-meter-bar');
      bar.classList.toggle('is-max', r.diagnosis.percent >= 100);
      bar.style.width = '0%';
      diagnosisEl.style.display = 'block';
      let meterFilled = false;
      const fillMeter = () => {
        if (meterFilled) return;
        meterFilled = true;
        bar.style.width = r.diagnosis.percent + '%';
      };
      requestAnimationFrame(() => requestAnimationFrame(fillMeter));
      setTimeout(fillMeter, 120);
    } else if (r.dailyResults) {
      const emojis = r.dailyResults.map(ok => ok ? '🐼' : '⬜').join('');
      const correctCount = r.dailyResults.filter(Boolean).length;
      document.getElementById('result-daily-emojis').textContent = emojis;
      document.getElementById('result-daily-score').textContent = `${correctCount}/${r.dailyResults.length}`;
      dailyGridEl.style.display = 'block';
    }
    sfx.fanfare();
    if (r.isNewBest || r.reachedMilestone) haptics.celebrate();
  };

  const showFollowUps = () => {
    if (r.isNewBest) {
      newBestEl.style.display = 'block';
      newBestEl.classList.add('result-slide-in');
    }
    if (r.reachedMilestone) {
      streakBadgeEl.textContent = `🎉 連続${r.reachedMilestone}日達成！`;
      streakBadgeEl.style.display = 'block';
      streakBadgeEl.classList.add('result-slide-in');
    }
    if (r.newBadges && r.newBadges.length) {
      newBadgeEl.innerHTML = r.newBadges.map(b => `🆕 新バッジ解放！【${b.emoji} ${b.name}】`).join('<br>');
      newBadgeEl.style.display = 'block';
      newBadgeEl.classList.add('result-slide-in');
      sfx.sparkle();
    }
    if (r.newCards && r.newCards.length) {
      newCardEl.innerHTML = '🃏 語録カードGET！';
      newCardEl.style.display = 'block';
      newCardEl.classList.add('result-slide-in');
      sfx.sparkle();
    }
    if (r.becameFull) {
      celebratePowerFull();
    }
    if (r.isNewBest || r.reachedMilestone) celebrate();
  };

  if (prefersReducedMotion()) {
    scoreEl.textContent = finalScoreText;
    showTitleAndBadges();
    showFollowUps();
    return;
  }

  // (1) ドラムロール＋スコア0→実スコアのカウントアップ（約0.8秒）
  sfx.drumroll();
  const duration = 800;
  const startTime = performance.now();
  function tickCount(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const shown = Math.round(r.score * t);
    scoreEl.textContent = `${shown} / ${r.answeredCount}問`;
    if (t < 1) {
      requestAnimationFrame(tickCount);
    } else {
      scoreEl.textContent = finalScoreText;
      // (2) ファンファーレ＋称号・博士度メーターがポン
      showTitleAndBadges();
      // (3) バッジ等が続けてスライドイン
      setTimeout(showFollowUps, 450);
    }
  }
  requestAnimationFrame(tickCount);
}

// ==================== 自己ベスト更新エフェクト（パン・パン・シャラララ〜ん） ====================
const CONFETTI_COLORS = ['#079C15', '#00C853', '#FFC107', '#FF6F91', '#42A5F5'];
const RAIN_SPARKLES = ['🐼', '🎓', '✏️', '📝', '✨'];
const BURST_SWEETS = ['🍫', '🍬', '🍭', '🍪']; // めいちゃんの好物（チョコ・クッキー・ラムネ系のお菓子）

function applyBurstTrajectory(p, originX, originY, fromLeft, delay) {
  const spread = (Math.random() * 70 - 35);
  const angle = (fromLeft ? -55 + spread : -125 + spread) * (Math.PI / 180);
  const dist = 90 + Math.random() * 130;
  p.style.left = originX + 'px';
  p.style.top = originY + 'px';
  p.style.setProperty('--tx', (Math.cos(angle) * dist) + 'px');
  p.style.setProperty('--ty', (Math.sin(angle) * dist) + 'px');
  p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
  p.style.animationDelay = delay + 'ms';
}

function spawnBurst(layer, originX, originY, fromLeft, delay) {
  const SWEET_COUNT = 6;
  const CONFETTI_COUNT = 30;

  for (let i = 0; i < SWEET_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece burst';
    p.textContent = BURST_SWEETS[Math.floor(Math.random() * BURST_SWEETS.length)];
    p.style.fontSize = (18 + Math.random() * 8) + 'px'; // お菓子は今のサイズのまま
    applyBurstTrajectory(p, originX, originY, fromLeft, delay);
    layer.appendChild(p);
  }

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece burst';
    const size = 6 + Math.random() * 6; // 紙吹雪らしい小ささに縮小、数を増やす
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    applyBurstTrajectory(p, originX, originY, fromLeft, delay);
    layer.appendChild(p);
  }
}

function spawnRain(layer, width, startY, rangeHeight) {
  const CELEBRATE_COUNT = 3; // 「㊗️」は少量だけ混ぜる
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece rain';
    p.textContent = i < CELEBRATE_COUNT ? '㊗️' : RAIN_SPARKLES[Math.floor(Math.random() * RAIN_SPARKLES.length)];
    p.style.left = (Math.random() * width) + 'px';
    p.style.top = startY + 'px';
    p.style.fontSize = (20 + Math.random() * 18) + 'px'; // 通常の約1.5〜2倍サイズ
    p.style.setProperty('--fall', (rangeHeight * (0.5 + Math.random() * 0.5)) + 'px');
    p.style.setProperty('--sway', (Math.random() * 60 - 30) + 'px');
    p.style.setProperty('--rot', (Math.random() * 360) + 'deg');
    p.style.animationDuration = (1300 + Math.random() * 900) + 'ms';
    p.style.animationDelay = (550 + Math.random() * 600) + 'ms'; // 2回目のパンが終わった後に降り始める
    layer.appendChild(p);
  }
}

function celebrate() {
  const app = document.getElementById('app');
  const resultScreen = document.getElementById('screen-result');
  const mascotEl = resultScreen.querySelector('.mascot');
  const shareBtn = resultScreen.querySelector('.share-btn');
  const newBestEl = resultScreen.querySelector('#result-newbest');
  const streakBadgeEl = resultScreen.querySelector('#result-streak-badge');

  const appRect = app.getBoundingClientRect();
  const mascotRect = mascotEl.getBoundingClientRect();
  const shareRect = shareBtn.getBoundingClientRect();

  // バッジ表示中の要素（自己ベスト or ストリーク節目）を基準に、無ければメイメイ画像を基準にする
  const isVisible = el => el && el.offsetParent !== null;
  const badgeEl = isVisible(newBestEl) ? newBestEl : (isVisible(streakBadgeEl) ? streakBadgeEl : mascotEl);
  const badgeRect = badgeEl.getBoundingClientRect();

  // メイメイの画像〜Xシェアボタンの表示範囲（#app基準の相対座標）に収める
  const contentTop = mascotRect.top - appRect.top;
  const contentBottom = shareRect.bottom - appRect.top;
  const rangeHeight = contentBottom - contentTop;

  // クラッカーは「バッジ」の高さから発生させる
  const burstY = (badgeRect.top + badgeRect.height / 2) - appRect.top;

  const layer = document.createElement('div');
  layer.className = 'celebration-layer';
  app.appendChild(layer);

  const w = app.clientWidth;

  spawnBurst(layer, 16, burstY, true, 0);       // パン（左から・1拍目）
  spawnBurst(layer, w - 16, burstY, false, 400); // パン（右から・3拍目のイメージでテンポよく）
  spawnRain(layer, w, contentTop, rangeHeight);   // しゃらら〜ん（2発のパンが終わった後にキラキラ）

  setTimeout(() => layer.remove(), 3500);
}

let currentSessionMode = null;
let lastResult = null;

// ==================== S3: コール&レスポンス演出 ====================
function callResponse() {
  const app = document.getElementById('app');
  const pop = document.getElementById('callresponse-pop');

  // ポンとテキストを出す（連打対応：アニメーションを再始動させる）
  pop.textContent = '私も〜！！🐼';
  pop.classList.remove('show');
  void pop.offsetWidth; // reflowでアニメーションをリスタート
  pop.classList.add('show');
  clearTimeout(callResponse._hideTimer);
  callResponse._hideTimer = setTimeout(() => pop.classList.remove('show'), 1000);

  // 紙吹雪を少量出す
  const layer = document.createElement('div');
  layer.className = 'celebration-layer';
  app.appendChild(layer);
  const w = app.clientWidth;
  const y = app.clientHeight * 0.35;
  spawnBurst(layer, w / 2, y, true, 0);
  setTimeout(() => layer.remove(), 1200);
}

// ==================== Xシェア ====================
function buildShareText(result) {
  const bonus = result.isNewBest ? '🎉自己ベスト更新！🎉\n' : '';
  if (result.mode === 'timeAttack') {
    const titleLine = result.diagnosis ? `\n診断結果は【${result.diagnosis.title}】でした🐼\nあなたの博士度は？` : '\nあなたは何問いける？';
    return `${bonus}愛生博士クイズ タイムアタックで${result.score}問正解！${titleLine}\n#愛生博士クイズ #山﨑愛生`;
  }
  if (result.mode === 'endless') {
    const titleLine = result.diagnosis ? `\n診断結果は【${result.diagnosis.title}】でした🐼\nあなたの博士度は？` : '\nこの記録、超えられる？';
    return `${bonus}愛生博士クイズ エンドレスモードで${result.score}問連続正解✨${titleLine}\n#愛生博士クイズ #山﨑愛生`;
  }
  if (result.mode === 'daily') {
    const grid = (result.dailyResults || []).map(ok => ok ? '🐼' : '⬜').join('');
    const correctCount = (result.dailyResults || []).filter(Boolean).length;
    const total = (result.dailyResults || []).length;
    return `愛生博士 今日の3問 #${result.dailyDayNumber}日目\n${grid} ${correctCount}/${total}\nあなたも挑戦してね🐼\n#愛生博士クイズ #山﨑愛生`;
  }
  return `愛生博士クイズの学習モードで${result.score}問復習しました📖🐼\n愛生ちゃん博士に一歩近づいたかも\n#愛生博士クイズ #山﨑愛生`;
}

// Xはカード情報をURLごとにキャッシュするため、OGP画像を変えたらこの番号を上げる
const SHARE_CARD_VERSION = 2;

function shareToX() {
  if (!lastResult) return;
  const text = buildShareText(lastResult);
  const url = location.href.split('?')[0].split('#')[0] + '?v=' + SHARE_CARD_VERSION;
  const intent = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
  window.open(intent, '_blank', 'noopener');
}

function playAgain() {
  if (currentSessionMode === 'daily') {
    // 今日の1問は1日1回。「もう1回」はホームタブに戻す
    renderHome();
    return;
  }
  startMode(currentSessionMode);
}

function backToModes() {
  renderPlaySelect();
}

// R1: ストリーク節目
const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100];

// 戻り値：今回のプレイで新たに到達した節目日数（無ければnull）
function updateStreakOnPlay() {
  const today = new Date().toISOString().slice(0, 10);
  if (save.streak.lastPlayedDate === today) return null;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (save.streak.lastPlayedDate === yesterday) {
    save.streak.count += 1;
  } else {
    save.streak.count = 1;
  }
  save.streak.lastPlayedDate = today;
  writeSave(save);

  if (STREAK_MILESTONES.includes(save.streak.count)) {
    return save.streak.count;
  }
  return null;
}

// ==================== 図鑑（学習モードのサブ画面） ====================
function openEncyclopedia() {
  const list = document.getElementById('encyclopedia-list');
  list.innerHTML = '';
  QUIZ_DATA.forEach(q => {
    const item = document.createElement('div');
    item.className = 'encyclopedia-item';
    item.innerHTML = `<div class="encyclopedia-q">${q.question}</div><div class="encyclopedia-a">${q.explanation}</div>`;
    list.appendChild(item);
  });
  showScreen('screen-encyclopedia');
}

// ==================== バッジコレクション画面 ====================
function renderBadgeGrid(elId, badgeList, hintFor) {
  const grid = document.getElementById(elId);
  grid.innerHTML = '';
  badgeList.forEach(b => {
    const cell = document.createElement('div');
    const unlockedDate = save.badges[b.id];
    if (unlockedDate) {
      cell.className = 'badge-cell';
      cell.innerHTML = `<span class="badge-emoji">${b.emoji}</span><span class="badge-name">${b.name}</span><span class="badge-date">${unlockedDate}解放</span>`;
    } else {
      cell.className = 'badge-cell locked';
      cell.innerHTML = `<span class="badge-emoji">${b.emoji}</span><span class="badge-name">${b.name}</span><span class="badge-hint">${hintFor(b.min)}</span>`;
    }
    grid.appendChild(cell);
  });
}

// 後方互換：旧コードから呼ばれてもコレクションタブに委譲する（J6でscreen-badgesはコレクションタブに統合済み）
function openBadges() {
  renderCollection();
}

// ==================== J1: ボタンtapポップ音（イベント委任で一括対応） ====================
// choice-btn（クイズ選択肢）は正解/不正解音が別途鳴るためtap音の対象から除外する
const TAP_SOUND_SELECTOR = '.primary-btn, .share-btn, .secondary-btn, .mode-card, .home-daily-cta, .callresponse-btn, .sound-toggle-btn, .blog-link-btn, .back-link';
document.addEventListener('click', (e) => {
  const el = e.target.closest(TAP_SOUND_SELECTOR);
  if (!el || el.disabled) return;
  // サウンドトグル自身はtoggleSound()内で個別に音を鳴らすため二重再生を避ける
  if (el.classList.contains('sound-toggle-btn')) return;
  sfx.tap();
});
// タブボタンはgoToTab()側で既にtap音を鳴らしているためこのリスナーには含めない

boot();
