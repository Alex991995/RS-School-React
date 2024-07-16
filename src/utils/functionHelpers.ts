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

  if (currentPage <= ceiling) {
    return { start: 1, end: pagesCutNumber };
  } else if (currentPage + floor >= wholePage) {
    return { start: wholePage - pagesCutNumber + 1, end: wholePage };
  } else {
    return { start: currentPage - floor, end: currentPage + floor };
  }
}

export function isJsonString(arr: string[]) {
  try {
    const parseArr = JSON.parse(arr.join());
    return parseArr;
  } catch (e) {
    return arr;
  }
}
