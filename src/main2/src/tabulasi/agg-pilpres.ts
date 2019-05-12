import { PageParam, getSumValue } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize } from "./screen";

export class AggPilpresRenderer {
    constructor(screenSize: ScreenSize) {
    }

    render(param: PageParam, node: HierarchyNode): string {
        var s = ''
        s += '<table class="table">'

        s += '<tr class="header">'
        s += '<td class="idx">#</td>'
        s += '<td class="name">Wilayah</td>'
        s += '<td class="sum pas1">Jokowi-Amin</td>'
        s += '<td class="sum pas2">Prabowo-Sandi</td>'
        s += '<td class="tps estimasi">Estimasi TPS</td>'
        s += '</tr>'

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

            s += '<tr class="row">'
            s += `<td class="idx">${i + 1}</td>`
            s += `<td class="name darken"><a href="${url}">${name}</a></td>`
            s += `<td class="sum pas1">${FS('pas1')}</td>`
            s += `<td class="sum pas2">${FS('pas2')}</td>`
            s += `<td class="tps estimasi"><span style="${estimasiStyle}">${tpsEstimasi}%</span></td>`
            s += '</tr>'
        }
        s += '</table>'

        return s
    }
}