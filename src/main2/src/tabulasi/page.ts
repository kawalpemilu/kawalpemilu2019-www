import { PageParam } from './common'
import { HierarchyNode } from './types'
import { NavRenderer } from './nav'
import { TpsRenderer } from './tps'

export class PageRenderer {
    private navRenderer = new NavRenderer()
    private tpsRenderer = new TpsRenderer()

    constructor(
        private nav: HTMLElement,
        private tps: HTMLElement) { }

    render(param: PageParam, node: HierarchyNode) {
        this.nav.innerHTML = this.navRenderer.render(param, node)
        this.tps.innerHTML = this.tpsRenderer.render(param, node)
    }
}
