import XsrfTokenExtractor from "@/api/util/XsrfTokenExtractor";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class FetchUtils {
  /**
   * Liefert eine default GET-Config für fetch
   */
  static getGETConfig(): RequestInit {
    return {
      headers: this.getHeaders(),
      mode: "cors",
      credentials: "include",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default POST-Config für fetch
   * @param body zu übertragender Body
   */
  static getPOSTConfig(body: any): RequestInit {
    return {
      method: "POST",
      body: JSON.stringify(body),
      headers: FetchUtils.getHeaders("application/json"),
      mode: "cors",
      credentials: "include",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default PUT-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   * @param body zu übertragender Body
   */
  static getPUTConfig(body: any): RequestInit {
    const headers = FetchUtils.getHeaders("application/json");
    if (body.entityVersion) {
      headers.append("If-Match", body.entityVersion);
    }
    return {
      method: "PUT",
      body: JSON.stringify(body),
      headers: headers,
      mode: "cors",
      credentials: "include",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default PATCH-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   * @param body zu übertragender Body
   */
  static getPATCHConfig(body: any): RequestInit {
    const headers = FetchUtils.getHeaders("application/json");
    if (body.entityVersion) {
      headers.append("If-Match", body.entityVersion);
    }
    return {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
      mode: "cors",
      credentials: "include",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default DELETE-Config für fetch
   */
  static getDELETEConfig(): RequestInit {
    return {
      method: "DELETE",
      headers: FetchUtils.getHeaders(),
      mode: "cors",
      credentials: "include",
      redirect: "manual",
    };
  }

  /**
   * Baut gemeinsame Request-Header auf und setzt optional den Content-Type.
   * Bei FormData muss der Content-Type leer bleiben, damit fetch die Boundary ergänzt.
   * @param contentType Content-Type für den Request-Body
   * @returns {Headers}
   */
  static getHeaders(contentType?: string): Headers {
    const headers = new Headers({
      "Accept-Language": "de-DE",
      "X-XSRF-TOKEN": XsrfTokenExtractor.getXsrfToken().toString(),
    });
    if (contentType) {
      headers.set("Content-Type", contentType);
    }
    return headers;
  }

  static getOpenApiFetch(): typeof fetch {
    return (url, init) => {
      const headers = new Headers(init?.headers);
      this.getHeaders().forEach((value, key) => headers.set(key, value));
      return fetch(url, {
        ...init,
        headers,
        mode: "cors",
        credentials: "include",
        redirect: "manual",
      });
    };
  }

  /**
   * Liefert die POST-Config für die generierung eines PDF
   */
  static getPdfPOSTConfig(body: any): RequestInit {
    return {
      method: "POST",
      body: body,
      headers: FetchUtils.getPdfHeaders(),
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Baut den Header für ein PDF-Request auf
   */
  static getPdfHeaders(): Headers {
    return FetchUtils.getHeaders();
  }
}
