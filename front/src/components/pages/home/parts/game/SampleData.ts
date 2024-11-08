import { GameLevelType } from '../../state/levelAtom'

export type SampleDataType = {
  id: string
  name: string
  level: GameLevelType
  dataset: {
    id: string
    question: string
    hiragana: string
  }[]
}

export const SampleData: SampleDataType[] = [
  {
    id: '1',
    name: '日常会話(日本語)',
    level: 'easy',
    dataset: [
      {
        id: '1',
        question: 'おはようございます',
        hiragana: 'おはようございます',
      },
      {
        id: '2',
        question: 'ありがとうございます',
        hiragana: 'ありがとうございます',
      },
      {
        id: '3',
        question: '今日は良い天気ですね',
        hiragana: 'きょうはよいてんきですね',
      },
      {
        id: '4',
        question: '初めまして、よろしくお願いします',
        hiragana: 'はじめまして、よろしくおねがいします',
      },
      {
        id: '5',
        question: '電車が遅れています',
        hiragana: 'でんしゃがおそれています',
      },
      {
        id: '6',
        question: '美味しいご飯を食べました',
        hiragana: 'おいしいごはんをたべました',
      },
      {
        id: '7',
        question: '週末は何をする予定ですか',
        hiragana: 'しゅうまつはなにをするようていですか',
      },
      {
        id: '8',
        question: '日本語を勉強しています',
        hiragana: 'にほんごをべんきょうしています',
      },
      {
        id: '9',
        question: '映画を見に行きませんか',
        hiragana: 'えいがをみにいきませんか',
      },
      {
        id: '10',
        question: '来週また会いましょう',
        hiragana: 'らいしゅうまたあいましょう',
      },
    ],
  },
  {
    id: '2',
    name: 'プログラミング専門用語',
    level: 'normal',
    dataset: [
      {
        id: '1',
        question: 'デザイン',
        hiragana: 'でざいん',
      },
      {
        id: '2',
        question: 'フレームワーク',
        hiragana: 'ふれーむわーく',
      },
      {
        id: '3',
        question: 'プログラミング',
        hiragana: 'ぷろぐらみんぐ',
      },
      {
        id: '4',
        question: 'データベース',
        hiragana: 'でーたべーす',
      },
    ],
  },
  {
    id: '3',
    name: '歴史上の出来事集',
    level: 'hard',
    dataset: [
      {
        id: '1',
        question: 'バビロンの滅び',
        hiragana: 'ばびろんのほろび',
      },
      {
        id: '2',
        question: '第二次世界大戦',
        hiragana: 'だいにじせかいたいせん',
      },
    ],
  },
]
