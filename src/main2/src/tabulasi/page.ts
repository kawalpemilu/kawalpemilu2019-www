import { PageParam } from './common'
import { HierarchyNode } from './types'
import { NavRenderer } from './nav'
import { TpsRenderer } from './tps'
import { AggRenderer } from './agg';
import { ScreenSize } from './screen'

export class PageRenderer {
    private navRenderer: NavRenderer
    private aggRenderer: AggRenderer
    private tpsRenderer: TpsRenderer

    constructor(
        private screenSize: ScreenSize,
        private nav: HTMLElement,
        private agg: HTMLElement,
        private tps: HTMLElement) {

        this.navRenderer = new NavRenderer(screenSize)
        this.aggRenderer = new AggRenderer(screenSize)
        this.tpsRenderer = new TpsRenderer(screenSize)
    }

    render(param: PageParam, node: HierarchyNode) {
        this.nav.innerHTML = this.navRenderer.render(param, node)
        this.agg.innerHTML = this.aggRenderer.render(param, node)
        this.tps.innerHTML = this.tpsRenderer.render(param, node)
    }
}
