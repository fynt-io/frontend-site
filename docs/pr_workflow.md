1. Crie sua branch a partir da base atualizada
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/sua-feature
   ```

2. Faça seus commits

3. Antes de criar a PR:
   ```bash
   git pull origin dev --rebase
   git push --force-with-lease
   ```

4. Crie a PR pela interface do GitHub

5. Se precisar atualizar:
   - Use o botão "Update branch" (ele fará rebase automaticamente)
   - OU atualize localmente e force push:
     ```bash
     git pull origin dev --rebase
     git push --force-with-lease
     ```

6. Ao mergear:
   - *Use SEMPRE "Rebase and merge"!*
