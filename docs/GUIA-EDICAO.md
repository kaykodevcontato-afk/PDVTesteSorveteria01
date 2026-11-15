# Guia de edição — Sorveteria

## 1. Produto, foto e preço: um só lugar

Abra `js/cardapio-dados.js`. Procure o nome do produto com `Ctrl + F` e edite somente os campos necessários:

```js
{
  "id": "milk-shakes-tradicionais-morango",
  "name": "Morango",
  "image": "assets/milkshakes/morango.webp",
  "options": [
    { "label": "300 ml", "price": 12 },
    { "label": "400 ml", "price": 14 },
    { "label": "500 ml", "price": 16 }
  ],
  "unit": "copo"
}
```

**Importante:** mantenha o `id` de produtos existentes para evitar duplicação ou perda de referência. Para novo produto, crie um identificador único e mantenha JSON/JavaScript válido.

## 2. Foto nova

1. Envie `morango.webp` para a pasta `assets/milkshakes/` do repositório.
2. No campo `image`, informe `assets/milkshakes/morango.webp` (o caminho real).
3. Salve e publique. O texto de ajuda do formulário não substitui o caminho real da imagem.
4. Se a foto antiga continuar, recarregue com `Ctrl + F5` e confira o nome e a extensão (maiúsculas/minúsculas importam).

## 3. Frases e imagens da capa

Edite `js/conteudo-site.js`. Ajuste os textos e o caminho da imagem de capa, preservando o nome das propriedades.

## 4. Cores

As variáveis de tema ficam no começo de `css/style.css`. O cardápio usa `css/catalogo.css`.

## 5. Fluxo seguro

Antes de editar uma instalação ativa, use o backup do PDV. Publique e teste: login, abrir/fechar caixa, venda, milk-shake, sorvete por quilo, impressão, relatório, backup e cardápio. **Não substitua valores do armazenamento local diretamente** para sincronizar o GitHub.

## 6. Estrutura de código

- HTML: estrutura de cada página.
- CSS: aparência e impressão.
- JavaScript: lógica e cadastro.
- `docs/historico/`: orientações antigas, não carregadas pelo site.
- `tools/`: scripts de verificação, não carregados pelo site.
