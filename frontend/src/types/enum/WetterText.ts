import { Wetter } from "@/api/client";

export const wetterText = new Map<string, string>([
  [Wetter.Sunny, "sonnig"],
  [Wetter.SunnyCold, "sonnig und kalt"],
  [Wetter.Cloudy, "bewölkt"],
  [Wetter.Rainy, "regnerisch (Schauer)"],
  [Wetter.ContinuousRainy, "regnerisch (dauerhaft)"],
  [Wetter.Foggy, "neblig"],
  [Wetter.Snowy, "Schnee"],
  [Wetter.NoInformation, "keine Wetterinformationen vorhanden"],
]);
