import './tabulasi.scss'

import { PageParam } from './common'
import { HierarchyNode, TpsAggregate, FORM_TYPE, SumMap } from './types'
import { TpsRenderer } from './tps-renderer'

var isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
var isTablet = window.matchMedia('only screen and (min-width: 761px) and (max-width: 900px)').matches
var isDesktop = !isMobile && !isTablet
document.querySelectorAll('body')[0].classList.add(isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop'))

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

    var renderer = new PageRenderer()
    get(param.id, (node) => {
        renderer.render(param, node)
    })
}

class PageRenderer {
    private navRenderer = new NavRenderer()
    private tpsRenderer = new TpsRenderer()

    constructor() { }

    render(param: PageParam, node: HierarchyNode) {
        document.getElementById('navigasi')
            .innerHTML = this.navRenderer.render(param, node)

        document.getElementById('tps')
            .innerHTML = this.tpsRenderer.render(param, node)
    }
}

class NavRenderer {
    render(param: PageParam, node: HierarchyNode) {
        var s = ''
        for (var i = 0; i < node.parentIds.length; i++) {
            var pid = node.parentIds[i]
            var name = node.parentNames[i]
            var hash = '#' + param.type + ':' + pid
            s += `<span class="nav"><a href="${hash}">${name}</a></span> <span class="sep">&gt;</span> `
        }
        s += `<span class="nav">${node.name}</span>`
        return s
    }
}

window.onload = load
window.onhashchange = load