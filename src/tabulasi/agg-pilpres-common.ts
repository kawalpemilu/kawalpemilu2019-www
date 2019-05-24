import { HierarchyNode } from "./types";

export function round100(n: number): number {
    return Math.round(n * 10000) / 100
}

function N(n: number | undefined | null): number {
    return n || 0
}

export class Entry {
    pas1: number = 0
    pas2: number = 0
    sah: number = 0
    tSah: number = 0
    ntps: number = 0
    pending: number = 0
    cakupan: number = 0
    error: number = 0

    pas1kpu: number = 0
    pas2kpu: number = 0

    static newFromNode(node: HierarchyNode, idx: number): Entry {
        var ch = node.children[idx]
        var id = ch[0]
        var data = node.data[id]
        var sum = data.sum
        var entry = new Entry()
        entry.pas1 = N(sum.pas1)
        entry.pas2 = N(sum.pas2)
        entry.sah = N(sum.sah)
        entry.tSah = N(sum.tSah)
        entry.pending = N(sum.pending)
        entry.cakupan = N(sum.cakupan)
        entry.ntps = ch[2] as number
        entry.error = N(sum.error)

        if (node.kpu && node.kpu[id]) {
            var kpu = node.kpu[id]
            entry.pas1kpu = N(kpu.pas1) || 0
            entry.pas2kpu = N(kpu.pas2) || 0
        }
        return entry
    }

    plus(entry: Entry): Entry {
        var result = new Entry()
        result.pas1 = this.pas1 + entry.pas1
        result.pas2 = this.pas2 + entry.pas2
        result.sah = this.sah + entry.sah
        result.tSah = this.tSah + entry.tSah
        result.ntps = this.ntps + entry.ntps
        result.pending = this.pending + entry.pending
        result.cakupan = this.cakupan + entry.cakupan
        result.error = this.error + entry.error

        result.pas1kpu = this.pas1kpu + entry.pas1kpu
        result.pas2kpu = this.pas2kpu + entry.pas2kpu

        return result
    }

    get tpsEstimasi(): number {
        return this.cakupan - this.pending
    }

    get tpsEstimasiRatio(): number {
        return this.tpsEstimasi / this.ntps
    }

    get pas1Ratio100(): number {
        return round100(this.pas1 / (this.pas1 + this.pas2))
    }

    get pas2Ratio100(): number {
        return 100 - this.pas1Ratio100
    }

    get pas1KpuRatio100(): number {
        return round100(this.pas1kpu / (this.pas1kpu + this.pas2kpu))
    }

    get pas2KpuRatio100(): number {
        return 100 - this.pas1KpuRatio100
    }
}
