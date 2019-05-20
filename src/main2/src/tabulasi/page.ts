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
        screenSize: ScreenSize,
        nav: HTMLElement,
        agg: HTMLElement,
        tps: HTMLElement) {

        this.navRenderer = new NavRenderer(screenSize, nav)
        this.aggRenderer = new AggRenderer(screenSize, agg)
        this.tpsRenderer = new TpsRenderer(screenSize, tps)
    }

    render(param: PageParam, node: HierarchyNode) {
        this.navRenderer.render(param, node)
        this.tpsRenderer.render(param, node)
        this.aggRenderer.render(param, node)
    }
}
