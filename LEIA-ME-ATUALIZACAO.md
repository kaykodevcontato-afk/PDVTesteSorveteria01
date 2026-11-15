# Sorveteria — ajuste de título e fotos (base 1.2.7)

Alterações desta entrega:

- Tela inicial de acesso: **Sorveteria** no lugar de Sorveteria Manager.
- Marca visível, título da aba e referências visuais do PDV atualizados para Sorveteria.
- Campo das fotos de milk-shakes: rótulo **Foto do produto** e, quando vazio, placeholder **Caminho da foto**.
- Migração do nome padrão antigo Sorveteria Manager para Sorveteria ao carregar os dados locais; nomes personalizados do estabelecimento são preservados.
- Nenhum histórico de vendas, estoque ou configurações de usuário foi apagado.

## Atualizar o GitHub

Faça um Backup Completo antes de atualizar. Extraia o ZIP e envie os arquivos à raiz do repositório, preservando os diretórios `js`, `css` e `assets`. Para instalar só os ajustes desta entrega, substitua `index.html`, `js/milkshake.js`, `js/data.js`, `js/app.js` e `js/hr.js`. Após o commit, atualize com Ctrl + F5.

Observação: o texto *Caminho da foto* aparece apenas quando o campo está vazio; caso exista um endereço, ele continuará visível para edição.
