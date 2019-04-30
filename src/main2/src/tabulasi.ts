import './tabulasi.scss'

import { HierarchyNode } from './types'

var isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
document.querySelectorAll('body')[0].classList.add(isMobile ? 'mobile' : 'desktop')

class PageParam {
    type: string
    id: number
}

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

    return { type, id }
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

    get(param.id, (node) => {
        render(param, node)
    })
}

function render(param: PageParam, node: HierarchyNode) {
    renderNavigasi(param, node)
}

function renderNavigasi(param: PageParam, node: HierarchyNode) {
    var s = ''
    for (var i = 0; i < node.parentIds.length; i++) {
        var pid = node.parentIds[i]
        var name = node.parentNames[i]
        var hash = '#' + param.type + ':' + pid
        s += '<span class="nav"><a href="' + hash + '">' + name + '</a></span> <span class="sep">&gt;</span> '
    }
    s += '<span class="nav">' + node.name + '</span>'

    var el = document.getElementById('navigasi')
    el.innerHTML = s
}

window.onload = load
window.onhashchange = load