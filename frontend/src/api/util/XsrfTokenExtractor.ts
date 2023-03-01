export default class XsrfTokenExtractor {

  static getXsrfToken(): string {
    let help = document.cookie.match('(^|;)\\s*' + 'XSRF-TOKEN' + '\\s*=\\s*([^;]+)');
    let csrf_cookie = help ? help.pop() : '';
    if (csrf_cookie === undefined) {
      return '';
    } else {
      return csrf_cookie.toString();
    }
  }

}
