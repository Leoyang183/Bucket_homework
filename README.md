# Bucket Homework

這是一個基於 Sui 區塊鏈的前後端分離專案，使用 Docker Compose 進行容器化部署。

### Backend

- **Node.js**: 24.12
- **Express**: 5.2.1
- **TypeScript**: 5.9.3
- **架構模式**: DDD (Domain-Driven Design)

### Frontend

- **Node.js**: 24.12
- **Next.js**: 16.1.1
- **React**: 19.2.3
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.18
- **UI 組件**: shadcn/ui
- **Sui SDK**: @mysten/dapp-kit, @mysten/sui

## 📦 環境需求

在開始之前，請確保您的系統已安裝以下工具：

- **Docker**: 20.10 或更高版本
- **Docker Compose**: 2.0 或更高版本

### 檢查 Docker 安裝

```bash
# 檢查 Docker 版本
docker --version

# 檢查 Docker Compose 版本
docker-compose --version
```

如果尚未安裝，請參考 [Docker 官方文件](https://docs.docker.com/get-docker/) 進行安裝。

## 🚀 快速開始

### 1. 複製專案

```bash
git clone <repository-url>
cd Bucket_homework
```

### 2. 啟動服務

使用 Docker Compose 啟動所有服務：

```bash
docker-compose up -d --build
```

### 3. 停止服務

```bash
# 停止服務
docker-compose stop

# 停止並移除容器
docker-compose down

```

## ⚙️ 環境變數設定

### Backend 環境變數

| 變數名稱       | 說明                  | 預設值                  | 必填 |
| -------------- | --------------------- | ----------------------- | ---- |
| `FRONTEND_URL` | 前端網址（用於 CORS） | `http://localhost:3000` | 否   |

### Frontend 環境變數

Frontend 目前不需要額外的環境變數設定。

## 🔧 開發流程

### 使用 Docker Compose 開發

1. **啟動開發環境**：

   ```bash
   docker-compose up --build
   ```

2. **修改程式碼**：

   - Backend 程式碼位於 `backend/src/`
   - Frontend 程式碼位於 `frontend/app/` 和 `frontend/components/`

3. **重新建置容器**（當 package.json 變更時）：

   ```bash
   docker-compose up --build
   ```

4. **查看即時日誌**：
   ```bash
   docker-compose logs -f
   ```

### 專案結構

```
Bucket_homework/
├── backend/
│   ├── src/
│   │   ├── Domain/             # 領域模型（DDD）
│   │   │   └── ValueObject/    # 值物件
│   │   ├── Service/            # 服務層
│   │   └── UseCase/            # 用例層
│   ├── index.ts                # 應用程式入口
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React 組件
│   ├── lib/                    # 工具函數
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 📡 API 端點

### Base URL

```
http://localhost:5487
```

### 端點列表

#### 1. 健康檢查

- **URL**: `GET /`
- **說明**: 檢查後端服務是否正常運行
- **回應**:
  ```json
  "Hello World!"
  ```

#### 2. 檢查地址資產

- **URL**: `GET /checkAddressAsset`
- **參數**:
  - `address` (query string, 必填): Sui 地址
- **範例**:
  ```bash
  curl "http://localhost:5487/checkAddressAsset?address=0x123..."
  ```
- **成功回應** (200):
  ```json
  {
    "address": "0x123...",
    "suiBalance": "123",
    "tokens": [
      {
        "coinType": "0x2::sui::SUI",
        "balance": "287.369086409"
      }
    ]
  }
  ```
- **錯誤回應**:
  - `400`: 缺少地址參數或地址格式錯誤
  - `500`: 伺服器內部錯誤

#### 3. 取得 Sui Testnet Admin 餘額

- **URL**: `GET /getSuiTestnetAdminBalance`
- **說明**: 取得 Sui Testnet 管理員帳戶餘額
- **範例**:
  ```bash
  curl "http://localhost:5487/getSuiTestnetAdminBalance"
  ```
- **成功回應** (200):
  ```json
  {
    "admin": "0x123...",
    "id": "0x456.....",
    "balance": "0.087"
  }
  ```

## 🌐 測試網址

### 前端應用

- **開發環境**: http://localhost:3000
- **Story 1**: http://localhost:3000/story1
- **Story 2**: http://localhost:3000/story2
- **Story 3**: http://localhost:3000/story3
- **Story 4**: http://localhost:3000/story4

### 後端 API

- **Base URL**: http://localhost:5487
- **健康檢查**: http://localhost:5487/
- **檢查地址資產**: http://localhost:5487/checkAddressAsset?address=YOUR_ADDRESS
- **取得 Testnet Admin 餘額**: http://localhost:5487/getSuiTestnetAdminBalance

### 測試 API 端點

#### 使用 curl

```bash
# 健康檢查
curl http://localhost:5487/

# 檢查地址資產（請替換為實際的 Sui 地址）
curl "http://localhost:5487/checkAddressAsset?address=0xYOUR_ADDRESS"

# 取得 Testnet Admin 餘額
curl http://localhost:5487/getSuiTestnetAdminBalance
```

#### 使用瀏覽器

直接在瀏覽器開啟以下網址：

- http://localhost:5487/
- http://localhost:5487/getSuiTestnetAdminBalance

## 💻 本地開發（不使用 Docker）

如果您想在本機環境開發而不使用 Docker：

### Backend 本地開發

```bash
cd backend

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

Backend 將運行在 http://localhost:5487

### Frontend 本地開發

```bash
cd frontend

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

Frontend 將運行在 http://localhost:3000

**注意**: 本地開發時，請確保 Backend 的 CORS 設定允許來自 `http://localhost:3000` 的請求。
