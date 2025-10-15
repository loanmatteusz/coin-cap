# CoinCap WS

## Desafio

### Objetivo
Criar uma aplicação (utilizando React) que consuma o WebSocket público da CoinCap para exibir preços em tempo real.

Endpoint WS (público):
```bash
wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero
```

Você pode trocar/expandir a lista de ativos (ex.: bitcoin,ethereum,monero,solana,cardano).

### Requisitos Funcionais

- Conexão ao WebSocket: A aplicação deve conectar ao endpoint e receber mensagens JSON de preço em tempo real.
- Listagem de Ativos: Exibir uma lista com os ativos monitorados e seus preços atuais (atualizando em tempo real).
- Detalhe do Ativo: Ao clicar em um ativo da lista, exibir uma página de detalhes com:
- nome/símbolo do ativo;
- preço atual;
- variação recente com base nos últimos eventos recebidos;
- Gráfico com o histórico recente recebido durante a sessão.
- Cache Local (IndexedDB) ;
- Um histórico dos últimos 10 valores por ativo.

### Critérios de Avaliação:
- Código legível e organizado.
- Boa usabilidade e responsividade.
- Adoção de boas práticas de desenvolvimento.

### Utilização de Testes: 
- Utilize o Vitest para testes. 

### Estilização
- Utilização do Tailwind

### Entrega
Publicação em link e retorno neste e-mail em até 36h.
