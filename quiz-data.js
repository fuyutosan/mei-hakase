// 愛生博士クイズゲーム — 問題データ
// カテゴリ: profile(易) / timeline(中) / quotes(難) / style(超難)
// 出典は各問の source に記載（画面には表示しない・内部管理用）
const QUIZ_DATA = [

  // ==================== プロフィール（易）40問 ====================
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

    {
    id: "profile_021", category: "profile", difficulty: 1,
    question: "愛生ちゃんの星座は？",
    choices: ["かに座", "しし座", "おとめ座", "てんびん座"],
    answerIndex: 0,
    explanation: "正解〜！6月28日生まれだからかに座なんだよ🐼と〜っても覚えやすいでしょ？",
    wrongComment: "へへへ、正解はかに座だよ〜！6月28日生まれだからね、覚えてくれると嬉しいな。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_022", category: "profile", difficulty: 1,
    question: "2025年9月の健康診断で判明した愛生ちゃんの身長は？",
    choices: ["161.4cm", "155.0cm", "158.6cm", "165.2cm"],
    answerIndex: 0,
    explanation: "正解！161.4cmまで伸びてたんだって〜、す〜っごく嬉しいニュースだったよ🐼",
    wrongComment: "へへへ、正解は161.4cmだよ〜！健康診断でわかって本人もびっくりしてたみたい。",
    source: "愛生博士.md#年表（No.2093）"
  },
  {
    id: "profile_023", category: "profile", difficulty: 1,
    question: "愛生ちゃんが公式プロフィールで挙げている好きな音楽のジャンルは？",
    choices: ["アニソン（キャラソン）・J-POP", "クラシック・洋楽ロック", "演歌・ジャズ", "K-POP・ヒップホップ"],
    answerIndex: 0,
    explanation: "正解〜！アニソンとJ-POPが好きなんだって。アニメ好きならではだね🐼",
    wrongComment: "正解はアニソン（キャラソン）とJ-POPだよ〜！アニメ好きの愛生ちゃんらしいよね。",
    source: "愛生博士.md#プロフィール"
  },
  {
    id: "profile_024", category: "profile", difficulty: 1,
    question: "愛生ちゃんが「ずっと食べ続けられます😋」と言うほど大好きな食べ物は？",
    choices: ["ポテト", "餃子", "焼き魚", "サラダ"],
    answerIndex: 0,
    explanation: "正解！ポテト大好きなんだよ〜。回転寿司でもポテトを頼んじゃうくらいなんだ。",
    wrongComment: "正解はポテトだよ〜！「ずっと食べ続けられます」って言うくらい好きなんだって。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_025", category: "profile", difficulty: 1,
    question: "愛生ちゃんがアイスの「パリパリしてるところ」がお気に入りだと言っている飲み物は？",
    choices: ["クリームソーダ", "タピオカミルクティー", "抹茶ラテ", "オレンジジュース"],
    answerIndex: 0,
    explanation: "正解〜！クリームソーダのアイスのパリパリ部分がお気に入りなんだって。お母さんも同じ部分が好きらしいよ。",
    wrongComment: "正解はクリームソーダだよ〜！アイスも炭酸も両方好きなめいちゃんです。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_026", category: "profile", difficulty: 1,
    question: "愛生ちゃんが「海苔がた〜っくさんかかってると嬉しくなる」と言っているのは何蕎麦？",
    choices: ["ざる蕎麦", "月見蕎麦", "きつね蕎麦", "天ぷら蕎麦"],
    answerIndex: 0,
    explanation: "正解！ざる蕎麦だよ〜。つゆに七味とわさびを全部入れちゃう食べ方も紹介してたんだ、へへへ。",
    wrongComment: "正解はざる蕎麦だよ〜！海苔がたっぷりだと嬉しくなっちゃうんだって。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_027", category: "profile", difficulty: 1,
    question: "愛生ちゃんが「黄色いのより糖度が高い」と紹介している、祖父母から毎年届く北海道の食べ物は？",
    choices: ["白いとうきび（ホワイトコーン）", "夕張メロン", "じゃがいも", "アスパラガス"],
    answerIndex: 0,
    explanation: "正解！白いとうきび（ホワイトコーン）だよ〜。生でも食べられるくらい実がやわらかいんだって。",
    wrongComment: "正解は白いとうきびだよ〜！祖父母から毎年届く北海道の味なんだ。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_028", category: "profile", difficulty: 2,
    question: "モーニング娘。'26 2026年春ツアーのタイトルは？",
    choices: ["Rays Of Light", "Movin' Forward", "Neverending Shine Show", "MOTTO MORNING MUSUME。"],
    answerIndex: 0,
    explanation: "正解〜！「Rays Of Light」だよ🐼 牧野真莉愛さんのラストツアーにもなったね。",
    wrongComment: "正解は「Rays Of Light」だよ〜！2026年の春ツアーのタイトルなんだ。",
    source: "愛生博士.md#コンサート・ライブ歴"
  },
  {
    id: "profile_029", category: "profile", difficulty: 2,
    question: "2025年秋のモーニング娘。ツアーのタイトルは？",
    choices: ["Movin' Forward", "Rays Of Light", "MOTTO MORNING MUSUME。", "続・花鳥風月"],
    answerIndex: 0,
    explanation: "正解！「Movin' Forward」だよ〜。新曲「てか HAPPYのHAPPY！」も初披露されたツアーなんだ。",
    wrongComment: "正解は「Movin' Forward」だよ〜！2025年秋のツアータイトルなんだ。",
    source: "愛生博士.md#年表（No.2094）"
  },
  {
    id: "profile_030", category: "profile", difficulty: 2,
    question: "愛生ちゃんの写真集『Mei』の発売日は？",
    choices: ["2020年6月12日", "2021年8月21日", "2024年9月14日", "2019年12月25日"],
    answerIndex: 0,
    explanation: "正解！2020年6月12日発売だよ〜。パンダさん「シャンシャン」の誕生日と同じで、毎年一緒にお祝いしてるんだ🐼",
    wrongComment: "正解は2020年6月12日だよ〜。ちなみにシャンシャンの誕生日と同じ日なんだって！",
    source: "愛生博士.md#写真集"
  },
  {
    id: "profile_031", category: "profile", difficulty: 2,
    question: "愛生ちゃんの写真集『Mei19』の発売日は？",
    choices: ["2024年9月14日", "2020年6月12日", "2021年8月21日", "2023年6月28日"],
    answerIndex: 0,
    explanation: "正解〜！2024年9月14日発売だよ。沖縄ロケの様子も語られてたね。",
    wrongComment: "正解は2024年9月14日だよ〜。モーニング娘。結成27周年と同じ日でもあるんだ。",
    source: "愛生博士.md#写真集"
  },
  {
    id: "profile_032", category: "profile", difficulty: 2,
    question: "愛生ちゃんの77thシングル「Lonely...But not Alone」の発売日は？",
    choices: ["2026年9月9日", "2026年6月28日", "2026年12月3日", "2025年12月3日"],
    answerIndex: 0,
    explanation: "正解！2026年9月9日発売だよ〜。ブログで正式タイトルが発表されたときは、と〜っても嬉しかったみたい。",
    wrongComment: "正解は2026年9月9日だよ〜！77thシングルの発売日なんだ。",
    source: "愛生博士.md#参加シングル"
  },
  {
    id: "profile_033", category: "profile", difficulty: 1,
    question: "愛生ちゃんが担当しているソロラジオ番組の名前は？",
    choices: ["山﨑愛生のメイボンソワ", "山﨑愛生のパンダタイム", "めいちゃんの部屋", "愛生のラジオ大好き"],
    answerIndex: 0,
    explanation: "正解！「山﨑愛生のメイボンソワ」だよ〜。STVラジオで放送されてるんだ🐼",
    wrongComment: "正解は「山﨑愛生のメイボンソワ」だよ〜！STVラジオのソロ番組なの。",
    source: "愛生博士.md#年表（No.1571）"
  },
  {
    id: "profile_034", category: "profile", difficulty: 1,
    question: "愛生ちゃんがアニメ「名探偵コナン」で推しキャラとして挙げているのは？",
    choices: ["安室透", "江戸川コナン", "怪盗キッド", "服部平次"],
    answerIndex: 0,
    explanation: "正解〜！安室透推しだよ。「めっちゃかっこいい」って絶賛してたんだ。",
    wrongComment: "正解は安室透だよ〜！コナン好きの愛生ちゃんの推しキャラなの。",
    source: "愛生博士.md#年表（No.1735）"
  },
  {
    id: "profile_035", category: "profile", difficulty: 1,
    question: "愛生ちゃんが高校を卒業したのはいつ？",
    choices: ["2024年4月1日", "2023年3月31日", "2025年4月1日", "2022年3月19日"],
    answerIndex: 0,
    explanation: "正解！2024年4月1日に高校卒業を報告してたよ〜。「卒業トリオ」として雑誌にも載ったんだ。",
    wrongComment: "正解は2024年4月1日だよ〜！高校卒業のご報告だったの。",
    source: "愛生博士.md#年表（No.1714）"
  },
  {
    id: "profile_036", category: "profile", difficulty: 1,
    question: "愛生ちゃんは左利きだけど、野球をするときはどっちを使う？",
    choices: ["右投げ右打ち", "左投げ左打ち", "右投げ左打ち", "左投げ右打ち"],
    answerIndex: 0,
    explanation: "正解〜！左利きなのに野球は右投げ右打ちなんだって、ちょっと意外だよね🐼",
    wrongComment: "正解は右投げ右打ちだよ〜！左利きなのに野球だけ右なの、面白いよね。",
    source: "愛生博士.md#年表（No.1964）"
  },
  {
    id: "profile_037", category: "profile", difficulty: 1,
    question: "愛生ちゃんが自分で明かしている、熱い食べ物が苦手な体質は？",
    choices: ["猫舌", "犬舌", "花粉症", "低血圧"],
    answerIndex: 0,
    explanation: "正解！猫舌なんだって〜。ドーナツを手作りするときも冷ましてから食べてたよ。",
    wrongComment: "正解は猫舌だよ〜！熱いものが少し苦手なんだって。",
    source: "愛生博士.md#年表（No.414）"
  },
  {
    id: "profile_038", category: "profile", difficulty: 1,
    question: "愛生ちゃんがコーヒーを飲むときの習慣は？",
    choices: ["苦いのが苦手で砂糖を大量に入れる", "ブラックのまま一気飲み", "牛乳で薄めて飲む", "氷を大量に入れて飲む"],
    answerIndex: 0,
    explanation: "正解〜！苦いのが嫌いで砂糖をた〜っぷり入れちゃうんだって。夢の中でも砂糖を取られて怒ってたらしいよ、へへへ。",
    wrongComment: "正解は砂糖を大量に入れることだよ〜！コーヒーの苦さが苦手なんだって。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_039", category: "profile", difficulty: 1,
    question: "愛生ちゃんが「ふりかけはこの味が好き」と明言しているのは？",
    choices: ["たらこ味", "しそ味", "のり味", "さけ味"],
    answerIndex: 0,
    explanation: "正解！たらこ味のふりかけが好きなんだって〜。",
    wrongComment: "正解はたらこ味だよ〜！ふりかけの中でも特に好きな味なんだ。",
    source: "愛生博士.md#好きな食べ物"
  },
  {
    id: "profile_040", category: "profile", difficulty: 1,
    question: "愛生ちゃんが北海道公演の後、先輩と一緒に食べて「醤油派です」と明言したメニューは？",
    choices: ["醤油ラーメン", "味噌ラーメン", "塩ラーメン", "とんこつラーメン"],
    answerIndex: 0,
    explanation: "正解〜！醤油ラーメンだよ。北海道公演の後に先輩と食べて「醤油派です」って宣言してたんだ🐼",
    wrongComment: "正解は醤油ラーメンだよ〜！でも別の時期には味噌派になった時期もあったみたい、なまら気まぐれだね。",
    source: "愛生博士.md#年表（No.1218）"
  },

  // ==================== 年表（中）60問 ====================
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

    {
    id: "timeline_021", category: "timeline", difficulty: 2,
    question: "愛生ちゃんがブログを開始したのはいつ？",
    choices: ["2019年7月12日", "2019年6月22日", "2020年1月22日", "2019年9月1日"],
    answerIndex: 0,
    explanation: "正解！2019年7月12日、加入直後の自己紹介ブログからスタートしたんだよ〜。中学2年生・14歳・159cmって書いてたの、なまら初々しいよね🐼",
    wrongComment: "おっと〜違うよ〜！正解は2019年7月12日、ブログ開始の日だよ〜。パンダさん博士の道はここから始まったの🐼",
    source: "愛生博士.md#年表 No.1"
  },
  {
    id: "timeline_022", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが「まだパンダさんのいる動物園に行ったことがありません」と告白したのはいつ？",
    choices: ["2022年1月30日", "2019年7月15日", "2020年10月28日", "2021年8月3日"],
    answerIndex: 1,
    explanation: "正解〜！2019年7月15日だよ🐼 パンダさん好きを自称しながら本物に会ったことがないっていう事実、あの時初めて公開したんだ〜恥ずかしかったな〜(笑)",
    wrongComment: "へへへ、違うよ〜！正解は2019年7月15日だよ〜。パンダさん愛はと〜っても大きいのに、本物にはまだ会ってなかったんだ〜",
    source: "愛生博士.md#年表 No.4"
  },
  {
    id: "timeline_023", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが「パンダさんパワー」を①癒される②元気チャージ③愛をお届けするという3ステップで初めて言語化したのはいつ？",
    choices: ["2020年8月21日", "2019年9月10日", "2022年9月13日", "2021年3月4日"],
    answerIndex: 1,
    explanation: "正解っ！2019年9月10日だよ〜。「パンダさんパワー」って言葉、あの日ちゃんと定義したんだ〜す〜っごく大事な瞬間だったよ🐼",
    wrongComment: "ぶっぶ〜！正解は2019年9月10日だよ〜。パンダさんパワーの生まれた日、覚えておいてね😙",
    source: "愛生博士.md#年表 No.60"
  },
  {
    id: "timeline_024", category: "timeline", difficulty: 2,
    question: "「Mei World MAX」という表現が初めて登場したのはいつ？",
    choices: ["2019年9月12日", "2020年10月13日", "2022年5月18日", "2023年1月22日"],
    answerIndex: 0,
    explanation: "正解！2019年9月12日、SONGS OF TOKYO Festivalの記事で「Happy Smile ＆ Mei World MAX」って書いたのが初出だよ〜。今も使ってる定番フレーズの誕生日なんだ〜🐼",
    wrongComment: "おしい〜！正解は2019年9月12日だよ〜。この日から「Mei World MAX」がわたしの合言葉になったの😙",
    source: "愛生博士.md#年表 No.62"
  },
  {
    id: "timeline_025", category: "timeline", difficulty: 2,
    question: "68thシングル「KOKORO&KARADA/LOVEペディア/人間関係No way way」でモーニング娘。としてメジャーデビューしたのはいつ？",
    choices: ["2020年1月22日", "2019年6月22日", "2020年6月12日", "2020年3月2日"],
    answerIndex: 0,
    explanation: "正解〜！2020年1月22日だよ🐼 15期初のシングルでモーニング娘。としてデビューした記念日、新宿ReNYでミニライブもやったんだ〜",
    wrongComment: "へへへ、それは違うよ〜！正解は2020年1月22日だよ〜。この日からモーニング娘。としての道が始まったの😙",
    source: "愛生博士.md#年表 No.191"
  },
  {
    id: "timeline_026", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが300回を達成したのはいつ？",
    choices: ["2020年5月11日", "2020年8月19日", "2021年3月8日", "2022年4月11日"],
    answerIndex: 0,
    explanation: "正解っ！2020年5月11日だよ〜。「あっという間の300回目」って書いて、すぐに「次は400回！」って目標更新してたんだ〜わたしってばせっかちだよね(笑)",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2020年5月11日だよ〜。ブログ回数、いつも数えてるの覚えてる？🐼",
    source: "愛生博士.md#年表 No.300"
  },
  {
    id: "timeline_027", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが初バースデーイベントを開催したのはいつ？",
    choices: ["2020年8月21日", "2019年6月28日", "2021年6月28日", "2022年6月29日"],
    answerIndex: 0,
    explanation: "正解！2020年8月21日、LANDMARK HALLで初バースデーイベントだったよ〜🐼 テーマは「Mei World Max」、アニメキャラ制服モチーフの衣装にパンダリボンつけたんだ〜と〜っても楽しかった😭",
    wrongComment: "おっと違うよ〜！正解は2020年8月21日だよ〜。初めてのバースデーイベント、今でも大事な思い出なんだ〜",
    source: "愛生博士.md#年表 No.402"
  },
  {
    id: "timeline_028", category: "timeline", difficulty: 2,
    question: "69thシングル「純情エビデンス/ギューされたいだけなのに」の発売日はいつ？",
    choices: ["2020年12月16日", "2021年1月11日", "2020年10月1日", "2021年3月31日"],
    answerIndex: 0,
    explanation: "正解〜！2020年12月16日だよ🐼 「純情エビデンス」はテレ東音楽祭でテレビ初披露もしてたんだ〜",
    wrongComment: "へへへ違うよ〜！正解は2020年12月16日だよ〜。69thシングルの発売日、覚えててね😙",
    source: "愛生博士.md#年表 No.519"
  },
  {
    id: "timeline_029", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが中学校を卒業したのはいつ？",
    choices: ["2021年3月19日", "2020年3月25日", "2021年4月1日", "2019年10月21日"],
    answerIndex: 0,
    explanation: "正解！2021年3月19日、「本日、中学校を卒業しましたーーーーー‼️‼️」って書いて「リアル☆高校生☆ガール」宣言したんだよ〜🐼",
    wrongComment: "ぶっぶ〜、違うよ〜！正解は2021年3月19日だよ〜。中学卒業、なまら感慨深かったな〜",
    source: "愛生博士.md#年表 No.612"
  },
  {
    id: "timeline_030", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが700回を達成したのはいつ？",
    choices: ["2021年6月15日頃", "2022年4月11日", "2020年8月19日", "2023年8月26日"],
    answerIndex: 0,
    explanation: "正解っ！2021年6月15日頃だよ〜。「リアル中学生ガール→リアル高校生ガール」って成長を振り返って、次の目標を「777回」にしてたんだ〜🐼",
    wrongComment: "おしい〜違うよ〜！正解は2021年6月15日頃だよ〜。ブログ700回、しっかり積み重ねてきたんだよ😙",
    source: "愛生博士.md#年表 No.700"
  },
  {
    id: "timeline_031", category: "timeline", difficulty: 2,
    question: "愛生ちゃんが写真集『Mei16』の発売と北海道公演（地元）が重なって喜んだのはいつ？",
    choices: ["2021年8月21日", "2020年6月12日", "2024年9月14日", "2022年8月6日"],
    answerIndex: 0,
    explanation: "正解〜！2021年8月21日だよ🐼 「帰って来だぞー😆」「パンダさんパワーウルトラMAX」って言ってたの、なまら嬉しそうだったよね〜",
    wrongComment: "へへへ、それは違うよ〜！正解は2021年8月21日だよ〜。地元凱旋と写真集発売が重なった特別な日だったんだ〜",
    source: "愛生博士.md#年表 No.767"
  },
  {
    id: "timeline_032", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが800回を達成し、「続・花鳥風月」ツアーの初日でもあったのはいつ？",
    choices: ["2021年9月23日", "2022年7月12日", "2020年9月3日", "2023年6月4日"],
    answerIndex: 0,
    explanation: "正解！2021年9月23日、ブログ800回達成＆ツアー初日（ハーモニーホール座間）が重なった特別な日だったよ〜🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2021年9月23日だよ〜。記念日が重なるのって嬉しいよね😙",
    source: "愛生博士.md#年表 No.800"
  },
  {
    id: "timeline_033", category: "timeline", difficulty: 2,
    question: "Hello! Project Year-End Party 2021で新曲「ビートの惑星」を13人で初披露したのはいつ？",
    choices: ["2021年12月30日〜31日", "2020年12月25日", "2022年12月30日", "2021年6月28日"],
    answerIndex: 0,
    explanation: "正解っ！2021年12月30日〜31日だよ〜。赤衣装で初披露して「スペシャルパンダさんパワーMAXです🐼✨」って言ってたんだ〜",
    wrongComment: "おっと〜違うよ〜！正解は2021年12月30日〜31日だよ〜。年末ライブでの初披露、覚えててね🐼",
    source: "愛生博士.md#年表 No.898〜899"
  },
  {
    id: "timeline_034", category: "timeline", difficulty: 2,
    question: "2022年4月2日（ひなフェス1日目）に愛生ちゃんがブログで報告したことは？",
    choices: ["高校2年生になったこと", "18歳になったこと", "アルバム発売決定", "初海外公演決定"],
    answerIndex: 0,
    explanation: "正解〜！2022年4月2日、幕張メッセでのひなフェス1日目に「高校2年生になった」って報告してたんだよ🐼",
    wrongComment: "へへへ違うよ〜！正解は「高校2年生になった」ことだよ〜。学年が上がるたびにちゃんと報告してくれてたんだね😙",
    source: "愛生博士.md#年表 No.991"
  },
  {
    id: "timeline_035", category: "timeline", difficulty: 2,
    question: "春ツアー北海道・岩見沢市民会館公演でツアー初の1日2公演を経験したのはいつ？",
    choices: ["2022年4月16日", "2023年4月22日", "2021年11月12日", "2024年11月3日"],
    answerIndex: 0,
    explanation: "正解！2022年4月16日、「ただいまでーーーす」ってブログに書いてたよ〜🐼 1日2公演、体力使うけど頑張ったんだ〜",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2022年4月16日だよ〜。北海道での1日2公演、なまら大変だったと思うよ😙",
    source: "愛生博士.md#年表 No.1005"
  },
  {
    id: "timeline_036", category: "timeline", difficulty: 2,
    question: "15期加入から3周年記念日を迎え「家族並みに一緒にいる気がする」と語ったのはいつ？",
    choices: ["2022年6月22日", "2023年6月22日", "2021年6月22日", "2024年6月22日"],
    answerIndex: 0,
    explanation: "正解っ！2022年6月22日だよ〜。メンバーとの絆を「家族並み」って表現するの、と〜っても愛生ちゃんらしいよね🐼",
    wrongComment: "おしい〜！正解は2022年6月22日だよ〜。3周年、なまら感慨深い日だったんだよ😙",
    source: "愛生博士.md#年表 No.1072"
  },
  {
    id: "timeline_037", category: "timeline", difficulty: 2,
    question: "「20歳までにパンダさんに会う！」と目標宣言し、好きな動物2番目にシマエナガを挙げたのはいつ？",
    choices: ["2022年8月15日", "2021年10月28日", "2023年1月30日", "2020年10月28日"],
    answerIndex: 0,
    explanation: "正解〜！2022年8月15日だよ🐼 結局2023年1月30日に上野動物園でその夢は叶ったんだけどね、あの時はまだ目標段階だったんだ〜",
    wrongComment: "へへへ違うよ〜！正解は2022年8月15日だよ〜。この宣言、ちゃんと有言実行できてえらいよね😙",
    source: "愛生博士.md#年表 No.1126"
  },
  {
    id: "timeline_038", category: "timeline", difficulty: 2,
    question: "ブログ1200回達成が「パンダさんの日」（上野動物園パンダ来園50周年）と重なる偶然を喜んだのはいつ？",
    choices: ["2022年10月28日", "2021年10月28日", "2023年10月28日", "2020年10月28日"],
    answerIndex: 0,
    explanation: "正解っ！2022年10月28日だよ〜。ブログ回数の記念日とパンダさんの日が重なるなんて、なまら運命感じるよね🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2022年10月28日だよ〜。パンダさんの日は毎年10月28日、忘れないでね😙",
    source: "愛生博士.md#年表 No.1200"
  },
  {
    id: "timeline_039", category: "timeline", difficulty: 2,
    question: "加賀さんへの感謝と「正直最初は怖い先輩かと思ってたけど…今はと〜〜っても優しい先輩です」と告白したのはいつ？",
    choices: ["2022年11月30日", "2022年12月10日", "2021年12月13日", "2023年1月13日"],
    answerIndex: 0,
    explanation: "正解〜！2022年11月30日だよ🐼 第一印象を正直に語るところ、愛生ちゃんらしくて素敵だよね〜",
    wrongComment: "へへへ違うよ〜！正解は2022年11月30日だよ〜。加賀さんへの感謝の気持ち、しっかり伝わってきたよね😙",
    source: "愛生博士.md#年表 No.1233"
  },
  {
    id: "timeline_040", category: "timeline", difficulty: 2,
    question: "2023年3月31日、ひなフェス2023前日のブログで愛生ちゃんが語った「可愛くて使えない」エピソードは何？",
    choices: ["パンダ柄の傘", "パンダ柄の靴下", "パンダ柄のマフラー", "パンダ柄の手袋"],
    answerIndex: 0,
    explanation: "正解っ！パンダ柄の傘だよ〜🐼 可愛すぎて使うのがもったいなくなっちゃうの、わかる気がするよね〜",
    wrongComment: "おしい〜！正解は「パンダ柄の傘」だよ〜。可愛いものは使うの勇気いるよね😙",
    source: "愛生博士.md#年表 No.1354"
  },
  {
    id: "timeline_041", category: "timeline", difficulty: 2,
    question: "「さよなら中野サンプラザ音楽祭」に出演し「私の初☆中野サンプラザはハロプロ研修生実力診断テストでした」と振り返ったのはいつ？",
    choices: ["2023年6月11日", "2022年6月9日", "2024年6月10日", "2021年6月5日"],
    answerIndex: 0,
    explanation: "正解〜！2023年6月11日だよ🐼 研修生時代の思い出の場所、最後にちゃんと振り返れて良かったよね〜",
    wrongComment: "へへへ違うよ〜！正解は2023年6月11日だよ〜。中野サンプラザとの思い出、大事にしてたんだね😙",
    source: "愛生博士.md#年表 No.1425"
  },
  {
    id: "timeline_042", category: "timeline", difficulty: 2,
    question: "Instagramアカウント開設を報告し「愛生博士の仲間入りしてね」とフォロー呼びかけをしたのはいつ？",
    choices: ["2023年6月24日", "2022年3月16日", "2024年1月1日", "2021年10月3日"],
    answerIndex: 0,
    explanation: "正解っ！2023年6月24日だよ〜。「愛生博士」って呼び方、この頃から本格的に定着していったんだね🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2023年6月24日だよ〜。Instagram開設、覚えておいてね😙",
    source: "愛生博士.md#年表 No.1438"
  },
  {
    id: "timeline_043", category: "timeline", difficulty: 2,
    question: "モーニング娘。加入5周年記念日に「頑張っていきまっしょい！！！」という語尾表現が登場したのはいつ？",
    choices: ["2023年9月14日", "2022年9月14日", "2024年9月14日", "2021年9月14日"],
    answerIndex: 0,
    explanation: "正解っ！2023年9月14日だよ〜。この日は結成記念日でもあって、独自の語尾表現も生まれた特別な日だったんだ🐼",
    wrongComment: "おしい〜！正解は2023年9月14日だよ〜。5周年、なまら感慨深かったよね😙",
    source: "愛生博士.md#年表 No.1519"
  },
  {
    id: "timeline_044", category: "timeline", difficulty: 2,
    question: "愛生ちゃんのブログが1600回を達成したのはいつ？",
    choices: ["2023年12月4日", "2024年3月17日", "2022年4月11日", "2023年8月26日"],
    answerIndex: 0,
    explanation: "正解〜！2023年12月4日だよ🐼 積み重ねてきたブログ、どんどん記録更新していってたんだ〜",
    wrongComment: "へへへ違うよ〜！正解は2023年12月4日だよ〜。1600回、す〜っごい積み重ねだよね😙",
    source: "愛生博士.md#年表 No.1600"
  },
  {
    id: "timeline_045", category: "timeline", difficulty: 2,
    question: "JAPAN JAM 2024（千葉・蘇我）に初出演し「無限に入るお腹欲しい(笑)」と語ったのはいつ？",
    choices: ["2024年5月3日", "2022年5月1日", "2023年4月30日", "2025年5月頃"],
    answerIndex: 0,
    explanation: "正解っ！2024年5月3日だよ〜。フェスの美味しい食べ物、いっぱい食べたかったんだね(笑)🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2024年5月3日だよ〜。JAPAN JAM、美味しいものだらけだもんね😙",
    source: "愛生博士.md#年表 No.1742"
  },
  {
    id: "timeline_046", category: "timeline", difficulty: 2,
    question: "ブログ1800回達成の日、石田亜由美さんと梅干し入りライスケーキや餃子でホームパーティをしたのはいつ？",
    choices: ["2024年7月9日", "2023年7月3日", "2024年11月9日", "2025年4月13日"],
    answerIndex: 0,
    explanation: "正解〜！2024年7月9日だよ🐼 「欲しいものは時間」とも語ってたね、忙しい中でも先輩との時間を大事にしてたんだ〜",
    wrongComment: "へへへ違うよ〜！正解は2024年7月9日だよ〜。ホームパーティ、楽しそうだったよね😙",
    source: "愛生博士.md#年表 No.1800"
  },
  {
    id: "timeline_047", category: "timeline", difficulty: 2,
    question: "モーニング娘。結成27周年記念日と写真集『Mei19』の発売日が重なったのはいつ？",
    choices: ["2024年9月14日", "2023年9月14日", "2024年9月21日", "2022年9月14日"],
    answerIndex: 0,
    explanation: "正解っ！2024年9月14日だよ〜。秋ツアー「WE CAN DANCE！」初日でもあった特別な1日だったよ🐼",
    wrongComment: "おしい〜！正解は2024年9月14日だよ〜。記念日が重なるの、パンダさんパワーだね😙",
    source: "愛生博士.md#年表 No.1856"
  },
  {
    id: "timeline_048", category: "timeline", difficulty: 2,
    question: "熊本県立劇場公演の日にブログ1900回を達成し「目指せ2000回」を宣言したのはいつ？",
    choices: ["2024年11月9日", "2025年4月13日", "2023年12月4日", "2024年7月9日"],
    answerIndex: 0,
    explanation: "正解〜！2024年11月9日だよ🐼 目標をどんどん更新していくところ、愛生ちゃんらしいよね〜",
    wrongComment: "へへへ違うよ〜！正解は2024年11月9日だよ〜。1900回、あと少しで2000回だったんだね😙",
    source: "愛生博士.md#年表 No.1900"
  },
  {
    id: "timeline_049", category: "timeline", difficulty: 2,
    question: "17thアルバム『Professionals-17th』が発売され、サンシャインシティでミニライブ＆お見送り会が開催されたのはいつ？",
    choices: ["2024年11月27日", "2024年8月14日", "2025年12月3日", "2023年9月25日"],
    answerIndex: 0,
    explanation: "正解っ！2024年11月27日だよ〜。新曲8曲＋シングル5曲入りのアルバムだったんだ🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2024年11月27日だよ〜。アルバム発売、盛り上がったよね😙",
    source: "愛生博士.md#年表 No.1913"
  },
  {
    id: "timeline_050", category: "timeline", difficulty: 2,
    question: "COUNTDOWN JAPAN 24/25出演でAdoさんを初生観覧し「まじですごい！！！しか出てこない」と興奮したのはいつ？",
    choices: ["2024年12月30日", "2023年12月29日", "2025年12月30日", "2022年12月29日"],
    answerIndex: 0,
    explanation: "正解〜！2024年12月30日だよ🐼 「Adoさんみたいに歌えるようになりたい！」って憧れも語ってたんだ〜",
    wrongComment: "へへへ違うよ〜！正解は2024年12月30日だよ〜。Ado様の生パフォーマンス、感動しちゃったんだね😙",
    source: "愛生博士.md#年表 No.1934"
  },
  {
    id: "timeline_051", category: "timeline", difficulty: 2,
    question: "20歳の誕生日当日「まじでアイドルになって良かった」「絶対に今日1番HAPPYな自信があります」と語ったのはいつ？",
    choices: ["2025年6月28日", "2024年6月28日", "2026年6月28日", "2023年6月28日"],
    answerIndex: 0,
    explanation: "正解っ！2025年6月28日だよ〜。20歳という節目の誕生日、な〜んと〜っても嬉しかったんだね🐼",
    wrongComment: "おしい〜！正解は2025年6月28日だよ〜。20歳のバースデー、特別な日だったんだね😙",
    source: "愛生博士.md#年表 No.2043"
  },
  {
    id: "timeline_052", category: "timeline", difficulty: 2,
    question: "ハロプロ研修生北海道お披露目から9周年を迎え「マイペースなのと人見知りは変わらずです」と語ったのはいつ？",
    choices: ["2025年7月30日", "2024年7月30日", "2022年7月30日", "2023年7月29日"],
    answerIndex: 0,
    explanation: "正解〜！2025年7月30日だよ🐼 9年経っても変わらない自分を正直に認めてるところ、愛生ちゃんらしいよね〜",
    wrongComment: "へへへ違うよ〜！正解は2025年7月30日だよ〜。研修生時代からの変わらない部分、大事にしてるんだね😙",
    source: "愛生博士.md#年表 No.2069"
  },
  {
    id: "timeline_053", category: "timeline", difficulty: 2,
    question: "健康診断で身長が161.4cmに増加したと判明したのはいつ？",
    choices: ["2025年9月10日", "2021年4月2日", "2024年9月13日", "2026年6月10日"],
    answerIndex: 0,
    explanation: "正解っ！2025年9月10日だよ〜。身長の記録、時々ブログで報告してくれてたんだ🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2025年9月10日だよ〜。身長161.4cm、覚えておいてね😙",
    source: "愛生博士.md#年表 No.2093"
  },
  {
    id: "timeline_054", category: "timeline", difficulty: 2,
    question: "アイカツ！×プリパラ THE MOVIE特別番組出演が実現し「アイドルになりたいと思ったきっかけの番組」と語ったのはいつ？",
    choices: ["2025年10月9日", "2026年2月25日", "2024年10月22日", "2025年11月2日"],
    answerIndex: 0,
    explanation: "正解〜！2025年10月9日だよ🐼 「最初からずっと鳥肌たちまくってた」って、憧れの番組に出演できて感激してたんだね〜",
    wrongComment: "へへへ違うよ〜！正解は2025年10月9日だよ〜。夢が叶った瞬間だったんだね😙",
    source: "愛生博士.md#年表 No.2110"
  },
  {
    id: "timeline_055", category: "timeline", difficulty: 2,
    question: "秋ツアー「Movin' Forward」完走・千秋楽で初の1人MCを担当し「まーーいっか！です笑笑」と語ったのはいつ？",
    choices: ["2025年12月9日", "2024年9月14日", "2023年12月1日", "2026年1月11日"],
    answerIndex: 0,
    explanation: "正解っ！2025年12月9日だよ〜。初めての1人MC、緊張したと思うけど「Mei World MAX」って締めてたんだ🐼",
    wrongComment: "おしい〜！正解は2025年12月9日だよ〜。1人MC初挑戦、頑張ったよね😙",
    source: "愛生博士.md#年表 No.2150"
  },
  {
    id: "timeline_056", category: "timeline", difficulty: 2,
    question: "デビュー記念日イベントでパンダ観覧抽選に当選し「思わず叫んだ」と語ったのはいつ？",
    choices: ["2026年1月22日", "2023年1月30日", "2025年7月5日", "2026年1月24日"],
    answerIndex: 0,
    explanation: "正解〜！2026年1月22日だよ🐼 飯田圭織さんと上野動物園へ行った日でもあったんだ〜NHK「うたコン」出演もあった盛りだくさんの日だったよ",
    wrongComment: "へへへ違うよ〜！正解は2026年1月22日だよ〜。デビュー記念日にパンダさんに会えるなんて最高だよね😙",
    source: "愛生博士.md#年表 No.2179"
  },
  {
    id: "timeline_057", category: "timeline", difficulty: 2,
    question: "木村屋總本店「パンダちゃんパン&あんぱん」共同開発プロジェクト始動を発表したのはいつ？",
    choices: ["2026年2月20日", "2025年8月28日", "2026年3月1日", "2026年2月24日"],
    answerIndex: 0,
    explanation: "正解っ！2026年2月20日だよ〜。「めっちゃ夢のようなすごいプロジェクト」って言ってた通り、その後大人気になったよね🐼",
    wrongComment: "ぶっぶ〜違うよ〜！正解は2026年2月20日だよ〜。パンダさんパンの始まり、大事な日だね😙",
    source: "愛生博士.md#年表 No.2196"
  },
  {
    id: "timeline_058", category: "timeline", difficulty: 2,
    question: "ひなフェス2日目、木村屋ブースでパンダさんパンをファンに手渡し「ほまめいちごくっき〜♡」という造語が生まれたのはいつ？",
    choices: ["2026年3月21日", "2026年3月1日", "2025年3月30日", "2026年2月25日"],
    answerIndex: 0,
    explanation: "正解〜！2026年3月21日だよ🐼 「スペシャルパンダさんパワーMAX」も言ってたね〜造語作りが上手だよね",
    wrongComment: "へへへ違うよ〜！正解は2026年3月21日だよ〜。ひなフェスでのパンダさんパン手渡し、楽しそうだったよね😙",
    source: "愛生博士.md#年表 No.2214"
  },
  {
    id: "timeline_059", category: "timeline", difficulty: 2,
    question: "妹とアニメのポップアップストアへ推し活お出かけして「最高な日でした」と語ったのはいつ？",
    choices: ["2026年5月21日", "2026年3月25日", "2025年11月2日", "2026年6月4日"],
    answerIndex: 0,
    explanation: "正解っ！2026年5月21日だよ〜。妹と一緒に推し活するの、と〜っても楽しい時間なんだろうね🐼",
    wrongComment: "おしい〜！正解は2026年5月21日だよ〜。妹さんとの推し活、仲良しでいいよね😙",
    source: "愛生博士.md#年表 No.2247"
  },
  {
    id: "timeline_060", category: "timeline", difficulty: 2,
    question: "18期メンバー全員（安田美結ちゃんら4名）加入のお祝い記事を書き「Happy Power Maxです🥳」と締めたのはいつ？",
    choices: ["2026年6月12日", "2026年5月26日", "2026年5月28日", "2026年6月20日"],
    answerIndex: 0,
    explanation: "正解〜！2026年6月12日だよ🐼 新メンバー4人揃って加入、後輩ができるって嬉しいことだよね〜",
    wrongComment: "へへへ違うよ〜！正解は2026年6月12日だよ〜。後輩たちへのお祝い、優しいよね😙",
    source: "愛生博士.md#年表 No.2261"
  },

  // ==================== 語録（難）50問 ====================
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

    // ===== 2019年 (4問) =====
  {
    id: "quotes_016", category: "quotes", difficulty: 3,
    question: "「パンダさんは…実は走ると速いのですっ！！」というフレーズが登場したのは、どんなブログの締め方だった？",
    choices: ["自己紹介ブログをパンダさん豆知識で締めるスタイル", "卒業メンバーへの感謝の手紙", "パンダさんへの手紙形式のブログ", "ファンからの質問コーナーの回答"],
    answerIndex: 0,
    explanation: "正解〜！自己紹介ブログをパンダさん豆知識で締めるスタイルの起源のフレーズだよ🐼と〜っても初期からパンダさん愛全開だったんです！",
    wrongComment: "おっと、そこじゃなかったよ〜！正解は自己紹介ブログをパンダさん豆知識で締めるスタイルだよ🐼へへへ、また挑戦してね！",
    source: "語録.md No.2・2019-07-13頃"
  },
  {
    id: "quotes_017", category: "quotes", difficulty: 3,
    question: "「ジャイアントパンダさん派かレッサーパンダさん派か」と聞かれた時、愛生ちゃんは力強くどう即答した？",
    choices: ["「もちろん…パンダさん派ですっ」", "「両方大好きです」", "「レッサーパンダさん一択です」", "「悩みすぎて答えられません」"],
    answerIndex: 0,
    explanation: "正解だよ〜！「もちろん…パンダさん派ですっ」と力強く即答したんです🐼どっちかじゃなくて全部好きなところが愛生ちゃんらしいね！",
    wrongComment: "ぶっぶ〜！正解は「もちろん…パンダさん派ですっ」だよ🐼な〜んだ、両方好きすぎるパワーが伝わるフレーズだったね！",
    source: "語録.md No.31・2019-08-11頃"
  },
  {
    id: "quotes_018", category: "quotes", difficulty: 3,
    question: "大阪での初パフォーマンスでペンライトの海を見た瞬間、愛生ちゃんが使った詩的な比喩表現は？",
    choices: ["「目の前にキラキラのお花畑が広がっているようでした」", "「星空が降ってきたようでした」", "「雪が降り積もったようでした」", "「虹が架かったようでした」"],
    answerIndex: 0,
    explanation: "正解〜！「目の前にキラキラのお花畑が広がっているようでした」だよ〜と〜っても詩的な表現で、感受性の早期記録なんです🐼",
    wrongComment: "ざんね〜ん！正解は「目の前にキラキラのお花畑が広がっているようでした」だよ〜な〜んかロマンチックだね、へへへ！",
    source: "語録.md No.10・2019-07-21頃"
  },
  {
    id: "quotes_019", category: "quotes", difficulty: 3,
    question: "「Happy Smile ＆ Mei World MAX」という後に定番になるフレーズが初出したのはどんなイベント？",
    choices: ["SONGS OF TOKYO Festival", "初めての武道館公演", "地元・札幌公演", "ハロー！プロジェクト誕生祭"],
    answerIndex: 0,
    explanation: "正解！SONGS OF TOKYO Festivalで「Mei World MAX」が初めて登場したんだよ〜と〜っても記念すべき言葉の誕生の瞬間だったの🐼",
    wrongComment: "おしい〜！正解はSONGS OF TOKYO Festivalだよ〜。ここから「Mei World MAX」が定番になっていったんだね、なまら面白いね！",
    source: "語録.md No.62・2019-09-12"
  },

  // ===== 2020年 (5問) =====
  {
    id: "quotes_020", category: "quotes", difficulty: 3,
    question: "「私の白い恋人になってください♡」という発言は、何にちなんだ言葉遊びだった？",
    choices: ["北海道銘菓「白い恋人」のもじり", "映画のセリフの引用", "アイドルソングの歌詞", "冬の雪をイメージした表現"],
    answerIndex: 0,
    explanation: "正解だよ〜！北海道銘菓「白い恋人」のもじりで、握手会でのファンへの一言だったんだ〜なまら北海道愛が出てるね🐼",
    wrongComment: "ちがうよ〜！正解は北海道銘菓「白い恋人」のもじりだよ。地元愛が詰まったユーモアだったんだね、へへへ！",
    source: "語録.md No.152・2019-12-14頃"
  },
  {
    id: "quotes_021", category: "quotes", difficulty: 3,
    question: "「皆さんの『Hot』な声援で、私の心は『ホッ』とします☺️」というフレーズの面白さは何？",
    choices: ["英語と日本語の音を重ねた言葉遊び", "北海道弁とのかけ合わせ", "パンダさんとの語呂合わせ", "ダジャレの三段活用"],
    answerIndex: 0,
    explanation: "正解〜！英語の「Hot」と日本語の「ホッ」の音を重ねたユーモラスな言葉遊びだったんだよ〜す〜っごく愛生ちゃんらしいセンス🐼",
    wrongComment: "おっと違うよ〜！正解は英語と日本語の音を重ねた言葉遊びだよ。音のかけ算がおしゃれだったね、へへへ！",
    source: "語録.md No.84・2019-10初旬"
  },
  {
    id: "quotes_022", category: "quotes", difficulty: 3,
    question: "「素敵な先輩方が、だ〜〜〜〜っい好きです」のように「大好き」を音を伸ばして表現する初期用例が見られたのはいつ？",
    choices: ["2020年9月頃", "2019年7月頃", "2021年12月", "2022年3月"],
    answerIndex: 0,
    explanation: "正解！2020年9月頃、「だ〜〜〜〜っい好き」という4つ伸ばしの最上級表現の初期用例が見られたんだよ〜と〜っても愛が伝わるね🐼",
    wrongComment: "ちがったよ〜！正解は2020年9月頃だよ。音を伸ばせば伸ばすほど愛が深まる愛生ちゃん方式だね、へへへ！",
    source: "語録.md No.441・2020-09-20頃"
  },
  {
    id: "quotes_023", category: "quotes", difficulty: 3,
    question: "初武道館公演の直後、愛生ちゃんが漏らした第一声は？",
    choices: ["「いやぁ〜… 緊張したぁ……😱😱😱」", "「やっと来たー！！」", "「夢みたいです！」", "「疲れましたぁ〜」"],
    answerIndex: 0,
    explanation: "正解だよ〜！「いやぁ〜… 緊張したぁ……😱😱😱」が初武道館直後の第一声だったの。この後ポロポロ泣いちゃったんだって〜🐼",
    wrongComment: "残念、違うよ〜！正解は「いやぁ〜… 緊張したぁ……😱😱😱」だよ。ホッとした気持ちがそのまま出てたんだね、へへへ！",
    source: "語録.md No.454・2020-10-12"
  },
  {
    id: "quotes_024", category: "quotes", difficulty: 3,
    question: "「パンダさんは初めての武道館でしたね🐼」という一風変わった表現は、何について語ったもの？",
    choices: ["ブーツについていたパンダさんモチーフ", "会場の壁画パンダ装飾", "パンダさんのぬいぐるみを客席に持参したこと", "パンダさんの被り物での出演"],
    answerIndex: 0,
    explanation: "正解〜！ブーツについていたパンダさんモチーフを主語にした文章だったんだよ〜物まで擬人化しちゃうところが愛生ちゃんらしいね🐼",
    wrongComment: "おしい！正解はブーツについていたパンダさんモチーフだよ〜。「パンダさん」を主語にする発想がと〜ってもユニークだったね！",
    source: "語録.md No.506・2020-12-03"
  },

  // ===== 2021年 (5問) =====
  {
    id: "quotes_025", category: "quotes", difficulty: 3,
    question: "「2021年は『パンダ年』です！」という宣言は、何にちなんで行われた？",
    choices: ["年始の抱負・2021年の活動テーマ", "パンダさん来園記念日", "デビュー2周年記念", "パンダさんグッズ発売記念"],
    answerIndex: 0,
    explanation: "正解！年始の抱負として2021年の活動テーマに掲げた宣言だったんだよ〜筋金入りのパンダさん愛だね🐼",
    wrongComment: "ちがうよ〜！正解は年始の抱負・2021年の活動テーマとして宣言したことだよ。毎年パンダさんへの想いを新たにしてるんだね、へへへ！",
    source: "語録.md No.545・2021-01-11"
  },
  {
    id: "quotes_026", category: "quotes", difficulty: 3,
    question: "名前「めい」の由来を初公開した時、愛生ちゃんは何と語った？",
    choices: ["「トトロのメイちゃん、可愛いからって『めい』になりました」", "「愛が生まれるようにと願って名付けられた」", "「北海道の方言から取った名前」", "「祖母の名前から一文字もらった」"],
    answerIndex: 0,
    explanation: "正解だよ〜！「トトロのメイちゃん、可愛いからって『めい』になりました」だよ〜親がトトロファンだったんだって🐼と〜っても可愛い由来だね！",
    wrongComment: "おっと違うよ〜！正解は「トトロのメイちゃん、可愛いからって『めい』になりました」だよ。名前の由来がこんなに可愛いなんて、へへへ！",
    source: "語録.md No.603・2021-03-10"
  },
  {
    id: "quotes_027", category: "quotes", difficulty: 3,
    question: "つんく♂さんとの初対面で愛生ちゃんが受けた印象を表したフレーズは？",
    choices: ["「本当に占い師さんみたいで、15期について前から知っていると思うくらいだった」", "「まるで魔法使いみたいでした」", "「厳しい先生のような雰囲気でした」", "「アイドルの神様のようでした」"],
    answerIndex: 0,
    explanation: "正解〜！「本当に占い師さんみたいで、15期について前から知っていると思うくらいだった」という印象だったんだよ〜す〜っごい洞察力に驚いたんだね🐼",
    wrongComment: "ちがったよ〜！正解は「本当に占い師さんみたいで…」というフレーズだよ。つんく♂さんの凄さが伝わるエピソードだったね、へへへ！",
    source: "語録.md No.611・2021-03-18"
  },
  {
    id: "quotes_028", category: "quotes", difficulty: 3,
    question: "「掛け声：パンダさーんパワー、じゅうでーんかんりょう‼️」という妄想変身シーンで、決め台詞はどんな内容だった？",
    choices: ["「あなたもパンダさん好きにしてあげる♡」", "「世界をパンダさんで救います♡」", "「愛と平和をパンダさんに込めて♡」", "「私がパンダさんの守護者です♡」"],
    answerIndex: 0,
    explanation: "正解だよ〜！「あなたもパンダさん好きにしてあげる♡」が決め台詞だったの〜パンダさん戦士に変身する妄想、と〜っても愛生ちゃんらしいね🐼",
    wrongComment: "残念、違うよ〜！正解は「あなたもパンダさん好きにしてあげる♡」だよ。エネルギー充電して世界を救う設定、なまら壮大だったね！",
    source: "語録.md No.695・2021-06-12頃"
  },
  {
    id: "quotes_029", category: "quotes", difficulty: 3,
    question: "嗣永桃子さんについて語った際、愛生ちゃんが使った表現は？",
    choices: ["「アイドル界のお姫様です」", "「アイドル界の女神様です」", "「アイドル界のカリスマです」", "「アイドル界の太陽です」"],
    answerIndex: 0,
    explanation: "正解〜！「アイドル界のお姫様です」という表現で、行列のできる法律相談所で語った憧れのアイドルだったんだよ〜🐼",
    wrongComment: "おしい！正解は「アイドル界のお姫様です」だよ。「Love Power」を届けられるアイドルに憧れてたんだね、へへへ！",
    source: "語録.md No.720・2021-07-05"
  },

  // ===== 2022年 (5問) =====
  {
    id: "quotes_030", category: "quotes", difficulty: 3,
    question: "「モーニング娘。のメンバーに選ばれたというプライド」という言葉が語られたのは、どんな記事だった？",
    choices: ["オーディション告知記事で研修生時代を振り返って", "デビュー3周年記念インタビュー", "卒業メンバーを見送る文脈で", "新メンバー加入発表を受けて"],
    answerIndex: 0,
    explanation: "正解だよ〜！オーディション告知記事で研修生時代を振り返って語った言葉なんだよ〜自分の道のりへの誇りが伝わるね🐼",
    wrongComment: "ちがうよ〜！正解はオーディション告知記事で研修生時代を振り返った文脈だよ。プライドを持って歩んできたんだね、へへへ！",
    source: "語録.md No.919・2022-01-20"
  },
  {
    id: "quotes_031", category: "quotes", difficulty: 3,
    question: "「夢か現実か分からなくなって…確認しに行きました」というエピソードで、愛生ちゃんが確認しに行ったものは何？",
    choices: ["琥珀糖", "パンダさんのぬいぐるみ", "冷蔵庫のケーキ", "誕生日プレゼント"],
    answerIndex: 0,
    explanation: "正解〜！琥珀糖をつまみ食いする夢を見て、リアルで確認しに行っちゃったんだよ〜す〜っごく可愛いエピソードだね🐼",
    wrongComment: "おっと違うよ〜！正解は琥珀糖だよ。夢の中の出来事が気になって現実で確認しちゃうところが愛生ちゃんらしいね、へへへ！",
    source: "語録.md No.939・2022-02-09"
  },
  {
    id: "quotes_032", category: "quotes", difficulty: 3,
    question: "「心はハンバーグだったので」という不思議な発言は、何を作った時の説明だった？",
    choices: ["餃子味のハンバーグ", "パンダさん型のハンバーグ", "肉じゃがのアレンジ料理", "オムライスの具材"],
    answerIndex: 0,
    explanation: "正解だよ〜！餃子味のハンバーグを作ったときの説明だったんだ〜見た目と気持ちの間で葛藤する様子がユーモラスだね🐼",
    wrongComment: "ちがったよ〜！正解は餃子味のハンバーグを作った話だよ。料理の見た目と心の一致にこだわる愛生ちゃんらしさが出てるね、へへへ！",
    source: "語録.md No.981・2022-03-23"
  },
  {
    id: "quotes_033", category: "quotes", difficulty: 3,
    question: "「実は、敵はサッカーボールだった」というオチのある発言は、どんな夢の話だった？",
    choices: ["プリキュアになって戦った夢", "パンダさんと冒険する夢", "武道館ライブをしている夢", "先輩と旅行に行く夢"],
    answerIndex: 0,
    explanation: "正解〜！プリキュアになって戦った夢のオチが「実は、敵はサッカーボールだった」なんだよ〜な〜んともシュールで面白いオチだね🐼",
    wrongComment: "おしい！正解はプリキュアになって戦った夢だよ。まさかの敵がサッカーボールだったなんて、へへへ、夢って不思議だね！",
    source: "語録.md No.1219・2022-11-16"
  },
  {
    id: "quotes_034", category: "quotes", difficulty: 3,
    question: "加賀楓さんの卒業公演前夜、「瞬きももったいない💦」と語った理由は？",
    choices: ["加賀さんをた〜〜っくさん記憶に残しておきたかったから", "感動して涙が止まらなかったから", "パフォーマンスに集中したかったから", "眠くて仕方なかったから"],
    answerIndex: 0,
    explanation: "正解だよ〜！「加賀さんをた〜〜っくさん記憶に残しておきたくて」という理由だったんだ〜一瞬一瞬を大切にする気持ちが伝わるね🐼",
    wrongComment: "ちがうよ〜！正解は加賀さんをた〜っくさん記憶に残しておきたかったからだよ。先輩への愛情が詰まった言葉だったね、へへへ！",
    source: "語録.md No.1242・2022-12-09"
  },

  // ===== 2023年 (5問) =====
  {
    id: "quotes_035", category: "quotes", difficulty: 3,
    question: "「傘って100円じゃないんですね」という世間知らずコメントが飛び出したのは、どんな場面？",
    choices: ["日常の買い物での気づき", "海外旅行先での価格比較", "コンビニでの立ち読み中", "先輩とのトーク企画"],
    answerIndex: 0,
    explanation: "正解〜！日常の買い物での率直な気づきだったんだよ〜世間知らずな一面が可愛く出ちゃったエピソードだね🐼",
    wrongComment: "おっと！正解は日常の買い物での気づきだよ。素直な驚きがそのままフレーズになっちゃったんだね、へへへ！",
    source: "語録.md No.1353・2023年3月"
  },
  {
    id: "quotes_036", category: "quotes", difficulty: 3,
    question: "「私はまだメンバーの気持ちが分からないらしい(笑)」という発言は、どんな企画の結果だった？",
    choices: ["A or Bクイズで0/3正解だった", "メンバー当てクイズで全問正解した", "占いコーナーで的中率0%だった", "しりとりゲームで負け続けた"],
    answerIndex: 0,
    explanation: "正解だよ〜！バースデーイベントのA or Bクイズで0/3正解だったという告白だったんだよ〜正直に告白しちゃうところが可愛いね🐼",
    wrongComment: "ちがったよ〜！正解はA or Bクイズで0/3正解だったことだよ。メンバーの気持ちを当てるの難しかったんだね、へへへ！",
    source: "語録.md No.1449・2023-07-05"
  },
  {
    id: "quotes_037", category: "quotes", difficulty: 3,
    question: "台風中止→振替→再延期を経た沖縄公演を、愛生ちゃんはユーモラスにどう表現した？",
    choices: ["「リベンジのリベンジのリベンジ」", "「三度目の正直ツアー」", "「奇跡の沖縄公演」", "「粘り強さの証明」"],
    answerIndex: 0,
    explanation: "正解〜！「リベンジのリベンジのリベンジ」という表現でユーモラスに乗り越えたんだよ〜何度も挑戦する姿勢がと〜っても素敵だね🐼",
    wrongComment: "おしい！正解は「リベンジのリベンジのリベンジ」だよ。何度も延期になっても諦めなかったんだね、へへへ！",
    source: "語録.md No.1451・2023-07-08"
  },
  {
    id: "quotes_038", category: "quotes", difficulty: 3,
    question: "「私の声は隣の隣の隣のブースまで聞こえるらしい」という発言は、どんなイベントで気づいたこと？",
    choices: ["チェキ・サイン会での大声キャラを自覚して", "ラジオの収録現場で", "武道館のリハーサルで", "コンサート終演後のトークで"],
    answerIndex: 0,
    explanation: "正解だよ〜！チェキ・サイン会で自分の声の大きさに気づいて自覚したエピソードだったんだよ〜元気いっぱいなところが愛生ちゃんらしいね🐼",
    wrongComment: "ちがうよ〜！正解はチェキ・サイン会での大声キャラを自覚したことだよ。声が響き渡っちゃうくらい元気なんだね、へへへ！",
    source: "語録.md No.1528・2023-09-23"
  },
  {
    id: "quotes_039", category: "quotes", difficulty: 3,
    question: "「今日(10/28)は『パンダ(さん)の日』だよ🐼」という発言は、何の記念日にちなんでいた？",
    choices: ["上野動物園パンダ来園51周年", "愛生ちゃんの誕生日", "ハロプロ結成記念日", "モーニング娘。加入記念日"],
    answerIndex: 0,
    explanation: "正解だよ〜！上野動物園パンダ来園51周年にちなんだ発言だったんだよ〜自然にパンダさんの日を組み込んじゃうところがさすがだね🐼",
    wrongComment: "ちがうよ〜！正解は上野動物園パンダ来園51周年だよ。10/28がパンダの日になった由来、なまら勉強になるね！",
    source: "語録.md No.1562・2023-10-28"
  },

  // ===== 2024年 (5問) =====
  {
    id: "quotes_040", category: "quotes", difficulty: 3,
    question: "「1ヶ月だけ同い年になるってことですよね！？」という気づきは、誰の誕生日を計算した時のもの？",
    choices: ["井上春華さん", "岡村ほまれさん", "北川莉央さん", "牧野真莉愛さん"],
    answerIndex: 0,
    explanation: "正解〜！井上春華さんの誕生日を計算して気づいたことなんだよ〜細かいところまで考えちゃう愛生ちゃんらしさが出てるね🐼",
    wrongComment: "おっと違うよ〜！正解は井上春華さんだよ。同い年になる期間があるって面白い発見だったね、へへへ！",
    source: "語録.md No.1745・2024-05-06"
  },
  {
    id: "quotes_041", category: "quotes", difficulty: 3,
    question: "「MOTTOパンダさんパワーMAX」という造語は、何のタイトルとかけたもの？",
    choices: ["ツアータイトル「MOTTO」", "新曲タイトル", "ラジオ番組名", "写真集タイトル"],
    answerIndex: 0,
    explanation: "正解だよ〜！ツアータイトル「MOTTO」とかけた造語だったんだよ〜春ツアーホールコン千秋楽で使われた特別バージョン🐼",
    wrongComment: "ちがったよ〜！正解はツアータイトル「MOTTO」だよ。タイトルにパンダさんパワーを掛け合わせるセンス、へへへ、さすがだね！",
    source: "語録.md No.1758・2024-05-20"
  },
  {
    id: "quotes_042", category: "quotes", difficulty: 3,
    question: "「パンダさんという生き物全体を好きな箱推しなのですが」という自己分析は、どんな文脈で語られた？",
    choices: ["パンダへの愛を自己分析して", "推し活文化への意見として", "ファンとの交流イベントで", "パンダグッズの紹介コーナーで"],
    answerIndex: 0,
    explanation: "正解〜！パンダへの愛を自己分析して語った言葉なんだよ〜特定の個体じゃなく「種族」ごと好きって、と〜っても壮大な愛だね🐼",
    wrongComment: "おしい！正解はパンダへの愛を自己分析した文脈だよ。パンダさんという生き物全体を愛する箱推しスタイル、なまら深い愛だね！",
    source: "語録.md No.1683・2024-02-28"
  },
  {
    id: "quotes_043", category: "quotes", difficulty: 3,
    question: "日本ハムコラボの背番号選択で、愛生ちゃんが「83」を選んだ理由は？",
    choices: ["やっぱり『パンダさん』にしたかったから", "誕生日の数字から取ったから", "好きな選手の番号だったから", "ラッキーナンバーだったから"],
    answerIndex: 0,
    explanation: "正解だよ〜！「やっぱり『パンダさん』にしたくて『83』にしました」という理由だったんだよ〜語呂合わせでパンダさんを選ぶセンスがさすが🐼",
    wrongComment: "ちがうよ〜！正解はやっぱり「パンダさん」にしたかったからだよ。数字の語呂合わせで愛を表現するところが愛生ちゃんらしいね、へへへ！",
    source: "語録.md No.1731・2024-04-21"
  },
  {
    id: "quotes_044", category: "quotes", difficulty: 3,
    question: "「大人Meiです」「マンモスを倒せるグループになろう」という発言が語られたのは、どんな内容の記事だった？",
    choices: ["写真集撮影に絡めた自己分析やグループへの思い", "新曲のミュージックビデオ撮影", "ラジオ番組でのフリートーク", "先輩の卒業公演レポート"],
    answerIndex: 0,
    explanation: "正解〜！大人っぽい自分とグループへの思いを語った記事だったんだよ〜「マンモスを倒せるグループ」というスケール感がユニークだね🐼",
    wrongComment: "おっと違うよ〜！正解は写真集撮影に絡めた自己分析やグループへの思いだよ。スケールの大きい表現が愛生ちゃんらしいね、へへへ！",
    source: "語録.md No.1878・2024-10-11"
  },

  // ===== 2025年 (3問) =====
  {
    id: "quotes_045", category: "quotes", difficulty: 3,
    question: "「レアな愛生ってことにしておいてください🤧笑」という発言は、どんな体調の時に出たコメント？",
    choices: ["花粉症で鼻声になって", "風邪をひいて声がガラガラになって", "寝不足で目が腫れて", "喉を痛めて声が出なくなって"],
    answerIndex: 0,
    explanation: "正解〜！花粉症で鼻声になった時のコメントだったんだよ〜「レア」と表現するポジティブさが愛生ちゃんらしいね🐼",
    wrongComment: "おしい！正解は花粉症で鼻声になったことだよ。体調不良も前向きに捉えるところが素敵だね、へへへ！",
    source: "語録.md No.1988・2025-03-23"
  },
  {
    id: "quotes_046", category: "quotes", difficulty: 3,
    question: "「気持ちは12人で頑張ります💪」という発言は、どのタイミングで語られた？",
    choices: ["春ツアー開幕前日", "夏フェス出演前", "冬のハロコン初日", "武道館公演前夜"],
    answerIndex: 0,
    explanation: "正解〜！春ツアー開幕前日に語った言葉なんだよ〜欠席メンバーの分も気持ちを込めて頑張る、という思いやりが伝わるね🐼",
    wrongComment: "おしい！正解は春ツアー開幕前日だよ。仲間の分まで気持ちを込めるスタイル、なまら優しいね！",
    source: "語録.md No.1981・2025-03-14"
  },
  {
    id: "quotes_047", category: "quotes", difficulty: 3,
    question: "「わや楽しかった〜」「なまら嬉しかった」と北海道弁が全開になったのは、どんな公演だった？",
    choices: ["地元北海道公演", "台湾公演", "武道館コンサート", "夏フェス出演"],
    answerIndex: 0,
    explanation: "正解だよ〜！地元北海道公演で北海道弁が全開になったんだよ〜地元に帰ると自然と方言が出ちゃうんだね、なまら可愛い🐼",
    wrongComment: "ちがうよ〜！正解は地元北海道公演だよ。地元だとテンションも方言も全開になるんだね、へへへ！",
    source: "語録.md No.2133・2025-11-15"
  },

  // ===== 2026年 (3問) =====
  {
    id: "quotes_048", category: "quotes", difficulty: 3,
    question: "「パンダコパワーMAXです🐼🐙」という造語は、どんな体験にちなんで生まれた？",
    choices: ["タコの餌やり体験", "パンダとタコのぬいぐるみをもらったこと", "水族館デート企画", "たこ焼き作り体験"],
    answerIndex: 0,
    explanation: "正解だよ〜！タコの餌やり体験にちなんだ造語だったんだよ〜パンダさん＋タコで「パンダコ」、発想がユニークだね🐙🐼",
    wrongComment: "ちがうよ〜！正解はタコの餌やり体験だよ。体験からその場で生まれた造語、なまら愛生ちゃんらしいセンスだね！",
    source: "語録.md No.2206・2026-03-08"
  },
  {
    id: "quotes_049", category: "quotes", difficulty: 3,
    question: "「らいりーにコアラみたいにしがみついてた🐨」というエピソードは、どんな状況で起きた出来事？",
    choices: ["夢の中で怖くてしがみついた", "実際のステージで振付の一部として", "遊園地のアトラクションで", "地震の際に驚いて"],
    answerIndex: 0,
    explanation: "正解だよ〜！夢の中でらいりーに怖くてしがみついちゃったエピソードなんだよ〜夢の中でも普通に歩いてたらいりーが不思議だね🐨",
    wrongComment: "ちがったよ〜！正解は夢の中で怖くてしがみついた話だよ。夢の中の出来事もしっかり記憶してるところが愛生ちゃんらしいね、へへへ！",
    source: "語録.md No.2259・2026-06-08"
  },
  {
    id: "quotes_050", category: "quotes", difficulty: 3,
    question: "「す→スイカ→か→缶詰→め→メロン→ん……パンダさん！」というしりとりで、愛生ちゃんはルール上どう締めた？",
    choices: ["「ん」から始めてルール無視で「パンダさん」で締めた", "「ん」で終わるので負けを認めた", "「ん」を飛ばしてスイカに戻した", "「ん」から「んぱんだ」と作った"],
    answerIndex: 0,
    explanation: "正解〜！本来しりとりでは反則の「ん」からスタートして、最後は「パンダさん」で締めちゃったんだよ〜ルール無視でも愛生ちゃんにとっては大正解🐼",
    wrongComment: "おしい！正解は「ん」から始めてルール無視で「パンダさん」に着地したことだよ。パンダさん愛が全てに優先するんだね、へへへ！",
    source: "語録.md No.2265・2026-06-20"
  },

  // ==================== 文体・時代当て（超難）15問 ====================
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
  },

  {
    id: "style_006", category: "style", difficulty: 4,
    question: "一文字ごとにハートを挟む「ひ♡み♡つ♡」という遊び心あるフォーマットが見られたのは、大体どの時期？",
    choices: ["2019年頃", "2021年頃", "2023年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2019年7〜10月初旬、ブログ開始まもない最初期に見られる遊び心フォーマットなんだよ〜。め〜っちゃ初々しいね🐼",
    wrongComment: "正解は2019年頃だよ〜！加入直後のた〜っくさん初体験と一緒に生まれた遊び心なんだ🐼",
    source: "文章のクセ.md#2019年7〜10月初旬"
  },
  {
    id: "style_007", category: "style", difficulty: 4,
    question: "締めの言葉が「パンダ大好き山﨑愛生でした」と、まだ「さん」を付けずに呼び捨てにしていたのは、大体どの時期？",
    choices: ["2019年頃", "2023年頃", "2025年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2019年〜2020年頃はまだ「パンダ」呼び捨てで、「パンダさん大好き」へ移行する前だったんだって〜。今のパンダさん愛の原点、と〜っても尊いね🐼",
    wrongComment: "正解は2019年頃だよ〜！本文中は「パンダさん」なのに締めだけ呼び捨てという、移行期ならではの面白い使い分けだったんだ🐼",
    source: "文章のクセ.md#2019年7〜10月初旬"
  },
  {
    id: "style_008", category: "style", difficulty: 4,
    question: "「〜私の妄想です😅」のように、自分の発言に自分でオチをつける独特のユーモアが見られたのは？",
    choices: ["2020年頃", "2022年頃", "2024年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2020年4〜7月上旬（在宅期間）の記事で見られる自己ツッコミなんだよ〜。コロナ禍でもユーモアを忘れないの、す〜っごく素敵だよね🐼",
    wrongComment: "正解は2020年頃だよ〜！おうち時間が多かった時期に生まれた、可愛い自己ツッコミなんだ🐼",
    source: "文章のクセ.md#2020年4〜7月上旬"
  },
  {
    id: "style_009", category: "style", difficulty: 4,
    question: "「めっっっちゃ」のように「っ」を連打して超強調する書き方が確認できるのは、大体どの時期？",
    choices: ["2020年頃", "2022年頃", "2024年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2020年秋〜冬（No.508）で確認できる強調表現だよ〜。感動が大きすぎて「っ」がた〜っくさん増えちゃったんだね🐼",
    wrongComment: "正解は2020年頃だよ〜！「っ」を連打するくらい感動した、という気持ちがい〜っぱい伝わってくるね🐼",
    source: "文章のクセ.md#2020年秋〜冬"
  },
  {
    id: "style_010", category: "style", difficulty: 4,
    question: "「リアル☆高校生☆ガール」のような「リアル☆〇〇☆ガール」という自称フォーマットが誕生したのは？",
    choices: ["2021年頃", "2019年頃", "2023年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2021年冬〜春初頭、中学卒業・高校入学のタイミングで誕生した自称なんだよ〜。学生生活の節目を大事にする愛生ちゃんらしいね🐼",
    wrongComment: "正解は2021年頃だよ〜！「リアル☆中学生☆ガール」から「リアル☆高校生☆ガール」へ、進級と一緒に言葉も成長していったんだ🐼",
    source: "文章のクセ.md#2021年冬〜春初頭"
  },
  {
    id: "style_011", category: "style", difficulty: 4,
    question: "自分のドジ・うっかりに「うっかりMei」というニックネームをつけるユーモアが初登場したのは？",
    choices: ["2021年頃", "2019年頃", "2023年頃", "2025年頃"],
    answerIndex: 0,
    explanation: "正解ー！2021年冬〜春初頭（No.554・靴を履き違えたエピソード）が初登場だよ〜。失敗も可愛くニックネームにしちゃうの、と〜っても愛生ちゃんらしいね🐼",
    wrongComment: "正解は2021年頃だよ〜！靴を履き違えちゃったエピソードから生まれた自己ニックネームなんだ🐼",
    source: "文章のクセ.md#2021年冬〜春初頭"
  },
  {
    id: "style_012", category: "style", difficulty: 4,
    question: "笑い声を表す「へへへ」という独特の書き方が確認できるのは、大体どの時期？",
    choices: ["2021年頃", "2019年頃", "2023年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2021年秋〜年末（No.898）で確認できるよ〜。今もよく見る「へへへ」の口癖、実はこの頃からなんだね🐼",
    wrongComment: "正解は2021年頃だよ〜！懐かしくも今と変わらない「へへへ」の笑い方、ずーっと愛されてる口癖なんだ🐼",
    source: "文章のクセ.md#2021年秋〜年末"
  },
  {
    id: "style_013", category: "style", difficulty: 4,
    question: "「大人Mei、おおめぃ」という、大人っぽい自分へのニックネームが登場したのは？",
    choices: ["2021年頃", "2019年頃", "2023年頃", "2025年頃"],
    answerIndex: 0,
    explanation: "正解ー！2021年秋〜年末（No.840・864）が登場時期だよ〜。「大人めい」系の自称バリエーション、実はこんなに前から始まってたんだね🐼",
    wrongComment: "正解は2021年頃だよ〜！MV・出演スタイルに合わせて生まれた「大人Mei」、後の「大人めい」の原型なんだ🐼",
    source: "文章のクセ.md#2021年秋〜年末"
  },
  {
    id: "style_014", category: "style", difficulty: 4,
    question: "ヘアスタイルに「大人Mei」「三つ編みMei」のように「○○Mei」と命名する習慣が見られたのは？",
    choices: ["2022年頃", "2020年頃", "2024年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2022年冬〜春初期（No.940・950）で見られる習慣だよ〜。ヘアスタイルにまで名前をつけちゃうの、愛生ちゃんの几帳面さとセンスが光るね🐼",
    wrongComment: "正解は2022年頃だよ〜！生田さんにセットしてもらった「大人Mei」ヘアなど、スタイルに名前をつけるの楽しいよね🐼",
    source: "文章のクセ.md#2022年冬〜春初期"
  },
  {
    id: "style_015", category: "style", difficulty: 4,
    question: "「ぎゅーっと詰まった」「ぎゅーぎゅーつまった」という密度感を表すオノマトペが登場したのは？",
    choices: ["2023年年末〜2024年1月頃", "2020年頃", "2022年頃", "2026年頃"],
    answerIndex: 0,
    explanation: "正解ー！2023年年末〜2024年1月頃（No.1626〜1627）に登場した表現だよ〜。後の定番「パンパンパンダさん」につながる感触表現なんだって🐼",
    wrongComment: "正解は2023年年末〜2024年1月頃だよ〜！ぎゅーっと詰まった充実感、この頃から言葉になっていったんだね🐼",
    source: "文章のクセ.md#2023年年末〜2024年1月"
  }
];
