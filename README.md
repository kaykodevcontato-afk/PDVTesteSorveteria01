# Sorveteria — projeto organizado para GitHub Pages

**Desenvolvimento: Dev Kayko** · Base funcional: 1.2.7

Este pacote contém a Frente de Caixa (`index.html`), o cardápio (`catalogo.html`) e o editor de produtos (`editor-produtos.html`).

## Comece aqui

- **Editar produtos, nomes, preços e endereços das fotos:** `js/cardapio-dados.js` (fonte central publicada).
- **Editar textos e capa do cardápio:** `js/conteudo-site.js`.
- **Editar cores e layout:** `css/style.css` (PDV), `css/catalogo.css` (cardápio).
- **Adicionar fotos:** envie imagens a `assets/` e use exatamente o mesmo caminho no cadastro.
- **Editor visual:** abra `editor-produtos.html`, exporte os dados e substitua o arquivo indicado pelo editor.
- **Guia detalhado:** `docs/GUIA-EDICAO.md`.

## Arquivos de lógica (alterar com cuidado)

| Arquivo | Responsabilidade |
|---|---|
| `js/app.js` | Vendas, carrinho, interface, relatórios |
| `js/data.js` | Persistência e dados locais |
| `js/access.js`, `js/security.js` | Acesso e proteção local |
| `js/icecream.js`, `js/milkshake.js` | Sabores, fotos e venda |
| `js/hr.js` | Funcionários |
| `js/backup.js`, `js/excel.js` | Exportação e backup |
| `js/catalogo.js`, `js/editor-produtos.js` | Cardápio e editor |

## Como publicar

1. Faça **Backup Completo** antes de alterar uma instalação em uso.
2. Extraia este ZIP e envie **o conteúdo da pasta** para a raiz do repositório.
3. Mantenha os caminhos das pastas `css/`, `js/` e `assets/`.
4. Faça commit e recarregue as páginas com `Ctrl + F5`.

**Importante:** GitHub Pages publica arquivos estáticos. Registros do caixa e fotos enviadas apenas no painel local podem permanecer no navegador, e não são publicados para outros dispositivos. O catálogo publicado não é um banco compartilhado de vendas. Não apague o armazenamento do navegador para tentar atualizar fotos.

Os documentos de atualizações antigas foram movidos para `docs/historico/` para deixar a raiz mais simples. Nenhum módulo executável foi removido nesta limpeza preventiva.
