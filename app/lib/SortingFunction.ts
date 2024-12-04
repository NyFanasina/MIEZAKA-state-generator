import { Mouvement } from "./ste_definition";

export function sortByAR_Ref(data: Mouvement[]) {
  return data.toSorted((a, b) => a.article.AR_Ref.localeCompare(b.article.AR_Ref));
}

export function sortByState(data: Mouvement[]) {
  return data.toSorted((a, b) => a.article.Etat.localeCompare(b.article.Etat));
}

export function sortByPU_Achat(data: Mouvement[]) {
  return data.toSorted((a, b) => Number(a.article.AR_PrixAch) - Number(b.article.AR_PrixAch));
}

export function sortByPU_Revient(data: Mouvement[]) {
  return data.toSorted((a, b) => Number(a.article.AR_PoidsBrut) - Number(b.article.AR_PoidsBrut));
}

export function sortByPU_Gros(data: Mouvement[]) {
  return data.toSorted((a, b) => Number(a.article.AC_PrixVen) - Number(b.article.AC_PrixVen));
}
