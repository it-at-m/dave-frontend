export default class SearchOptions {
  page: number = 1;
  itemsPerPage: number = 10;
  sortBy: string[];
  sortDesc: boolean[];
  sort: string | undefined;
  reverse: boolean = false;

  constructor(page: number, itemsPerPage: number, sortBy: string[], sortDesc: boolean[]) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.sortBy = sortBy;
    this.sortDesc = sortDesc;
  }
}