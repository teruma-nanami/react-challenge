| カラム名          | データ型     | PRIMARY KEY | UNIQUE KEY | NOT NULL | 役割               |
| ----------------- | ------------ | ----------- | ---------- | -------- | ------------------ |
| id                | BIGINT       | 〇          |            | 〇       | 主キー（自動増分） |
| name              | VARCHAR(255) |             |            | 〇       | ユーザー名         |
| email             | VARCHAR(255) |             | 〇         | 〇       | ログイン ID        |
| password          | VARCHAR(255) |             |            | 〇       | パスワードハッシュ |
| email_verified_at | TIMESTAMP    |             |            |          | メール認証日時     |
| remember_token    | VARCHAR(100) |             |            |          | リメンバーミー機能 |
| created_at        | TIMESTAMP    |             |            | 〇       |                    |
| updated_at        | TIMESTAMP    |             |            | 〇       |                    |

| カラム名    | データ型    | PRIMARY KEY | UNIQUE KEY | NOT NULL | 役割                                                |
| ----------- | ----------- | ----------- | ---------- | -------- | --------------------------------------------------- |
| id          | BIGINT      | 〇          |            | 〇       | 主キー（自動増分）                                  |
| role_name   | VARCHAR(50) |             | 〇         | 〇       | 役割の名前（admin, user など）                      |
| permissions | JSON        |             |            | 〇       | その役割が持つ権限リスト（例: {"can_audit": true}） |
| description | TEXT        |             |            |          | 役割の説明（管理用）                                |
| created_at  | TIMESTAMP   |             |            | 〇       |                                                     |
| updated_at  | TIMESTAMP   |             |            | 〇       |                                                     |
