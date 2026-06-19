# Gostim da Roça — Site + Gestão de pedidos

Projeto independente que junta a **landing page** (`index.html`) com a **captura de
pedidos no Supabase** e o **painel de gestão** (`admin.html`) para a Kátia.

> A landing page de marketing original vive em outro repositório e fica intocada.
> Esta é a versão "de verdade", com captura de pedidos, deployada por conta própria.

## Como funciona

```
Cliente no site (index.html)
   │  monta carrinho, preenche nome/WhatsApp (opcional)
   ├─(1)─> grava o pedido no Supabase (status "novo")
   └─(2)─> abre o WhatsApp com o pedido + código (ex: GR-4F2A)

Kátia (admin.html)
   │  faz login com email + senha
   └──> vê todos os pedidos, muda status, anota, abre o WhatsApp do cliente
```

- **Projeto Supabase:** `gostim-da-roca` (região São Paulo) — `https://wyieoakhbvirzxmqafqc.supabase.co`
- A chave no código é a **publishable** (pública de propósito). Os dados são protegidos por **RLS**: o site só *cria* pedido, *nunca lê*. Só quem está logado como admin lê.

## ⚙️ Passo único de configuração: criar o login da Kátia

O usuário de login precisa ser criado uma vez no painel do Supabase:

1. Abra o projeto `gostim-da-roca` no [dashboard do Supabase](https://supabase.com/dashboard).
2. Menu **Authentication → Users → Add user → Create new user**.
3. Preencha **email** e **senha**, e **marque "Auto Confirm User"** (senão o login não funciona).
4. O email precisa estar na lista de admins (veja abaixo). Hoje o admin é: `ahssantos89@gmail.com`.

Pronto. Acesse `admin.html` no site, entre com esse email/senha e os pedidos aparecem.

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

## Próximo passo possível (ainda não feito)

Quando o volume de mensagens virar dor real: WhatsApp Business API (Meta) + um
agente de IA lendo a tabela `orders`. Esta etapa já deixa os dados prontos pra isso.
