# Day6 学習記録

## chakra UI の導入

- プロパティ 'value' は型 '{ children: Element[]; }' にありませんが、型 'ChakraProviderProps' では必須です。エラー
- 解決方法は defaultSystem を利用することで回避
- しかし、React18 ～ 19 系と chakra 3 系はまだ色のバグが出ている
- 結局 chakra UI を断念し、tailwind CSS に移行した

## tailwind CSS の導入
- こちらもcopilotの言う通りにするとできず。
- 公式サイトで確認したところ、簡単にインストールできた
