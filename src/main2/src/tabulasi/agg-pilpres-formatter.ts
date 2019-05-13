import { Entry } from "./agg-pilpres-common";

const THRESHOLD_PERCENTAGE = 0.8

export function _F(n: number): string {
    return n.toLocaleString('id')
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

export class EstimasiFormatter {
    format(entry: Entry): string {
        let tpsEstimasi = (Math.round(entry.tpsEstimasiRatio * 1000) / 10).toLocaleString('id')
        let estimasiStyle = this.createEstimasiStyle(entry)
        return `<td class="tps estimasi"><span style="${estimasiStyle}">${tpsEstimasi}%</span></td>`
    }

    private createEstimasiStyle(entry: Entry): string {
        let pEstimasi = entry.tpsEstimasiRatio * 100
        let pCakupan = entry.cakupan / entry.ntps * 100
        return `background-image: linear-gradient(to right, #aed581 0, #aed581 ${pEstimasi}%, #fff176 ${pEstimasi}%, #fff176 ${pCakupan}%, #e0e0e0 ${pCakupan}%, #e0e0e0 100%)`
    }
}