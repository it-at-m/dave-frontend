export default class Suggest {
    text: string;
    type: string;
    zaehlstelleId: string;
    zaehlungId: string;

    constructor(
        text: string,
        type: string,
        zaehlstelleId: string,
        zaehlungId: string
    ) {
        this.text = text;
        this.type = type;
        this.zaehlstelleId = zaehlstelleId;
        this.zaehlungId = zaehlungId;
    }
}
