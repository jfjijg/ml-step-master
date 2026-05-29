export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Slide = {
  title: string;
  content: string;
  points: string[];
  flow?: string[];
};

export type Exercise = {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  hint: string;
  starterCode: string;
  answerCode: string;
  requiredKeywords: string[];
};

export type Level = {
  id: string;
  order: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  topics: string[];
  slides: Slide[];
  exercises: Exercise[];
};

export const levels: Level[] = [
  {
    id: "level-1",
    order: 1,
    title: "データ理解と前処理",
    difficulty: "Beginner",
    description: "モデルに入れる前のデータを観察し、特徴量、ラベル、欠損値、分割の考え方をつかみます。",
    topics: ["機械学習の全体像", "データセット", "特徴量とラベル", "欠損値", "外れ値", "カテゴリ変数", "学習データとテストデータ"],
    slides: [
      {
        title: "機械学習の流れ",
        content: "機械学習は、データを集め、整え、モデルに学習させ、未知のデータで評価する一連の工程です。コードを書く前に、この流れを頭に入れると迷いにくくなります。",
        points: ["データ", "前処理", "学習", "評価"],
        flow: ["問題を決める", "データを確認する", "モデルを学習する", "結果を評価する"]
      },
      {
        title: "データセットとは",
        content: "データセットは、機械学習に使う表や画像などのまとまりです。表形式では、1行が1件のデータ、1列がそのデータの性質を表すことが多いです。",
        points: ["1行は1サンプル", "1列は1つの情報", "目的に合うデータか確認"]
      },
      {
        title: "特徴量とラベル",
        content: "特徴量は予測に使う材料、ラベルは予測したい答えです。家賃予測なら、駅からの距離や面積が特徴量、家賃がラベルになります。",
        points: ["特徴量は X", "ラベルは y", "予測したい列を明確にする"],
        flow: ["面積", "築年数", "駅距離", "家賃を予測"]
      },
      {
        title: "欠損値とは",
        content: "欠損値は、空欄や記録漏れなど、値が入っていない場所です。欠損値をそのままにすると、学習時にエラーになったり、結果が不安定になったりします。",
        points: ["まず数を確認", "削除か補完を選ぶ", "理由を残す"]
      },
      {
        title: "外れ値とカテゴリ変数",
        content: "外れ値は極端に大きい、または小さい値です。カテゴリ変数は、地域名や商品カテゴリのような文字の分類です。モデルに入れる前に扱いやすい形へ変換します。",
        points: ["外れ値は理由を見る", "カテゴリは数値化が必要", "One-Hot Encodingがよく使われる"]
      },
      {
        title: "前処理が重要な理由",
        content: "モデルは入力されたデータからしか学べません。データがずれていたり、欠損が多かったりすると、どれだけ強いモデルを使ってもよい結果は出にくくなります。",
        points: ["データ品質が結果を左右", "モデル前に整える", "前処理は実務で時間を使う工程"]
      },
      {
        title: "学習データとテストデータ",
        content: "モデルの実力を見るには、学習に使っていないデータで確認します。学習用とテスト用を分けることで、未知のデータに対応できるかを調べます。",
        points: ["学習用で覚える", "テスト用で確認", "分ける前に目的変数を決める"],
        flow: ["全データ", "学習データ", "モデル", "テストデータで評価"]
      }
    ],
    exercises: [
      {
        id: "level-1-ex-1",
        title: "CSVデータの読み込み",
        difficulty: "Beginner",
        description: "pandasを使って data.csv を読み込み、先頭5行を表示するコードを書いてください。",
        hint: "pd.read_csv で読み込み、df.head() で先頭5行を確認します。",
        starterCode: "# data.csv を読み込み、先頭5行を表示してください\n",
        answerCode: "import pandas as pd\n\ndf = pd.read_csv(\"data.csv\")\nprint(df.head())",
        requiredKeywords: ["import pandas", "read_csv", "head"]
      },
      {
        id: "level-1-ex-2",
        title: "欠損値の確認",
        difficulty: "Beginner",
        description: "データフレーム df に含まれる欠損値の数を列ごとに確認するコードを書いてください。",
        hint: "欠損値かどうかを isnull() で調べ、sum() で列ごとに数えます。",
        starterCode: "# df の欠損値数を列ごとに表示してください\n",
        answerCode: "print(df.isnull().sum())",
        requiredKeywords: ["isnull", "sum"]
      }
    ]
  },
  {
    id: "level-2",
    order: 2,
    title: "教師あり学習の基礎",
    difficulty: "Beginner",
    description: "回帰と分類の違い、代表的なモデル、学習と予測の流れを理解します。",
    topics: ["回帰と分類", "線形回帰", "ロジスティック回帰", "決定木", "モデルの学習", "予測の流れ"],
    slides: [
      {
        title: "教師あり学習とは",
        content: "教師あり学習は、入力データと正解ラベルのペアから関係を学ぶ方法です。過去の正解つきデータを使って、新しい入力の答えを予測します。",
        points: ["X と y のペア", "正解つきデータ", "新しいデータを予測"]
      },
      {
        title: "回帰と分類の違い",
        content: "回帰は売上や価格のような数値を予測します。分類は合格/不合格、迷惑メール/通常メールのようなカテゴリを予測します。",
        points: ["回帰は数値", "分類はカテゴリ", "目的でモデルを選ぶ"],
        flow: ["価格を予測", "回帰", "メール種別を予測", "分類"]
      },
      {
        title: "線形回帰",
        content: "線形回帰は、特徴量と数値ラベルの関係を直線的に表すモデルです。まず試す基準モデルとしても役立ちます。",
        points: ["数値予測", "関係を直線で近似", "解釈しやすい"]
      },
      {
        title: "ロジスティック回帰",
        content: "ロジスティック回帰は分類でよく使われる基本モデルです。名前に回帰とありますが、主にカテゴリを分けるために使います。",
        points: ["分類モデル", "確率を出せる", "基準モデルに向く"]
      },
      {
        title: "決定木",
        content: "決定木は、条件分岐を重ねて予測するモデルです。どの条件で分かれたかを追いやすく、初心者にも仕組みを理解しやすいモデルです。",
        points: ["条件分岐", "分類にも回帰にも使える", "過学習に注意"]
      },
      {
        title: "学習と予測の流れ",
        content: "モデルを作ったら fit で学習し、predict で予測します。scikit-learnでは多くのモデルが同じ流れで使えます。",
        points: ["model を作る", "fit で学習", "predict で予測"],
        flow: ["モデル作成", "fit(X_train, y_train)", "predict(X_test)", "予測結果"]
      }
    ],
    exercises: [
      {
        id: "level-2-ex-1",
        title: "学習データとテストデータの分割",
        difficulty: "Beginner",
        description: "X と y を、学習データとテストデータに分割するコードを書いてください。テストデータの割合は20%にしてください。",
        hint: "train_test_split(X, y, test_size=0.2, random_state=42) を使います。",
        starterCode: "from sklearn.model_selection import train_test_split\n\n# X と y を分割してください\n",
        answerCode: "from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)",
        requiredKeywords: ["train_test_split", "test_size=0.2"]
      },
      {
        id: "level-2-ex-2",
        title: "線形回帰モデルの学習",
        difficulty: "Beginner",
        description: "LinearRegressionを使って、学習データでモデルを学習してください。",
        hint: "モデルを作ってから model.fit(X_train, y_train) を呼びます。",
        starterCode: "from sklearn.linear_model import LinearRegression\n\n# モデルを作成し、学習してください\n",
        answerCode: "from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)",
        requiredKeywords: ["LinearRegression", "fit"]
      }
    ]
  },
  {
    id: "level-3",
    order: 3,
    title: "モデル評価",
    difficulty: "Intermediate",
    description: "分類と回帰で使う評価指標を学び、モデルの良し悪しを数字で説明できるようにします。",
    topics: ["過学習と未学習", "Accuracy", "Precision", "Recall", "F1-score", "混同行列", "MAE", "MSE", "RMSE", "R2"],
    slides: [
      {
        title: "評価は目的に合わせる",
        content: "モデル評価では、ただ正解率を見るだけでは足りないことがあります。分類か回帰か、どんな失敗が困るのかで指標を選びます。",
        points: ["目的から指標を選ぶ", "分類と回帰で指標が違う", "数字の意味を説明する"]
      },
      {
        title: "過学習と未学習",
        content: "過学習は学習データに合わせすぎる状態、未学習はパターンを十分に学べていない状態です。どちらも未知データでの性能を下げます。",
        points: ["過学習は覚えすぎ", "未学習は学び不足", "テスト性能を見る"]
      },
      {
        title: "Accuracy",
        content: "Accuracyは全体のうち正解した割合です。直感的ですが、クラスの偏りが大きいデータでは実力を見誤ることがあります。",
        points: ["全体の正解率", "わかりやすい", "偏りに注意"]
      },
      {
        title: "Precision / Recall / F1-score",
        content: "Precisionは陽性と予測した中の正しさ、Recallは本当の陽性を拾えた割合です。F1-scoreはそのバランスを見る指標です。",
        points: ["Precisionは予測の慎重さ", "Recallは見逃しにくさ", "F1はバランス"]
      },
      {
        title: "混同行列",
        content: "混同行列は、正解と予測の組み合わせを表にしたものです。どのクラスをどのクラスと間違えたかを具体的に確認できます。",
        points: ["間違い方が見える", "分類の改善に役立つ", "クラスごとの弱点を探す"]
      },
      {
        title: "回帰の評価指標",
        content: "MAEは誤差の絶対値平均、MSEは大きな誤差を重く見る指標、RMSEはMSEの平方根です。R2はどれくらい説明できているかを見ます。",
        points: ["MAEは平均的なズレ", "MSE/RMSEは大きな誤差に敏感", "R2は説明力"]
      }
    ],
    exercises: [
      {
        id: "level-3-ex-1",
        title: "正解率の計算",
        difficulty: "Intermediate",
        description: "分類モデルの予測結果 y_pred と正解ラベル y_test を使って、正解率を計算してください。",
        hint: "sklearn.metrics から accuracy_score を読み込みます。",
        starterCode: "# y_test と y_pred から正解率を計算してください\n",
        answerCode: "from sklearn.metrics import accuracy_score\n\naccuracy = accuracy_score(y_test, y_pred)\nprint(accuracy)",
        requiredKeywords: ["accuracy_score"]
      },
      {
        id: "level-3-ex-2",
        title: "平均二乗誤差の計算",
        difficulty: "Intermediate",
        description: "回帰モデルの予測結果 y_pred と正解値 y_test を使って、MSEを計算してください。",
        hint: "mean_squared_error(y_test, y_pred) の形で計算します。",
        starterCode: "# y_test と y_pred から MSE を計算してください\n",
        answerCode: "from sklearn.metrics import mean_squared_error\n\nmse = mean_squared_error(y_test, y_pred)\nprint(mse)",
        requiredKeywords: ["mean_squared_error"]
      }
    ]
  },
  {
    id: "level-4",
    order: 4,
    title: "特徴量エンジニアリング",
    difficulty: "Intermediate",
    description: "モデルが学びやすくなるように特徴量を作り、変換し、不要な情報を整理します。",
    topics: ["特徴量の作り方", "標準化", "正規化", "One-Hot Encoding", "不要な特徴量の削除", "相関の確認"],
    slides: [
      {
        title: "特徴量エンジニアリングとは",
        content: "特徴量エンジニアリングは、データから予測に役立つ情報を作ったり、モデルが扱いやすい形へ変換したりする工程です。",
        points: ["予測に役立つ列を作る", "扱いやすく変換する", "不要な列を減らす"]
      },
      {
        title: "特徴量を作る",
        content: "日付から曜日を作る、購入金額から平均単価を作るなど、元の列を組み合わせると予測に役立つ特徴量が生まれることがあります。",
        points: ["ドメイン知識を使う", "元データを組み合わせる", "リークに注意"]
      },
      {
        title: "標準化",
        content: "標準化は、平均を0、標準偏差を1に近づける変換です。距離や係数の影響を受けるモデルで特に役立ちます。",
        points: ["平均0", "標準偏差1", "StandardScaler"]
      },
      {
        title: "正規化",
        content: "正規化は、値の範囲を0から1などにそろえる変換です。特徴量ごとのスケール差を小さくできます。",
        points: ["範囲をそろえる", "MinMaxScaler", "外れ値の影響に注意"]
      },
      {
        title: "One-Hot Encoding",
        content: "カテゴリ変数を0と1の列に変換する方法です。地域や職種のような文字列を、多くのモデルで扱える形にできます。",
        points: ["カテゴリを数値化", "0/1の列に分ける", "列が増えすぎる場合に注意"]
      },
      {
        title: "相関と不要な特徴量",
        content: "強く似た情報を持つ列や、予測に関係しない列は、モデルを不安定にすることがあります。相関や重要度を見ながら整理します。",
        points: ["相関を見る", "不要列を削る", "説明しやすさも大切"]
      }
    ],
    exercises: [
      {
        id: "level-4-ex-1",
        title: "標準化",
        difficulty: "Intermediate",
        description: "StandardScalerを使って、特徴量 X を標準化してください。",
        hint: "scaler = StandardScaler() を作り、fit_transform(X) を使います。",
        starterCode: "from sklearn.preprocessing import StandardScaler\n\n# X を標準化してください\n",
        answerCode: "from sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)",
        requiredKeywords: ["StandardScaler", "fit_transform"]
      },
      {
        id: "level-4-ex-2",
        title: "One-Hot Encoding",
        difficulty: "Intermediate",
        description: "pandasの get_dummies を使って、カテゴリ変数をOne-Hot Encodingしてください。",
        hint: "pd.get_dummies(df) でカテゴリ列を0/1列へ変換できます。",
        starterCode: "# df を One-Hot Encoding してください\n",
        answerCode: "df_encoded = pd.get_dummies(df)",
        requiredKeywords: ["get_dummies"]
      }
    ]
  },
  {
    id: "level-5",
    order: 5,
    title: "教師なし学習",
    difficulty: "Advanced",
    description: "正解ラベルがないデータから、似たグループや低次元の構造を見つける方法を学びます。",
    topics: ["教師なし学習", "クラスタリング", "k-means", "PCA", "次元削減", "データの可視化"],
    slides: [
      {
        title: "教師なし学習とは",
        content: "教師なし学習は、正解ラベルなしのデータから構造を探す方法です。ユーザーのグループ分けやデータの可視化でよく使われます。",
        points: ["正解ラベルなし", "構造を探す", "探索的に使う"]
      },
      {
        title: "クラスタリング",
        content: "クラスタリングは、似ているデータ同士をグループに分ける方法です。結果のグループ名は人間が意味づけする必要があります。",
        points: ["似たものをまとめる", "グループ数を考える", "解釈が必要"]
      },
      {
        title: "k-means",
        content: "k-meansは、指定した数のクラスタにデータを分ける代表的な手法です。距離をもとに近い点を同じグループにします。",
        points: ["n_clustersを指定", "距離で分ける", "スケール調整が重要"]
      },
      {
        title: "PCA",
        content: "PCAは、多くの特徴量を少ない軸に圧縮する次元削減の手法です。情報をなるべく残しながら、見やすく扱いやすい形にします。",
        points: ["次元削減", "情報を圧縮", "可視化に便利"]
      },
      {
        title: "データの可視化",
        content: "教師なし学習の結果は、散布図などで確認すると理解しやすくなります。PCAで2次元にしてから色分けする流れがよく使われます。",
        points: ["2次元で見る", "クラスタごとに色分け", "外れた点にも注目"]
      },
      {
        title: "結果を決めつけない",
        content: "教師なし学習の結果は、あくまでデータの見方のひとつです。業務知識や追加分析と合わせて、意味がある分け方か確認します。",
        points: ["探索の出発点", "意味づけが必要", "複数条件で確認"]
      }
    ],
    exercises: [
      {
        id: "level-5-ex-1",
        title: "k-meansクラスタリング",
        difficulty: "Advanced",
        description: "KMeansを使って、データを3つのクラスタに分けるコードを書いてください。",
        hint: "KMeans(n_clusters=3, random_state=42) を作り、fit_predict(X) を使います。",
        starterCode: "from sklearn.cluster import KMeans\n\n# X を3つのクラスタに分けてください\n",
        answerCode: "from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3, random_state=42)\nlabels = kmeans.fit_predict(X)",
        requiredKeywords: ["KMeans", "n_clusters=3", "fit_predict"]
      },
      {
        id: "level-5-ex-2",
        title: "PCAによる次元削減",
        difficulty: "Advanced",
        description: "PCAを使って、データを2次元に圧縮してください。",
        hint: "PCA(n_components=2) を作り、fit_transform(X) します。",
        starterCode: "from sklearn.decomposition import PCA\n\n# X を2次元に圧縮してください\n",
        answerCode: "from sklearn.decomposition import PCA\n\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X)",
        requiredKeywords: ["PCA", "n_components=2", "fit_transform"]
      }
    ]
  },
  {
    id: "level-6",
    order: 6,
    title: "実践プロジェクト",
    difficulty: "Advanced",
    description: "問題設定から結果説明まで、機械学習プロジェクト全体をひとつの流れとして組み立てます。",
    topics: ["問題設定", "データ収集", "前処理", "モデル作成", "評価", "改善", "結果の説明"],
    slides: [
      {
        title: "問題設定",
        content: "最初に、何を予測したいのか、予測結果をどう使うのかを決めます。ここが曖昧だと、モデルの評価や改善の方向も曖昧になります。",
        points: ["目的変数を決める", "使い道を明確にする", "成功条件を置く"]
      },
      {
        title: "データ収集",
        content: "必要なデータがそろっているか、量や期間に偏りがないかを確認します。実務では、使えるデータを見て問題設定を調整することもあります。",
        points: ["必要な列を確認", "期間や偏りを見る", "利用条件を守る"]
      },
      {
        title: "前処理",
        content: "欠損値、外れ値、カテゴリ変数、スケールを整えます。前処理はモデル性能だけでなく、後から再現できるかにも関わります。",
        points: ["欠損値処理", "カテゴリ変換", "再現できる手順にする"]
      },
      {
        title: "モデル作成と学習",
        content: "まずはシンプルなモデルで基準性能を作ります。その後、必要に応じて複雑なモデルや特徴量改善を試します。",
        points: ["基準モデル", "fitで学習", "比較しながら改善"]
      },
      {
        title: "評価と改善",
        content: "評価指標を見て、どこで失敗しているかを確認します。データ、特徴量、モデル、パラメータのどこを直すべきか考えます。",
        points: ["指標を見る", "失敗例を見る", "改善案を試す"]
      },
      {
        title: "結果の説明",
        content: "モデルの結果は、数字だけでなく、何ができて何が苦手かまで説明します。使う人が判断できる形にまとめることが大切です。",
        points: ["性能を説明", "限界も伝える", "次の改善につなげる"],
        flow: ["問題", "データ", "モデル", "評価", "説明"]
      }
    ],
    exercises: [
      {
        id: "level-6-ex-1",
        title: "機械学習の流れをコードで整理",
        difficulty: "Advanced",
        description: "データ読み込み、前処理、分割、モデル作成、学習、予測、評価の流れが分かるように、コメント付きでコードの骨組みを書いてください。",
        hint: "read_csv、train_test_split、fit、predict、accuracy_score または mean_squared_error を含めます。",
        starterCode: "# 機械学習プロジェクトの流れをコードで整理してください\n",
        answerCode: "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\n# 1. データ読み込み\ndf = pd.read_csv(\"data.csv\")\n\n# 2. 前処理\nX = df.drop(\"target\", axis=1)\ny = df[\"target\"]\n\n# 3. 学習データとテストデータの分割\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# 4. モデル作成\nmodel = LogisticRegression()\n\n# 5. 学習\nmodel.fit(X_train, y_train)\n\n# 6. 予測\ny_pred = model.predict(X_test)\n\n# 7. 評価\nscore = accuracy_score(y_test, y_pred)\nprint(score)",
        requiredKeywords: ["read_csv", "train_test_split", "fit", "predict", "accuracy_score"]
      },
      {
        id: "level-6-ex-2",
        title: "改善案を書く",
        difficulty: "Advanced",
        description: "モデルの精度を改善するために考えられる方法を、コメントで3つ書いてください。",
        hint: "データ、特徴量、モデル、パラメータ、前処理のどれかに触れるとよいです。",
        starterCode: "# 改善案1:\n# 改善案2:\n# 改善案3:\n",
        answerCode: "# 改善案1: 欠損値や外れ値の処理を見直す\n# 改善案2: 新しい特徴量を作成する\n# 改善案3: ランダムフォレストなど別のモデルを試す",
        requiredKeywords: ["改善案", "特徴量", "モデル"]
      }
    ]
  }
];

export const totalProgressItems = levels.reduce(
  (sum, level) => sum + 1 + level.slides.length + level.exercises.length,
  0
);

export function getLevel(levelId: string) {
  return levels.find((level) => level.id === levelId);
}
