# typingGame

## 基本構成
AWSを活用したサーバレスアーキテクチャ
- design
  - Requirements > [Notion](https://www.notion.so/ja/templates/category/product-requirements-doc)
    - [参考](https://qiita.com/muraki13/items/3acdfb694cffa30b0f28)
  - UI/UX > [Figma](https://www.figma.com/design/G15Ky4K2VjpGUfqYCopJKO/Portfolio-(SatoTetsuya)?node-id=0-1&t=wCFdjDoeItih3Z42-1)
- front
  - Coding > Next.js (SSG), TypeScript, JavaScript, HTML, CSS
  - Hosting > S3 + Cloudfront + Route53 + ACM
- backend
  - Coding > Node.js, TypeScript, JavaScript
  - API > Lambda + API-Gateway + Route53 + ACM
  - DB > Notion
- infra
  - Code > Terraform
  - Provider > AWS

## ToDo
- フロント
  - ゲーム画面
    - 該当するローマ字を表示
    - タイピング速度の計算ロジックを正答したひらがなではなくローマ字とする
  - データ登録画面
    - 実装全般
  - リファクタリング
    - コンポーネント分割
    - ファイル分割
    - コードの整理

  
