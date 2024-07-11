export default class BaseUrlProvider {
    static getBaseUrl(): string {
        const location = window.location;
        if (location.host === "localhost:8081") {
            return `${location.protocol}//localhost:8082`;
        }
        return `${location.protocol}//${location.host}`;
    }
}
