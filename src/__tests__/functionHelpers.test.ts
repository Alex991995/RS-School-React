import { pagesCutting, range } from '../utils/functionHelpers';

describe('Function pagesCutting test from when should be the beginning and the end of correct pagination (displaying only 3 available pages)', () => {
  it('if i am on the first page should see 1,2,3', () => {
    const res = pagesCutting(10, 1);
    expect(res).toEqual({ start: 1, end: 3 });
  });
  it('if i am on the last page should see 8,9,10', () => {
    const res = pagesCutting(10, 10);
    expect(res).toEqual({ start: 8, end: 10 });
  });
  it('if i am in the meddle of pages should see any three pages', () => {
    const res = pagesCutting(10, 6);
    expect(res).toEqual({ start: 5, end: 7 });
  });

  it('Function range make me array of pages from the result of pagesCutting', () => {
    const resPagesCutting = pagesCutting(10, 6);
    const res = range(resPagesCutting.start, resPagesCutting.end);
    expect(res).toEqual([5, 6, 7]);
  });
});
