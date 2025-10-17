# Configuração do Webhook do Stripe

## Problema: "Webhook signature verification failed"

Este erro ocorre quando o Stripe não consegue verificar a assinatura do webhook. Aqui estão as soluções:

## ✅ Soluções Implementadas

### 1. **Correção do Corpo da Requisição**
- **Problema**: O corpo estava sendo parseado como JSON
- **Solução**: Usar `request.arrayBuffer()` e converter para string UTF-8
- **Configuração**: `runtime = 'nodejs'` e `dynamic = 'force-dynamic'`

### 2. **Melhor Tratamento de Erros**
- Adicionado logs detalhados para debug
- Verificação da existência da variável `STRIPE_WEBHOOK_SECRET`
- Logs do corpo da requisição e assinatura recebidos
- Logs específicos para cada tipo de evento

### 3. **Configuração do Next.js**
- Adicionado `serverExternalPackages: ['stripe']` no `next.config.mjs`
- Garantia de que o Stripe seja tratado corretamente

## 🔧 Configuração Necessária

### 1. **Variáveis de Ambiente**
Certifique-se de que estas variáveis estão configuradas:

```env
# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_BASE_URL="https://seu-dominio.com"
```

### 2. **Configuração do Webhook no Stripe Dashboard**

1. Acesse o [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Clique em "Add endpoint"
3. Configure:
   - **Endpoint URL**: `https://seu-dominio.com/api/stripe/webhook`
   - **Events to send**: `checkout.session.completed`
4. Copie o **Signing secret** (começa com `whsec_`)
5. Adicione como `STRIPE_WEBHOOK_SECRET` nas variáveis de ambiente

### 3. **Teste do Webhook**

Para testar localmente, use o Stripe CLI:

```bash
# Instalar Stripe CLI
npm install -g stripe

# Login no Stripe
stripe login

# Escutar webhooks localmente
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🐛 Debug

### Logs Adicionados
O webhook agora inclui logs detalhados:

```javascript
console.error('Webhook signature verification failed:', err);
console.error('Body received:', body.substring(0, 200) + '...');
console.error('Signature received:', signature);
```

### Verificações
- ✅ Assinatura presente
- ✅ Secret configurado
- ✅ Corpo da requisição preservado
- ✅ Tratamento de erros robusto

## 🚀 Deploy

### Vercel
1. Configure as variáveis de ambiente no painel do Vercel
2. Faça o deploy
3. Configure o webhook no Stripe com a URL de produção
4. Teste com um pagamento real

### Outros Provedores
- Certifique-se de que o webhook recebe o corpo bruto da requisição
- Alguns proxies podem modificar o corpo da requisição
- Use HTTPS para webhooks em produção

## 📝 Checklist

- [ ] `STRIPE_WEBHOOK_SECRET` configurado
- [ ] Webhook configurado no Stripe Dashboard
- [ ] URL do webhook correta
- [ ] Evento `checkout.session.completed` selecionado
- [ ] Teste local com Stripe CLI (opcional)
- [ ] Deploy com variáveis de ambiente
- [ ] Teste com pagamento real

## 🔍 Troubleshooting

### Erro: "No signatures found"
- Verifique se o webhook está configurado corretamente no Stripe
- Certifique-se de que a URL está acessível publicamente
- Verifique se não há proxy modificando a requisição

### Erro: "Invalid signature"
- Verifique se o `STRIPE_WEBHOOK_SECRET` está correto
- Certifique-se de que está usando o secret do webhook correto
- Verifique se o corpo da requisição não foi modificado

### Erro: "Webhook secret not configured"
- Adicione a variável `STRIPE_WEBHOOK_SECRET` nas configurações
- Reinicie o servidor após adicionar a variável

### ⚠️ **Problema Específico: Eventos Expirados**
Se você está recebendo eventos `checkout.session.expired` em vez de `checkout.session.completed`:

1. **Verifique o status da sessão**: O evento mostra `"status": "expired"`
2. **Causa**: A sessão de checkout expirou antes do pagamento
3. **Solução**: 
   - Configure um tempo de expiração maior no checkout
   - Verifique se o usuário está completando o pagamento a tempo
   - Teste com pagamentos mais rápidos

### 📊 **Logs de Debug**
O webhook agora inclui logs detalhados:
```
Webhook recebido: { hasSignature: true, bodyLength: 1234, bodyStart: '...' }
Evento processado: checkout.session.expired
Evento ignorado: checkout.session.expired
```

### 🎯 **Eventos Suportados**
- ✅ `checkout.session.completed` - Pagamento bem-sucedido
- ❌ `checkout.session.expired` - Sessão expirada (ignorado)
- ❌ `checkout.session.canceled` - Pagamento cancelado (ignorado)
