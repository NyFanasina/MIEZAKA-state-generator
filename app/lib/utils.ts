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

export function calculateTotalQteForOneProvider(rows: Array<any>, type: "vente" | "report" | "achat" | "production" | "stock") {
  if (type === "stock") {
    const QteStocks = rows.map(
      (elt) => parseInt(elt.report?.Qte ?? 0) + parseInt(elt.production?.Qte ?? 0) + parseInt(elt.achat?.Qte ?? 0) - parseInt(elt.vente?.Qte ?? 0)
    );
    return QteStocks.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyQte = rows.map((elt) => elt[type]?.Qte ?? 0);
  return onlyQte.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
}

export function calculateTotalPoidsForOneProvider(rows: Array<any>, type: "vente" | "report" | "achat" | "production" | "stock") {
  if (type === "stock") {
    const onlyPoids = rows.map((elt) => {
      const Stock_Qte = parseInt(elt.report?.Qte ?? 0) + parseInt(elt.production?.Qte ?? 0) + parseInt(elt.achat?.Qte ?? 0) - parseInt(elt.vente?.Qte ?? 0);
      return elt.article?.AR_PoidsNet * Stock_Qte;
    });
    return onlyPoids.reduce((acc, cur) => acc + cur, 0);
  }
  const onlyPoids = rows.map((item) => item.article?.AR_PoidsNet * (item[type]?.Qte ?? 0));
  return onlyPoids.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalMontAchatForOneProvider(rows: Array<any>, type: "report" | "achat") {
  const onlyMontAchat = rows.map((item) => item.article?.AR_PoidsNet * item.article.AR_PrixAch * (item[type]?.Qte ?? 0));
  return onlyMontAchat.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalMontDedouanForOneProvider(rows: Array<any>, type: "vente" | "achat" | "report" | "stock" | "production") {
  if (type === "stock") {
    const onlyMontDedouan = rows.map((elt) => {
      const Stock_Qte = parseInt(elt.report?.Qte ?? 0) + parseInt(elt.production?.Qte ?? 0) + parseInt(elt.achat?.Qte ?? 0) - parseInt(elt.vente?.Qte ?? 0);
      return elt.article?.AR_PoidsBrut * Stock_Qte;
    });
    return onlyMontDedouan.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyMontDedouan = rows.map((item) => item.article?.AR_PoidsBrut * (item[type]?.Qte ?? 0));
  return onlyMontDedouan.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalVenteReelForOneProvider(rows: Array<any>, type: "vente") {
  const onlyVentesReelles = rows.map((item: any) => parseFloat(item.vente?.Vente_Reelle ?? 0));
  return onlyVentesReelles.reduce((acc, cur) => acc + cur, 0);
}

export function calculateVente_p100(Vente_Poids: number, Report_Poids: number, Achat_Poids: number, Prod_Poids: number) {
  let Vente_p100 = Vente_Poids * 100;
  if ((Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0) === 0) Vente_p100 = 0;
  else Vente_p100 /= (Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0);
  return Vente_p100;
}

export function calculateVente_p100ForOneProvider(rows: Array<any>) {
  const onlyVente_p100 = rows.map((row) => {
    const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);

    const Vente_Poids = row.article?.AR_PoidsNet * (row.vente?.Qte ?? 0);
    const Stock_Poids = parseFloat(parseDecimal(row.article?.AR_PoidsNet * Stock_Qte));
    const Report_Poids = row.article?.AR_PoidsNet * (row.report?.Qte ?? 0);
    const Achat_Poids = row.article?.AR_PoidsNet * (row.achat?.Qte ?? 0);
    const Prod_Poids = (row.production?.Qte ?? 0) * row.article.AR_PoidsNet;

    // Calcul % vente
    return calculateVente_p100(Vente_Poids, Report_Poids, Achat_Poids, Prod_Poids);
  });
  const vente_p100_Provider = onlyVente_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  }, 0);
  return vente_p100_Provider;
}

export function calculateMarge_p100ForOneProvider(rows: Array<any>) {
  const onlyMarge_p100 = rows.map(
    (row) => ((parseFloat(row.article.AC_PrixVen ?? 0) - parseFloat(row.article.AR_PoidsBrut ?? 0)) / parseFloat(row.article.AR_PoidsBrut ?? 0)) * 100
  );
  return onlyMarge_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  }, 0);
}
