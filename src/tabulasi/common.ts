import { FORM_TYPE, SumMap } from './types'

export class PageParam {
    type: string
    form: FORM_TYPE
    id: number
    tps: number | null
}

export const PageTypes = ['pilpres', 'pileg']

export function getSumValue(sum: SumMap | null, key: string): number {
    return sum && ((sum as any)[key] as number) || 0 // FIXME as any
}
