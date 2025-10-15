# Configuração do Sistema de Convites

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/casarme"

# Resend API
RESEND_API_KEY="your_resend_api_key"

# App URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
\`\`\`

## Configuração do Banco de Dados

1. Configure seu PostgreSQL
2. Execute as migrações:
\`\`\`bash
npx prisma db push
\`\`\`

## Funcionalidades Implementadas

### ✅ Upload de Imagens
- Validação de tamanho (máximo 5MB)
- Validação de tipo (JPG, PNG, WebP)
- Compressão automática com Sharp
- Otimização de qualidade (85%)
- Redimensionamento inteligente (máximo 1920x1080)

### ✅ Sistema de Convites
- Criação de convites com dados completos
- Slugs únicos e amigáveis
- Relacionamento com imagens
- Persistência no PostgreSQL

### ✅ Envio de E-mails
- Template personalizado com design da aplicação
- Integração com Resend
- E-mail automático após criação

### ✅ Modelagem de Dados
- Model `Invitation` com todos os campos
- Model `Image` com metadados completos
- Relacionamento one-to-many
- Cascade delete para limpeza

## Estrutura de Arquivos

\`\`\`
src/
├── app/
│   ├── api/
│   │   ├── upload/route.ts          # Upload de imagens
│   │   └── invitations/create/route.ts # Criação de convites
│   └── criar/
│       ├── sections/
│       │   ├── create-invite-form.tsx
│       │   └── email-modal.tsx
│       └── obrigado/page.tsx
├── lib/
│   ├── prisma.ts                    # Cliente Prisma
│   ├── slug.ts                      # Geração de slugs
│   ├── resend.ts                    # Cliente Resend
│   ├── image-utils.ts               # Utilitários de imagem
│   └── email-template.tsx           # Template de e-mail
└── hooks/
    └── use-image-upload.ts          # Hook para uploads
\`\`\`

## Fluxo Completo

1. **Usuário preenche formulário** → Dados coletados
2. **Upload de imagens** → Validação e compressão
3. **Modal de e-mail** → Coleta do e-mail do usuário
4. **Criação do convite** → Persistência no banco
5. **Envio de e-mail** → Link do convite enviado
6. **Página de obrigado** → Confirmação para o usuário

## Próximos Passos

Para finalizar a implementação, você precisa:

1. Configurar as variáveis de ambiente
2. Executar `npx prisma db push` para criar as tabelas
3. Testar o fluxo completo de criação de convites
