import type KeyVal from "@/types/common/KeyVal";

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

export const wetterDropDown = new Array<KeyVal>(
  { value: Wetter.Sunny, title: wetterText.get(Wetter.Sunny)! },
  { value: Wetter.SunnyCold, title: wetterText.get(Wetter.SunnyCold)! },
  { value: Wetter.Cloudy, title: wetterText.get(Wetter.Cloudy)! },
  { value: Wetter.Rainy, title: wetterText.get(Wetter.Rainy)! },
  {
    value: Wetter.ContinuousRainy,
    title: wetterText.get(Wetter.ContinuousRainy)!,
  },
  { value: Wetter.Foggy, title: wetterText.get(Wetter.Foggy)! },
  { value: Wetter.Snowy, title: wetterText.get(Wetter.Snowy)! }
);
