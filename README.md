# React v18.0

西田の感想、主にパフォーマンス関連で新規アップデートがあったかなという印象

- `Server Components`はまだ開発中とのこと

## React18 の新機能

### Automatic Batching

```javascript
// Before: only React events were batched.
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);

// After: updates inside of timeouts, promises,
// native event handlers or any other event are batched.
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);
```

- Batching とは
  一回の再描画で複数の state を更新するよとのこと、パフォーマンスが良くなるらしい
  https://github.com/reactwg/react-18/discussions/21

- Automatic Batching とは
  デフォルトでこの処理が入っているっぽい

- もしバッチ処理をしたくなかったら？
  `flushSync`を使おう

```javascript
import { flushSync } from "react-dom"; // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f);
  });
  // React has updated the DOM by now
}
```

### Transitions

A transition とは急なアップデートとそうでないものを区別するための新しい React のコンセプト
uhyoさんの記事がわかりやすくておすすめ
[uhyoさんの記事](https://qiita.com/uhyo/items/6a3b14950c1ef6974024)
- Urgent updates
  - タイプする、クリックするなど直接的なインテラクション
    - ex.ハッカー飯のスレッド投稿画面

```javascript
import { startTransition } from "react";

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

- Transition updates

  - 別のビューに遷移する
    - ex.ハッカー飯の会員登録ボタン

- useTransition: a hook to start transitions, including a value to track the pending state.
  - https://reactjs.org/docs/hooks-reference.html#usetransition
- startTransition: a method to start transitions when the hook cannot be used.
  - https://reactjs.org/docs/react-api.html#starttransition

### Suspense の新しい機能

- transitionAPI を使うとめちゃパフォーマンス良くなりそう
- https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md

### Client and Server Rendering APIs

- `createRoot`
  - `ReactDOM.render`の代わり
- `hydrateRoot`
- `renderToPipeableStream`
  - node js で使おう
- `renderToReadableStream`
  - deno とかで使おう

### New Hooks

- useId
  - https://reactjs.org/docs/hooks-reference.html#useid
  - uuid っぽい雰囲気
- useTransition
  - https://reactjs.org/docs/hooks-reference.html#usetransition
  - 上記で書いた通り
- useDeferredValue
  - https://reactjs.org/docs/hooks-reference.html#usedeferredvalue
  - 古い値から新しい値に入れ替えるときに使う
  - 検索結果とかに使えそう
- useSyncExternalStore
  - https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore
  - ちょっとよくわからなかったが Redux ユーザーに嬉しい機能？
- useInsertionEffect
  - https://reactjs.org/docs/hooks-reference.html#useinsertioneffect
  - useEffect ほぼ同義だが DOM の変化前に発火するっぽい？
  - DOM の発火前にスタイルを適用する際に扱うべき

## 参考

- https://reactjs.org/blog/2022/03/29/react-v18.html
- https://softantenna.com/blog/react-18-released/
- https://qiita.com/uhyo/items/6a3b14950c1ef6974024
- https://github.com/reactwg/react-18/discussions/86
- https://zenn.dev/uhyo/books/react-concurrent-handson-2/viewer/use-starttransition
