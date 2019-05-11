import { PageParam, getSumValue, PageTypes } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize, ScreenTypes } from "./screen";
import { AggPilpresRenderer } from "./agg-pilpres";

export class AggRenderer {
    private pilpres: AggPilpresRenderer

    constructor(
        private screenSize: ScreenSize,
        private agg: HTMLElement) {

        this.pilpres = new AggPilpresRenderer(screenSize)
    }

    render(param: PageParam, node: HierarchyNode) {
        PageTypes.forEach((pageType) => {
            this.agg.classList.remove(pageType)
            ScreenTypes.forEach((screenType) => {
                this.agg.classList.remove(pageType + '-' + screenType)
            })
        })

        this.agg.innerHTML = this._render(param, node)
        this.agg.classList.add(param.type)
        this.agg.classList.add(param.type + '-' + this.screenSize.getType())
    }

    private _render(param: PageParam, node: HierarchyNode) {
        if (param.type == 'pilpres')
            return this.pilpres.render(param, node)

        return ''
    }
}

function updateStickyTableHeader() {
    var els = document.querySelectorAll('#agg ul.table li.header')
    if (els.length == 0) return;
    var el = els[0] as HTMLElement

    var dup = document.getElementById('agg-dup-table-header')
    if (!dup) {
        dup = document.createElement('ul')
        dup.id = 'agg-dup-table-header'
        dup.classList.add('dup')

        var ul = el.parentElement
        ul.parentElement.insertBefore(dup, ul)

        dup.innerHTML = '<li class="header">' + el.innerHTML + '</li>'
    }

    var li = dup.querySelector('li')
    for (var i = 0; i < li.children.length; i++) {
        var orig = el.children[i] as HTMLElement
        var ch = li.children[i] as HTMLElement
        ch.style.width = orig.offsetWidth + 'px'
    }

    if (window.pageYOffset > el.offsetTop)
        dup.classList.add('sticky')
    else
        dup.classList.remove('sticky')
}

window.addEventListener('scroll', updateStickyTableHeader)
