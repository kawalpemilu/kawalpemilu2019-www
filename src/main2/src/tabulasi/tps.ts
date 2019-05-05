import { PageParam, getSumValue } from './common'
import { HierarchyNode, TpsAggregate } from './types'
import { ScreenSize } from './screen';

export class TpsRenderer {
    constructor(private screenSize: ScreenSize) { }

    private KEYS = {
        'pilpres': [
            'pas1', 'pas2'
        ],
        'pileg': [
            'pkb', 'ger', 'pdi', 'gol',
            'nas', 'gar', 'ber', 'sej',
            'per', 'ppp', 'psi', 'pan',
            'han', 'dem', 'pa', 'ps',
            'pda', 'pna', 'pbb', 'pkp'
        ],
        'summary-pilpres': [
            'sah', 'tSah', 'jum',
        ],
        'summary-pileg': [
            'pSah', 'pTSah', 'pJum',
        ]
    }

    private SUM_LABELS = {
        'pas1': 'Jokowi-Amin',
        'pas2': 'Prabowo-Sandi',

        'sah': 'Suara Sah',
        'tSah': 'Tidak Sah',
        'jum': 'PHP',

        'pkb': 'PKB',
        'ger': 'Gerindra',
        'pdi': 'PDI',
        'gol': 'Golkar',
        'nas': 'Nasdem',
        'gar': 'Garuda',
        'ber': 'Berkarya',
        'sej': 'PKS',
        'per': 'Perindo',
        'ppp': 'PPP',
        'psi': 'PSI',
        'pan': 'PAN',
        'han': 'Hanura',
        'dem': 'Demokrat',
        'pa': 'PA',
        'ps': 'PS',
        'pda': 'PDA',
        'pna': 'PNA',
        'pbb': 'PBB',
        'pkp': 'PKP',

        'pSah': 'Suara Sah',
        'pTSah': 'Tidak Sah',
        'pJum': 'PHP',
    }


    render(param: PageParam, node: HierarchyNode) {
        if (node.depth < 4) {
            return ''
        }

        var nTps = node.children.length

        var s = ''
        for (var i = 0; i < nTps; i++) {
            var ch = node.children[i]
            var tpsNo = ch[0] as number
            var data = node.data[tpsNo]

            s += this.renderTpsEntry(param, node, tpsNo, data)
        }
        return s
    }

    private renderTpsEntry(param: PageParam, node: HierarchyNode, tpsNo: number, data: TpsAggregate | null) {
        var modUrl = 'https://upload.kawalpemilu.org/t/' + node.id + '/' + tpsNo + '?utm_source=wwwkp'

        var s = `<div class="tps tps-${tpsNo}">`

        // info
        s += '<div class="info">'
        s += `<p class="tpsNo">TPS ${tpsNo}</span>`
        s += `<p class="mod"><a href="${modUrl}">Mod?<br>${node.id}/${tpsNo}</a></p>`
        s += '</div>'

        // sum
        s += '<div class="sum">'
        s += this.renderTpsSum(param, node, tpsNo, data)
        s += '</div>'

        // photos
        s += '<div class="photos">'
        s += this.renderTpsPhotos(param, node, tpsNo, data)
        s += '</div>'

        s += '</div>'
        return s
    }

    private getLaporanUrl(param: PageParam, tpsNo: number, kecamatan: string, kelurahan: string) {
        var hash = param.type + ':' + param.id
        return 'https://docs.google.com/forms/d/e/1FAIpQLSdeoAqXjE-gd_YpsvpzeD1Cr21hWgwKM8MHS8CYXNajD6iKGA/viewform?usp=pp_url&' +
            'entry.1587204645=' + hash +
            '&entry.446975413=' + tpsNo +
            '&entry.828908754=' + param.type +
            '&entry.1325772197=' + kecamatan +
            '&entry.789113286=' + kelurahan
    }

    private renderTpsSum(param: PageParam, node: HierarchyNode, tpsNo: number, data: TpsAggregate | null) {
        if (!data) return '<p class="nodata">data belum tersedia</p>'

        var keys = (this.KEYS as any)[param.type] as string[] // FIXME as any
        var summaryKeys = (this.KEYS as any)['summary-' + param.type] as string[] // FIXME as any

        var available = false
        for (var i = 0; i < keys.length; i++)
            available = available || !!getSumValue(data.sum, keys[i])
        if (!available) return '<p class="nodata">data belum tersedia</p>'

        var s = '<div class="values">'

        s += `<ul class="${param.type} sum">`
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i]
            let label = (this.SUM_LABELS as any)[key] as string // FIXME as any
            let sum = getSumValue(data.sum, key)
            s += `<li><span class="label">${label}</span> <span class="value">${sum}</span></li>`
        }
        s += '</ul>'

        s += `<ul class="${param.type} summary">`
        for (var i = 0; i < summaryKeys.length; i++) {
            let key = summaryKeys[i]
            let label = (this.SUM_LABELS as any)[key] as string // FIXME as any
            let sum = getSumValue(data.sum, key)
            s += `<li><span class="label">${label}</span> <span class="value">${sum}</span></li>`
        }
        s += '</ul>'

        s += '</div>'

        var laporanUrl = this.getLaporanUrl(param, tpsNo, node.parentNames[node.parentNames.length - 1], node.name)
        s += '<p class="lapor"><a href="' + laporanUrl + '" target="_blank">laporkan kesalahan</a></p>';
        return s
    }

    private renderTpsPhotos(param: PageParam, node: HierarchyNode, tpsNo: number, data: TpsAggregate | null) {
        if (!data) return ''

        var sumKeys = (this.KEYS as any)[param.type] as string[] // FIXME as any
        var summaryKeys = (this.KEYS as any)['summary-' + param.type] as string[] // FIXME as any
        var keys = sumKeys.concat(summaryKeys)

        var urls = Object.keys(data.photos)
            .filter(url => data.photos[url].c1.type == param.form)
            .sort((a, b) => {
                const pa = data.photos[a]
                const pb = data.photos[b]
                const ea = !!pa.sum.error ? 1 : 0;
                const eb = !!pb.sum.error ? 1 : 0;
                const va = ((ea - 1) * 100 + pa.c1.type * 10 + pa.c1.plano) * 1e14 + pa.ts;
                const vb = ((eb - 1) * 100 + pb.c1.type * 10 + pb.c1.plano) * 1e14 + pb.ts;
                return va - vb;
            });

        var s = ''
        for (var i = 0; i < urls.length; i++) {
            let url = urls[i]
            var photo = data.photos[url]
            var sum = photo.sum
            var errorClass = sum.error && sum.error == 1 ? 'error' : ''

            s += `<div class="photo ${errorClass}">`
            s += `<p><a href="${url}=s1280" target="_blank"><img src="${url}=s120"/></a></p>`

            s += '<ul class="detail">'
            for (var j = 0; j < keys.length; j++) {
                let key = keys[j]
                let label = (this.SUM_LABELS as any)[key] as string // FIXME as any
                let sum = getSumValue(data.sum, key)
                if (!sum) continue
                s += `<li><span class="label">${label}</span> <span class="value">${sum}</span></li>`
            }
            s += '</ul>'
            s += '</div>'
        }

        return s;
    }
}