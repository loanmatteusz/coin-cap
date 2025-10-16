# 🪙 CoinCap Real-Time Dashboard

Aplicação **React + Vite** que consome o WebSocket público da [CoinCap](https://coincap.io) para exibir preços de criptomoedas em tempo real.

---

## 🚀 Objetivo

Conectar-se ao endpoint público:
```
wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero
```
e exibir os preços atualizados em tempo real.  
A lista de ativos pode ser alterada (ex: adicionar solana, cardano, etc).

---

## ✅ Funcionalidades

- Conexão em tempo real via **WebSocket**
- Lista de ativos com atualização automática
- Página de detalhes com:
  - Nome, símbolo e preço atual
  - Gráfico de variação (últimos 10 valores)
  - Cache local com **IndexedDB** (persiste após F5)
- Tema **dark mode** por padrão
- Interface responsiva com **Tailwind CSS**

---

## 🧰 Tecnologias

React, TypeScript, Vite, Tailwind, Recharts, IndexedDB, Vitest, Docker, Nginx.

---

## ⚙️ Rodando o Projeto

### Localmente
```bash
npm install
npm run dev
```
Acesse em: http://localhost:5173

---

## 🐳 Com Docker

### Ambiente de desenvolvimento
```bash
npm run docker:dev
```
→ http://localhost:5173

### Ambiente de produção
```bash
npm run docker:prod
```
→ http://localhost:8080

---

## 🧪 Testes
```bash
npm run test
```