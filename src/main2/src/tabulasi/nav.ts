import { PageParam } from './common'
import { HierarchyNode } from './types'

export class NavRenderer {
    render(param: PageParam, node: HierarchyNode) {
        var s = ''
        for (var i = 0; i < node.parentIds.length; i++) {
            var pid = node.parentIds[i]
            var name = node.parentNames[i]
            var hash = '#' + param.type + ':' + pid
            s += `<span class="nav"><a href="${hash}">${name}</a></span> <span class="sep">&gt;</span> `
        }
        s += `<span class="nav">${node.name}</span>`
        return s
    }
}
