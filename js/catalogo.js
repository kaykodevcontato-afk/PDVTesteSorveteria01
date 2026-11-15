/*
 * CATÁLOGO — FILTROS, FOTOS, TEMA, IMPRESSÃO E EXPORTAÇÃO.
 * Alterações de conteúdo: js/conteudo-site.js e js/cardapio-dados.js.
 * Não altera o banco do PDV nem o localStorage do caixa.
 */
(() => {
    'use strict';
    const data = window.CARDAPIO_DADOS;
    const site = window.SORVETERIA_SITE || {};
    const $ = id => document.getElementById(id);
    const money = value => Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    });
    const clean = text => String(text || '').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const placeholder = 'assets/sem-foto.svg';
    if (!data || !Array.isArray(data.categories)) {
        $('catalogSections').textContent = 'Não foi possível carregar os produtos. Confira js/cardapio-dados.js.';
        return;
    }
    function text(selector, value) {
        const element = document.querySelector(selector);
        if (element && value !== undefined)
            element.textContent = value;
    }
    function updateTexts() {
        text('.brand strong', site.nome);
        text('.footer-inner > div > strong', site.nome ? `🍦 ${site.nome}` : undefined);
        text('.brand small', site.subtitulo);
        text('.hero .eyebrow', site.frase);
        text('#heroTitle', site.tituloPrincipal);
        const emphasis = document.createElement('em');
        emphasis.textContent = site.tituloDestaque || 'delicioso!';
        $('heroTitle').append(' ', emphasis);
        text('.hero-copy > p', site.descricao);
        text('#browseTitle', site.chamadaProdutos);
        text('.browse-title p', site.descricaoProdutos);
        text('.footer-inner > div > span', site.chamadaRodape);
        const img = document.querySelector('.hero > img');
        if (img) {
            img.src = site.fotoCapa || placeholder;
            img.onerror = () => { img.onerror = null; img.src = placeholder; };
        }
        const note = document.querySelector('.info-note');
        if (note && site.aviso) {
            note.textContent = '';
            const strong = document.createElement('strong');
            strong.textContent = 'Observação: ';
            note.append(strong, document.createTextNode(site.aviso));
        }
        document.title = `Cardápio | ${site.nome || 'Sorveteria'} — Dev Kayko`;
    }
    // Preços da faixa de destaques são lidos do próprio cadastro,
    // para não ficar um valor antigo após editar js/cardapio-dados.js.
    function updateHighlights() {
        const groups = ['picoles-tradicionais', 'sorvete-por-quilo',
            'milk-shakes-tradicionais', 'mini-paleta-premium'];
        const targets = document.querySelectorAll('.highlights article strong');
        groups.forEach((id, index) => {
            const item = data.categories.find(group => group.id === id)?.items?.[0];
            const amount = item?.options?.[0]?.price ?? item?.price;
            if (targets[index] && Number.isFinite(Number(amount))) {
                targets[index].textContent = money(amount);
            }
        });
    }

    function priceText(item) {
        if (Array.isArray(item.options) && item.options.length) {
            return item.options.map(opt => `${opt.label}: ${money(opt.price)}`).join(' · ');
        }
        if (typeof item.price === 'number') {
            return `${money(item.price)}${item.unit === 'kg' ? ' / kg' : ''}`;
        }
        return 'Consulte o preço';
    }
    function iconButton(label, className) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.textContent = label;
        return button;
    }
    function makeImage(item) {
        const img = document.createElement('img');
        img.src = item.image || placeholder;
        img.alt = `Foto ilustrativa: ${item.name}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = () => {
            img.onerror = null;
            img.src = placeholder;
            img.alt = `Foto não cadastrada: ${item.name}`;
        };
        return img;
    }
    let lastFocus = null;
    function openLightbox(item) {
        const modal = $('lightbox');
        lastFocus = document.activeElement;
        const img = $('lightboxImage');
        img.src = item.image || placeholder;
        img.alt = `Foto ilustrativa: ${item.name}`;
        img.onerror = () => { img.onerror = null; img.src = placeholder; };
        $('lightboxTitle').textContent = item.name;
        $('lightboxPrice').textContent = priceText(item);
        modal.hidden = false;
        document.body.classList.add('lightbox-open');
        $('closeLightbox').focus();
    }
    function closeLightbox() {
        $('lightbox').hidden = true;
        document.body.classList.remove('lightbox-open');
        lastFocus?.focus?.();
    }
    function createProductCard(item) {
        const card = document.createElement('article');
        card.className = 'product-card';
        const photoButton = iconButton('', 'product-photo');
        photoButton.setAttribute('aria-label', `Ampliar foto de ${item.name}`);
        photoButton.append(makeImage(item));
        photoButton.addEventListener('click', () => openLightbox(item));
        const info = document.createElement('div');
        info.className = 'product-info';
        const title = document.createElement('h3');
        title.textContent = item.name;
        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = priceText(item);
        info.append(title, price);
        card.append(photoButton, info);
        return card;
    }
    const categories = data.categories;
    const select = $('categorySelect');
    const chips = $('categoryChips');
    let category = 'all';
    for (const item of categories) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.append(option);
    }
    function updateChipSelection() {
        for (const button of chips.querySelectorAll('button')) {
            button.classList.toggle('selected', button.dataset.category === category);
            button.setAttribute('aria-pressed', String(button.dataset.category === category));
        }
    }
    function addChip(label, id) {
        const button = iconButton(label, 'category-chip');
        button.dataset.category = id;
        button.addEventListener('click', () => {
            category = id;
            select.value = id;
            updateChipSelection();
            render();
        });
        chips.append(button);
    }
    addChip('Todos os produtos', 'all');
    for (const item of categories)
        addChip(item.name, item.id);
    updateChipSelection();
    function render() {
        const query = clean($('searchProducts').value);
        const root = $('catalogSections');
        root.replaceChildren();
        let count = 0;
        for (const group of categories) {
            if (category !== 'all' && category !== group.id)
                continue;
            const items = group.items.filter(item => clean([
                item.name, group.name, item.unit,
                ...(item.options || []).map(option => option.label)
            ].join(' ')).includes(query));
            if (!items.length)
                continue;
            count += items.length;
            const section = document.createElement('section');
            section.className = 'menu-section';
            section.id = `categoria-${group.id}`;
            const header = document.createElement('div');
            header.className = 'menu-section-head';
            const name = document.createElement('h2');
            name.textContent = group.name;
            const counter = document.createElement('span');
            counter.className = 'menu-section-count';
            counter.textContent = `${items.length} ${items.length === 1 ? 'opção' : 'opções'}`;
            header.append(name, counter);
            if (group.priceLabel) {
                const hint = document.createElement('strong');
                hint.className = 'menu-section-price';
                hint.textContent = group.priceLabel;
                header.append(hint);
            }
            section.append(header);
            if (group.note) {
                const note = document.createElement('p');
                note.className = 'menu-section-note';
                note.textContent = group.note;
                section.append(note);
            }
            const grid = document.createElement('div');
            grid.className = 'product-grid';
            for (const item of items)
                grid.append(createProductCard(item));
            section.append(grid);
            root.append(section);
        }
        $('menuCount').textContent = `${count} ${count === 1 ? 'produto' : 'produtos'}`;
        $('emptyState').hidden = count !== 0;
    }
    $('searchProducts').addEventListener('input', render);
    select.addEventListener('change', () => {
        category = select.value;
        updateChipSelection();
        render();
    });
    $('resetFilters').addEventListener('click', () => {
        $('searchProducts').value = '';
        category = 'all';
        select.value = category;
        updateChipSelection();
        render();
        $('searchProducts').focus();
    });
    const THEME_KEY = 'devkayko_catalogo_tema';
    function setTheme(theme) {
        const actual = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.dataset.theme = actual;
        $('themeText').textContent = actual === 'dark' ? 'Claro' : 'Escuro';
        try {
            localStorage.setItem(THEME_KEY, actual);
        }
        catch (_) { /* tema opcional */ }
    }
    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    }
    catch (_) { /* navegador restrito */ }
    setTheme(savedTheme);
    $('toggleTheme').addEventListener('click', () => {
        setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    $('printMenu').addEventListener('click', () => window.print());
    $('exportMenu').addEventListener('click', () => {
        const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'catalogo-produtos.json';
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $('closeLightbox').addEventListener('click', closeLightbox);
    document.querySelectorAll('[data-close-lightbox]').forEach(el => {
        el.addEventListener('click', closeLightbox);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !$('lightbox').hidden)
            closeLightbox();
    });
    updateTexts();
    updateHighlights();
    render();
})();
