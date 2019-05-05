import { PageParam, getSumValue } from "./common";
import { HierarchyNode } from "./types";
import { ScreenSize } from "./screen";

export class AggRenderer {
    constructor(private screenSize: ScreenSize) {

    }

    render(param: PageParam, node: HierarchyNode): string {
        if (node.depth >= 4) return ''

        var keys = ['']
        var s = ''
        s += '<ul class="table">'

        s += '<li class="header">'
        s += '<p class="idx">#</p>'
        s += '<p class="name">Wilayah</p>'
        s += '<p class="sum pas1">Jokowi-Amin</p>'
        s += '<p class="sum pas2">Prabowo-Sandi</p>'
        s += '<p class="tps estimasi">Estimasi TPS</p>'
        s += '</li>'

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

function updateStickyTableHeader() {
    var els = document.querySelectorAll('#agg ul.table li.header')
    if (els.length == 0) return;
    var el = els[0] as HTMLElement

    var dup = document.getElementById('agg-dup-table-header')
    if (!dup) {
        dup = document.createElement('ul')
        dup.id = 'agg-dup-table-header'
        dup.classList.add('dup')

        var ul = el.parentElement
        ul.parentElement.insertBefore(dup, ul)

        dup.innerHTML = '<li class="header">' + el.innerHTML + '</li>'
        var li = dup.querySelector('li')
        for (var i=0; i<li.children.length; i++) {
            var orig = el.children[i] as HTMLElement
            var ch = li.children[i] as HTMLElement
            ch.style.width = orig.offsetWidth + 'px'
        }
    }

    if (window.pageYOffset > el.offsetTop)
        dup.classList.add('sticky')
    else
        dup.classList.remove('sticky')
}

window.addEventListener('scroll', updateStickyTableHeader)