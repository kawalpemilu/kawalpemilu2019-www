import { PageParam } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize } from "./screen";
import { AggPilpresRenderer } from "./agg-pilpres";
import { AggPilegRenderer } from "./agg-pileg";
import { updateStickyTableHeader, updateStickyTableColumn, updateStickyTableCorner } from "./sticky";

export class AggRenderer {
    private pilpres: AggPilpresRenderer
    private pileg: AggPilegRenderer

    constructor(
        private screenSize: ScreenSize,
        private agg: HTMLElement) {

        this.pilpres = new AggPilpresRenderer(screenSize)
        this.pileg = new AggPilegRenderer(screenSize)
    }

    render(param: PageParam, node: HierarchyNode) {
        this.agg.innerHTML = this._render(param, node)
        this.agg.classList.add(param.type)
    }

    private _render(param: PageParam, node: HierarchyNode) {
        if (node.depth >= 4)
            return ''

        if (param.type == 'pilpres')
            return this.pilpres.render(param, node)
        if (param.type == 'pileg')
            return this.pileg.render(param, node)

        return ''
    }
}

window.addEventListener('scroll', updateStickyTableHeader)
window.addEventListener('scroll', updateStickyTableColumn)
window.addEventListener('scroll', updateStickyTableCorner)
document.getElementById('agg').addEventListener('scroll', updateStickyTableHeader)
document.getElementById('agg').addEventListener('scroll', updateStickyTableColumn)
document.getElementById('agg').addEventListener('scroll', updateStickyTableCorner)
