import { ScreenSize } from "./screen";
import { HierarchyNode } from "./types";
import { PageParam, getSumValue } from "./common";

interface PartaiEntry {
    label: string
    field: string
}

export const PartaiEntries: PartaiEntry[] = [
    { label: 'PKB', field: 'pkb' },
    { label: 'Gerindra', field: 'ger' },
    { label: 'PDI', field: 'pdi' },
    { label: 'Golkar', field: 'gol' },
    { label: 'Nasdem', field: 'nas' },
    { label: 'Garuda', field: 'gar' },
    { label: 'Berkarya', field: 'ber' },
    { label: 'PKS', field: 'sej' },
    { label: 'Perindo', field: 'per' },
    { label: 'PPP', field: 'ppp' },
    { label: 'PSI', field: 'psi' },
    { label: 'PAN', field: 'pan' },
    { label: 'Hanura', field: 'han' },
    { label: 'Demokrat', field: 'dem' },
    { label: 'PA', field: 'pa' },
    { label: 'PS', field: 'ps' },
    { label: 'PDA', field: 'pda' },
    { label: 'PNA', field: 'pna' },
    { label: 'PBB', field: 'pbb' },
    { label: 'PKP', field: 'pkp' },
]

export class AggPilegRenderer {
    constructor(screenSize: ScreenSize) {
    }

    render(param: PageParam, node: HierarchyNode): string {
        var s = ''
        s += '<table class="table">'

        // header
        s += '<tr class="header">'
        s += '<td class="idx">#</td>'
        s += '<td class="name">Wilayah</td>'
        PartaiEntries.forEach((e) => {
            s += '<td class="sum '+e.field+'">' + e.label + '</td>'
        })
        s += '<td class="tps kpu">#TPS KPU</td>'
        s += '</tr>'

        // rows
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

            s += '<tr class="row">'
            s += `<td class="idx">${i + 1}</td>`
            s += `<td class="name darken"><a href="${url}">${name}</a></td>`
            PartaiEntries.forEach((e) => {
                s += `<td class="sum ${e.field}">${FS(e.field)}</td>`
            })
            s += `<td class="tps kpu darken">${F(ntps)}</td>`
            s += '</tr>'
        }


        s += '</table>'
        return s
    }
}
