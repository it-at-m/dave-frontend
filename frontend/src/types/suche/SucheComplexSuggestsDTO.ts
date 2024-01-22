import SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";
import SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";

export default interface SucheComplexSuggestsDTO {
    wordSuggests: SucheWordSuggestDTO[];
    zaehlstellenSuggests: SucheZaehlstelleSuggestDTO[];
    zaehlungenSuggests: SucheZaehlungSuggestDTO[];
    messstellenSuggests: SucheMessstelleSuggestDTO[];
}
