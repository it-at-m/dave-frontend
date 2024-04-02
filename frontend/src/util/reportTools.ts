import { useStore } from "@/api/util/useStore";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import { Levels } from "@/api/error";
import { computed, ComputedRef } from "vue";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import MessstelleDatatableAsset from "@/types/pdfreport/assets/MessstelleDatatableAsset";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

export function useReportTools() {
    const store = useStore();

    const messstelle: ComputedRef<MessstelleInfoDTO> = computed(() => {
        return store.getters["messstelleInfo/getMessstelleInfo"];
    });

    function addImageToReport(
        base64: string,
        name: string,
        heading: boolean
    ): void {
        if (heading) {
            addHeadingToReport();
        }
        const imageAsset = new ImageAsset(name, base64);
        imageAsset.width = 100;
        store.dispatch("addAsset", imageAsset);
    }

    function addHeadingToReport(): void {
        const chartTitle = "";
        if (chartTitle !== "") {
            const headingAsset = new HeadingAsset(
                chartTitle,
                AssetTypesEnum.HEADING5
            );
            store.dispatch("addAsset", headingAsset);
        }
    }

    function createCaption(diagram: string): string {
        return `${diagram} zur Messstelle ${messstelle.value.mstId}`;
    }

    function getFileName(type: string, zeitraum: Array<string>): string {
        let dateForFilename: string = new Date(zeitraum[0])
            .toISOString()
            .split("T")[0];

        if (zeitraum.length === 2) {
            dateForFilename = `${dateForFilename}_bis_${
                new Date(zeitraum[1]).toISOString().split("T")[0]
            }`;
        }
        return `${messstelle.value.mstId}_${dateForFilename}_${type}`;
    }

    function addChartToPdfReport(
        base64: string,
        type: string,
        artikel: string
    ): void {
        addImageToReport(base64, createCaption(type), true);

        store.dispatch("snackbar/showToast", {
            snackbarTextPart1: `${artikel} ${type} wurde dem PDF Report hinzugefügt.`,
            level: Levels.SUCCESS,
        });
    }

    function addDatatabelToPdfReport(
        options: MessstelleOptionsDTO,
        type: string,
        artikel: string
    ): void {
        addHeadingToReport();
        const datatableAsset: MessstelleDatatableAsset =
            new MessstelleDatatableAsset(
                options,
                messstelle.value.id,
                `Datentabelle zur Messstelle ${messstelle.value.mstId}`
            );
        store.dispatch("addAsset", datatableAsset);

        store.dispatch("snackbar/showToast", {
            snackbarTextPart1: `${artikel} ${type} wurde dem PDF Report hinzugefügt.`,
            level: Levels.SUCCESS,
        });
    }

    function saveGraphAsImage(
        base64: string,
        type: string,
        zeitraum: Array<string>
    ): void {
        const filename = getFileName(type, zeitraum);

        if (base64 !== "") {
            const link = document.createElement("a");
            link.setAttribute("href", base64);
            link.setAttribute("download", filename);
            document.body.appendChild(link); // Required for FF
            link.click();
        }
    }

    return {
        addImageToReport,
        addChartToPdfReport,
        saveGraphAsImage,
        addDatatabelToPdfReport,
        getFileName,
    };
}
