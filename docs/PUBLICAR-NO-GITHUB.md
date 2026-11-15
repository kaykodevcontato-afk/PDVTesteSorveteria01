# Publicar e atualizar a Sorveteria no GitHub Pages

1. **Antes de atualizar uma sorveteria em uso**, baixe um **backup completo** no PDV e guarde-o fora do GitHub.
2. Extraia o ZIP em seu computador. Não envie o ZIP sozinho: abra a pasta descompactada.
3. Abra o repositório no GitHub e use **Add file → Upload files** para enviar o conteúdo da pasta, incluindo as subpastas `css`, `js`, `assets`, `dev-kayko` e `docs`. Confirme os arquivos alterados e faça o commit.
4. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)` (ou mantenha a configuração que já usa).
5. Abra `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/` e confira a página principal. O catálogo estará em `/catalogo.html` e no menu do PDV.
6. Atualize a página usando `Ctrl + F5`. Confirme caixa, preços, estoque, comprovantes, impressão, backup, permissões e catálogo antes de utilizá-la com clientes.

## Erro comum: foto não aparece

Verifique se o arquivo está realmente enviado na pasta exata (ex.: `assets/milkshakes/morango.webp`) e se o campo `image` em `js/cardapio-dados.js` corresponde exatamente ao caminho, inclusive letras maiúsculas e minúsculas. O catálogo mostrará `assets/sem-foto.svg` caso não encontre uma foto.

## Como conferir no VS Code

1. Abra a pasta inteira do projeto no VS Code.
2. Use a extensão **Live Server** ou abra o HTML diretamente no navegador. O cardápio não depende de `fetch()` e abre localmente.
3. Execute `python tools/verificar-projeto.py` para verificar caminhos de CSS/JS e imagens conhecidas.

## Dados guardados no navegador

GitHub Pages hospeda **somente o código e os arquivos estáticos**. Não sincroniza vendas entre computadores. Subir uma nova versão do projeto não apaga automaticamente o `localStorage` do navegador; dados já gravados continuarão até você removê-los ou restaurar outro backup. Mantenha cópias antes de alterações importantes.
