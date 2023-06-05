export default class DaveUtils {
    public static downloadFile(file: Blob, name: string) {
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }
}
