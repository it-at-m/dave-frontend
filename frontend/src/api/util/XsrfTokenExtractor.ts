export default class XsrfTokenExtractor {
  static getXsrfToken(): string {
    const help = document.cookie.match(
      "(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)"
    );
    const csrf_cookie = help ? help.pop() : "";
    if (csrf_cookie === undefined) {
      return "";
    } else {
      return csrf_cookie.toString();
    }
  }
}
