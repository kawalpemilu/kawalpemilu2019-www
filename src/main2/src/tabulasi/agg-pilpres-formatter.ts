import { Entry, round100 } from "./agg-pilpres-common";

const THRESHOLD_PERCENTAGE = 0.7

export function _F(n: number): string {
    return n.toLocaleString('id')
}

export function _FSign(n: number): string {
    var text = _F(n)
    if (n > 0) text = '+' + text
    return text
}

export class PasFormatter {
    static newForPas1(): PasFormatter {
        return new PasFormatter(
            'pas1',
            (entry) => entry.pas1,
            (entry) => entry.pas1Ratio100
        )
    }

    static newForPas2(): PasFormatter {
        return new PasFormatter(
            'pas2',
            (entry) => entry.pas2,
            (entry) => entry.pas2Ratio100
        )
    }

    constructor(
        private key: string,
        private pasFn: (entry: Entry) => number,
        private pasRatio100Fn: (entry: Entry) => number
    ) {
    }

    format(entry: Entry): string {
        let showPercentage = entry.tpsEstimasiRatio >= THRESHOLD_PERCENTAGE
        let per = showPercentage ? 'per' : ''
        let pasRatio100 = this.pasRatio100Fn(entry)
        let pas = this.pasFn(entry)
        let win = pasRatio100 > 50 ? 'win' : ''

        let s = ''
        s += `<td class="sum pas ${this.key} ${per} ${win}">`
        s += `<span class="abs">${_F(pas)}</span>`
        if (showPercentage)
            s += `<span class="per">${_F(pasRatio100)}%</span>`
        s += '</td>'
        return s
    }
}

export class PasKpKpuFormatter {
    static newForPas1(): PasKpKpuFormatter {
        return new PasKpKpuFormatter(
            'pas1',
            (entry) => entry.pas1,
            (entry) => entry.pas1Ratio100,
            (entry) => entry.pas1kpu
        )
    }

    static newForPas2(): PasKpKpuFormatter {
        return new PasKpKpuFormatter(
            'pas2',
            (entry) => entry.pas2,
            (entry) => entry.pas2Ratio100,
            (entry) => entry.pas2kpu
        )
    }

    constructor(
        private key: string,
        private pasFn: (entry: Entry) => number,
        private pasRatio100Fn: (entry: Entry) => number,
        private pasKpuFn: (entry: Entry) => number
    ) {
    }

    format(entry: Entry): string {
        let showPercentage = entry.tpsEstimasiRatio >= THRESHOLD_PERCENTAGE
        let per = showPercentage ? 'per' : ''
        let pasRatio100 = this.pasRatio100Fn(entry)
        let pas = this.pasFn(entry)
        let kpu = this.pasKpuFn(entry)
        let win = pasRatio100 > 50 ? 'win' : ''
        let diff = pas - kpu

        let s = ''
        s += `<td class="sum pas ${this.key} ${per} ${win}">`
        s += `<span class="abs">${_F(pas)}</span>`
        if (showPercentage)
            s += `<span class="per">${_F(pasRatio100)}%</span>`
        s += `<span class="diff">Situng ${_FSign(diff)}</span>`
        s += '</td>'
        return s
    }
}

export class PasKpuFormatter {
    static newForPas1(): PasKpuFormatter {
        return new PasKpuFormatter(
            'pas1',
            (entry) => entry.pas1,
            (entry) => entry.pas1kpu,
            (entry) => entry.pas1KpuRatio100
        )
    }
    static newForPas2(): PasKpuFormatter {
        return new PasKpuFormatter(
            'pas2',
            (entry) => entry.pas2,
            (entry) => entry.pas2kpu,
            (entry) => entry.pas2KpuRatio100
        )
    }

    constructor(
        private key: string,
        private pasFn: (entry: Entry) => number,
        private pasKpuFn: (entry: Entry) => number,
        private pasKpuRatio100Fn: (entry: Entry) => number) { }

    format(entry: Entry): string {
        let showPercentage = entry.tpsEstimasiRatio >= THRESHOLD_PERCENTAGE
        let pasKpuRatio100 = this.pasKpuRatio100Fn(entry)
        let win = pasKpuRatio100 > 50 ? 'win' : ''
        let pas = this.pasKpuFn(entry)
        let diff = pas - this.pasFn(entry)
        let cdiff = diff != 0 ? 'diff' : ''

        let s = ''
        s += `<td class="sum kpu pas ${this.key} per ${cdiff} ${win}">`
        s += `<span class="abs">${_F(pas)}</span>`
        s += `<span class="diff">(${_FSign(diff)})</span>`
        s += '</td>'
        return s
    }
}

export class EstimasiFormatter {
    format(entry: Entry): string {
        let tpsEstimasi = (Math.round(entry.tpsEstimasiRatio * 1000) / 10).toLocaleString('id')
        let estimasiStyle = this.createEstimasiStyle(entry)
        let title = [
            `Estimasi TPS terproses: ${_F(entry.tpsEstimasi)} (${tpsEstimasi}%)`,
            `TPS dengan Foto: ${_F(entry.cakupan)}`,
            `Belum diproses: ${_F(entry.pending)}`,
            `Total TPS dari KPU: ${_F(entry.ntps)}`,
        ].join("\n")
        return `<td class="tps estimasi" title="${title}"><span style="${estimasiStyle}">${tpsEstimasi}%</span></td>`
    }

    private createEstimasiStyle(entry: Entry): string {
        let pEstimasi = entry.tpsEstimasiRatio * 100
        let pCakupan = entry.cakupan / entry.ntps * 100
        return `background-image: linear-gradient(to right, #aed581 0, #aed581 ${pEstimasi}%, #fff176 ${pEstimasi}%, #fff176 ${pCakupan}%, #e0e0e0 ${pCakupan}%, #e0e0e0 100%)`
    }
}

export class EstimasiFullFormatter {
    format(entry: Entry): string {
        var ratio = Math.round(entry.tpsEstimasiRatio * 1000) / 10
        var s = `<span>${_F(entry.tpsEstimasi)}</span>`
        s += `<span class="diff">${_F(ratio)}%</span>`

        let pEstimasi = entry.tpsEstimasiRatio * 100
        var style = `background-image: linear-gradient(to right, rgba(241, 248, 233, 1) 0, rgba(197, 225, 165, 1) ${pEstimasi}%, #e0e0e0 ${pEstimasi}%, #e0e0e0 100%)`

        return `<td class="tps estimasi-full" style="${style}">${s}</td>`
    }
}

export class EstimasiFull2Formatter {
    format(entry: Entry): string {
        let tpsEstimasi = (Math.round(entry.tpsEstimasiRatio * 1000) / 10).toLocaleString('id')
        let estimasiStyle = this.createEstimasiStyle(entry)
        let title = [
            `Estimasi TPS terproses: ${_F(entry.tpsEstimasi)} (${tpsEstimasi}%)`,
            `TPS dengan Foto: ${_F(entry.cakupan)}`,
            `Belum diproses: ${_F(entry.pending)}`,
            `Total TPS dari KPU: ${_F(entry.ntps)}`,
        ].join("\n")
        return `<td class="tps estimasi-full2" title="${title}"><span class="diff">${_F(entry.tpsEstimasi)}</span><span class="per" style="${estimasiStyle}">${tpsEstimasi}%</span></td>`
    }

    private createEstimasiStyle(entry: Entry): string {
        let pEstimasi = entry.tpsEstimasiRatio * 100
        let pCakupan = entry.cakupan / entry.ntps * 100
        return `background-image: linear-gradient(to right, #aed581 0, #aed581 ${pEstimasi}%, #fff176 ${pEstimasi}%, #fff176 ${pCakupan}%, #e0e0e0 ${pCakupan}%, #e0e0e0 100%)`
    }
}

export class SahFormatter {
    format(entry: Entry): string {
        var error = entry.pas1 + entry.pas2 === entry.sah ? '' : 'error'
        var content = `<span class="sah">${_F(entry.sah)}</span>`
        if (error) content += `<span class="diff">(${_FSign(entry.sah - entry.pas1 - entry.pas2)})</span>`
        return `<td class="sum sah ${error}">${content}</td>`
    }
}

export class TidakSahFormatter {
    format(entry: Entry): string {
        return `<td class="sum tsah">${_F(entry.tSah)}</td>`
    }
}

export class TpsKpuFormatter {
    format(entry: Entry): string {
        return `<td class="tps kpu">${_F(entry.ntps)}</td>`
    }
}

export class TpsCakupanFormatter {
    format(entry: Entry): string {
        var per = round100(entry.cakupan / entry.ntps)
        return `<td class="tps cakupan"><span class="diff">${_F(entry.cakupan)}</span><span>${_F(per)}%</span></td>`
    }
}

export class TpsPendingFormatter {
    format(entry: Entry): string {
        return `<td class="tps pending">${_F(entry.pending)}</td>`
    }
}

export class TpsErrorFormatter {
    format(entry: Entry): string {
        return `<td class="tps error">${_F(entry.error)}</td>`
    }
}
