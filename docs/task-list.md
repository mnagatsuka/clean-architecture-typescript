以下は、あなたが指定した **`.clean-architecture-typescript/` ディレクトリ構成**に正確に対応させた、Clean Architectureに基づく実装手順の修正済みドキュメントです。

---

# 🚀 クリーンアーキテクチャ設計・実装手順

クリーンアーキテクチャをベースにアプリケーションを設計・実装する際は、「**責務の分離**」と「**依存の向きは常に内側へ**」という原則を守りながら、段階的に構築していくのが理想です。

以下に、学習・実装のためのタスクとステップを体系的に整理します。

---

## ✅ Step 1. ユースケースとドメインの把握

1. 要件整理と業務フローの理解（CRUDか業務処理か）
2. ユースケース（例：ユーザー登録、ログインなど）を洗い出す
3. ドメインモデル（Entity, ValueObject）を抽出

---

## ✅ Step 2. ディレクトリ構成と責務設計

現在の構成：

```
.clean-architecture-typescript/
├── entities/
│   └── user/
│       └── entity.ts
├── usecases/
│   └── user/
│       ├── usecase-interactor.ts
│       ├── input-boundary.ts
│       ├── input-data.ts
│       ├── output-boundary.ts
│       ├── output-data.ts
│       └── data-access-interface.ts
├── interface-adapters/
│   ├── controllers/
│   │   └── user/
│   │       └── controller.ts
│   ├── presenters/
│   │   └── user/
│   │       └── presenter.ts
│   └── gateways/
│       └── user/
│           ├── json-gateway.ts
│           ├── postgresql-gateway.ts
│           └── in-memory-gateway.ts
├── frameworks-drivers/
│   ├── database/
│   │   ├── postgresql/
│   │   │   ├── drizzle-client.ts
│   │   │   ├── schema/
│   │   │   │   └── user.schema.ts
│   │   │   ├── init.sql
│   │   │   └── Dockerfile
│   │   └── json/
│   │       ├── json-store.ts
│   │       └── Dockerfile
│   ├── web/
│   │   ├── react/
│   │   │   ├── public
│   │   │   ├── src/
│   │   │   │   ├── components/
│   │   │   │   │   └── UserCard.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useUser.ts
│   │   │   │   ├── pages/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── main.tsx
│   │   │   ├── .storybook/
│   │   │   ├── vite.config.ts
│   │   │   └── Dockerfile
│   │   └── next/
│   │       ├── app/
│   │       ├── components/
│   │       └── Dockerfile
│   └── api/
│       ├── hono/
│       │   ├── main.ts
│       │   ├── server.ts
│       │   ├── router.ts
│       │   ├── middleware/
│       │   │   └── error-handler.ts
│       │   └── Dockerfile
│       └── aws/
│           └── Dockerfile
├── test/
│   ├── unit/
│   │   ├── entities/
│   │   │   └── user/
│   │   │       └── entity.test.ts
│   │   ├── usecases/
│   │   │   └── user/
│   │   │       └── usecase.test.ts
│   │   └── frameworks-drivers/
│   │       └── web/
│   │           └── react/
│   │               ├── hooks/
│   │               │   └── useUser.test.ts
│   │               └── components/
│   │                   └── UserCard.test.tsx
│   ├── integration/
│   │   ├── interface-adapters/
│   │   │   └── gateways/
│   │   │       └── postgresql/
│   │   │           └── user/
│   │   │               └── integration.test.ts
│   │   └── frameworks-drivers/
│   │       └── web/
│   │           └── react/
│   │               └── user/
│   │                   └── integration.test.tsx
│   └── e2e/
│       ├── frameworks-drivers/
│       │   ├── api/
│       │   │   └── hono/
│       │   │       └── user/
│       │   │           └── e2e.test.ts
│       │   └── web/
│       │       └── react/
│       │           └── user/
│       │               └── e2e.test.ts
│       └── playwright.config.ts
├── shared/ #optional
│   ├── openapi/
│   │   └── schema.yaml
│   ├── generated/
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── client/
│   └── zod/
│       └── user/
│           ├── request.schema.ts
│           ├── response.schema.ts
│           └── index.ts
├── scripts/ #optional
│   ├── generate-types.ts
│   ├── generate-client.ts
│   └── generate-openapi.ts
└── docker-compose.yml
```

依存方向：

```
frameworks-drivers
    ↓
interface-adapters
    ↓
usecases
    ↓
entities
```

---

## ✅ Step 3. インターフェースの設計

* `usecases/user/data-access-interface.ts` に、リポジトリインターフェースなどを定義
* UseCase はこれに依存し、具体的なDB実装には依存しない

---

## ✅ Step 4. UseCase単位の実装とテスト

1. `input-boundary.ts`, `input-data.ts`, `output-boundary.ts`, `output-data.ts` を定義
2. `usecase-interactor.ts` を実装（ビジネスロジックの中心）
3. `entity.ts` と連携し、エラーハンドリングや値の整合性を担保
4. ユニットテストを `test/unit/usecases/user/usecase.test.ts` で実装

---

## ✅ Step 5. I/Oとの接続

* `controller.ts` で HTTPリクエストを受け取り、UseCaseに処理を依頼
* `presenter.ts` で出力データを整形してレスポンス形式に変換
* `gateways/` にて各DB（json, postgresqlなど）への接続処理を実装

---

## ✅ Step 6. Webフレームワークとサーバ起動

* `frameworks-drivers/api/hono/` にて Webサーバを構築

  * `main.ts`: アプリ起動エントリーポイント
  * `server.ts`: Honoアプリ構築
  * `router.ts`: ルーティング設定
  * `middleware/`: エラーハンドリングなど共通処理

* `frameworks-drivers/web/react/` にてUI実装（Reactなど）

---

## ✅ Step 7. 依存注入とDI構成

* **手動DIで十分（初期段階）**

  * `controller.ts` で `usecase` に `gateway` を直接注入
* 必要であれば DI ライブラリ（`tsyringe`, `inversify` など）で `container.ts` を導入

---

## ✅ Step 8. テスト方針と実装

* ユースケース：`test/unit/usecases/`（モック使用）
* ゲートウェイ：`test/integration/interface-adapters/gateways/`
* エンドツーエンド：`test/e2e/frameworks-drivers/api/hono/user/`

---

## ✅ Step 9. ドキュメント・運用整備

* `README.md`：設計概要、起動手順、依存関係、スキーマ情報など
* `docker-compose.yml`：PostgreSQLやjson-serverなどの依存サービスを定義
* 型・APIスキーマ管理は `shared/openapi/` や `shared/zod/` を導入するのも将来的に有効（学習後）

---

## ✅ タスク一覧（チェックリスト形式）

| カテゴリ      | タスク                                                      |
| --------- | -------------------------------------------------------- |
| 要件定義      | 🔲 ユースケース洗い出し<br>🔲 ドメインモデリング                            |
| ドメイン層     | 🔲 Entity実装<br>🔲 ValueObject検討                          |
| アプリケーション層 | 🔲 DTO定義（input/output）<br>🔲 UseCase実装<br>🔲 モックでユニットテスト |
| インターフェース層 | 🔲 Controller設計<br>🔲 Presenter実装<br>🔲 Gateway定義と実装     |
| インフラ層     | 🔲 Webサーバ設定（Hono）<br>🔲 DB（Drizzle/Postgres or JSON）の接続  |
| DI構成      | 🔲 UseCaseとGatewayの接続（手動 or DIライブラリ）                     |
| テスト       | 🔲 ユースケーステスト<br>🔲 DB統合テスト<br>🔲 E2Eテスト（必要に応じて）          |
| 実行・運用     | 🔲 `main.ts` による起動処理<br>🔲 Docker起動（DB含む）                |

