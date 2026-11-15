/*
 * SORVETERIA MANAGER — MILK-SHAKES
 * Catálogo separado em tradicionais e especiais.
 * Preços/fotos editáveis pelo dono. As vendas usam o carrinho e o histórico existentes.
 */
'use strict';
let milkType = 'tradicional';
let milkFlavor = '';
const milkTypes = { tradicional: 'Tradicional', especial: 'Especial' };
function milkPrice() {
    const flavor = db.milkshakes.flavors.find(f => f.type === milkType && f.name === milkFlavor);
    const option = flavor?.options?.find(o => String(o.label).includes(String($('milkSize').value)));
    const amount = Number(option ? option.price : db.milkshakes.prices[milkType][String($('milkSize').value)]);
    return Number.isFinite(amount) && amount > 0 ? amount : 0;
}
function milkPhotoMarkup(flavor) {
    // A foto pode ser um arquivo publicado ou uma imagem local restaurada/importada.
    const image = String(flavor.image || '').trim();
    if (!image)
        return '<span class="milk-photo milk-no-photo"><span>📷</span><small>Sem foto</small></span>';
    return `<span class="milk-photo"><img src="${esc(image)}" alt="Foto de ${esc(flavor.name)}" loading="lazy" onerror="this.parentElement.classList.add('milk-no-photo');this.remove()"><span class="milk-fallback">📷<small>Sem foto</small></span></span>`;
}
function renderMilkshakes() {
    const panel = $('milkPanel');
    if (!panel)
        return;
    const flavors = db.milkshakes.flavors.filter(f => f.type === milkType);
    if (!flavors.some(f => f.name === milkFlavor && !f.soldOut))
        milkFlavor = '';
    panel.querySelectorAll('[data-milk-type]').forEach(b => {
        const selected = b.dataset.milkType === milkType;
        b.classList.toggle('selected', selected);
        b.setAttribute('aria-pressed', String(selected));
    });
    $('milkFlavorCards').innerHTML = flavors.map(f => `<button type="button" class="milk-flavor-card ${milkFlavor === f.name ? 'chosen' : ''} ${f.soldOut ? 'flavor-sold-out' : ''}" data-milk-flavor="${esc(f.name)}" aria-pressed="${milkFlavor === f.name}" ${f.soldOut ? 'disabled aria-disabled="true"' : ''}>${milkPhotoMarkup(f)}<span class="milk-flavor-name">${esc(f.name)}${f.soldOut ? '<span class="sold-out-chip">ESGOTADO</span>' : ''}</span></button>`).join('');
    const qty = Number($('milkQty').value);
    const valid = Number.isInteger(qty) && qty >= 1 && qty <= 99;
    const price = milkPrice();
    const total = valid ? Math.round(price * qty * 100) / 100 : 0;
    $('milkTotal').textContent = money(total);
    $('milkSelectedDescription').textContent = milkFlavor ? `${milkTypes[milkType]} • ${milkFlavor} • ${$('milkSize').value} ml • ${money(price)}/un.` : 'Selecione um sabor';
    $('milkAdd').disabled = !milkFlavor || !valid || !price;
}
function addMilkshakeToCart() {
    const qty = Number($('milkQty').value);
    if (!milkFlavor || !Number.isInteger(qty) || qty < 1 || qty > 99)
        return toast('Selecione o sabor e uma quantidade válida.');
    if (!db.milkshakes.flavors.some(f => f.type === milkType && f.name === milkFlavor && !f.soldOut))
        return toast('Este sabor está esgotado.');
    const size = Number($('milkSize').value), price = milkPrice();
    if (!price)
        return toast('O preço precisa ser configurado pelo dono.');
    cart.push({ kind: 'milkshake', id: uid(), name: `Milk-shake ${milkTypes[milkType]} · ${milkFlavor} · ${size} ml`, milkType, flavor: milkFlavor, size, unit: 'un.', qty, price, cost: 0 });
    $('milkQty').value = '1';
    milkFlavor = '';
    renderMilkshakes();
    renderCart();
    toast('Milk-shake adicionado ao carrinho.');
}
function renderMilkshakeAdmin() {
    if (!Access.isOwner() || !$('milkFlavorAdmin'))
        return;
    $('milkPriceInputs').innerHTML = Object.keys(milkTypes).map(type => `<fieldset class="milk-price-fieldset"><legend>${milkTypes[type]}</legend><div class="milk-price-grid">${[300, 400, 500].map(size => `<label>${size} ml (R$)<input name="price-${type}-${size}" type="number" step="0.01" min="0.01" required value="${db.milkshakes.prices[type][size]}"></label>`).join('')}</div></fieldset>`).join('');
    $('milkFlavorAdmin').innerHTML = Object.keys(milkTypes).map(type => `<section>
        <h4>Sabores — ${milkTypes[type]}</h4>
        <div class="milk-admin-grid">${db.milkshakes.flavors.filter(f => f.type === type).map(f => `<div class="milk-admin-card">
            ${milkPhotoMarkup(f)}<strong>${esc(f.name)}</strong>
            <span class="${f.soldOut ? 'sold-out-chip' : 'milk-available-chip'}">${f.soldOut ? 'ESGOTADO' : 'DISPONÍVEL'}</span>
            <label>Caminho da foto<input type="text" data-milk-photo="${esc(type + '|' + f.name)}" placeholder="assets/milkshakes/arquivo.webp" maxlength="400" value="${esc(f.image || '')}"></label>
            <label class="milk-upload-label">Foto do computador<input type="file" accept="image/png,image/jpeg,image/webp" data-milk-upload="${esc(type + '|' + f.name)}"></label>
            <button type="button" class="btn btn-secondary" data-milk-save="${esc(type + '|' + f.name)}">Salvar foto</button>
            <button type="button" class="btn ${f.soldOut ? 'btn-secondary' : 'btn-danger'}" data-milk-status="${esc(type + '|' + f.name)}">${f.soldOut ? '✓ Marcar disponível' : '⛔ Marcar esgotado'}</button>
            <button type="button" class="btn btn-ghost" data-milk-delete="${esc(type + '|' + f.name)}">Excluir sabor</button>
        </div>`).join('')}</div></section>`).join('');
}
function bindMilkshakeEvents() {
    $('milkPanel').addEventListener('click', event => {
        const type = event.target.closest('[data-milk-type]');
        if (type) {
            milkType = type.dataset.milkType;
            milkFlavor = '';
            renderMilkshakes();
            return;
        }
        const flavor = event.target.closest('[data-milk-flavor]');
        if (flavor) {
            if (!db.milkshakes.flavors.some(f => f.type === milkType && f.name === flavor.dataset.milkFlavor && !f.soldOut)) return;
            milkFlavor = flavor.dataset.milkFlavor;
            renderMilkshakes();
        }
    });
    $('milkSize').addEventListener('change', renderMilkshakes);
    $('milkQty').addEventListener('input', renderMilkshakes);
    $('milkAdd').addEventListener('click', addMilkshakeToCart);
    $('milkPricesForm').addEventListener('submit', event => {
        event.preventDefault();
        if (!Access.requireOwner())
            return;
        const newPrices = {};
        for (const type of Object.keys(milkTypes)) {
            newPrices[type] = {};
            for (const size of [300, 400, 500]) {
                const price = Number(event.currentTarget.elements.namedItem(`price-${type}-${size}`).value);
                if (!Number.isFinite(price) || price <= 0 || price >= 100000)
                    return toast('Informe preços válidos, maiores que zero.');
                newPrices[type][size] = Math.round(price * 100) / 100;
            }
        }
        if (commit(() => { db.milkshakes.prices = newPrices; })) {
            render();
            toast('Preços de milk-shake atualizados.');
        }
    });
    $('newMilkFlavorForm').addEventListener('submit', async event => {
        event.preventDefault();
        if (!Access.requireOwner()) return;
        const form = event.currentTarget;
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton.disabled) return;
        const type = form.elements.namedItem('milkNewType').value;
        const name = form.elements.namedItem('milkNewName').value.trim();
        let image = form.elements.namedItem('milkNewImage').value.trim();
        const file = form.elements.namedItem('milkNewFile').files?.[0];
        if (!milkTypes[type] || !name || name.length > 120)
            return toast('Informe um tipo e um nome válido.');
        if (file && image)
            return toast('Escolha apenas uma opção: foto local ou caminho do GitHub.');
        if (image && !/^assets\/milkshakes\/[a-zA-Z0-9._-]+\.(webp|png|jpe?g)$/i.test(image))
            return toast('Caminho inválido. Use assets/milkshakes/foto.webp');
        if (db.milkshakes.flavors.some(f => f.type === type && f.name.toLocaleLowerCase('pt-BR') === name.toLocaleLowerCase('pt-BR')))
            return toast('Esse sabor já existe nessa categoria.');
        if (db.milkshakes.flavors.length >= 500) return toast('Limite de sabores atingido.');
        submitButton.disabled = true;
        try {
            if (file) image = await SorvBackup.saveLocalImage(file, 'milkshakes');
            if (commit(() => db.milkshakes.flavors.push({ type, name, image, soldOut: false }))) {
                form.reset();
                render();
                toast(file ? 'Sabor e foto salvos neste navegador. Inclua no Backup Completo.' : 'Novo milk-shake cadastrado. Já aparece na Frente de Caixa.');
            }
        } catch (error) {
            alert(error.message || 'Não foi possível salvar a foto.');
        } finally {
            submitButton.disabled = false;
        }
    });
    $('milkFlavorAdmin').addEventListener('click', event => {
        const statusBtn = event.target.closest('[data-milk-status]');
        const deleteBtn = event.target.closest('[data-milk-delete]');
        if ((statusBtn || deleteBtn) && Access.requireOwner()) {
            const [type, name] = (statusBtn || deleteBtn).dataset[statusBtn ? 'milkStatus' : 'milkDelete'].split('|');
            const flavor = db.milkshakes.flavors.find(f => f.type === type && f.name === name);
            if (!flavor) return;
            if (deleteBtn) {
                if (!confirm(`Excluir o sabor "${name}" do cadastro? As vendas antigas serão preservadas.`)) return;
                if (commit(() => { db.milkshakes.flavors = db.milkshakes.flavors.filter(f => f !== flavor); })) {
                    if (milkType === type && milkFlavor === name) milkFlavor = '';
                    render(); toast('Sabor excluído do cadastro.');
                }
            } else if (commit(() => { flavor.soldOut = !flavor.soldOut; })) {
                if (flavor.soldOut && milkType === type && milkFlavor === name) milkFlavor = '';
                render(); toast(`${name}: ${flavor.soldOut ? 'Esgotado' : 'Disponível'}`);
            }
            return;
        }
        const btn = event.target.closest('[data-milk-save]');
        if (!btn || !Access.requireOwner())
            return;
        const key = btn.dataset.milkSave;
        const input = [...$('milkFlavorAdmin').querySelectorAll('[data-milk-photo]')].find(el => el.dataset.milkPhoto === key);
        const [type, name] = key.split('|');
        const flavor = db.milkshakes.flavors.find(f => f.type === type && f.name === name);
        if (!input || !flavor)
            return;
        const image = input.value.trim();
        if (image && (!/^assets\/milkshakes\/[a-zA-Z0-9._-]+\.(webp|png|jpe?g)$/i.test(image)))
            return toast('Use caminho como assets/milkshakes/morango.webp');
        if (commit(() => { flavor.image = image; })) {
            render();
            toast('Caminho da foto atualizado.');
        }
    });
    $('milkFlavorAdmin').addEventListener('change', async (event) => {
        const picker = event.target.closest('[data-milk-upload]');
        if (!picker || !Access.requireOwner())
            return;
        const file = picker.files?.[0];
        if (!file)
            return;
        const key = picker.dataset.milkUpload;
        const [type, name] = key.split('|');
        const flavor = db.milkshakes.flavors.find(f => f.type === type && f.name === name);
        if (!flavor)
            return;
        picker.disabled = true;
        try {
            const path = await SorvBackup.saveLocalImage(file, 'milkshakes');
            if (commit(() => { flavor.image = path; })) {
                render();
                toast('Foto do milk-shake salva neste computador. Inclua no backup completo.');
            }
        }
        catch (error) {
            alert(error.message || 'Não foi possível salvar a foto.');
        }
        finally {
            picker.disabled = false;
        }
    });
    renderMilkshakes();
}
