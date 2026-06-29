import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type { ZeitintervallRowDTO } from "@/types/zaehlung/zaehldaten/DrillDownDTO";

export function useCsvUtils() {

    function convertToCSV(zs: ZaehlstelleHeaderDTO, zaehlungsId: string, rows: ZeitintervallRowDTO[]): string {
        rows = [...rows].sort((a, b) => a.startUhrzeit.localeCompare(b.startUhrzeit));
        let startDate = rows[0].startUhrzeit;
        let endDate = rows[rows.length - 1].endeUhrzeit;
        let result = "";

        result += "Zählstelle,Zaehlung,Zählzeitraum Start, Zählzeitraum Ende\n";
        result += zs.nummer + "," + zaehlungsId + "," + startDate + "," + endDate +  "\n";
        result += zeitintervallRowToCSVFlat(rows);

        return result;
    }

    function zeitintervallRowToCSVFlat(rows: ZeitintervallRowDTO[]): string {
        if (rows.length === 0) return '';

        const allKeys = Array.from(
        new Set(rows.flatMap(row => Object.keys(row.wertByFahrbeziehung)))
        );

        // Derive vehicle type sub-columns from first available entry
        const sampleWerte = rows.flatMap(r => Object.values(r.wertByFahrbeziehung))[0];
        const vehicleTypes = sampleWerte ? Object.keys(sampleWerte) : [];

        const subHeaders = allKeys.flatMap(key => vehicleTypes.map(vt => `${key}_${vt}`));
        const header = ['startUhrzeit', 'endeUhrzeit', ...subHeaders].join(',');

        const dataRows = rows.map(row => {
            const timeFields = [row.startUhrzeit, row.endeUhrzeit];
            const valueFields = allKeys.flatMap(key => {
                const werte = row.wertByFahrbeziehung[key];
                return vehicleTypes.map(vt => werte?.[vt] ?? '');
            });
            return [...timeFields, ...valueFields].join(',');
        });

        return [header, ...dataRows].join('\n');
    }

    function generateFileName(zaehlung: LadeZaehlungDTO, rows: ZeitintervallRowDTO[]): string {
        let filename = "drilldown-" + zaehlung.kreuzungsname.replaceAll(" ","_" ) + "-";
        if(rows != null) {
            filename += rows[0].startUhrzeit;
        }
        return filename + ".csv";
    }

    return { convertToCSV, zeitintervallRowToCSVFlat, generateFileName };
}