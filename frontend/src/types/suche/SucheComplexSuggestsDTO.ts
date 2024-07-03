import type SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import type SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import type SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";
import type SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";

export default interface SucheComplexSuggestsDTO {
    wordSuggests: SucheWordSuggestDTO[];
    zaehlstellenSuggests: SucheZaehlstelleSuggestDTO[];
    zaehlungenSuggests: SucheZaehlungSuggestDTO[];
    messstellenSuggests: SucheMessstelleSuggestDTO[];
}
