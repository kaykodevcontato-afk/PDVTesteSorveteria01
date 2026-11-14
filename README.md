# Sorveteria Manager 1.2.1 — correção de catálogo e backup completo

**Desenvolvido por Dev Kayko.** Projeto estático para GitHub Pages, sem servidor.

## Correções da versão 1.2.1

- Corrigida a falha que deixava o catálogo e os relatórios vazios: dois indicadores inexistentes interrompiam a renderização.
- Produtos e cards são carregados antes das seções administrativas; um problema em RH ou relatórios deixa de interromper o catálogo.
- Mantidos todos os produtos, 12 sabores por quilo, 14 sabores de milk-shake, fotos, funcionários, perfis, relatórios e backup JSON existentes.
- Nova opção **Configurações → Backup completo ZIP + fotos + Excel**.
- Nova opção **Configurações → Restaurar backup completo ZIP**.

## Tipos de backup

**Backup JSON:** cópia de todas as informações que o navegador armazena, inclusive foto da logo quando escolhida no site. Fotografias hospedadas na pasta `assets` são referenciadas por caminho, não embutidas no JSON.

**Backup completo ZIP (recomendado):**

- `dados/sorveteria.json`: vendas, produtos, estoque, funcionários, salários, metas, caixa, configurações, logo, fotos referenciadas, favoritos e fechamento.
- `relatorios/historico-completo.xlsx`: planilha Excel com todas as movimentações.
- `relatorios/relatorio-para-imprimir.html`: histórico completo para imprimir ou salvar em PDF pelo navegador.
- `assets/`: cópia das fotos referenciadas e que estiverem acessíveis no momento do backup.
- `LEIA-ME.txt`: quantidade de imagens copiadas e caminhos de fotos que não foram encontradas.

O backup informa se alguma foto está ausente. Fotos apontando para sites externos ou URLs fora das pastas `assets/picoles`, `assets/sabores`, `assets/milkshakes`, `assets/paletas` e `assets/produtos` não são copiadas. A logo cadastrada pelo site está incluída no JSON.

A restauração ZIP guarda as fotos do arquivo no **IndexedDB deste navegador**, usando as mesmas referências no sistema. Ela não altera o repositório GitHub e não sincroniza outros dispositivos. Para publicar fotos restauradas em outro dispositivo, envie também a pasta `assets` do ZIP ao GitHub ou restaure o ZIP naquele dispositivo.

**Faça backup antes de atualizar ou restaurar.** A restauração substitui registros locais, inclusive vendas, senhas e estoque. O ZIP pode conter salários e outras informações privadas: guarde-o em local seguro.

## Atualizar no GitHub

1. Não limpe cache de dados nem armazenamento antes de fazer backup.
2. Envie todos os arquivos do ZIP do projeto para seu repositório GitHub Pages (não confunda com o ZIP de backup de dados).
3. Preserve as pastas `css`, `js`, `assets` e `dev-kayko`.
4. Atualize usando `Ctrl + F5` para buscar os scripts novos.
5. Entre como dono e confira produtos, relatório, Excel e backup completo.

## Estrutura

`index.html` interface; `css/style.css` visual e impressão; `js/app.js` PDV/relatórios; `js/data.js` armazenamento; `js/backup.js` exportação/restauração ZIP; `js/excel.js` planilhas; demais arquivos JS para senhas, funcionários, sabores e milk-shakes.

### Limitações

A restauração foi preparada para navegadores com suporte a IndexedDB (Chrome e Edge modernos). Um teste real de restauração no GitHub Pages ainda é recomendado. A impressão Bluetooth de 58 mm depende do modelo/driver. A proteção por senha é local e não substitui uma autenticação por servidor.

## Versão 1.2.4 — Comprovantes

O título impresso nas vias foi alterado de “COMPROVANTE NÃO FISCAL” para **“COMPROVANTE DE VENDA”**. Essa mudança não transforma o documento em nota fiscal.


## v1.2.4 — Impressão e calendários

- Impressão de relatórios e comprovantes em fundo branco e texto preto, mesmo com o modo escuro ativado.
- Campos de data, mês e horários acompanhando as cores e contornos do tema claro/escuro. O pop-up de calendário é nativo do navegador e pode variar conforme Windows/Android e navegador.
- Estilos da impressão A4 e térmica de 58 mm, assim como as margens anteriores, preservados.
- Atualização somente visual: para atualizar a versão 1.2.2, substitua apenas `css/style.css`.


## Versão 1.2.4 — Fotos locais e salvar backup em pasta escolhida

- Para adicionar a foto de um **produto** ou **sabor por quilo**, entre no painel do dono, clique em Editar e escolha a imagem diretamente do computador (PNG, JPG, WebP). Para **milk-shakes**, use a opção Foto do computador em Sabores e preços.
- As imagens são compactadas em WebP, sem corte, e armazenadas no **IndexedDB** do navegador. O caminho salvo no cadastro é virtual, como `assets/produtos/local-xxx.webp`. Não é necessário publicar a foto no repositório.
- Imagens salvas localmente só estarão disponíveis no **mesmo navegador e dispositivo**. Ao mudar de dispositivo, exporte e restaure o **backup completo ZIP**, que inclui as fotos disponíveis. Não limpe os dados do site antes de fazer backup.
- O backup completo oferece uma janela **Salvar como** no Chrome/Edge compatível, em que você pode escolher pasta e nome. Nos navegadores incompatíveis, o arquivo será baixado pela configuração normal de downloads do navegador.
- O documento LEIA-ME do backup não expõe informações sobre a hospedagem ou sobre GitHub. O backup continua guardando dados potencialmente sensíveis, como salários e vendas; salve-o em local seguro.
- **Limitação:** GitHub Pages não transforma o computador em servidor. As fotos locais não são sincronizadas entre dispositivos nem enviadas automaticamente a qualquer serviço. Para servir fotos para outras máquinas continuamente, seria necessária uma aplicação local ou servidor adicional.
