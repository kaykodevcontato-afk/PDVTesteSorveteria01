# Como editar fotos, textos e preços

## 1. Alterar os textos do cardápio

Abra `js/conteudo-site.js`. Altere **somente o texto entre aspas**:

```javascript
window.SORVETERIA_SITE = {
    nome: 'Sorveteria',
    tituloPrincipal: 'Seu momento mais',
    tituloDestaque: 'delicioso!',
    fotoCapa: 'assets/picoles/morango.webp'
    // Os demais campos também são editáveis.
};
```

**Importante:** no arquivo real, mantenha todos os campos e todas as vírgulas existentes.

## 2. Trocar a foto de um sabor

Copie a imagem para a pasta indicada dentro de `assets/`. Por exemplo:

```text
assets/milkshakes/morango.webp
```

Abra `js/cardapio-dados.js`, pesquise o produto e altere somente o campo `image`:

```javascript
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

Use nomes simples, sem espaços nem acentos, como `morango.webp`, e preserve a extensão real (JPG, PNG ou WebP). O caminho distingue maiúsculas e minúsculas no GitHub: `Brigadeiro.webp` não é igual a `brigadeiro.webp`.

**Não precisa substituir todos os arquivos de uma vez:** as fotos faltantes exibem uma imagem provisória. Confira `docs/LISTA-FOTOS.csv` para saber os caminhos atuais.

## 3. Alterar o preço do cardápio

No mesmo arquivo `js/cardapio-dados.js`, edite `price` ou os valores de `options`:

```javascript
"name": "Morango",
"price": 2,
"unit": "unidade"
```

Separe centavos com ponto (por exemplo, `12.50`) e não inclua `R$` nos campos numéricos. Se mudar o preço, revise também o rótulo `priceLabel` da categoria, se necessário.

## 4. Cadastrar um novo produto

No arquivo `js/cardapio-dados.js`, localize `categories`, entre em `items` da categoria desejada e copie um bloco completo do produto. Adapte o `id` para um valor único (sem espaços), `name`, `image`, `price` e `unit`. Preserve vírgulas entre os objetos. O navegador passa a exibir o item automaticamente.

## 5. Alterar o layout

- `css/catalogo.css`: começa pelas variáveis `:root` (cor do fundo, cor da marca, texto e bordas).
- `css/style.css`: variáveis de cor do PDV em `:root`; demais regras estão agrupadas com comentários.
- `catalogo.html`: apenas estrutura da vitrine; não é necessário duplicar cartões manualmente.
- `index.html`: telas do PDV divididas pelos comentários numerados e `id="page-..."`.

## 6. Fotos e preços do PDV principal

O PDV é independente do catálogo público. Para alterar produtos e preços de uma instalação existente, use o painel **Dono → Produtos e Estoque** ou **Sabores e preços**. `js/data.js` define valores iniciais para novas instalações; modificá-lo não garante alterar registros existentes no navegador.

Para fotos de milk-shakes use `assets/milkshakes/`, para fotos de sorvete `assets/sabores/` e para picolés `assets/picoles/`. Você pode indicar o caminho no painel do dono. Foto enviada diretamente pelo computador via painel pode ficar somente no dispositivo e requer backup/restauração, sem publicação automática no GitHub.

## 7. Salvar e conferir

Salve os arquivos (`Ctrl + S`). Com a página aberta no navegador, pressione `Ctrl + F5`. No GitHub, o nome da pasta, letras maiúsculas/minúsculas e extensão da imagem precisam coincidir. Abra o Console (F12) se houver erro.
