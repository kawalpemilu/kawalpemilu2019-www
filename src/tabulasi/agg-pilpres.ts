import { PageParam, getSumValue } from "./common";
import { HierarchyNode, TpsAggregate } from "./types";
import { ScreenSize } from "./screen";
import { Entry } from "./agg-pilpres-common";
import {
    PasKpKpuFormatter,
    SahFormatter,
    EstimasiFormatter,
    TidakSahFormatter,
    TpsCakupanFormatter,
    EstimasiFull2Formatter,
    SahKpKpuFormatter,
    TidakSahKpKpuFormatter
} from "./agg-pilpres-formatter";

export declare type Mode = 'compact' | 'full'

export class AggPilpresRenderer {
    constructor(private screenSize: ScreenSize) {
    }

    render(param: PageParam, node: HierarchyNode, mode: Mode): string {
        var s = ''
        s += '<table class="table">'

        s += '<tr class="header">'
        s += '<td class="idx">#</td>'
        s += '<td class="name">Wilayah</td>'

        s += '<td class="sum pas1">Jokowi-Amin</span></td>'
        s += '<td class="sum pas2">Prabowo-Sandi</span></td>'

        if (mode == 'compact') {
            if (this.screenSize.is('phone'))
                s += '<td class="tps estimasi">Est. TPS</td>'
            else
                s += '<td class="tps estimasi">Estimasi TPS</td>'
        }

        if (mode == 'full') {
            s += '<td class="sum sah">Suara Sah</td>'
            s += '<td class="sum tsah">Tidak Sah</td>'
            // s += '<td class="tps kpu">TPS<br>KPU</td>'
            // s += '<td class="tps cakupan">TPS<br>Terdata</td>'
            s += '<td class="tps estimasi">Estimasi<br>TPS</td>'
            // s += '<td class="tps pending">Belum<br>Diproses</td>'
            // s += '<td class="tps error">Dengan<br>Laporan</td>'
        }

        s += '</tr>'

        let F = (n: number) => n.toLocaleString('id')

        let pas1Fmt = PasKpKpuFormatter.newForPas1()
        let pas2Fmt = PasKpKpuFormatter.newForPas2()
        let estFmt = new EstimasiFormatter()
        let sahFmt = new SahKpKpuFormatter()
        let tSahFmt = new TidakSahKpKpuFormatter()
        let estFullFmt = new EstimasiFull2Formatter()
        let tpsCakupanFmt = new TpsCakupanFormatter()

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

            if (mode == 'compact')
                s += estFmt.format(entry)

            if (mode == 'full') {
                s += sahFmt.format(entry)
                s += tSahFmt.format(entry)
                // s += tpsKpuFmt.format(entry)
                // s += tpsCakupanFmt.format(entry)
                s += estFullFmt.format(entry)
                // s += tpsPendingFmt.format(entry)
                // s += tpsErrorFmt.format(entry)
            }
            s += '</tr>'
        }

        // total
        s += '<tr class="footer">'
        s += '<td class="idx"></td>'
        s += '<td class="name">Total</td>'

        s += pas1Fmt.format(total)
        s += pas2Fmt.format(total)

        if (mode == 'compact')
            s += estFmt.format(total)

        if (mode == 'full') {
            s += sahFmt.format(total)
            s += tSahFmt.format(total)
            // s += tpsKpuFmt.format(total)
            // s += tpsCakupanFmt.format(total)
            s += estFullFmt.format(total)
            // s += tpsPendingFmt.format(total)
            // s += tpsErrorFmt.format(total)
        }
        s += '</tr>'

        s += '</table>'

        return s
    }
}