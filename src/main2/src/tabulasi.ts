import './tabulasi.scss'

import { HierarchyNode } from './types'

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
        console.log('node', node)
    })
}

window.onload = load
window.onhashchange = load
