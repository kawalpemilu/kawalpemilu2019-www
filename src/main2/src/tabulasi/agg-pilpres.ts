import { PageParam, getSumValue } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize } from "./screen";
import { Entry } from "./agg-pilpres-common";
import { PasFormatter, EstimasiFormatter } from "./agg-pilpres-formatter";

export class AggPilpresRenderer {
    constructor(private screenSize: ScreenSize) {
    }

    render(param: PageParam, node: HierarchyNode): string {
        var s = ''
        s += '<table class="table">'

        s += '<tr class="header">'
        s += '<td class="idx">#</td>'
        s += '<td class="name">Wilayah</td>'
        s += '<td class="sum pas1">Jokowi-Amin</td>'
        s += '<td class="sum pas2">Prabowo-Sandi</td>'
        if (this.screenSize.is('phone'))
            s += '<td class="tps estimasi">Est. TPS</td>'
        else
            s += '<td class="tps estimasi">Estimasi TPS</td>'
        s += '</tr>'

        let F = (n: number) => n.toLocaleString('id')

        let pas1Fmt = PasFormatter.newForPas1()
        let pas2Fmt = PasFormatter.newForPas2()
        let estFmt = new EstimasiFormatter()

        let total = new Entry()
        for (var i = 0; i < node.children.length; i++) {
            let entry = Entry.newFromNode(node, i)
            total = total.plus(entry)

            let ch = node.children[i]
            let id = ch[0]
            let url = '#' + param.type + ':' + id

            let name = ch[1]

            s += '<tr class="row">'
            s += `<td class="idx">${i + 1}</td>`
            s += `<td class="name darken"><a href="${url}">${name}</a></td>`
            s += pas1Fmt.format(entry)
            s += pas2Fmt.format(entry)
            s += estFmt.format(entry)
            s += '</tr>'
        }

        // total
        s += '<tr class="footer">'
        s += '<td class="idx"></td>'
        s += '<td class="name">Total</td>'
        s += pas1Fmt.format(total)
        s += pas2Fmt.format(total)
        s += estFmt.format(total)
        s += '</tr>'

        s += '</table>'

        return s
    }
}