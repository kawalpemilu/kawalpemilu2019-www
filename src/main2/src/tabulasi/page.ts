import { PageParam } from './common'
import { HierarchyNode } from './types'
import { NavRenderer } from './nav'
import { TpsRenderer } from './tps'
import { AggRenderer } from './agg';

export class PageRenderer {
    private navRenderer = new NavRenderer()
    private aggRenderer = new AggRenderer()
    private tpsRenderer = new TpsRenderer()

    constructor(
        private nav: HTMLElement,
        private agg: HTMLElement,
        private tps: HTMLElement) { }

    render(param: PageParam, node: HierarchyNode) {
        this.nav.innerHTML = this.navRenderer.render(param, node)
        this.agg.innerHTML = this.aggRenderer.render(param, node)
        this.tps.innerHTML = this.tpsRenderer.render(param, node)
    }
}
