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
    totalStats: { totalAnswered: 0, totalCorrect: 0 }
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return defaultSave();
    return parsed;
  } catch (e) {
    return defaultSave();
  }
}

function writeSave(save) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

let save = loadSave();

// ==================== 画面切り替え ====================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ==================== 起動処理 ====================
function boot() {
  if (!save.onboarded) {
    startIntro();
  } else {
    goToModes();
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

// ==================== モード選択画面 ====================
function goToModes() {
  document.getElementById('modes-greeting').textContent = `おかえり、${save.nickname}！`;
  document.getElementById('modes-best-timeattack').textContent = save.highScores.timeAttack;
  document.getElementById('modes-best-endless').textContent = save.highScores.endless;
  document.getElementById('modes-streak').textContent = save.streak.count;
  renderRank('modes-rank', 'modes-rank-progress');
  showScreen('screen-modes');
}

// ==================== クイズ本体 ====================
let session = null; // 現在のプレイセッション状態

function pickQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function weightedPoolForTimeAttack() {
  const easy = QUIZ_DATA.filter(q => q.difficulty <= 2);
  const hard = QUIZ_DATA.filter(q => q.difficulty >= 3);
  const easyPicks = pickQuestions(easy, 8);
  const hardPicks = pickQuestions(hard, 2);
  return [...easyPicks, ...hardPicks].sort(() => Math.random() - 0.5);
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
    remainingClock: TIME_ATTACK_SECONDS
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
  document.getElementById('play-question').textContent = q.question;
  document.getElementById('play-feedback').textContent = '';
  document.getElementById('play-feedback').className = 'feedback';

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

  recordAnswerResult(q, correct);

  const feedbackEl = document.getElementById('play-feedback');
  feedbackEl.textContent = correct ? correctFlavorText() : q.wrongComment;
  feedbackEl.className = 'feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');

  document.querySelectorAll('#play-choices .choice-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (session.shuffledChoices[i].isCorrect) btn.classList.add('is-correct');
    if (i === choiceIndex && !correct) btn.classList.add('is-wrong');
  });

  setTimeout(() => advance(correct), 1100);
}

const CORRECT_FLAVORS = [
  'パンダさんパワーMAXです！正解〜！',
  'ウルトラパンダさんパワーMAX！大正解！',
  'どさんこパンダさんパワーMAXで正解〜！',
  'スペシャルパンダさんパワーMAX！やったね！',
  'と〜〜っても正解！パンダさんパワー充電中です🐼'
];
function correctFlavorText() {
  return CORRECT_FLAVORS[Math.floor(Math.random() * CORRECT_FLAVORS.length)];
}

function recordAnswerResult(q, correct) {
  save.totalStats.totalAnswered++;
  if (correct) {
    save.totalStats.totalCorrect++;
    if (save.wrongQuestions[q.id]) {
      // 復習で正解できたら履歴から軽くする
      delete save.wrongQuestions[q.id];
    }
  } else {
    const today = new Date().toISOString().slice(0, 10);
    const existing = save.wrongQuestions[q.id];
    save.wrongQuestions[q.id] = {
      wrongCount: (existing ? existing.wrongCount : 0) + 1,
      lastWrongDate: today
    };
  }
  writeSave(save);
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
  }
}

function endSession() {
  clearQuestionTimer();
  if (session.clockHandle) clearInterval(session.clockHandle);

  updateStreakOnPlay();

  let score, bestKey, label;
  if (session.mode === 'timeAttack') {
    score = session.correctCount;
    bestKey = 'timeAttack';
    label = 'タイムアタック';
  } else if (session.mode === 'endless') {
    score = session.correctCount;
    bestKey = 'endless';
    label = 'エンドレス';
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
  document.getElementById('result-score').textContent = `${score} / ${session.answeredCount}問`;
  document.getElementById('result-best-wrap').style.display = bestKey ? 'block' : 'none';
  if (bestKey) {
    document.getElementById('result-best').textContent = save.highScores[bestKey];
  }
  document.getElementById('result-newbest').style.display = isNewBest ? 'block' : 'none';
  document.getElementById('result-streak').textContent = save.streak.count;
  document.getElementById('result-rank').textContent = `現在のランク：${getRank(save.totalStats.totalCorrect).current.title}`;

  lastResult = { mode: session.mode, score, answeredCount: session.answeredCount, isNewBest };

  showScreen('screen-result');
  currentSessionMode = session.mode;

  if (isNewBest) celebrate();
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

  const appRect = app.getBoundingClientRect();
  const mascotRect = mascotEl.getBoundingClientRect();
  const shareRect = shareBtn.getBoundingClientRect();
  const newBestRect = newBestEl.getBoundingClientRect();

  // メイメイの画像〜Xシェアボタンの表示範囲（#app基準の相対座標）に収める
  const contentTop = mascotRect.top - appRect.top;
  const contentBottom = shareRect.bottom - appRect.top;
  const rangeHeight = contentBottom - contentTop;

  // クラッカーは「自己ベスト更新」バッジの高さから発生させる
  const burstY = (newBestRect.top + newBestRect.height / 2) - appRect.top;

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

// ==================== Xシェア ====================
function buildShareText(result) {
  const bonus = result.isNewBest ? '🎉自己ベスト更新！🎉\n' : '';
  if (result.mode === 'timeAttack') {
    return `${bonus}愛生博士クイズのタイムアタックで${result.score}問正解でした🐼\nあなたは何問いける？\n#愛生博士クイズ #山﨑愛生`;
  }
  if (result.mode === 'endless') {
    return `${bonus}愛生博士クイズのエンドレスモードで${result.score}問連続正解🐼✨\nこの記録、超えられる？\n#愛生博士クイズ #山﨑愛生`;
  }
  return `愛生博士クイズの学習モードで${result.score}問復習しました📖🐼\n愛生ちゃん博士に一歩近づいたかも\n#愛生博士クイズ #山﨑愛生`;
}

function shareToX() {
  if (!lastResult) return;
  const text = buildShareText(lastResult);
  const url = location.href.split('?')[0].split('#')[0];
  const intent = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
  window.open(intent, '_blank', 'noopener');
}

function playAgain() {
  startMode(currentSessionMode);
}

function backToModes() {
  goToModes();
}

function updateStreakOnPlay() {
  const today = new Date().toISOString().slice(0, 10);
  if (save.streak.lastPlayedDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (save.streak.lastPlayedDate === yesterday) {
    save.streak.count += 1;
  } else {
    save.streak.count = 1;
  }
  save.streak.lastPlayedDate = today;
  writeSave(save);
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

boot();
