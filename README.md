# Gostim da Roça — Site + Gestão de pedidos

Projeto independente que junta a **landing page** (`index.html`) com a **captura de
pedidos no Supabase** e o **painel de gestão** (`admin.html`) para a Kátia.

> A landing page de marketing original vive em outro repositório e fica intocada.
> Esta é a versão "de verdade", com captura de pedidos, deployada por conta própria.

## No ar

- **Site:** https://gostim-da-roca.vercel.app
- **Painel:** https://gostim-da-roca.vercel.app/admin

> O endereço antigo `gostim-gestao.vercel.app` redireciona para `gostim-da-roca.vercel.app`.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Landing page + carrinho que grava o pedido no Supabase |
| `admin.html` | Painel da Kátia (login, pedidos, dashboard, export) |
| `produtos.js` | **Cardápio — fonte única**, compartilhada pela landing e pelo painel |
| `vercel.json` | Rewrite `/admin` → `/admin.html` (URL limpa) |

## Como funciona

```
Cliente no site (index.html)
   │  monta carrinho, preenche nome/WhatsApp (opcional)
   ├─(1)─> grava o pedido no Supabase (status "novo")
   └─(2)─> abre o WhatsApp com o pedido + código (ex: GR-4F2A)

Kátia (admin.html)
   │  faz login com email + senha
   ├─ Pedidos:   ver, filtrar, mudar status, anotar, editar, excluir, criar manual
   └─ Dashboard: faturamento, ticket médio, clientes, gráficos
```

- **Projeto Supabase:** `gostim-da-roca` (região São Paulo) — `https://wyieoakhbvirzxmqafqc.supabase.co`
- A chave no código é a **publishable** (pública de propósito). Os dados são protegidos por **RLS**: o site só *cria* pedido, *nunca lê*. Só quem está logado como admin lê.

## O painel (`admin.html`)

**Aba Pedidos**
- Lista de pedidos com **filtros por status** (novo/confirmado/entregue/pago/cancelado).
- **Filtros por período**: Hoje, 7 dias, 30 dias, Este mês, ou intervalo livre (de/até).
- **Mudar status** e **anotar** direto no card.
- **Editar** pedido (cliente, itens, status, notas) num modal — preserva o código original.
- **Excluir** pedido (com confirmação).
- **+ Novo pedido**: lançar manualmente um pedido (telefone/presencial). O campo de
  produto sugere o cardápio e preenche o preço sozinho; também aceita produto livre.
- **⬇ Exportar Excel** (`.xlsx`): exporta os pedidos **respeitando os filtros ativos**
  (status + período). Colunas: Código, Data, Cliente, WhatsApp, Itens, Total, Status, Notas.

**Aba Dashboard**
- KPIs: **Faturamento** (conta só pedidos `pago`), **Ticket médio** (pagos),
  **Clientes únicos** (por WhatsApp), nº de pedidos, pagos e cancelados.
- Gráficos: vendas no tempo (pagos), pedidos por status, top produtos (unidades), top clientes (valor).
- O filtro de período vale para o dashboard também.

## Editar o cardápio (`produtos.js`)

Produtos e preços ficam **só** em `produtos.js` (fonte única). Editou ali, muda na
landing **e** no painel ao mesmo tempo. Cada produto tem um ou mais tamanhos:

```js
{ nome: 'Alho e sal', categoria: 'temperos',
  precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 17.00 } ] }
```

- **Mudar preço:** altere o número em `preco`.
- **Adicionar tamanho:** acrescente `{ tam: '...', preco: ... }` em `precos`.
- **Adicionar produto:** copie um bloco `{ ... }` inteiro.
- Use ponto nos preços (`12.00`) e mantenha as aspas nos textos.

## Segurança (Supabase + RLS)

- Tabela `public.orders` (code, customer_name, customer_phone, items, total, status, notes).
- `anon` (site público) só faz **INSERT** com `status='novo'` — **nunca lê**.
- Leitura/edição/exclusão só para o admin autenticado, checado por `private.is_admin()`
  contra a tabela `admin_emails`. A chave publishable é pública de propósito; a
  proteção real é o RLS.

## ⚙️ Passo único de configuração: criar o login da Kátia

O usuário de login precisa ser criado uma vez no painel do Supabase:

1. Abra o projeto `gostim-da-roca` no [dashboard do Supabase](https://supabase.com/dashboard).
2. Menu **Authentication → Users → Add user → Create new user**.
3. Preencha **email** e **senha**, e **marque "Auto Confirm User"** (senão o login não funciona).
4. O email precisa estar na lista de admins (veja abaixo). Hoje o admin é: `ahssantos89@gmail.com`.

Pronto. Acesse `/admin` no site, entre com esse email/senha e os pedidos aparecem.

## 🔑 Trocar ou adicionar admin (ex: passar para o email da Kátia)

Quem pode acessar o painel é controlado pela tabela `admin_emails`.
No dashboard do Supabase → **SQL Editor**, rode:

```sql
-- adicionar o email da Kátia
insert into admin_emails (email) values ('email-da-katia@exemplo.com');

-- (opcional) remover o seu, deixando só a Kátia
delete from admin_emails where email = 'ahssantos89@gmail.com';
```

Depois crie o usuário desse novo email em **Authentication → Users** (passo acima).
Não precisa mexer no código.

## Status de um pedido

`novo` → `confirmado` → `entregue` → `pago` (e `cancelado` quando for o caso).
O cliente nunca controla o status; só a Kátia muda pelo painel.

## Stack

HTML/CSS/JS puro, sem build. Dependências via CDN:

- [`@supabase/supabase-js`](https://github.com/supabase/supabase-js) — banco e login
- [Chart.js](https://www.chartjs.org/) — gráficos do dashboard
- [SheetJS](https://sheetjs.com/) — exportação `.xlsx`

Deploy automático na Vercel a cada push na branch `main`.

## Próximo passo possível (ainda não feito)

Quando o volume de mensagens virar dor real: WhatsApp Business API (Meta) + um
agente de IA lendo a tabela `orders`. Esta etapa já deixa os dados prontos pra isso.
