import { PageParam, PageTypes } from './common'
import { HierarchyNode } from './types'
import { ScreenSize } from './screen';

export class NavRenderer {
    constructor(private screenSize: ScreenSize) { }

    render(param: PageParam, node: HierarchyNode) {
        return [
            '<div class="table-type-nav">',
            this._getTableTypeNav(param),
            '</div>',

            '<div class="breadcrumbs">',
            this._getBreadcrumbs(param, node),
            '</div>',
        ].join( '' )
    }

    private _getTableTypeNav(param: PageParam) {
        const { type, id } = param

        let s = ''
        PageTypes.forEach( t => {
            const className = t === type
                ? ' class="active"'
                : ''

            const hash = `#${ t }:${ id }`
            const name = t === 'pileg'
                ? 'DPR'
                : 'Presiden'

            s += `<li${ className }><a href="${ hash }">${ name }</li>`
        } )

        return `<ul>${ s }</ul>`
    }

    private _getBreadcrumbs(param: PageParam, node: HierarychNode) {
        var s = ''
        for (var i = 0; i < node.parentIds.length; i++) {
            var pid = node.parentIds[i]
            var name = node.parentNames[i]
            var hash = '#' + param.type + ':' + pid
            s += `<span class="nav"><a href="${hash}">${name}</a></span> <span class="sep">›</span> `
        }
        s += `<span class="nav">${node.name}</span>`
        return s
    }
}
