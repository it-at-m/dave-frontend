import { computed } from "vue";
import { useDateUtils } from "@/util/DateUtils";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

export function useOptionsmenuUtils(chosenOptionsCopy: MessstelleOptionsDTO) {
    const dateUtils = useDateUtils();

    const isDateBiggerFiveYears = computed(() => {
        if (chosenOptionsCopy.zeitraum.length == 2) {
            const zeitraum = chosenOptionsCopy.zeitraum.slice();
            const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
            const timeDifferenceInMilliseconds =
                new Date(sortedDates[0]).valueOf() -
                new Date(sortedDates[1]).valueOf();
            const timeDifferenceInYears =
                timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
            return timeDifferenceInYears > 5;
        }
        return false;
    });

    return { isDateBiggerFiveYears };
}
