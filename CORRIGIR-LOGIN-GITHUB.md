# Correção do login — Sorveteria 1.2.4

Esta atualização preserva dados, vendas, produtos e fotos do navegador e do seu projeto.

## Enviar pelo GitHub

1. Faça backup do PDV se houver registros importantes e **não apague o armazenamento do navegador**.
2. No repositório, substitua apenas estes arquivos pelos da atualização:
   - `index.html` (raiz)
   - `js/access.js`
   - `js/app.js`
3. Salve com Commit changes, aguarde o GitHub Pages atualizar, abra o site **sem parâmetros na URL** e pressione Ctrl + F5.
4. Faça um teste com uma nova senha de acesso. A senha antiga foi exposta em uma URL e deve ser substituída. Se esquecer a senha, use o código de recuperação, se disponível; não apague o localStorage.

## O que esta correção faz

- Bloqueia o envio nativo do formulário para que senha e confirmação não apareçam na URL, mesmo se a inicialização falhar.
- Instala o evento de login antes dos demais eventos do PDV.
- Mostra um aviso explícito se o código do login não iniciar, evitando a navegação silenciosa com a senha na URL.

**Limites**: A correção é preventiva, baseada na inspeção do código publicado. O erro exato do console no navegador do usuário não foi disponibilizado. A autenticação permanece local ao navegador; GitHub Pages não é backend de autenticação.
