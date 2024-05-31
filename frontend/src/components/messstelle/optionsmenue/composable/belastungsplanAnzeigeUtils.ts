import { computed } from "vue";
import { useMessstelleStore } from "@/store/modules/messstelle";

export function belastungsplanAnzeigeUtils() {
    const messstelleStore = useMessstelleStore();

    const chosenOptionsCopy = computed(() => {
        return messstelleStore.getFilteroptions;
    });

    const chosenOptionsCopyFahrzeuge = computed(() => {
        return chosenOptionsCopy.value.fahrzeuge;
    });

    const isSv_pInBelastungsPlan = computed(() => {
        let actualNumberOfSelectedKfzSvAndGv = 0;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            actualNumberOfSelectedKfzSvAndGv++;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            actualNumberOfSelectedKfzSvAndGv++;
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            actualNumberOfSelectedKfzSvAndGv++;
        }
        return (
            chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent &&
            (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
                chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
                chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
            actualNumberOfSelectedKfzSvAndGv < 3
        );
    });

    /**
     * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
     * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
     * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
     */
    const isGv_pInBelastungsPlan = computed(() => {
        let actualNumberOfSelectedKfzSvGvAndSV_P = 0;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            actualNumberOfSelectedKfzSvGvAndSV_P++;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            actualNumberOfSelectedKfzSvGvAndSV_P++;
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            actualNumberOfSelectedKfzSvGvAndSV_P++;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
            actualNumberOfSelectedKfzSvGvAndSV_P++;
        }
        return (
            chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent &&
            (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
                chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
                chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
            actualNumberOfSelectedKfzSvGvAndSV_P < 3
        );
    });

    return { isGv_pInBelastungsPlan, isSv_pInBelastungsPlan };
}
