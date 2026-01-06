# Configuração do Painel Admin

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```env
# Email do administrador (obrigatório)
ADMIN_EMAIL=rennandev@gmail.com

# Secret para NextAuth (gerar com: openssl rand -base64 32)
AUTH_SECRET=seu_secret_aqui

# URL base da aplicação (para redirecionamentos)
# OPCIONAL: Se não configurada, será detectada automaticamente
AUTH_URL=http://localhost:3000  # ou https://casarme.site em produção

# Resend API Key (já existe)
RESEND_API_KEY=re_...

# Email de envio do Resend (já existe)
RESEND_FROM_EMAIL=...

# Para NextAuth Resend Provider (use a mesma chave do RESEND_API_KEY)
# IMPORTANTE: O provider Resend do NextAuth v5 usa AUTH_RESEND_KEY automaticamente
# Se não funcionar, tente usar a mesma chave do RESEND_API_KEY
AUTH_RESEND_KEY=re_...
```

**Nota:** O NextAuth agora usa o Prisma Adapter, então as tabelas `users`, `accounts`, `sessions` e `verification_tokens` foram criadas no banco de dados.

## Troubleshooting

Se você receber "Erro ao enviar magic link":

1. **Verifique as variáveis de ambiente:**
   - `AUTH_RESEND_KEY` deve estar configurada (pode usar a mesma do `RESEND_API_KEY`)
   - `RESEND_FROM_EMAIL` deve estar configurada
   - `ADMIN_EMAIL` deve estar configurada
   - `AUTH_SECRET` deve estar configurada

2. **Verifique os logs do servidor:**
   - Procure por erros relacionados ao Resend
   - Verifique se o email está sendo validado corretamente

3. **Teste a API do Resend:**
   - Certifique-se de que a chave API do Resend está válida
   - Verifique se o domínio está verificado no Resend

## Como Gerar AUTH_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

## Estrutura de Rotas

- `/login` - Página de login com Magic Link
- `/admin` - Painel administrativo (protegido)
- `/api/auth/[...nextauth]` - Rotas de autenticação do NextAuth
- `/api/admin/invitations` - API para listar convites (protegida)

## Funcionalidades

1. **Autenticação**: Magic Link via Resend
2. **Validação**: Apenas o email configurado em `ADMIN_EMAIL` pode fazer login
3. **Proteção**: Middleware protege rotas `/admin/**`
4. **Redirecionamento**: Usuários logados em `/login` são redirecionados para `/admin`

## Componentes Criados

- `src/lib/auth.ts` - Configuração do NextAuth
- `src/app/login/page.tsx` - Página de login
- `src/app/admin/layout.tsx` - Layout do admin
- `src/app/admin/page.tsx` - Página principal com tabela
- `src/components/admin-navbar.tsx` - Navbar do admin
- `src/app/api/admin/invitations/route.ts` - API para listar convites
- `middleware.ts` - Middleware de proteção

