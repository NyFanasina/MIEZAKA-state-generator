export interface Mouvement {
  article: Article;
  report: Report_;
  achat?: Achat;
  vente?: Vente;
  production?: Production;
}

export interface Provider {
  Nom_Fournisseur: string;
  Devise: string | number;
}
export interface ByCategory {
  "PETITE BALLE"?: Mouvement[];
  "GROSSE BALLE"?: Mouvement[];
}

export type SizeBalle = "PETITE BALLE" | "GROSSE BALLE";

export type Article = {
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
  Size: SizeBalle;
  Nom_Fournisseur: string;
};

export type Report_ = {
  AR_Ref: string;
  Qte?: number;
};

export type Achat = {
  AR_Ref: string;
  DL_MontantHT: number;
  Qte?: number;
};

export type Vente = {
  AR_Ref: string;
  Qte?: number;
  Vente_Reelle: number;
};

export type Production = {
  AR_Ref: string;
  Qte?: string;
};
