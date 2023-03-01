export const enum Levels {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export class ApiError extends Error {
  level: Levels;

  constructor(level?: Levels, message?: string, error?: string) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(message);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    this.stack = new Error().stack;

    // Benutzerdefinierte Informationen
    if (level === undefined) {
      level = Levels.ERROR;
    }
    if (message === undefined) {
      message = "Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.";
    }
    this.level = level;
    this.message = `${message}µ${error}`;
  }
}
