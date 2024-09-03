export function useDownloadUtils() {
  function download(data: string, filename: string) {
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
  }

  function downloadFile(file: Blob, filename: string) {
    download(window.URL.createObjectURL(file), filename);
  }

  function downloadCsv(content: string, filename: string) {
    const csvContent = `data:text/csv;charset=utf-8,${content}`;
    download(encodeURI(csvContent), filename);
  }

  return { downloadFile, downloadCsv };
}
