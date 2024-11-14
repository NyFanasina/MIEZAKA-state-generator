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
  if (isNaN(value)) return parseFloat("0").toFixed(2);
  return parseFloat(value).toFixed(2);
}

export function lowerThan15(value: number) {
  if (value < 15) return "-15";
  else if (value < 30) return "-30";
  else if (value < 50) return "-50";
  else if (value > 75) return "+75";
  else if (value > 50) return "+50";
}

export function calculateTotalQteForOneProvider(rows: Array<any>, type: "vente" | "report" | "achat" | "production") {
  const onlyQte = rows.map((elt) => elt[type]?.Qte ?? 0);
  const total = onlyQte.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
  return total;
}

export function calculateTotalPoidsForOneProvider(rows: Array<any>, type: "vente" | "report" | "achat" | "production") {
  const onlyPoids = rows.map((item) => item.article?.AR_PoidsNet * (item[type]?.Qte ?? 0));
  return onlyPoids.reduce((acc, cur) => acc + cur, 0);
}

export function calculateTotalMontAchatForOneProvider(rows: Array<any>, type: "report" | "achat") {
  const onlyMontAchat = rows.map((item) => item.article?.AR_PoidsNet * item.article.AR_PrixAch * (item[type]?.Qte ?? 0));
  return onlyMontAchat.reduce((acc, cur) => acc + cur, 0);
}
