/* Interface local opcional: edita uma cópia em memória, depois exporta JS para Commit no GitHub. */
(() => {
  'use strict';
  const source = window.CARDAPIO_DADOS;
  if (!source || !Array.isArray(source.categories)) return;
  const data = structuredClone(source);
  const $ = id => document.getElementById(id);
  const category = $('category');
  const form = $('edit');
  let selected = null;
  const slug = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const group = () => data.categories.find(g => g.id === category.value);
  function categories() {
    category.replaceChildren();
    for (const item of data.categories) {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      category.append(option);
    }
  }
  function items() {
    $('items').replaceChildren();
    for (const item of group()?.items || []) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `${item.name}${item.soldOut ? ' • ESGOTADO' : ''}`;
      btn.classList.toggle('selected', item.id === selected?.id);
      btn.onclick = () => select(item);
      $('items').append(btn);
    }
  }
  function select(item) {
    selected = item;
    $('empty').hidden = true;
    form.hidden = false;
    form.elements.name.value = item.name || '';
    form.elements.id.value = item.id || '';
    form.elements.image.value = item.image || '';
    form.elements.price.value = item.price ?? '';
    form.elements.options.value = (item.options || []).map(o => `${o.label}: ${o.price}`).join('; ');
    form.elements.soldOut.value = String(Boolean(item.soldOut));
    preview();
    items();
  }
  function preview() {
    const image = form.elements.image.value.trim();
    $('imagePath').textContent = image;
    $('preview').src = image || 'assets/sem-foto.svg';
    $('preview').onerror = () => { $('preview').onerror = null; $('preview').src = 'assets/sem-foto.svg'; };
  }
  function flash(message) { $('notice').textContent = message; }
  category.onchange = () => { selected = null; form.hidden = true; $('empty').hidden = false; items(); };
  $('add').onclick = () => {
    const g = group();
    if (!g) return;
    const name = prompt('Nome do novo sabor ou produto:');
    if (!name?.trim()) return;
    let id = `${g.id}-${slug(name)}`;
    let n = 2;
    while (data.categories.some(c => c.items.some(i => i.id === id))) id = `${g.id}-${slug(name)}-${n++}`;
    const item = {id, name: name.trim(), image: '', price: 0, unit: 'unidade'};
    if (g.id === 'sorvete-por-quilo') {item.price = Number(data.pricePerKg) || 0;item.unit = 'kg';}
    if (g.id.startsWith('milk-shakes')) {delete item.price;item.unit = 'copo';item.options = [{label:'300 ml',price:12},{label:'400 ml',price:14},{label:'500 ml',price:16}];}
    g.items.push(item);
    select(item);
    flash('Novo produto adicionado à cópia. Edite e baixe o arquivo para publicar.');
  };
  form.elements.image.addEventListener('input', preview);
  form.onsubmit = event => {
    event.preventDefault();
    if (!selected) return;
    const name = form.elements.name.value.trim();
    if (!name) return;
    const photo = form.elements.image.value.trim();
    if (photo && !/^assets\/[a-z\d/_-]+\.(png|jpe?g|webp|svg)$/i.test(photo)) {alert('Use caminho em assets/ e extensão JPG, PNG, SVG ou WebP.');return;}
    const sizeText = form.elements.options.value.trim();
    let options = [];
    if (sizeText) {
      for (const part of sizeText.split(';')) {
        const match = part.trim().match(/^(.+?):\s*(\d+(?:[.,]\d{1,2})?)$/);
        if (!match) {alert('Formato inválido. Exemplo: 300 ml: 12; 400 ml: 14');return;}
        options.push({label:match[1].trim(),price:Number(match[2].replace(',','.'))});
      }
    }
    selected.name = name;
    selected.image = photo;
    selected.soldOut = form.elements.soldOut.value === 'true';
    if (options.length) {selected.options=options;delete selected.price;}
    else {delete selected.options;selected.price=Number(form.elements.price.value)||0;}
    items(); flash('Alteração aplicada. Clique em Baixar cadastro atualizado e publique no GitHub.');
  };
  $('delete').onclick = () => {
    if (!selected || !confirm(`Excluir ${selected.name} do catálogo publicado? (Vendas antigas do PDV não serão excluídas)`)) return;
    group().items = group().items.filter(i => i !== selected);
    selected = null;
    form.hidden = true;
    $('empty').hidden = false;
    items();
    flash('Exclusão aplicada à cópia. Publique o novo arquivo.');
  };
  $('export').onclick = () => {
    const js = '/* Cadastro unificado — edite aqui ou use editor-produtos.html */\nwindow.CARDAPIO_DADOS = ' + JSON.stringify(data, null, 2) + ';\n';
    const url = URL.createObjectURL(new Blob([js], {type:'text/javascript;charset=utf-8'}));
    const a = document.createElement('a');
    a.href = url; a.download = 'cardapio-dados.js'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    flash('Arquivo criado. Substitua js/cardapio-dados.js no repositório GitHub.');
  };
  $('reset').onclick = () => {if (confirm('Descartar alterações não publicadas?')) location.reload();};
  categories();
  category.onchange();
})();
