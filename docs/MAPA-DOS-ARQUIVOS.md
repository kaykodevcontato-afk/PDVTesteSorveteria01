# Mapa do código e organização

## Interface visual

| Página/parte | Estrutura | Estilo | Comportamento |
| --- | --- | --- | --- |
| PDV, estoque, caixa e relatórios | `index.html` | `css/style.css` | `js/app.js` |
| Login e segurança do PDV | `index.html` | `css/style.css` | `js/access.js`, `js/security.js` |
| Sorvetes por peso | `index.html` | `css/style.css` | `js/icecream.js` |
| Milk-shake | `index.html` | `css/style.css` | `js/milkshake.js` |
| Funcionários | `index.html` | `css/style.css` | `js/hr.js` |
| Dados iniciais e banco local | — | — | `js/data.js` |
| Backup, restauração e fotos locais | `index.html` | `css/style.css` | `js/backup.js` |
| Relatórios Excel | `index.html` | `css/style.css` | `js/excel.js` |
| Cardápio ilustrado | `catalogo.html` | `css/catalogo.css` | `js/catalogo.js` |
| Conteúdo visual do cardápio | — | — | `js/conteudo-site.js`, `js/cardapio-dados.js` |
| Portfólio | `dev-kayko/index.html` | `dev-kayko/style.css` | `dev-kayko/script.js` |

## Evite modificações acidentais

- Mantenha a **ordem de importação** dos JavaScript em `index.html`; os módulos dependem de funções compartilhadas.
- Os IDs de elementos (`id="..."`) no `index.html` também são usados pelos scripts. Não os renomeie sem atualizar o código JS correspondente.
- A chave `DB_KEY` em `js/data.js` identifica os dados locais e não deve ser alterada sem migração.
- O catálogo **não** grava no banco local do PDV, mesmo que os mesmos produtos apareçam nos dois.
- Para editar fotos e preços, prefira os arquivos de conteúdo ou o painel do dono, não `js/app.js`.

## Convenções de edição

- HTML e CSS: indentação de **2 espaços**.
- JavaScript: indentação de **4 espaços**.
- JSON: indentação de **2 espaços**.
- Codificação: **UTF-8**.
- Cada recurso fica na sua pasta: HTML na raiz, estilos em `css/`, scripts em `js/`, fotos em `assets/`.

Ferramenta de conferência: `python tools/verificar-projeto.py`.
