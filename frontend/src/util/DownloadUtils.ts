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

  function downloadXlsx(content: string, filename: string) {
    downloadFile(
      b64toBlob(
        content,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ),
      filename
    );
  }

  function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  return { downloadFile, downloadCsv, downloadXlsx };
}
