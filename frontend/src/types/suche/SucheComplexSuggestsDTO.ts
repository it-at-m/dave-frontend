import SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";

export default interface SucheComplexSuggestsDTO {
    wordSuggests: SucheWordSuggestDTO[];
    zaehlstellenSuggests: SucheZaehlstelleSuggestDTO[];
    zaehlungenSuggests: SucheZaehlungSuggestDTO[];
}
