export default class DaveUtils {
    public static downloadFile(file: Blob, name: string) {
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }

    public static downloadCsv(content: string, filename: string) {
        const csvContent = `data:text/csv;charset=utf-8,${content}`;

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", filename);
        document.body.appendChild(link); // Required for FF

        link.click();
    }
}
