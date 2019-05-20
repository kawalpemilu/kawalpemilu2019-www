import { PartaiEntries } from "./agg-pileg"
import { updateStickyTableColumn } from "./sticky";

export function setupSort(agg: HTMLElement) {

    setupColumn(agg, "tr.header td.idx", "td.idx", true);
    setupColumn(agg, "tr.header td.name", "td a", false);

    setupColumn(agg, "tr.header td.pas1", "td.sum.pas1 span.abs", true);
    setupColumn(agg, "tr.header td.pas2", "td.sum.pas2 span.abs", true);
    setupColumn(agg, "tr.header td.estimasi", "td.estimasi span", true);

    PartaiEntries.forEach((e) => {
        setupColumn(agg, "tr.header td." + e.field, "td." + e.field, true);
    });
}

function setupColumn(agg: HTMLElement, header: string, rowSelect: string, numeric: boolean) {
    let headerElem = agg.querySelector(header);
    let rows = agg.querySelectorAll('tr.row');
    let footer = agg.querySelector("tr.footer");

    if (headerElem) {
        headerElem.addEventListener("click", (e: Event) => {
            var dir = headerElem.classList.toggle('sort-up') ? 1 : -1;
            var rSorted = [].slice.call(rows).sort((ra: HTMLElement, rb: HTMLElement) => {
                var va = rowValue(ra, rowSelect, numeric);
                var vb = rowValue(rb, rowSelect, numeric);
                return va > vb ? dir : -dir;
            });

            var tBody = rows[0].parentNode;
            for (var i = 0; i < rows.length; i++) {
                tBody.insertBefore(rSorted[i], footer);
            }
            updateStickyTableColumn();
        });
    }
}

function rowValue(row: HTMLElement, selector: string, numeric: boolean) {
    var el: HTMLElement = row.querySelector(selector)
    var res = el.innerText
    if (!numeric) return res;

    // normalize thousands
    if (res.indexOf(".")) res = res.replace(/\./g, "")

    // normalize percents with comma
    res = res.replace("%", "")
    res = res.replace(",", ".")

    return Number(res);
}
