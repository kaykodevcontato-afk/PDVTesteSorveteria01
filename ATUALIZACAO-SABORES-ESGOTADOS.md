# Sorveteria 1.2.5 — Novos sabores e produtos esgotados

## Instalação no GitHub Pages

Faça backup JSON do PDV antes de qualquer atualização. Para atualizar o projeto completo, envie todos os arquivos deste ZIP à raiz do repositório, mantendo a estrutura das pastas (não apagar dados no navegador). Se preferir aplicar só a correção, substitua `index.html`, `css/style.css`, `js/data.js`, `js/icecream.js` e `js/milkshake.js`.

## Como usar

- **Dono → Sabores e preços → Milk-shakes — preços e fotos:** formulário **Adicionar novo sabor**, escolha Tradicional ou Especial, digite nome e caminho da imagem opcional. Clique Cadastrar sabor. Abaixo, em cada cartão, marque **Esgotado** ou **Disponível**. É possível excluir o sabor do cadastro sem apagar vendas anteriores.
- **Dono → Sabores e preços → Sabores disponíveis:** a coluna Ações permite marcar cada sabor de sorvete por quilo como **Esgotado** e liberá-lo novamente.
- **Frente de caixa:** sabores esgotados aparecem com o aviso ESGOTADO, ficam acinzentados e não podem ser selecionados. Nenhuma venda nova pode adicionar milk-shake esgotado. Quando todos os sabores de sorvete por quilo estão esgotados, o botão de adicionar fica bloqueado.

## Como colocar foto via GitHub

Envie a imagem para `assets/milkshakes/nome.webp`, depois edite o caminho da imagem no painel ou no código de dados iniciais. Se um sabor já estiver salvo neste navegador, as mudanças do arquivo JavaScript não alteram automaticamente o cadastro local.

## Dados e segurança

As alterações são salvas no navegador, como as demais configurações do PDV, e entram nos backups. Atualizar o código pelo GitHub não sincroniza os cadastros de computadores diferentes. Os registros históricos de venda não são apagados. Não limpe o armazenamento local durante a atualização.
