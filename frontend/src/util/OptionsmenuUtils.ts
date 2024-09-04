import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";

export function useOptionsmenuUtils(chosenOptionsCopy: MessstelleOptionsDTO) {
  const isDateBiggerFiveYears = computed(() => {
    if (chosenOptionsCopy.zeitraum.length === 2) {
      const zeitraum = chosenOptionsCopy.zeitraum.slice();
      const timeDifferenceInMilliseconds =
        new Date(zeitraum[1]).valueOf() - new Date(zeitraum[0]).valueOf();
      const timeDifferenceInYears =
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
      return timeDifferenceInYears > 5;
    }
    return false;
  });

  return { isDateBiggerFiveYears };
}
