export function range(start: number, end: number) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

export function pagesCutting(wholePage: number, currentPage: number) {
  const pagesCutNumber = 3;
  const ceiling = Math.ceil(pagesCutNumber / 2);
  const floor = Math.floor(pagesCutNumber / 2);

  // если номер текущей странице меньше или ровно ceiling(3) тогда
  // мы имеем диапозон с 1 страницу и до pagesCutNumber
  if (currentPage <= ceiling) {
    return { start: 1, end: pagesCutNumber };
  }

  // если номер текущей странице + floor(2)  больше или ровно wholePage(200) тогда
  // мы имеем диапозон с wholePage - 4, до wholePage
  else if (currentPage + floor >= wholePage) {
    return { start: wholePage - pagesCutNumber + 1, end: wholePage };
  }

  // тут у нас просто середина 2 элемента слева и 2 справа
  else {
    return { start: currentPage - floor, end: currentPage + floor };
  }
}
