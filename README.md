# Sorveteria • PDV 1.2.4 + Cardápio com Fotos

**Desenvolvido por Dev Kayko.** Projeto com código organizado e indentado para VS Code e GitHub Pages.

> **Esta entrega inclui os arquivos completos do PDV anterior** (caixa, vendas, estoque, funcionários, relatórios, segurança local e backups), os assets originais disponíveis, e um catálogo com fotos separado. O código do PDV foi formatado, não substituído por um exemplo. Esta versão mantém o número **1.2.4**.

## Onde editar cada coisa

| Quero alterar | Arquivo / local |
| --- | --- |
| Textos e foto de capa do cardápio | `js/conteudo-site.js` |
| Nomes, preços, tamanhos e caminhos de fotos do cardápio | `js/cardapio-dados.js` |
| Visual, cores, fontes e espaçamento do catálogo | `css/catalogo.css` |
| Visual, cores, fontes e impressão do PDV | `css/style.css` |
| Textos fixos e elementos das telas do PDV | `index.html` |
| Produtos, preços iniciais e configurações do **PDV** | `js/data.js` ou painel do Dono |
| Carrinho, venda, caixa, relatórios e navegação do PDV | `js/app.js` |
| Sorvetes por quilo | `js/icecream.js` |
| Milk-shakes do PDV | `js/milkshake.js` |
| Funcionários e salários | `js/hr.js` |
| Acesso do dono e funcionários | `js/access.js` e `js/security.js` |
| Exportação e backup do PDV | `js/excel.js` e `js/backup.js` |
| Cardápio: pesquisa, filtros, impressão, exportação, zoom | `js/catalogo.js` |
| Portfólio Dev Kayko | `dev-kayko/index.html`, `style.css`, `script.js` |

### Estrutura organizada

```text
sorveteria/
├── index.html                 # PDV principal
├── catalogo.html              # Vitrine com fotos
├── catalogo-produtos.json     # Cópia para referência/exportação
├── css/
│   ├── style.css              # Estilos do PDV
│   └── catalogo.css           # Estilos da vitrine
├── js/
│   ├── data.js                # Dados iniciais do PDV (não apagar DB_KEY)
│   ├── security.js
│   ├── excel.js
│   ├── access.js
│   ├── icecream.js
│   ├── milkshake.js
│   ├── hr.js
│   ├── backup.js
│   ├── app.js
│   ├── conteudo-site.js       # EDITAR TEXTOS DA VITRINE AQUI
│   ├── cardapio-dados.js      # EDITAR PRODUTOS E FOTOS DA VITRINE AQUI
│   └── catalogo.js
├── assets/
│   ├── picoles/              # Fotos dos picolés já disponíveis
│   ├── sabores/              # Fotos de sorvetes já disponíveis
│   ├── milkshakes/           # Adicione fotos dos milk-shakes aqui
│   ├── paletas/              # Adicione fotos das paletas aqui
│   ├── produtos/             # Fotos dos demais produtos
│   └── sem-foto.svg          # Mostrado automaticamente se uma foto faltar
├── dev-kayko/                # Página de apresentação do desenvolvedor
├── docs/
│   ├── EDITAR-FOTOS-TEXTOS.md
│   ├── MAPA-DOS-ARQUIVOS.md
│   ├── LISTA-FOTOS.csv
│   └── PUBLICAR-NO-GITHUB.md
├── tools/verificar-projeto.py
├── .vscode/
└── .editorconfig
```

## Como usar

1. Descompacte o ZIP e abra **a pasta inteira** no VS Code.
2. Abra `index.html` no navegador para o PDV e `catalogo.html` para o cardápio. Também é possível usar a extensão **Live Server**.
3. Troque os textos no arquivo `js/conteudo-site.js` e as imagens e preços no arquivo `js/cardapio-dados.js`.
4. **Para publicar**, envie o conteúdo descompactado da pasta para a raiz do repositório GitHub. Não basta subir somente o arquivo ZIP.
5. Após publicar, atualize a página com `Ctrl + F5`.

O catálogo inclui **18 categorias e 81 produtos**, com pesquisa, filtros, foto ampliável, versão para impressão/PDF e exportação JSON. Algumas fotos de produtos estão faltando, pois não faziam parte do pacote disponibilizado. A imagem `sem-foto.svg` evita cards quebrados. Use `docs/LISTA-FOTOS.csv` para ver quais imagens já existem.

**Atenção aos preços:** o catálogo com fotos é uma vitrine, não um banco de dados sincronizado com o caixa. Alterar um preço no catálogo **não** modifica o valor no PDV. Confira os preços de ambos antes de publicar. A cópia `catalogo-produtos.json` é uma referência/exportação: o site lê `js/cardapio-dados.js`.

## Dados e backups

Em um navegador sem registros prévios, a versão mantém o primeiro acesso configurável, estoque inicial zero e histórico vazio. Publicar novos arquivos não apaga os dados já salvos no armazenamento local do navegador: antes de atualizar, faça um **backup completo** pelo próprio PDV. Não altere a constante `DB_KEY` em `js/data.js` sem planejar uma migração de dados.

Fotos enviadas pelo painel do PDV e salvas localmente não são enviadas automaticamente ao GitHub. Para fotos públicas, publique os arquivos em `assets/` e use seus caminhos relativos.

Para identificar erros comuns em arquivos e caminhos, execute `python tools/verificar-projeto.py` na pasta do projeto.

**Segurança:** GitHub Pages é hospedagem estática. Senhas e dados persistidos somente no navegador não equivalem a autenticação centralizada ou sincronização segura entre dispositivos.
