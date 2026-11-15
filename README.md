# Sorveteria Manager — v1.2.7 | Dev Kayko

## Cadastro único no GitHub

**Edite somente `js/cardapio-dados.js`** para alterar produtos publicados, fotos, sabores de sorvete por quilo, milk-shakes, tamanhos e preços. Esse mesmo arquivo alimenta **catalogo.html** e **Frente de Caixa** do PDV. Após enviar fotos para a pasta `assets/`, referencie exatamente o caminho no campo `image` do cadastro. Apenas fazer upload da imagem sem cadastrar seu caminho não cria automaticamente um produto.

* `index.html`: PDV.
* `catalogo.html`: cardápio público.
* `js/cardapio-dados.js`: **única fonte de cadastro publicado**.
* `js/conteudo-site.js`: textos da capa e rodapé.
* `css/style.css`, `css/catalogo.css`: estilos.
* `js/data.js`, `js/app.js`, `js/milkshake.js`, `js/icecream.js` e demais scripts: operações do caixa; não editar para adicionar sabores.
* `assets/`: imagens. Publique antes de referenciar.

### Atualização do site
1. Faça backup completo no PDV antes de publicar.
2. Envie o conteúdo do ZIP para a **raiz** do repositório; substitua os arquivos homônimos e mantenha seus arquivos já existentes.
3. Edite `js/cardapio-dados.js` no GitHub clicando no lápis, ou use o editor `editor-produtos.html` para preparar o arquivo e enviá-lo ao GitHub.
4. Faça Commit changes e recarregue o site após a publicação (`Ctrl + F5`).

### Como funciona a sincronização
- Produtos/sabores publicados no GitHub aparecem na vitrine e são importados para o navegador do PDV **quando o PDV é aberto ou recarregado**.
- Para produtos vinculados, **nome, preço e foto publicados** prevalecem sobre a versão local (quando existe foto publicada). Preços de milk-shake por sabor/tamanho são lidos do cadastro. Vendas, caixa, estoque, custos, funcionários e histórico permanecem locais.
- Produtos criados somente no PDV continuam locais e **não** aparecem na vitrine pública até serem cadastrados no arquivo do GitHub.
- Marcar **esgotado** no PDV é uma alteração local; não atualiza a vitrine pública. Para marcar no cardápio público, defina `"soldOut": true` no cadastro e publique.
- GitHub Pages é estático: fotos selecionadas pelo dispositivo no PDV não são enviadas automaticamente ao repositório. Não há sincronização do caixa entre vários dispositivos.
- **Não publique senhas, vendas, backups nem informações de clientes** no repositório.

### Limpeza de arquivos
- Retirados documentos legados na pasta `referencias/`, duas cópias JSON de referência que não eram carregadas pelas páginas mantendo os módulos de autenticação intactos.
- Bibliotecas e módulos carregados pelo PDV foram preservados para evitar regressões.

**Observação:** o preço por kg publicado no catálogo é uma referência de vitrine; o cálculo do caixa mantém o preço configurado pelo dono para não alterar regras de cobrança inesperadamente.

### Limitações da publicação estática
Excluir um produto do arquivo do GitHub remove-o do **cardápio público**, mas não apaga automaticamente o produto existente no PDV local: exclusões automáticas podem afetar controles de estoque e histórico. Para desativar venda sem apagar registros, ajuste o produto no PDV. O catálogo público não recebe mudanças feitas somente no caixa.
