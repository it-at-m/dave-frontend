import { FetchError, ResponseError } from "@/api/client/runtime";
import { ApiError, Levels } from "@/api/error";

const RESPONSE_TYPE_OPAQUE_REDIRECT = "opaqueredirect";

export function handleOpenApiError<T>(
  request: Promise<T>,
  errorMessage: string
): Promise<T> {
  return request.catch((error: unknown) => {
    if (error instanceof FetchError) {
      throw new ApiError(
        Levels.ERROR,
        "Die Verbindung zum Service konnte nicht aufgebaut werden.",
        error.cause.message
      );
    }

    if (error instanceof ResponseError) {
      const { response } = error;

      if (response.status === 400) {
        throw new ApiError(
          Levels.ERROR,
          errorMessage,
          "Fehlerhafte Anfrage an das Backend geschickt, HTTP: 400."
        );
      }
      if (response.status === 403) {
        throw new ApiError(
          Levels.ERROR,
          "Sie haben nicht die nötigen Rechte um diese Aktion durchzuführen."
        );
      }
      if (response.status === 409) {
        throw new ApiError(
          Levels.ERROR,
          errorMessage,
          "Daten mit gleichen Werten existieren bereits."
        );
      }
      if (response.status === 412) {
        location.reload();
        throw new ApiError(
          Levels.ERROR,
          "Die Daten wurden in der Zwischenzeit verändert. Die Seite wird neu geladen."
        );
      }
      if (response.type === RESPONSE_TYPE_OPAQUE_REDIRECT) {
        location.reload();
      }
      throw new ApiError(
        Levels.ERROR,
        errorMessage,
        `Fehler: ${response.status} ${response.statusText}`
      );
    }

    throw error;
  });
}
