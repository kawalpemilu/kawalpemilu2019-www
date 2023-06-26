import './tabulasi.scss'
import './agg.scss'
import './nav.scss'
import './tps.scss'

import { PageParam, PageTypes } from './common'
import { HierarchyNode, FORM_TYPE } from './types'
import { PageRenderer } from './page'
import { debounce } from 'debounce'
import { ScreenSize } from './screen'

declare function ga(...args: any[]): any

const screenSize = new ScreenSize()

function getPageParam(): PageParam {
    var h = document.location.hash;

    var type = 'pilpres';
    var id = 0;
    var pc = h.indexOf(':')
    var ps = h.indexOf('/')
    var tps: number | null = null
    if (h && h.length) {
        if (pc >= 0) {
            type = h.substring(1, pc)
            id = Number(h.substring(pc + 1, ps < 0 ? h.length : ps))
        } else {
            id = Number(h.substring(1, ps < 0 ? h.length : ps))
        }
    }
    if (ps >= 0) {
        tps = Number(h.substring(ps + 1))
    }

    if (PageTypes.indexOf(type) < 0)
        type = 'pilpres'
    var form = type == 'pileg' ? FORM_TYPE.DPR : FORM_TYPE.PPWP

    var photos: FORM_TYPE[] = [form]
    if (form == FORM_TYPE.PPWP)
        photos.push(FORM_TYPE.PEMANDANGAN)

    return { type, form, id, tps, photos }
}

function updatePageHash(param: PageParam) {
    var h = '#' + param.type + ':' + param.id
    history.replaceState({}, 'Kawal Pemilu - Jaga Suara 2019', location.pathname + h)
}


function xhr(url: string, cb: (txt: string) => void) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
        cb(this.responseText);
    });
    oReq.open("GET", url);
    oReq.send();
}

function get(id: number, cb: (node: HierarchyNode) => void) {
    var ts = new Date().getTime()
    var url = 'https://kawalc1.github.io/kawalpemilu2019-extract/c/' + id + '.json?' + ts
    xhr(url + id + '?' + new Date().getTime(), function (res) {
        var duration = new Date().getTime() - ts
        ga('send', 'timing', 'kp-data', 'load', duration)
        cb(JSON.parse(res) as HierarchyNode);
    });
}

function load() {
    var param = getPageParam()
    updatePageHash(param)

    var renderer = new PageRenderer(
        screenSize,
        document.getElementById('navigasi'),
        document.getElementById('agg'),
        document.getElementById('tps')
    )
    get(param.id, (node) => {
        ga('send', 'pageview', {
            dimension1: node.id,
            dimension2: node.depth,
            dimension3: param.type,
        })
        renderer.render(param, node)
    })
}

function updateScreenSize() {
    function C(selector: string): boolean {
        return window.matchMedia(selector).matches
    }
    // check sizes.scss
    screenSize.update({
        phoneSmall: C("only screen and (max-width: 370px)"),
        phoneWide: C("only screen and (min-width: 371px) and (max-width: 620px)"),
        phone: C("only screen and (max-width: 620px)"),
        tablet: C("only screen and (min-width: 621px) and (max-width: 1000px)"),
        mobile: C("only screen and (max-width: 1000px)"),
        desktop: C("only screen and (min-width: 1001px)"),
    })
}

window.onload = load
window.onhashchange = load

window.addEventListener('resize', debounce(() => {
    updateScreenSize()
    load()
}, 500))
updateScreenSize()