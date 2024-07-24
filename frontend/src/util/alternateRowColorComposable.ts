/**
 * Die einzelenen Zeilen werden unterschiedlich farblich markiert. Dazu wird eine
 * modolo Berechnung durchgeführt.
 *
 * @param index
 */
export function useAlternateRowColor() {
    const calcRowColor = (index: number) => {
        const ungerade = index % 2 > 0;
        if (ungerade) {
            return "grey-lighten-4";
        }
        return "grey-lighten-2";
    };

    return { calcRowColor };
}
