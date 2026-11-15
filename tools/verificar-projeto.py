"""Verifica referências HTML e indica fotos do catálogo que faltam.
Execute da raiz: python tools/verificar-projeto.py
Somente biblioteca padrão do Python 3, não altera nenhum arquivo.
"""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


class HtmlReferences(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        if tag in ('script', 'img', 'source') and props.get('src'):
            self.links.append(props['src'])
        if tag in ('a', 'link') and props.get('href'):
            self.links.append(props['href'])


def valid_local(path):
    return path and not path.startswith(('#', 'data:', 'mailto:', 'tel:', '//', 'http:', 'https:', 'javascript:'))


def main():
    errors = []
    for html in [ROOT / 'index.html', ROOT / 'catalogo.html', ROOT / 'dev-kayko/index.html']:
        parser = HtmlReferences()
        parser.feed(html.read_text(encoding='utf-8'))
        for href in parser.links:
            if not valid_local(href):
                continue
            item = href.split('#', 1)[0].split('?', 1)[0]
            if item and not (html.parent / item).is_file():
                errors.append(f'{html.relative_to(ROOT)} -> NÃO ENCONTRADO: {item}')

    # Source is editable JS; extract literal object that is also valid JSON.
    source = (ROOT / 'js/cardapio-dados.js').read_text(encoding='utf-8')
    match = re.search(r'window\.CARDAPIO_DADOS\s*=\s*(\{[\s\S]+\})\s*;\s*$', source)
    photos = []
    if not match:
        errors.append('js/cardapio-dados.js: não localizei o objeto de produtos.')
    else:
        try:
            data = json.loads(match.group(1))
            for group in data.get('categories', []):
                for item in group.get('items', []):
                    photo = item.get('image', '')
                    if photo and not (ROOT / photo).is_file():
                        photos.append((item.get('name', '?'), photo))
        except json.JSONDecodeError as exc:
            errors.append(f'Erro nos dados de produtos: {exc}')

    if errors:
        print('ERROS (precisam de correção):')
        for error in errors:
            print('  -', error)
    else:
        print('OK: páginas HTML e referências de scripts e CSS encontradas.')
    print(f'AVISO: {len(photos)} fotos do catálogo ainda não foram incluídas (placeholder automático).')
    for name, photo in photos[:10]:
        print(f'  - {name}: {photo}')
    if len(photos) > 10:
        print(f'  ... e outras {len(photos)-10}. Veja docs/LISTA-FOTOS.csv')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
