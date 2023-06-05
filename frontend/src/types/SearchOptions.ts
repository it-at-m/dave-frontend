export default class SearchOptions {
    page = 1;
    itemsPerPage = 10;
    sortBy: string[];
    sortDesc: boolean[];
    sort: string | undefined;
    reverse = false;

    constructor(
        page: number,
        itemsPerPage: number,
        sortBy: string[],
        sortDesc: boolean[]
    ) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.sortBy = sortBy;
        this.sortDesc = sortDesc;
    }
}
