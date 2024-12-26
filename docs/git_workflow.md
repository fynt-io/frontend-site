# Git Workflow

## Regras para Commits e Merges

1. **Sempre use rebase ao invés de merge**:
   ```bash
   # Atualizando sua branch com a branch base
   git pull origin main --rebase  # ou staging/dev
   
   # Resolvendo conflitos durante rebase
   git rebase --continue  # após resolver conflitos
   git rebase --abort     # para cancelar o rebase
   ```

2. **Force push após rebase**:
   ```bash
   git push origin feature-branch --force-with-lease
   ```

3. **Mantendo branches de feature atualizadas**:
   ```bash
   git checkout feature-branch
   git rebase origin/dev
   git push origin feature-branch --force-with-lease
   ```

## Pull Requests

1. Certifique-se que sua branch está atualizada com rebase antes de abrir PR
2. Use "Rebase and merge" ao fazer merge do PR
3. Não use "Merge commit" ou "Squash and merge"

## Hotfixes/Bugfixes

1. Crie a branch a partir da main/staging
2. Após o merge, o workflow de sincronização fará rebase automático
<<<<<<< HEAD
3. Em caso de conflitos, um PR será criado para resolução manual

## Configuração de Branch Protection Rules

Para cada branch protegida (main, staging, dev):
1. Vá para Settings > Branches > Branch protection rules
2. Selecione "Require linear history"
3. Desabilite "Allow merge commits"
4. Habilite apenas "Allow rebase merging"
=======
3. Em caso de conflitos, um PR será criado para resolução manual 
>>>>>>> 2a2960d (doc: deploy flow)
