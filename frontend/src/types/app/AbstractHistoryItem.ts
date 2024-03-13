export default class AbstractHistoryItem {
    identifier: string;
    viewtime: Date;

    constructor(identifier: string) {
        this.identifier = identifier;
        this.viewtime = new Date();
    }
}
