export function updateStickyTableHeader() {
    var agg = document.getElementById('agg')
    var els = document.querySelectorAll('#agg ul.table li.header')
    if (els.length == 0) return;
    var el = els[0] as HTMLElement

    var dup = document.getElementById('agg-dup-table-header')
    if (!dup) {
        dup = document.createElement('ul')
        dup.id = 'agg-dup-table-header'
        dup.classList.add('dup')
        dup.classList.add('header')

        var ul = el.parentElement
        ul.parentElement.insertBefore(dup, ul)

        dup.innerHTML = '<li class="header">' + el.innerHTML + '</li>'
    }

    var li = dup.querySelector('li')
    for (var i = 0; i < li.children.length; i++) {
        var orig = el.children[i] as HTMLElement
        var ch = li.children[i] as HTMLElement
        ch.style.minWidth = orig.offsetWidth + 'px'
        ch.style.maxWidth = orig.offsetWidth + 'px'
        ch.style.width = orig.offsetWidth + 'px'
    }

    if (window.pageYOffset > el.offsetTop)
        dup.classList.add('sticky')
    else
        dup.classList.remove('sticky')

    dup.style.marginLeft = (-1 * agg.scrollLeft - 25 /*check css*/) + 'px';
}

export function updateStickyTableColumn() {
    var agg = document.getElementById('agg')

    var els = document.querySelectorAll('#agg ul.table li p.name')
    if (els.length == 0) return;
    var els0 = els[0] as HTMLElement

    var tables = document.querySelectorAll('#agg ul.table')
    if (tables.length == 0) return;
    var table = tables[0] as HTMLElement

    var dup = document.getElementById('agg-dup-table-column')
    if (!dup) {
        dup = document.createElement('ul')
        dup.id = 'agg-dup-table-column'
        dup.classList.add('dup')
        dup.classList.add('column')

        table.parentElement.insertBefore(dup, table)

        let s = ''
        for (let i = 0; i < els.length; i++) {
            let el = els[i] as HTMLElement
            let li = el.parentElement
            let darken = li.classList.contains('row') ? 'darken' : ''
            s += `<li class="${li.className}"><p class="name ${darken}">${els[i].innerHTML}</p></li>`
        }
        dup.innerHTML = s
    }

    var widthPx = els0.offsetWidth + 'px'
    dup.style.width = widthPx
    dup.style.minWidth = widthPx
    dup.style.maxWidth = widthPx

    var lis = dup.querySelectorAll('li')
    for (var i = 0; i < lis.length; i++) {
        var orig = els[i] as HTMLElement
        var ch = lis[i] as HTMLElement
        ch.style.minWidth = widthPx
        ch.style.maxWidth = widthPx
        ch.style.width = widthPx
        ch.style.minHeight = orig.offsetHeight + 'px'
        ch.style.maxHeight = orig.offsetHeight + 'px'
        ch.style.height = orig.offsetHeight + 'px'
    }

    if (agg.scrollLeft > els0.offsetLeft)
        dup.classList.add('sticky')
    else
        dup.classList.remove('sticky')

    dup.style.top = table.offsetTop + 'px'
}