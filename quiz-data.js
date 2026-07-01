// 愛生博士クイズゲーム — 問題データ
// カテゴリ: profile(易) / timeline(中) / quotes(難) / style(超難)
// 出典は各問の source に記載（画面には表示しない・内部管理用）
const QUIZ_DATA = [

  // ==================== プロフィール（易）20問 ====================
  {
    id: "profile_001", category: "profile", difficulty: 1,
    question: "山﨑愛生ちゃんの愛称は「めいちゃん」。この「愛生」の読み方は？",
    choices: ["めい", "あいき", "まなお", "あおい"],
    answerIndex: 0,
    explanation: "正解！「愛生」と書いて「めい」って読むよ〜。名前の由来を調べてくれて嬉しいな！",
    wrongComment: "残念、「めい」って読むんだよ〜。愛生博士なら覚えておいてね！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_002", category: "profile", difficulty: 1,
    question: "愛生ちゃんの誕生日はいつ？",
    choices: ["2005年6月28日", "2005年3月14日", "2004年6月28日", "2005年9月1日"],
    answerIndex: 0,
    explanation: "その通り！6/28生まれのかに座さんだよ〜。毎年バースデーイベントで盛り上がるんだ🐼",
    wrongComment: "惜しい〜！正解は2005年6月28日だよ。かに座生まれのめいちゃんです！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_003", category: "profile", difficulty: 1,
    question: "愛生ちゃんの出身地は？",
    choices: ["北海道", "青森県", "宮城県", "沖縄県"],
    answerIndex: 0,
    explanation: "正解、北海道札幌市出身！地元公演では「なまら楽しかった」が飛び出すよ〜。",
    wrongComment: "北海道だよ〜！地元公演だと「なまら」が自然に出ちゃうんだって。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_004", category: "profile", difficulty: 1,
    question: "愛生ちゃんの血液型は？",
    choices: ["B型", "A型", "O型", "AB型"],
    answerIndex: 0,
    explanation: "正解、B型だよ！ちなみにDa-iCEの工藤大輝さんと血液型まで同じなんだって、と〜っても偶然だね。",
    wrongComment: "正解はB型だよ〜。工藤大輝さんと誕生日も出身地も血液型も左利きも同じなの、すごい偶然だよね！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_005", category: "profile", difficulty: 1,
    question: "愛生ちゃんのメンバーカラーは？",
    choices: ["ブライトグリーン", "ピンク", "ブルー", "パープル"],
    answerIndex: 0,
    explanation: "正解！ブライトグリーンだよ〜。パンダさんカラーの白黒もよく私服に取り入れてるよ。",
    wrongComment: "正解はブライトグリーンだよ〜。パンダさんカラー（白黒）も私服でよく着てるみたい！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_006", category: "profile", difficulty: 1,
    question: "愛生ちゃんが所属しているのは？",
    choices: ["モーニング娘。'26（15期）", "アンジュルム", "Juice=Juice", "BEYOOOOONDS"],
    answerIndex: 0,
    explanation: "正解！モーニング娘。'26の15期メンバーだよ〜。2019年に加入発表されたんだ。",
    wrongComment: "正解はモーニング娘。'26（15期）だよ〜！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_007", category: "profile", difficulty: 1,
    question: "愛生ちゃんのニックネームとして正しいものは？",
    choices: ["ボブめいち", "めいたそ", "あいちゃん", "みぃたん"],
    answerIndex: 0,
    explanation: "正解！2022年にボブヘアにした時、ファンが「ボブめいち」と命名してTwitterで話題になったんだよ。",
    wrongComment: "正解は「ボブめいち」だよ〜！ボブヘアになった時にファンが名付けたニックネームなんだって。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_008", category: "profile", difficulty: 1,
    question: "愛生ちゃんの利き手は？",
    choices: ["左利き", "右利き", "両利き", "非公開"],
    answerIndex: 0,
    explanation: "正解！左利きだよ〜。ラジオで工藤大輝さんとの共通点として話題になったんだ。",
    wrongComment: "左利きが正解だよ〜！ラジオで判明した工藤大輝さんとの共通点のひとつなの。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_009", category: "profile", difficulty: 1,
    question: "愛生ちゃんの趣味として公式プロフィールに載っているのは？",
    choices: ["アニメ鑑賞・セルフネイル・リズムゲーム", "料理・読書・ヨガ", "写真撮影・釣り・登山", "英会話・水泳・書道"],
    answerIndex: 0,
    explanation: "正解！アニメ鑑賞・セルフネイル・リズムゲームだよ〜。あとパンダさんから癒しをもらうのも趣味なんだって。",
    wrongComment: "正解はアニメ鑑賞・セルフネイル・リズムゲームだよ！パンダさんに癒されるのも趣味みたいなものだね🐼",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_010", category: "profile", difficulty: 1,
    question: "愛生ちゃんの特技として紹介されているのは？",
    choices: ["気配を消して人に近づく／ブリッジなどのマット体操", "早口言葉", "手品", "ものまね"],
    answerIndex: 0,
    explanation: "正解！気配を消すのが得意で、お腹をくねくねさせられるのがプチ自慢なんだって。",
    wrongComment: "正解は「気配を消して人に近づく／マット体操」だよ〜。お腹くねくねも隠れた特技なんだ！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_011", category: "profile", difficulty: 1,
    question: "愛生ちゃんが一番好きな動物は？",
    choices: ["ジャイアントパンダ（パンダさん）", "うさぎ", "シマエナガ", "ねこ"],
    answerIndex: 0,
    explanation: "正解！パンダさん一択だよ〜。理由は「かわいいから」なんだって、へへへ。",
    wrongComment: "もちろんパンダさんだよ〜！ちなみに2番目に好きな動物はシマエナガなんだって。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_012", category: "profile", difficulty: 1,
    question: "愛生ちゃんが持っている資格は？",
    choices: ["英検準2級", "漢字検定準2級", "そろばん3級", "簿記2級"],
    answerIndex: 0,
    explanation: "正解、英検準2級だよ〜！勉強も頑張ってるめいちゃんです。",
    wrongComment: "正解は英検準2級だよ！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_013", category: "profile", difficulty: 1,
    question: "愛生ちゃんの座右の銘は？",
    choices: ["完璧と言う奴など居ない。時にミスるから強くなる。", "七転び八起き", "継続は力なり", "笑う門には福来る"],
    answerIndex: 0,
    explanation: "正解！「完璧と言う奴など居ない。時にミスるから強くなる。」だよ〜。失敗を隠さないめいちゃんらしい言葉だね。",
    wrongComment: "正解は「完璧と言う奴など居ない。時にミスるから強くなる。」だよ〜。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_014", category: "profile", difficulty: 1,
    question: "愛生ちゃんが尊敬すると公言している先輩は、小田さくらさんと誰？",
    choices: ["嗣永桃子さん", "道重さゆみさん", "高橋愛さん", "紺野あさ美さん"],
    answerIndex: 0,
    explanation: "正解！小田さくらさんと嗣永桃子さんだよ〜。",
    wrongComment: "正解は嗣永桃子さんだよ！小田さくらさんと2人が尊敬する先輩なんだ。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_015", category: "profile", difficulty: 1,
    question: "愛生ちゃんが苦手な食べ物として明言しているのは？",
    choices: ["野菜・生卵", "お肉全般", "辛い食べ物", "甘いもの"],
    answerIndex: 0,
    explanation: "正解！野菜と生卵が苦手なんだって。でも野菜は頑張ってほぼ毎日食べてるみたい、えらいね〜。",
    wrongComment: "正解は野菜と生卵だよ〜。ちなみに甘いものは大好きなんだ！",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_016", category: "profile", difficulty: 1,
    question: "愛生ちゃんがモーニング娘。への加入を発表したのは何年？",
    choices: ["2019年", "2018年", "2020年", "2021年"],
    answerIndex: 0,
    explanation: "正解！2019年6月22日に15期メンバーとして加入発表されたよ〜。",
    wrongComment: "正解は2019年だよ〜。6月22日の加入発表、覚えておいてね！",
    source: "愛生博士.md#デビュー・加入の歴史"
  },
  {
    id: "profile_017", category: "profile", difficulty: 1,
    question: "愛生ちゃんのメジャーデビュー日は？",
    choices: ["2020年1月22日", "2019年7月30日", "2021年1月22日", "2020年6月28日"],
    answerIndex: 0,
    explanation: "正解！『KOKORO&KARADA』などのシングルで2020年1月22日にメジャーデビューしたよ〜。",
    wrongComment: "正解は2020年1月22日だよ〜。デビューシングルは『KOKORO&KARADA / LOVEペディア / 人間関係No way way』！",
    source: "愛生博士.md#参加シングル"
  },
  {
    id: "profile_018", category: "profile", difficulty: 1,
    question: "愛生ちゃんの写真集タイトルとして存在しないものは？",
    choices: ["Mei20", "Mei", "Mei16", "Mei19"],
    answerIndex: 0,
    explanation: "正解！「Mei20」は無いよ〜。『Mei』『Mei16』『Mei19』の3冊が発売されてるんだ。",
    wrongComment: "『Mei20』は存在しないよ！正解の『Mei』『Mei16』『Mei19』のうち3つは実在するのに、これだけ無いんだ。",
    source: "愛生博士.md#写真集"
  },
  {
    id: "profile_019", category: "profile", difficulty: 1,
    question: "愛生ちゃんが「大好き」と明言している食べ物は？",
    choices: ["カレー", "生魚", "コーヒー", "わさび"],
    answerIndex: 0,
    explanation: "正解！カレー大好きで「今日もカレー食べました」と無意識に報告しちゃうくらいなんだって。",
    wrongComment: "正解はカレーだよ〜。生魚・コーヒー・わさびはむしろ苦手な方なの！",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_020", category: "profile", difficulty: 1,
    question: "愛生ちゃんが応援・元気の源として使う独自の言い回しは？",
    choices: ["パンダさんパワー", "モリモリエナジー", "アイドルスピリット", "ハートフルパワー"],
    answerIndex: 0,
    explanation: "正解！「パンダさんパワー」だよ〜。ここから「パンダさんパワーMAX」など無限に派生していくんだ🐼",
    wrongComment: "正解は「パンダさんパワー」だよ！これが愛生ちゃんの合言葉のもとになってるの。",
    source: "愛生博士.md#推し・好きなもの"
  },

  // ==================== 年表（中）20問 ====================
  {
    id: "timeline_001", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが「1000回」を達成したのはいつ頃？",
    choices: ["2022年4月", "2020年4月", "2024年4月", "2019年10月"],
    answerIndex: 0,
    explanation: "正解！2022年4月11日（No.1000）に達成したよ〜。",
    wrongComment: "正解は2022年4月だよ〜（No.1000）！",
    source: "愛生博士.md#年表 No.1000"
  },
  {
    id: "timeline_002", category: "timeline", difficulty: 2,
    question: "2022年5月、愛生ちゃんが新型コロナ陽性判定を報告した後、活動復帰の挨拶として使ったフレーズは？",
    choices: ["ただいま〜", "おかえりなさい", "行ってきます", "ありがとう"],
    answerIndex: 0,
    explanation: "正解！「ただいま〜」だよ〜。帰宅するみたいに表現するの、あったかいよね。",
    wrongComment: "正解は「ただいま〜」だよ！隔離明けの復帰をこうやって表現したんだ。",
    source: "愛生博士.md#年表 No.1051"
  },
  {
    id: "timeline_003", category: "timeline", difficulty: 2,
    question: "2022年6月、日テレ「Da-iCE music Lab」に出演した愛生ちゃんは、工藤大輝さんと何が全部同じだと判明した？",
    choices: ["誕生日・出身地・血液型・左利き", "身長・血液型・星座", "趣味・特技", "好きな食べ物"],
    answerIndex: 0,
    explanation: "正解！誕生日・出身地・血液型・左利きの4つが全部同じだったんだって、すごい偶然だね〜。",
    wrongComment: "正解は誕生日・出身地・血液型・左利きだよ！4つも一致するなんてびっくりだよね。",
    source: "愛生博士.md#年表 No.1053"
  },
  {
    id: "timeline_004", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの71stシングル「Chu Chu Chu 僕らの未来／大・人生 Never Been Better!」が発売されたのはいつ？",
    choices: ["2022年6月8日", "2022年12月21日", "2023年10月25日", "2020年1月22日"],
    answerIndex: 0,
    explanation: "正解！2022年6月8日発売だよ〜。13人体制での最後のシングルだったんだ。",
    wrongComment: "正解は2022年6月8日だよ〜。13人での最後のシングルだったんだって。",
    source: "愛生博士.md#年表 No.1058"
  },
  {
    id: "timeline_005", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが黒髪ボブに変更し、Twitterで1万いいねを達成したのはいつ？",
    choices: ["2022年10月14日", "2021年3月", "2023年6月", "2024年1月"],
    answerIndex: 0,
    explanation: "正解！2022年10月14日だよ〜。ファンが「ボブめいち」と命名した記念日でもあるね。",
    wrongComment: "正解は2022年10月14日だよ〜。この日が「ボブめいち」誕生の日なんだ！",
    source: "愛生博士.md#年表 No.1187"
  },
  {
    id: "timeline_006", category: "timeline", difficulty: 2,
    question: "加賀楓さんの卒業スペシャル公演（日本武道館）が行われたのはいつ？",
    choices: ["2022年12月10日", "2022年6月20日", "2023年5月27日", "2024年9月14日"],
    answerIndex: 0,
    explanation: "正解！2022年12月10日だよ〜。「この時間が終わらなければいいのに」と当時語っていたね。",
    wrongComment: "正解は2022年12月10日だよ！加賀楓さん卒業スペシャル公演の日だよ。",
    source: "愛生博士.md#年表 No.1243"
  },
  {
    id: "timeline_007", category: "timeline", difficulty: 2,
    question: "72ndシングル「Swing Swing Paradise／Happy birthday to Me!」がウィークリーシングルチャート1位を獲得したのは、15期にとってどんな出来事だった？",
    choices: ["15期として初めての1位", "15期として2回目の1位", "グループ初の1位", "海外チャート1位"],
    answerIndex: 0,
    explanation: "正解！15期として初めての1位で、グループとしても4.5年ぶりだったんだって。す〜〜っごく嬉しい記録だね。",
    wrongComment: "正解は「15期として初めての1位」だよ〜。グループ全体でも4.5年ぶりの快挙だったんだ！",
    source: "愛生博士.md#年表 No.1260"
  },
  {
    id: "timeline_008", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが上野動物園に初めて訪問し、パンダさんに初対面したのはいつ？",
    choices: ["2023年1月30日", "2020年8月15日", "2022年3月1日", "2024年6月1日"],
    answerIndex: 0,
    explanation: "正解！2023年1月30日、シンシン・シャオシャオ・レイレイなどに初対面したよ〜。長年の夢が叶った瞬間だね。",
    wrongComment: "正解は2023年1月30日だよ〜。「20歳までにパンダさんに会う」という目標を前倒しで叶えた日なんだ！",
    source: "愛生博士.md#年表 No.1294"
  },
  {
    id: "timeline_009", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの18歳の誕生日はいつ？",
    choices: ["2023年6月28日", "2022年6月28日", "2024年6月28日", "2021年6月28日"],
    answerIndex: 0,
    explanation: "正解！2023年6月28日、18歳の誕生日だよ〜。バースデーイベント第4回も開催されたね。",
    wrongComment: "正解は2023年6月28日だよ〜！",
    source: "愛生博士.md#年表 No.1447"
  },
  {
    id: "timeline_010", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが「1500回」を達成したのはいつ？",
    choices: ["2023年8月26日", "2022年10月28日", "2024年11月9日", "2021年9月23日"],
    answerIndex: 0,
    explanation: "正解！2023年8月26日、24時間テレビ出演と重なった記念日だったよ〜。",
    wrongComment: "正解は2023年8月26日だよ〜（No.1500）！",
    source: "愛生博士.md#年表 No.1500"
  },
  {
    id: "timeline_011", category: "timeline", difficulty: 2,
    question: "73rdシングル「すっごいFEVER！/Wake-up Call/Neverending Shine」が発売されたのは？",
    choices: ["2023年10月25日", "2022年6月8日", "2024年8月14日", "2020年1月22日"],
    answerIndex: 0,
    explanation: "正解！2023年10月25日発売だよ〜。「現メンバー14人での最初で最後のシングル」と自分で整理していたね。",
    wrongComment: "正解は2023年10月25日だよ！",
    source: "愛生博士.md#年表 No.1559"
  },
  {
    id: "timeline_012", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが高校を卒業したのはいつ頃？",
    choices: ["2024年4月初旬", "2022年3月", "2023年6月", "2025年1月"],
    answerIndex: 0,
    explanation: "正解！2024年4月初旬だよ〜。「B.L.T.」に同学年の岡村ほまれ・櫻井梨央と一緒に掲載されたね。",
    wrongComment: "正解は2024年4月初旬だよ〜！",
    source: "愛生博士.md#年表 No.1714"
  },
  {
    id: "timeline_013", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの19歳の誕生日（「ラスト10代」として感慨深いと語った回）はいつ？",
    choices: ["2024年6月28日", "2023年6月28日", "2025年6月28日", "2022年6月28日"],
    answerIndex: 0,
    explanation: "正解！2024年6月28日だよ〜。「生まれ変わったらパンダさんになりたい」がクイズ問題になった回でもあるね。",
    wrongComment: "正解は2024年6月28日だよ〜！",
    source: "愛生博士.md#年表 No.1792"
  },
  {
    id: "timeline_014", category: "timeline", difficulty: 2,
    question: "写真集『Mei19』が発売されたのはいつ？",
    choices: ["2024年9月14日", "2020年6月12日", "2021年8月21日", "2023年3月1日"],
    answerIndex: 0,
    explanation: "正解！2024年9月14日発売だよ〜。沖縄ロケのエピソードも豊富なんだ。",
    wrongComment: "正解は2024年9月14日だよ〜！",
    source: "愛生博士.md#写真集"
  },
  {
    id: "timeline_015", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの20歳の誕生日はいつ？",
    choices: ["2025年6月28日", "2024年6月28日", "2026年6月28日", "2023年6月28日"],
    answerIndex: 0,
    explanation: "正解！2025年6月28日だよ〜。「まじでアイドルになって良かった」と語った回だね。",
    wrongComment: "正解は2025年6月28日だよ〜！",
    source: "語録.md No.2043"
  },
  {
    id: "timeline_016", category: "timeline", difficulty: 2,
    question: "モーニング娘。'26春ツアーで、牧野真莉愛さんのラスト凱旋公演として開催されたのは、どの地域の公演？",
    choices: ["愛知公演（2026年5月24日）", "北海道公演", "福岡公演", "沖縄公演"],
    answerIndex: 0,
    explanation: "正解！2026年5月24日の愛知公演だよ〜。「終わってほしくないな」と語っていたね。",
    wrongComment: "正解は愛知公演（2026年5月24日）だよ〜！",
    source: "愛生博士.md#年表 No.2250"
  },
  {
    id: "timeline_017", category: "timeline", difficulty: 2,
    question: "牧野真莉愛さんの卒業スペシャルコンサートが行われたのはいつ・どこ？",
    choices: ["2026年6月24日・日本武道館", "2026年5月31日・エスコンフィールド", "2026年6月30日・荒川区民会館", "2026年7月・愛知"],
    answerIndex: 0,
    explanation: "正解！2026年6月24日、日本武道館だよ〜。「パンダさんLOVEりんです」と愛情を伝えていたね。",
    wrongComment: "正解は2026年6月24日・日本武道館だよ〜！",
    source: "愛生博士.md#年表 No.2256, No.2267"
  },
  {
    id: "timeline_018", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの21歳の誕生日はいつ？",
    choices: ["2026年6月28日", "2025年6月28日", "2027年6月28日", "2026年7月9日"],
    answerIndex: 0,
    explanation: "正解！2026年6月28日だよ〜。「ハッピーパンダさんパワーMAX」で迎えたんだって。",
    wrongComment: "正解は2026年6月28日だよ〜！",
    source: "愛生博士.md#年表 No.2270"
  },
  {
    id: "timeline_019", category: "timeline", difficulty: 2,
    question: "77thシングル「Lonely...But not Alone」の発売日は？",
    choices: ["2026年9月9日", "2026年6月28日", "2026年12月21日", "2027年1月22日"],
    answerIndex: 0,
    explanation: "正解！2026年9月9日発売予定だよ〜。",
    wrongComment: "正解は2026年9月9日だよ〜！",
    source: "愛生博士.md#参加シングル No.2268"
  },
  {
    id: "timeline_020", category: "timeline", difficulty: 2,
    question: "愛生ちゃんの21歳バースデーイベントが荒川区民会館で開催されたのはいつ？",
    choices: ["2026年6月30日", "2026年6月28日", "2026年7月9日", "2026年5月31日"],
    answerIndex: 0,
    explanation: "正解！2026年6月30日だよ〜。小田さくらさんのサプライズ来場もあったんだって。",
    wrongComment: "正解は2026年6月30日だよ〜！",
    source: "愛生博士.md#年表 No.2272"
  },

  // ==================== 語録（難）15問 ====================
  {
    id: "quotes_001", category: "quotes", difficulty: 3,
    question: "「パンダさん大好き山﨑愛生でした」というフレーズは、ブログのどんな場面で使われる？",
    choices: ["記事の締めの定型あいさつ", "誕生日限定のあいさつ", "卒業公演限定のあいさつ", "ファンレターへの返事"],
    answerIndex: 0,
    explanation: "正解！ほぼ全記事の締めに登場する定番フレーズだよ〜。",
    wrongComment: "正解は「記事の締めの定型あいさつ」だよ〜。ほぼ毎回このフレーズで締めるんだ！",
    source: "語録.md#定番フレーズ"
  },
  {
    id: "quotes_002", category: "quotes", difficulty: 3,
    question: "「愛生博士としてレベルアップしてね」というフレーズは、どんな時に使われる？",
    choices: ["新メンバーやファンへの呼びかけ", "自分自身への激励", "先輩への挨拶", "卒業する先輩への言葉"],
    answerIndex: 0,
    explanation: "正解！新メンバーやファンに向けて使われる呼びかけで、後の「愛生博士」キャラクターの原形になったんだよ〜。",
    wrongComment: "正解は「新メンバーやファンへの呼びかけ」だよ〜。この「愛生博士」ゲームの名前の由来でもあるんだ！",
    source: "語録.md No.1438, No.1458"
  },
  {
    id: "quotes_003", category: "quotes", difficulty: 3,
    question: "「20歳までにパンダさんに会う！」という目標を宣言したのはいつ頃？",
    choices: ["2022年8月", "2020年1月", "2024年6月", "2019年7月"],
    answerIndex: 0,
    explanation: "正解！2022年8月15日に宣言して、2023年1月に前倒しで達成したんだよ〜。有言実行だね！",
    wrongComment: "正解は2022年8月だよ〜。しかも実際は20歳より早く、2023年1月に達成しちゃったんだ！",
    source: "語録.md No.1126"
  },
  {
    id: "quotes_004", category: "quotes", difficulty: 3,
    question: "「褒めて伸びるタイプ」という自己紹介フレーズが初出したのはどんな場面？",
    choices: ["バースデーイベントの振り返り", "卒業公演の感想", "ラジオ出演の反省", "コンサートのMC"],
    answerIndex: 0,
    explanation: "正解！バースデーイベントの振り返りで初出して、以後何度も登場する定番自己紹介になったんだよ〜。",
    wrongComment: "正解は「バースデーイベントの振り返り」だよ〜（2023年7月）！",
    source: "語録.md No.1448"
  },
  {
    id: "quotes_005", category: "quotes", difficulty: 3,
    question: "「パンダコさんパワーMAX」の「パンダコ」とは何と何を組み合わせた造語？",
    choices: ["パンダ＋タコ", "パンダ＋コアラ", "パンダ＋子ども", "パンダ＋こんにちは"],
    answerIndex: 0,
    explanation: "正解！パンダとタコを組み合わせた造語だよ〜。自分の三つ編みをタコの手っぽいと表現したのが原点なんだ。",
    wrongComment: "正解はパンダ＋タコだよ〜！三つ編みがタコの手みたいだったのがきっかけなんだって。",
    source: "語録.md No.1019, No.1549"
  },
  {
    id: "quotes_006", category: "quotes", difficulty: 3,
    question: "「なまらありがとうございました」の「なまら」はどこの方言？",
    choices: ["北海道弁", "大阪弁", "博多弁", "沖縄の方言"],
    answerIndex: 0,
    explanation: "正解！北海道弁で「とても」という意味だよ〜。地元公演で自然と出てくるんだ。",
    wrongComment: "正解は北海道弁だよ〜！「どさんこ」も同じく地元愛の表現なんだ。",
    source: "語録.md No.2255"
  },
  {
    id: "quotes_007", category: "quotes", difficulty: 3,
    question: "「めいっぱい」という言葉遊びは、「めい（愛生）」と何を組み合わせたもの？",
    choices: ["いっぱい", "いつも", "みんな", "がんばる"],
    answerIndex: 0,
    explanation: "正解！「めい」＋「いっぱい」のかけ言葉だよ〜。自分の名前を活かした言葉遊びが得意なんだ。",
    wrongComment: "正解は「いっぱい」だよ〜。「めいっぱい応援」みたいに使われるんだ！",
    source: "語録.md No.1790"
  },
  {
    id: "quotes_008", category: "quotes", difficulty: 3,
    question: "「大人めいを意識しました」という自称が初登場したのはどんなパフォーマンスの時？",
    choices: ["ひなフェス2025", "卒業公演", "夏フェス", "写真集撮影"],
    answerIndex: 0,
    explanation: "正解！ひなフェス2025でのパフォーマンス感想として初登場したんだよ〜。",
    wrongComment: "正解はひなフェス2025だよ〜（2025年3月29日）！",
    source: "語録.md No.1991"
  },
  {
    id: "quotes_009", category: "quotes", difficulty: 3,
    question: "「ライスライスじゃん！」という発言は、どんな場面のツッコミ？",
    choices: ["夢の中でご飯にご飯をかけるシーン", "実際の食事中の失敗", "料理番組を見ていて", "ラジオでのゲームコーナー"],
    answerIndex: 0,
    explanation: "正解！夢の話の中でのユニークなツッコミだよ〜。愛生ちゃんの夢の話はいつも独特で面白いんだ。",
    wrongComment: "正解は「夢の中の出来事」だよ〜！愛生ちゃんは夢の話をよく詳しく語ってくれるんだ。",
    source: "語録.md No.2194"
  },
  {
    id: "quotes_010", category: "quotes", difficulty: 3,
    question: "「お腹がパンパンパンダさん」は、どんな状態を表す造語？",
    choices: ["お腹がいっぱいの状態", "緊張している状態", "楽しい気持ちの状態", "眠い状態"],
    answerIndex: 0,
    explanation: "正解！満腹を「パンパン」とパンダさんをかけた表現だよ〜。食いしん坊エピソードでよく登場するんだ。",
    wrongComment: "正解はお腹いっぱいの状態だよ〜！「パンパン」と「パンダさん」をかけた愛生ちゃんらしい造語なの。",
    source: "語録.md No.2199, No.2161"
  },
  {
    id: "quotes_011", category: "quotes", difficulty: 3,
    question: "「まじで友達少ないので」という発言があったのは、どんな内容の記事？",
    choices: ["誕生月・チームラボ訪問の思い出を語る記事", "卒業公演の感想記事", "ライブ後の興奮を語る記事", "ラジオ出演の反省記事"],
    answerIndex: 0,
    explanation: "正解！誕生月の記事で、ハロメン以外の友人との外出がレアだと率直に語っていたよ〜。",
    wrongComment: "正解は誕生月の記事だよ〜（2026年6月2日）！",
    source: "語録.md No.2256"
  },
  {
    id: "quotes_012", category: "quotes", difficulty: 3,
    question: "「頑張っていきまっしょい！！！」という独自の掛け声が使われたのは、何の記念日？",
    choices: ["モーニング娘。加入5周年記念日", "デビュー1周年記念日", "卒業発表の日", "成人式の日"],
    answerIndex: 0,
    explanation: "正解！加入5周年記念日（2023年9月14日）で使われたよ〜。",
    wrongComment: "正解は加入5周年記念日だよ〜！",
    source: "語録.md No.1519"
  },
  {
    id: "quotes_013", category: "quotes", difficulty: 3,
    question: "「これがエモエモってやつですね」という表現がよく使われていたのは、大体どの時期？",
    choices: ["2023年頃", "2019年頃", "2021年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解！2023年春頃に多用されていた「エモ系」表現だよ〜。",
    wrongComment: "正解は2023年頃だよ〜！",
    source: "文章のクセ.md#2023年春"
  },
  {
    id: "quotes_014", category: "quotes", difficulty: 3,
    question: "「完全愛生でお会いしましょう」という独特な自己表現は、何を形容詞的に使っている？",
    choices: ["自分の名前「愛生」", "パンダさん", "北海道", "モーニング娘。"],
    answerIndex: 0,
    explanation: "正解！自分の名前「愛生」を形容詞のように使う独特な表現だよ〜。2024年夏頃に初登場したんだ。",
    wrongComment: "正解は自分の名前「愛生」だよ〜！",
    source: "語録.md No.1835"
  },
  {
    id: "quotes_015", category: "quotes", difficulty: 3,
    question: "「愛がいーーっぱい生まれますように」という21歳誕生日のフレーズは、何と何をかけた表現？",
    choices: ["「愛生」と「愛が生まれる」", "「愛」と「生まれる」の反対語", "「愛生」と「愛される」", "誕生日と記念日"],
    answerIndex: 0,
    explanation: "正解！自分の名前「愛生」と「愛が生まれる」をかけた、締めのあいさつの誕生日バージョンだよ〜。",
    wrongComment: "正解は「愛生」と「愛が生まれる」だよ〜！締めの定番あいさつを誕生日らしくアレンジしたんだ。",
    source: "語録.md No.2270"
  },

  // ==================== 文体・時代当て（超難）5問 ====================
  {
    id: "style_001", category: "style", difficulty: 4,
    question: "北海道弁「なまら」がブログ本文に登場し始めたのは、大体どの時期？",
    choices: ["2022年頃", "2019年頃", "2024年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解！2022年4月の地元公演（No.1006）あたりから確認できるよ〜。年を追うごとに自然に定着していくんだ。",
    wrongComment: "正解は2022年頃だよ〜。地元・北海道公演のタイミングで自然に出てきたんだって。",
    source: "文章のクセ.md#2022年夏〜初秋"
  },
  {
    id: "style_002", category: "style", difficulty: 4,
    question: "「どさんこパンダさんパワーMAX」のように、状況に応じて接頭語を変える言い回しが「確立」したと分析されているのは？",
    choices: ["2024年秋頃", "2020年頃", "2022年春頃", "2019年頃"],
    answerIndex: 0,
    explanation: "正解！2024年秋（No.1860〜1919）に接頭語バリエーションが確立したと分析されているよ〜。",
    wrongComment: "正解は2024年秋頃だよ〜！",
    source: "文章のクセ.md#2024年秋"
  },
  {
    id: "style_003", category: "style", difficulty: 4,
    question: "「完全愛生で」という独特な自己表現が初登場したのは？",
    choices: ["2024年夏〜秋初期", "2020年冬", "2022年秋", "2026年春"],
    answerIndex: 0,
    explanation: "正解！2024年夏〜秋初期（No.1835・1840）に初登場したよ〜。",
    wrongComment: "正解は2024年夏〜秋初期だよ〜！",
    source: "文章のクセ.md#2024年夏〜秋初期"
  },
  {
    id: "style_004", category: "style", difficulty: 4,
    question: "「大人めいを意識しました」という自称が初登場したのは？",
    choices: ["2025年3〜5月", "2022年冬", "2023年秋", "2020年春"],
    answerIndex: 0,
    explanation: "正解！2025年3〜5月（No.1991・ひなフェス2025）に初登場したよ〜。",
    wrongComment: "正解は2025年3〜5月だよ〜！",
    source: "文章のクセ.md#2025年3〜5月"
  },
  {
    id: "style_005", category: "style", difficulty: 4,
    question: "ファンへの呼びかけとして「愛生博士」という言葉の芽生えが見られ始めたのは？",
    choices: ["2023年冬〜初春", "2019年秋", "2021年夏", "2026年初頭"],
    answerIndex: 0,
    explanation: "正解！2023年冬〜初春（No.1303「愛生博士の皆さん」）が芽生えの時期だよ〜。このゲームの名前の由来にもなってるね！",
    wrongComment: "正解は2023年冬〜初春だよ〜！",
    source: "文章のクセ.md#2023年冬〜初春"
  }
];
