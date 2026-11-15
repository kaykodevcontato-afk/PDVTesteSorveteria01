# Atualização 1.2.6 — Foto local ao cadastrar milk-shake

## O que mudou

Em **Dono → Sabores e preços → Milk-shakes → Adicionar novo sabor**, agora existe o campo **Selecionar foto do computador ou celular**. Selecione JPG, PNG ou WebP (até 12 MB), digite o nome e clique em **Cadastrar sabor**. A foto é processada e salva no IndexedDB do navegador, usando o mecanismo de backup já existente.

Também permanece o campo de **caminho da foto publicada no GitHub**, para usar uma imagem acessível a todos os visitantes. Escolha **uma** das duas opções ao cadastrar.

Os sabores já cadastrados continuam com o seletor **Foto do computador**, além da opção de caminho GitHub.

## Atenção: publicação e backup

- Uma foto escolhida do computador/celular **não é enviada automaticamente ao GitHub**; aparece no navegador onde foi escolhida.
- Para compartilhar entre dispositivos, envie a foto à pasta `assets/milkshakes/` do GitHub e informe o caminho correspondente no cadastro ou na edição.
- Faça sempre o **Backup Completo (ZIP)** para preservar as fotos locais.
- Atualizar os arquivos do GitHub não apaga os dados locais existentes, mas não substitui o backup antes de atualizar.

## Instalar no GitHub

Substitua somente `index.html` e `js/milkshake.js`, preservando as pastas e os demais arquivos. Use `Ctrl + F5` após a publicação. Não substitua todos os arquivos do projeto se houver alterações mais recentes.
