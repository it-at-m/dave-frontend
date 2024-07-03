export enum Wetter {
    // Sonnig
    SUNNY = "SUNNY",
    // Sonnig kalt
    SUNNY_COLD = "SUNNY_COLD",
    // bewölkt
    CLOUDY = "CLOUDY",
    // regnerisch (Schauer)
    RAINY = "RAINY",
    // regnerisch (dauerhaft)
    CONTINUOUS_RAINY = "CONTINUOUS_RAINY",
    // neblig
    FOGGY = "FOGGY",
    // Schnee
    SNOWY = "SNOWY",
    // keinen Angabe
    NO_INFORMATION = "NO_INFORMATION",
}

export default Wetter;

export const wetterText = new Map<string, string>([
    [Wetter.SUNNY, "sonnig"],
    [Wetter.SUNNY_COLD, "sonnig und kalt"],
    [Wetter.CLOUDY, "bewölkt"],
    [Wetter.RAINY, "regnerisch (Schauer)"],
    [Wetter.CONTINUOUS_RAINY, "regnerisch (dauerhaft)"],
    [Wetter.FOGGY, "neblig"],
    [Wetter.SNOWY, "Schnee"],
    [Wetter.NO_INFORMATION, "keine Wetterinformationen vorhanden"],
]);
