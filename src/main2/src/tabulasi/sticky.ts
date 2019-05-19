function updateStickyTableRow(rowSelector: string, id: string, classList: string[], showFn: () => boolean) {
    var agg = document.getElementById('agg')
    var els = document.querySelectorAll(rowSelector)
    if (els.length == 0) return;
    var el = els[0] as HTMLElement
    var table = el.parentElement

    var idContainer = id + '-container'
    var container = document.getElementById(idContainer)
    var dup = document.getElementById(id)
    if (!dup) {
        container = document.createElement('div')
        container.id = idContainer
        container.classList.add('dup-container')
        classList.forEach((n) => container.classList.add(n))

        dup = document.createElement('table')
        dup.id = id
        classList.forEach((n) => dup.classList.add(n))

        if (table.tagName != 'table')
            table = table.parentElement

        container.appendChild(dup)
        table.parentElement.insertBefore(container, table)

        dup.innerHTML = `<tr class="${el.className}">${el.innerHTML}</tr>`
    }

    var tr = dup.querySelector('tr')
    for (var i = 0; i < tr.children.length; i++) {
        var orig = el.children[i] as HTMLElement
        var ch = tr.children[i] as HTMLElement
        ch.style.minWidth = orig.offsetWidth + 'px'
        ch.style.maxWidth = orig.offsetWidth + 'px'
        ch.style.width = orig.offsetWidth + 'px'
    }

    if (showFn()) {
        dup.classList.add('sticky')
        container.classList.add('sticky')
    }
    else {
        dup.classList.remove('sticky')
        container.classList.remove('sticky')
    }

    var tbody = dup.querySelector('tbody')
    tbody.style.marginLeft = (-1 * agg.scrollLeft) + 'px'
    container.style.left = agg.parentElement.offsetLeft + 'px'
    container.style.width = agg.parentElement.offsetWidth + 'px'
}

export function updateStickyTableHeader() {
    updateStickyTableRow(
        '#agg table.table tr.header',
        'agg-dup-table-header',
        ['dup', 'header'],
        () => {
            var table = document.querySelectorAll('#agg table.table')[0] as HTMLElement
            return window.pageYOffset > table.offsetTop
        })
}

export function updateStickyTableFooter() {
    updateStickyTableRow(
        '#agg table.table tr.footer',
        'agg-dup-table-footer',
        ['dup', 'footer'],
        () => {
            var table = document.querySelectorAll('#agg table.table')[0] as HTMLElement
            var footer = document.querySelectorAll('#agg table.table tr.footer')[0] as HTMLElement
            return table.offsetTop - window.pageYOffset + 180 < window.innerHeight && table.offsetTop + footer.offsetTop - window.pageYOffset + footer.offsetHeight > window.innerHeight
        })
}

export function updateStickyTableColumn() {
    var agg = document.getElementById('agg')

    var els = document.querySelectorAll('#agg table.table tr td.name')
    if (els.length == 0) return;
    var els0 = els[0] as HTMLElement

    var tables = document.querySelectorAll('#agg table.table')
    if (tables.length == 0) return;
    var table = tables[0] as HTMLElement

    var id = 'agg-dup-table-column'
    var idContainer = id + '-container'

    var container = document.getElementById(idContainer)
    var dup = document.getElementById(id)
    if (!container) {
        container = document.createElement('div')
        container.id = idContainer
        container.classList.add('dup-container')
        container.classList.add('column')

        dup = document.createElement('table')
        dup.id = id
        dup.classList.add('dup')
        dup.classList.add('column')

        container.appendChild(dup)
        table.parentElement.insertBefore(container, table)
    }
    let s = ''
    for (let i = 0; i < els.length; i++) {
            let el = els[i] as HTMLElement
            let tr = el.parentElement
            let darken = tr.classList.contains('row') ? 'darken' : ''
            s += `<tr class="${tr.className}"><td class="name ${darken}">${els[i].innerHTML}</td></tr>`
    }
    dup.innerHTML = s

    var widthPx = els0.offsetWidth + 'px'
    dup.style.width = widthPx
    dup.style.minWidth = widthPx
    dup.style.maxWidth = widthPx

    var trs = dup.querySelectorAll('tr')
    for (var i = 0; i < trs.length; i++) {
        var orig = els[i] as HTMLElement
        var ch = trs[i].children[0] as HTMLElement
        ch.style.minWidth = widthPx
        ch.style.maxWidth = widthPx
        ch.style.width = widthPx
        ch.style.minHeight = orig.offsetHeight + 'px'
        ch.style.maxHeight = orig.offsetHeight + 'px'
        ch.style.height = orig.offsetHeight + 'px'
    }

    if (agg.scrollLeft > els0.offsetLeft) {
        container.classList.add('sticky')
        dup.classList.add('sticky')
    }
    else {
        container.classList.remove('sticky')
        dup.classList.remove('sticky')
    }

    container.style.top = table.offsetTop - 2 /*why?*/ + 'px'
    container.style.left = agg.offsetLeft + 'px'
}

export function updateStickyTableCorner() {
    var agg = document.getElementById('agg')

    var els = document.querySelectorAll('#agg table.table tr.header td.name')
    if (els.length == 0) return;
    var els0 = els[0] as HTMLElement

    var tables = document.querySelectorAll('#agg table.table')
    if (tables.length == 0) return;
    var table = tables[0] as HTMLElement

    var id = 'agg-dup-table-corner'
    var idContainer = id + '-container'

    var container = document.getElementById(idContainer)
    var dup = document.getElementById(id)
    if (!container) {
        container = document.createElement('div')
        container.id = idContainer
        container.classList.add('dup-container')
        container.classList.add('corner')

        dup = document.createElement('table')
        dup.id = id
        dup.classList.add('dup')
        dup.classList.add('corner')

        container.appendChild(dup)
        table.parentElement.insertBefore(container, table)

        let s = ''
        for (let i = 0; i < els.length; i++) {
            let el = els[i] as HTMLElement
            let li = el.parentElement
            s += `<tr class="${li.className}"><td class="name">${els[i].innerHTML}</td></tr>`
        }
        dup.innerHTML = s
    }

    var widthPx = els0.offsetWidth + 'px'
    dup.style.width = widthPx
    dup.style.minWidth = widthPx
    dup.style.maxWidth = widthPx
    container.style.left = agg.offsetLeft + 'px'

    var trs = dup.querySelectorAll('tr')
    for (var i = 0; i < trs.length; i++) {
        var orig = els[i] as HTMLElement
        var ch = trs[i].children[0] as HTMLElement
        ch.style.minWidth = widthPx
        ch.style.maxWidth = widthPx
        ch.style.width = widthPx
        ch.style.minHeight = orig.offsetHeight + 'px'
        ch.style.maxHeight = orig.offsetHeight + 'px'
        ch.style.height = orig.offsetHeight + 'px'
    }

    if (window.pageYOffset > table.offsetTop && agg.scrollLeft > els0.offsetLeft) {
        container.classList.add('sticky')
        dup.classList.add('sticky')
    }
    else {
        container.classList.remove('sticky')
        dup.classList.remove('sticky')
    }
}
