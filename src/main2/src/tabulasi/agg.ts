import { PageParam } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize } from "./screen";
import { AggPilpresRenderer } from "./agg-pilpres";
import { AggPilegRenderer } from "./agg-pileg";
import { updateStickyTableHeader, updateStickyTableColumn, updateStickyTableCorner, updateStickyTableFooter, updateStickyTableTotal } from "./sticky";
import { AggPilpresFullRenderer } from "./agg-pilpres-full";

import { setupSort, sort } from "./sort";

export class AggRenderer {
    private pilpres: AggPilpresRenderer
    private pilpresFull: AggPilpresFullRenderer
    private pileg: AggPilegRenderer

    constructor(
        private screenSize: ScreenSize,
        private agg: HTMLElement) {

        this.pilpres = new AggPilpresRenderer(screenSize)
        this.pilpresFull = new AggPilpresFullRenderer(screenSize)
        this.pileg = new AggPilegRenderer(screenSize)
    }

    render(param: PageParam, node: HierarchyNode) {
        this.agg.innerHTML = this._render(param, node)
        this.agg.classList.add(param.type)
        setupSort(this.agg)
    }

    private _render(param: PageParam, node: HierarchyNode) {
        if (node.depth >= 4)
            return ''

        if (param.type == 'pilpres') {
            if (this.screenSize.is('desktop') || this.screenSize.is('tablet'))
                return this.pilpresFull.render(param, node)
            else
                return this.pilpres.render(param, node)
        }
        else if (param.type == 'pileg') {
            return this.pileg.render(param, node)
        }

        return ''
    }
}

function attachStickyListener(fn: () => any) {
    var agg = document.getElementById('agg')

    window.addEventListener('scroll', fn)
    agg.addEventListener('scroll', fn)

    var isUpdatingTable = (mutations: MutationRecord[]) => {
        var mm = mutations
            .filter((m) => m.type == 'childList')
            .filter((m) => m.addedNodes.length > 0)
            .filter((m) => {
                let result = false
                m.addedNodes.forEach((n: HTMLElement) => {
                    if (n.tagName == 'TABLE' && n.classList.contains('table'))
                        result = true
                })
                return result
            })
        return mm.length > 0
    }

    var observer = new MutationObserver((mutations) => {
        if (isUpdatingTable(mutations))
            fn()
    })
    observer.observe(agg, { childList: true })

}
attachStickyListener(updateStickyTableHeader)
attachStickyListener(updateStickyTableColumn)
attachStickyListener(updateStickyTableCorner)
attachStickyListener(updateStickyTableFooter)
attachStickyListener(updateStickyTableTotal)
