export interface Mouvement {
  article: Article;
  report: Report_;
  achat: Achat;
  vente: Vente;
  production: Production;
}

export interface ByCategory {
  "PETITE BALLE"?: Mouvement[];
  "GROSSE BALLE"?: Mouvement[];
}

type Article = {
  AR_Ref: string;
  AR_Design: string;
  Etat: string;
  AR_PrixAch: number;
  AC_PrixVen: string;
  AR_PoidsNet: string;
  AR_PoidsBrut: number;
  cbCreation: string;
  CT_Num: string;
  AF_Devise: number;
  Size: string;
  Nom_Fournisseur: string;
};

type Report_ = {
  AR_Ref: string;
  Qte: number;
};

type Achat = {
  AR_Ref: string;
  DL_MontantHT: number;
  Qte: number;
};

type Vente = {
  Qte: number;
  Vente_Reelle: number;
};

type Production = {
  AR_Ref: string;
  Qte: string;
};
