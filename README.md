# Zeta アプリ直行リンクメーカー v2

Zetaのプロット共有URLから、アプリ内の「プロット紹介画面」または「トーク画面」を直接開くリンクを生成する静的Webツールです。

## 対応状況

- iOS
  - プロット紹介画面: 実機で動作確認済み
  - トーク画面: 実機で動作確認済み
- Android
  - 未検証

## 変換形式

### iOS プロット紹介
`https://zeta-ai.app.link/beta/jp?$ios_deeplink_path=ja/plots/{PLOT_UUID}/profile`

### iOS トーク
`https://zeta-ai.app.link/beta/jp?$ios_deeplink_path=plots/{PLOT_UUID}`

### Android プロット紹介
`https://zeta-ai.app.link/beta/jp?$android_deeplink_path=ja/plots/{PLOT_UUID}/profile`

### Android トーク
`https://zeta-ai.app.link/beta/jp?$android_deeplink_path=plots/{PLOT_UUID}`

※ Androidは未検証です。
※ Zetaの非公開仕様に依存するため、今後の仕様変更で動作しなくなる可能性があります。
