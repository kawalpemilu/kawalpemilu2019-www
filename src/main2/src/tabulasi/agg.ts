import { PageParam, getSumValue } from "./common";
import { HierarchyNode } from "./types";

export class AggRenderer {
    render(param: PageParam, node: HierarchyNode): string {
        if (node.depth >= 4) return ''

        var keys = ['']
        var s = ''
        s += '<ul>'

        for (var i = 0; i < node.children.length; i++) {
            let ch = node.children[i]
            let id = ch[0]
            let data = node.data[id]
            let sum = data.sum
            let url = '#' + param.type + ':' + id

            let S = (key: string) => getSumValue(sum, key)
            let F = (n: number) => n.toLocaleString('id')
            let FS = (key: string) => F(S(key))

            let name = ch[1]
            let ntps = ch[2]
            let tpsEstimasi = (Math.round((sum.cakupan - sum.pending) / ntps * 1000) / 10).toLocaleString('id')

            let pEstimasi = (sum.cakupan - sum.pending) / ntps * 100
            let pCakupan = sum.cakupan / ntps * 100
            let estimasiStyle = `background-image: linear-gradient(to right, #aed581 0, #aed581 ${pEstimasi}%, #fff176 ${pEstimasi}%, #fff176 ${pCakupan}%, #e0e0e0 ${pCakupan}%, #e0e0e0 100%)`

            s += '<li>'
            s += `<p class="idx">${i + 1}</p>`
            s += `<p class="name"><a href="${url}">${name}</a></p>`
            s += `<p class="sum pas1">${FS('pas1')}</p>`
            s += `<p class="sum pas2">${FS('pas2')}</p>`
            s += `<p class="tps estimasi"><span style="${estimasiStyle}">${tpsEstimasi}%</span></p>`
            s += '</li>'
        }
        s += '</ul>'

        return s
    }
}