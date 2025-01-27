export interface Hareket {
    isim: string;
    setSayisi: number;
}

export interface Program {
    adi: string;
    hareketler: Hareket[];
}

export interface PerformansVerisi {
    tarih: string;
    agirlik: number;
    setProgrami: string;
}

export type TabParamList = {
    Home: undefined;
    Ekle: undefined;
    mygym: undefined;
};

export type RootStackParamList = {
    Main: undefined;
    ProgramDetay: { program: Program };
    EkleSayfasi: undefined;
    HareketGecmisi: {
        hareketAdi: string;
        performansVerileri: PerformansVerisi[];
    };
}; 