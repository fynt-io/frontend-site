# Documentação do Fluxo de Deploy

## Visão Geral
O sistema possui um pipeline de CI/CD que gerencia deployments através de 3 ambientes: Development (dev), Staging e Production (main), utilizando GitHub Actions e ArgoCD para orquestração dos deployments.

## Estrutura de Branches
- `dev`: Ambiente de desenvolvimento
- `staging`: Ambiente de homologação
- `main`: Ambiente de produção
- `*-hotfix/*-bugfix`: Branches especiais para correções urgentes

## Ambientes

### 1. Development (dev)
- **Acionado por:**
  - Push direto na branch `dev`
  - Pull Requests para `dev`
- **Deploy automático no cluster `bren-dev`**

### 2. Staging
- **Acionado por:** Pull Requests para `staging`
- **Aceita merges apenas de:**
  - Branch `dev`
  - Branches `*-hotfix` ou `*-bugfix`
- **Deploy no cluster `bren-staging`**

### 3. Production
- **Acionado por:** Pull Requests para `main`
- **Aceita merges apenas de:**
  - Branch `staging`
  - Branches `*-hotfix` ou `*-bugfix`
- **Deploy no cluster `bren-prod`**

## Fluxo Normal de Deploy

```graph LR
    Dev --> Staging
    Staging --> Production
```

1. **Development (dev)**
   - Acionado por:
     - Push direto na branch `dev`
     - Pull Requests para `dev`
   - Deploy automático no cluster `bren-dev`

2. **Staging**
   - Acionado por Pull Requests para `staging`
   - Aceita merges apenas de:
     - Branch `dev`
     - Branches `*-hotfix` ou `*-bugfix`
   - Deploy no cluster `bren-staging`

3. **Production**
   - Acionado por Pull Requests para `main`
   - Aceita merges apenas de:
     - Branch `staging`
     - Branches `*-hotfix` ou `*-bugfix`
   - Deploy no cluster `bren-prod`

## Fluxo de Hotfix/Bugfix

1. **Criação**
   - Criar branch com sufixo `-hotfix` ou `-bugfix`
   - Pode ser mergeada diretamente em `staging` ou `main`

2. **Sincronização Automática**
   - Após merge de hotfix/bugfix em `main`:
     - Tenta sincronizar automaticamente com `staging` e `dev`
     - Se houver conflitos, cria Pull Request
   
   - Após merge de hotfix/bugfix em `staging`:
     - Tenta sincronizar automaticamente com `main` e `dev`
     - Se houver conflitos, cria Pull Request

## Processo de Build e Deploy

1. **Build**
   - Constrói imagem Docker
   - Usa cache do Google Artifact Registry
   - Tag da imagem: `version-commitsha`
   - Suporte apenas para `linux/amd64`

2. **Deploy via ArgoCD**
   - Cria/atualiza aplicação no ArgoCD
   - Usa valores específicos para cada ambiente (`values-dev.yaml`, `values-staging.yaml`, `values-production.yaml`)
   - Sincronização manual via ArgoCD
   - Suporte para criação automática de namespace

## Segurança e Controles
- Concorrência controlada para evitar deployments simultâneos
- Verificação rigorosa de branches de origem
- Autenticação via SSH para ArgoCD
- Permissões específicas para acesso ao Google Cloud
- Notificações automáticas em caso de falha na sincronização
