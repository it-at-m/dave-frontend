export default class Suggest {
    text: string;
    type: string;
    zaehlstelleId: string;
    zaehlungId: string;
    mstId: string;

    constructor(
        text: string,
        type: string,
        zaehlstelleId: string,
        zaehlungId: string,
        mstId: string
    ) {
        this.text = text;
        this.type = type;
        this.zaehlstelleId = zaehlstelleId;
        this.zaehlungId = zaehlungId;
        this.mstId = mstId;
    }
}
