import './tabulasi.scss'
import './agg.scss'
import './nav.scss'
import './tps.scss'

import { PageParam } from './common'
import { HierarchyNode, FORM_TYPE } from './types'
import { PageRenderer } from './page'
import { debounce } from 'lodash'
import { ScreenSize } from './screen';

const screenSize = new ScreenSize()

function getPageParam(): PageParam {
    var h = document.location.hash;

    var type = 'pilpres';
    var id = 0;
    var pc = h.indexOf(':')
    if (h && h.length) {
        if (pc >= 0) {
            type = h.substring(1, pc)
            id = Number(h.substring(pc + 1))
        } else {
            id = Number(h.substring(1))
        }
    }

    var form = type == 'pileg' ? FORM_TYPE.DPR : FORM_TYPE.PPWP

    return { type, form, id }
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
    var url = 'https://kawal-c1.appspot.com/api/c/' + id + '?' + ts;
    xhr(url + id + '?' + new Date().getTime(), function (res) {
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
        renderer.render(param, node)
    })
}

function updateScreenSize() {
    var isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
    var isTablet = window.matchMedia('only screen and (min-width: 761px) and (max-width: 900px)').matches
    screenSize.update(isMobile, isTablet)
}

window.onload = load
window.onhashchange = load

window.addEventListener('resize', debounce(() => {
    updateScreenSize()
    load()
}, 500))
updateScreenSize()