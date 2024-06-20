interface Sidlo {
  kodStatu: string;
  nazevStatu: string;
  kodKraje: number;
  nazevKraje: string;
  kodOkresu: number;
  kodObce: number;
  nazevObce: string;
  kodMestskehoObvodu: number;
  nazevMestskehoObvodu: string;
  kodMestskeCastiObvodu: number;
  kodUlice: number;
  nazevMestskeCastiObvodu: string;
  nazevUlice: string;
  cisloDomovni: number;
  kodCastiObce: number;
  cisloOrientacni: number;
  nazevCastiObce: string;
  kodAdresnihoMista: number;
  psc: number;
  textovaAdresa: string;
  typCisloDomovni: 1;
  standardizaceAdresy: boolean;
}

export interface ARESSubject {
  ico: string;
  obchodniJmeno: string;
  sidlo: Sidlo;
  pravniForma: string;
  financniUrad: string;
  datumVzniku: string;
  datumAktualizace: string;
  dic: string;
  icoId: string;
  adresaDorucovaci: {
    radekAdresy1: string;
    radekAdresy2: string;
    radekAdresy3: string;
  };
  seznamRegistraci: {
    stavZdrojeVr: string;
    stavZdrojeRes: string;
    stavZdrojeRzp: string;
    stavZdrojeNrpzs: string;
    stavZdrojeRpsh: string;
    stavZdrojeRcns: string;
    stavZdrojeSzr: string;
    stavZdrojeDph: string;
    stavZdrojeSd: string;
    stavZdrojeIr: string;
    stavZdrojeCeu: string;
    stavZdrojeRs: string;
    stavZdrojeRed: string;
  };
  primarniZdroj: string;
  czNace: string[];
}
