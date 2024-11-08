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
  - ゲーム終了時の統計情報がうまく計算できていない
    - 結果の画面でキーボードをタイピングすると統計情報が更新されてしまう
    - 正確性の数値が適切に計算されない (0.0%になってしまう)
