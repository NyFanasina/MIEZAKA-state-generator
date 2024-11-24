import { SearchParamsStatesProps } from "../(views)/states/full/page";
import { Mouvement } from "./ste_definition";

export function formatDateToFr(date: Date, format = "FR") {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat(format, options);
  return formatter.format(date);
}

export function calculateDayBefore(date: string) {
  const nextDate = new Date(date);
  const timestampBeforeOneDay = nextDate.getTime() - 86400000; // Timestamp of J-1
  const dayBefore = new Date(timestampBeforeOneDay).toLocaleDateString("FR").replaceAll("/", "-");
  return dayBefore;
}

export function capitalizeString(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function parseDecimal(value: any) {
  const formatter = Intl.NumberFormat("fr-FR", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (isNaN(value)) return parseFloat("0").toFixed(2);
  return formatter.format(value);
}

export function lowerThan15(value: number) {
  if (value < 15) return "-15";
  else if (value < 30) return "-30";
  else if (value < 50) return "-50";
  else if (value > 75) return "+75";
  else if (value > 50) return "+50";
}

export function GroupByProvider(rows: Mouvement[] = []) {
  return (
    rows.reduce((acc: any, curr) => {
      const provider = curr.article.Nom_Fournisseur;

      if (!acc[provider]) acc[provider] = [];

      acc[provider].push(curr);
      return acc;
    }, {}) ?? []
  );
}

type MouvementType = "vente" | "report" | "achat" | "production" | "stock";

export function calculateTotalQteForOneProvider(rows: Array<Mouvement> = [], type: MouvementType) {
  if (type === "stock") {
    const QteStocks = rows.map((elt) => Number(elt.report?.Qte ?? 0) + Number(elt.production?.Qte ?? 0) + Number(elt.achat?.Qte ?? 0) - Number(elt.vente?.Qte ?? 0));
    return QteStocks.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyQte = rows.map((elt) => Number(elt[type]?.Qte ?? 0));
  return onlyQte.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalPoidsForOneProvider(rows: Array<Mouvement> = [], type: MouvementType) {
  if (type === "stock") {
    const onlyPoids = rows.map((elt) => {
      const Stock_Qte = Number(elt.report?.Qte ?? 0) + Number(elt.production?.Qte ?? 0) + Number(elt.achat?.Qte ?? 0) - Number(elt.vente?.Qte ?? 0);
      return Number(elt.article?.AR_PoidsNet) * Stock_Qte;
    });
    return onlyPoids.reduce((acc, cur) => acc + cur, 0);
  }
  const onlyPoids = rows.map((item) => Number(item.article?.AR_PoidsNet) * Number(item[type]?.Qte ?? 0));
  return onlyPoids.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalMontAchatForOneProvider(rows: Array<Mouvement> = [], type: "report" | "achat") {
  const onlyMontAchat = rows.map((item) => Number(item.article?.AR_PoidsNet) * item.article.AR_PrixAch * (item[type]?.Qte ?? 0));
  return onlyMontAchat.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalMontDedouanForOneProvider(rows: Array<Mouvement> = [], type: MouvementType) {
  if (type === "stock") {
    const onlyMontDedouan = rows.map((elt) => {
      const Stock_Qte = Number(elt.report?.Qte ?? 0) + Number(elt.production?.Qte ?? 0) + Number(elt.achat?.Qte ?? 0) - Number(elt.vente?.Qte ?? 0);
      return elt.article?.AR_PoidsBrut * Stock_Qte;
    });
    return onlyMontDedouan.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyMontDedouan = rows.map((item) => item.article?.AR_PoidsBrut * Number(item[type]?.Qte ?? 0));
  return onlyMontDedouan.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalVenteReelForOneProvider(rows: Array<Mouvement> = [], type: "vente") {
  const onlyVentesReelles = rows.map((item: any) => parseFloat(item.vente?.Vente_Reelle ?? 0));
  return onlyVentesReelles.reduce((acc, cur) => acc + cur, 0);
}

export function calculateVente_p100(row: Mouvement) {
  const Report_Poids = calculatePoids(row, "report");
  const Achat_Poids = calculatePoids(row, "achat");
  const Prod_Poids = calculatePoids(row, "production");

  let Vente_p100 = calculatePoids(row, "vente") * 100;
  if ((Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0) === 0) Vente_p100 = 0;
  else Vente_p100 /= (Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0);
  return Vente_p100;
}

export function calculateVente_p100ForOneProvider(rows: Array<Mouvement> = []) {
  const onlyVente_p100 = rows.map((row) => {
    const Stock_Qte = Number(row.report?.Qte ?? 0) + Number(row.production?.Qte ?? 0) + Number(row.achat?.Qte ?? 0) - Number(row.vente?.Qte ?? 0);

    const Vente_Poids = Number(row.article?.AR_PoidsNet) * Number(row.vente?.Qte ?? 0);
    const Stock_Poids = Number(row.article?.AR_PoidsNet) * Stock_Qte;
    const Report_Poids = Number(row.article?.AR_PoidsNet) * Number(row.report?.Qte ?? 0);
    const Achat_Poids = Number(row.article?.AR_PoidsNet) * Number(row.achat?.Qte ?? 0);
    const Prod_Poids = Number(row.production?.Qte ?? 0) * Number(row.article.AR_PoidsNet);

    // Calcul % vente
    return calculateVente_p100(row);
  });
  const vente_p100_Provider = onlyVente_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  }, 0);
  return vente_p100_Provider;
}

export function calculateMarge_p100ForOneProvider(rows: Array<Mouvement> = []) {
  const onlyMarge_p100 = rows.map((row) => ((Number(row.article.AC_PrixVen ?? 0) - Number(row.article.AR_PoidsBrut ?? 0)) / Number(row.article.AR_PoidsBrut ?? 0)) * 100);
  return onlyMarge_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  }, 0);
}

export function calculateQteStock(row: Mouvement) {
  return Number(row.report?.Qte ?? 0) + Number(row.production?.Qte ?? 0) + Number(row.achat?.Qte ?? 0) - Number(row.vente?.Qte ?? 0);
}

export function calculatePoidsStock(row: Mouvement) {
  return parseFloat(row.article?.AR_PoidsNet) * calculateQteStock(row);
}

export function calculatePoids(row: Mouvement, type: MouvementType) {
  return Number(row.article?.AR_PoidsNet) * Number(row[type]?.Qte ?? 0);
}

export function calculateValAchDevise(rows: any[], type: "production" | "report" | "vente" | "stock" | "achat") {
  if (type === "stock") {
    const onlyValDedouans = rows.map((row) => {
      const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);
      const Stock_poids = row.article?.AR_PoidsNet * Stock_Qte;
      return Stock_poids * row.article.AR_PrixAch;
    }); //poids * Pu
    return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyValDedouans = rows.map((row) => (row[type]?.Qte ?? 0) * row.article.AR_PoidsNet * row.article.AR_PrixAch); //poids * PU
  return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
}

export function calculateValDedouanAR(rows: any[], type: "production" | "report" | "vente" | "stock") {
  if (type === "stock") {
    const onlyValDedouans = rows.map((row) => {
      const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);
      return Stock_Qte * row.article.AR_PoidsBrut;
    });
    return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyValDedouans = rows.map((row) => (row[type]?.Qte ?? 0) * row.article.AR_PoidsBrut);
  return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
}

export function calculate_PU_Provider(rows: Array<Mouvement> = []) {
  const onlyPU = rows.map((row) => Number(row.article.AR_PrixAch ?? 0));
  return onlyPU.reduce((acc, cur) => acc + cur, 0) / onlyPU.length;
}

export default function filterData(searchParams: SearchParamsStatesProps["searchParams"], data: Mouvement[]) {
  if (searchParams?.category) {
    data = data.filter((row) => row.article.Size.includes((searchParams.category ?? "").toUpperCase()));
  }

  if (searchParams?.weight) {
    data = data.filter((row) => {
      const Poids_Stock = calculatePoidsStock(row);
      if (searchParams?.weight === "+5t") return Poids_Stock > 5000;
      if (searchParams?.weight === "-5t") return Poids_Stock < 5000;
    });
  }

  if (searchParams?.state) {
    data = data.filter((row) => row.article?.Etat == searchParams?.state);
  }

  if (searchParams?.vente_p100) {
    data = data.filter((row) => {
      const Vente_p100 = calculateVente_p100(row);
      if (searchParams.vente_p100 === "-15") return Vente_p100 < 15;
      if (searchParams.vente_p100 === "-30") return Vente_p100 >= 15 && Vente_p100 < 30;
      if (searchParams.vente_p100 === "-50") return Vente_p100 >= 30 && Vente_p100 < 50;
      if (searchParams.vente_p100 === "+50") return Vente_p100 >= 50 && Vente_p100 < 75;
      if (searchParams.vente_p100 === "+75") return Vente_p100 >= 75 && Vente_p100;
    });
  }

  if (searchParams?.keyword) {
    data = data.filter((row) => row.article.AR_Design.toLocaleLowerCase().includes((searchParams.keyword ?? "").toLocaleLowerCase()));
  }

  return data;
}
