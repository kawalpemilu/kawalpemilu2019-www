export const enum SUM_KEY {
    jum = "jum",
    pas1 = "pas1",
    pas2 = "pas2",
    sah = "sah",
    tSah = "tSah",
    cakupan = "cakupan",
    pending = "pending",
    error = "error",
    janggal = "janggal",
    pkb = "pkb",
    ger = "ger",
    pdi = "pdi",
    gol = "gol",
    nas = "nas",
    gar = "gar",
    ber = "ber",
    sej = "sej",
    per = "per",
    ppp = "ppp",
    psi = "psi",
    pan = "pan",
    han = "han",
    dem = "dem",
    pa = "pa",
    ps = "ps",
    pda = "pda",
    pna = "pna",
    pbb = "pbb",
    pkp = "pkp",
    pJum = "pJum",
    pSah = "pSah",
    pTSah = "pTSah",
    laporKpu = "laporKpu"
}

export const enum FORM_TYPE {
  // Full blown until digitized.
  PPWP = 1,
  DPR,

  // Only up to halaman, not digitized.
  DPD,
  DPRP,
  DPRPB,
  DPRA,
  DPRD_PROV,
  DPRD_KAB_KOTA,
  DPRK,

  // Up to choosing this type.
  OTHERS,
  PEMANDANGAN,
  MALICIOUS
}


export declare type SumMap = {
    [key in SUM_KEY]: number;
};

export const enum IS_PLANO {
    YES = 1,
    NO = 2
}

export declare type Halaman = '0' | '1' | '2' | '2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6' | '2.7' | '2.8' | '2.9' | '2.10' | '2.11' | '2.12' | '2.13' | '2.14' | '2.15' | '2.16' | '2.17' | '2.18' | '2.19' | '2.20' | '3';

export interface C1Form {
    type: FORM_TYPE;
    plano: IS_PLANO;
    halaman: Halaman;
}

export interface Aggregate {
    sum: SumMap;
    ts: number;
    c1: C1Form;
}

export interface TpsAggregate extends Aggregate {
    photos: {
        [url: string]: Aggregate;
    };
}

export interface HierarchyNode {
    id: number;
    name: string;
    parentIds: number[];
    parentNames: string[];
    children: any[];
    depth: number;
    data: {
        [cid: string]: TpsAggregate;
    };
    kpu: KpuData;
}

export declare type KpuData = {
    [cid: string]: SumMap;
};
