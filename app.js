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
    badges: {}
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

// ==================== モード選択画面 ====================
function goToModes() {
  document.getElementById('modes-greeting').textContent = `おかえり、${save.nickname}！`;
  document.getElementById('modes-best-timeattack').textContent = save.highScores.timeAttack;
  document.getElementById('modes-best-endless').textContent = save.highScores.endless;
  document.getElementById('modes-streak').textContent = save.streak.count;
  renderRank('modes-rank', 'modes-rank-progress');
  renderDailyCard();
  showScreen('screen-modes');
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
  if (session.mode === 'daily') session.dailyResults.push(correct);

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
  document.getElementById('result-score').textContent = `${score} / ${session.answeredCount}問`;
  document.getElementById('result-best-wrap').style.display = bestKey ? 'block' : 'none';
  if (bestKey) {
    document.getElementById('result-best').textContent = save.highScores[bestKey];
  }
  document.getElementById('result-newbest').style.display = isNewBest ? 'block' : 'none';
  document.getElementById('result-streak').textContent = save.streak.count;
  document.getElementById('result-rank').textContent = `現在のランク：${getRank(save.totalStats.totalCorrect).current.title}`;

  // S1: 博士度診断メーター（timeAttack/endlessのみ）
  const diagnosisEl = document.getElementById('result-diagnosis');
  const dailyGridEl = document.getElementById('result-daily-grid');
  let diagnosis = null;
  if (session.mode === 'timeAttack' || session.mode === 'endless') {
    diagnosis = getDiagnosis(session.mode, score);
    document.getElementById('result-diagnosis-title').textContent = diagnosis.title;
    document.getElementById('result-diagnosis-comment').textContent = diagnosis.comment;
    document.getElementById('result-diagnosis-percent').textContent = `博士度 ${diagnosis.percent}%`;
    const bar = document.getElementById('result-meter-bar');
    bar.classList.toggle('is-max', diagnosis.percent >= 100);
    bar.style.width = '0%';
    // アニメーションでバーが伸びるよう、描画後に幅を反映する
    // （バックグラウンドタブ等でrequestAnimationFrameが発火しない環境向けにsetTimeoutも併用）
    let meterFilled = false;
    const fillMeter = () => {
      if (meterFilled) return;
      meterFilled = true;
      bar.style.width = diagnosis.percent + '%';
    };
    requestAnimationFrame(() => requestAnimationFrame(fillMeter));
    setTimeout(fillMeter, 120);
    diagnosisEl.style.display = 'block';
    dailyGridEl.style.display = 'none';
  } else if (session.mode === 'daily') {
    const emojis = session.dailyResults.map(ok => ok ? '🐼' : '⬜').join('');
    const correctCount = session.dailyResults.filter(Boolean).length;
    document.getElementById('result-daily-emojis').textContent = emojis;
    document.getElementById('result-daily-score').textContent = `${correctCount}/${session.dailyResults.length}`;
    dailyGridEl.style.display = 'block';
    diagnosisEl.style.display = 'none';
  } else {
    diagnosisEl.style.display = 'none';
    dailyGridEl.style.display = 'none';
  }

  // R1: ストリーク節目バッジ
  const streakBadgeEl = document.getElementById('result-streak-badge');
  if (reachedMilestone) {
    streakBadgeEl.textContent = `🎉 連続${reachedMilestone}日達成！`;
    streakBadgeEl.style.display = 'block';
  } else {
    streakBadgeEl.style.display = 'none';
  }

  // R2: 新バッジ解放判定（累計正解数・ストリーク数を見るのでスコア確定後に実行）
  const newBadges = evaluateNewBadges();
  const newBadgeEl = document.getElementById('result-newbadge');
  if (newBadges.length) {
    newBadgeEl.innerHTML = newBadges.map(b => `🆕 新バッジ解放！【${b.emoji} ${b.name}】`).join('<br>');
    newBadgeEl.style.display = 'block';
  } else {
    newBadgeEl.style.display = 'none';
  }

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

  if (isNewBest || reachedMilestone) celebrate();
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
    // 今日の1問は1日1回。「もう1回」はモード選択に戻す
    goToModes();
    return;
  }
  startMode(currentSessionMode);
}

function backToModes() {
  goToModes();
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

function openBadges() {
  renderBadgeGrid('badge-grid-correct', CORRECT_BADGES, min => `累計${min}問正解で解放`);
  renderBadgeGrid('badge-grid-streak', STREAK_BADGES, min => `連続${min}日プレイで解放`);
  showScreen('screen-badges');
}

boot();
