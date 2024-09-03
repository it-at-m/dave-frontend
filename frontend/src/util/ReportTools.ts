import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

import _ from "lodash";
import { computed } from "vue";

import { useMessstelleStore } from "@/store/messstelle";
import { usePdfReportStore } from "@/store/pdfReport";
import { useSnackbarStore } from "@/store/snackbar";
import { useZaehlstelleStore } from "@/store/zaehlstelle";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import MessstelleDatatableAsset from "@/types/pdfreport/assets/MessstelleDatatableAsset";
import { useDateUtils } from "@/util/DateUtils";

export function useReportTools() {
  const messstelleStore = useMessstelleStore();
  const pdfReportStore = usePdfReportStore();
  const snackbarStore = useSnackbarStore();
  const zaehlstelleStore = useZaehlstelleStore();
  const dateUtils = useDateUtils();

  const messstelle = computed<MessstelleInfoDTO>(() => {
    return messstelleStore.getMessstelleInfo;
  });
  const messstelleOptions = computed<MessstelleOptionsDTO>(() => {
    return messstelleStore.getFilteroptions;
  });
  const zaehlstelle = computed<ZaehlstelleHeaderDTO>(() => {
    return zaehlstelleStore.getZaehlstelleHeader;
  });
  const selectedZaehlung = computed<LadeZaehlungDTO>(() => {
    return zaehlstelleStore.getAktiveZaehlung;
  });
  const zaehlstelleOptions = computed<OptionsDTO>(() => {
    return zaehlstelleStore.getFilteroptions;
  });

  function addImageToReport(base64: string, name: string): void {
    const imageAsset = new ImageAsset(name, base64);
    imageAsset.width = 100;
    pdfReportStore.addAsset(imageAsset);
  }

  function addHeadingToReport(erhebungsstelle: Erhebungsstelle): void {
    const heading = createHeading(erhebungsstelle);
    if (heading) {
      const headingAsset = new HeadingAsset(heading, AssetTypesEnum.HEADING5);
      pdfReportStore.addAsset(headingAsset);
    }
  }

  function createCaption(
    erhebungsstelle: Erhebungsstelle,
    diagram: string
  ): string {
    let caption = "";
    switch (erhebungsstelle) {
      case Erhebungsstelle.MESSSTELLE:
        caption = `${diagram} zur Messstelle ${messstelle.value.mstId}`;
        break;
      case Erhebungsstelle.ZAEHLSTELLE:
        caption = `${diagram} zur Zählung vom ${dateUtils.getShortVersionOfDate(
          new Date(selectedZaehlung.value.datum)
        )} für Zählstelle ${zaehlstelle.value.nummer}`;
        break;
    }
    return caption;
  }

  function createHeading(erhebungsstelle: Erhebungsstelle): string {
    let chartTitle = "";
    switch (erhebungsstelle) {
      case Erhebungsstelle.MESSSTELLE:
        if (
          messstelleOptions.value.messquerschnittIds.length <
          messstelle.value.messquerschnitte.length
        ) {
          const titleHelper: Array<string> = [];
          messstelle.value.messquerschnitte
            .filter((querschnitt) =>
              messstelleOptions.value.messquerschnittIds.includes(
                querschnitt.mqId
              )
            )
            .forEach((querschnitt) => {
              titleHelper.push(
                `${querschnitt.mqId} - ${querschnitt.standort ?? ""}`
              );
            });
          chartTitle = titleHelper.join(" ");
        }
        break;
      case Erhebungsstelle.ZAEHLSTELLE:
        if (zaehlstelleOptions.value.vonKnotenarm !== null) {
          selectedZaehlung.value.knotenarme.forEach((knotenarm) => {
            if (knotenarm.nummer === zaehlstelleOptions.value.vonKnotenarm) {
              if (!selectedZaehlung.value.kreisverkehr) {
                chartTitle = "von ";
              }
              chartTitle = `${chartTitle} ${knotenarm.strassenname} (${knotenarm.nummer}) `;
            }
          });
        }

        if (zaehlstelleOptions.value.nachKnotenarm !== null) {
          selectedZaehlung.value.knotenarme.forEach((knotenarm) => {
            if (knotenarm.nummer === zaehlstelleOptions.value.nachKnotenarm) {
              chartTitle = `${chartTitle} nach ${knotenarm.strassenname} (${knotenarm.nummer})`;
            }
          });
        }
        break;
    }
    return chartTitle;
  }

  // von außen aufrufbar
  function addChartToPdfReport(
    erhebungsstelle: Erhebungsstelle,
    artikel: string,
    type: string,
    base64: string | undefined,
    heading: boolean
  ): void {
    if (heading) {
      addHeadingToReport(erhebungsstelle);
    }
    if (base64) {
      addImageToReport(base64, createCaption(erhebungsstelle, type));
      snackbarStore.showSuccess(
        `${artikel} ${type} wurde dem PDF Report hinzugefügt.`
      );
    } else {
      snackbarStore.showError(
        `${artikel} ${type} konnte dem PDF Report nicht hinzugefügt.`
      );
    }
  }

  function addDatatableToPdfReport(
    erhebungsstelle: Erhebungsstelle,
    artikel: string,
    type: string
  ): void {
    addHeadingToReport(erhebungsstelle);

    switch (erhebungsstelle) {
      case Erhebungsstelle.MESSSTELLE:
        pdfReportStore.addAsset(
          new MessstelleDatatableAsset(
            _.cloneDeep(messstelleOptions.value),
            messstelle.value.id,
            createCaption(erhebungsstelle, "Datentabelle")
          )
        );
        break;
      case Erhebungsstelle.ZAEHLSTELLE:
        pdfReportStore.addAsset(
          new DatatableAsset(
            _.cloneDeep(zaehlstelleOptions.value),
            selectedZaehlung.value.id,
            createCaption(erhebungsstelle, "Datentabelle")
          )
        );
        break;
    }

    snackbarStore.showSuccess(
      `${artikel} ${type} wurde dem PDF Report hinzugefügt.`
    );
  }

  function getFileName(
    erhebungsstelle: Erhebungsstelle,
    type: string,
    zeitraum: Array<string>
  ): string {
    let filename = "";
    let dateForFilename: string = new Date(zeitraum[0])
      .toISOString()
      .split("T")[0];

    if (zeitraum.length === 2) {
      dateForFilename = `${dateForFilename}_bis_${
        new Date(zeitraum[1]).toISOString().split("T")[0]
      }`;
    }
    switch (erhebungsstelle) {
      case Erhebungsstelle.MESSSTELLE:
        filename = `${messstelle.value.mstId}_${dateForFilename}_${type}`;
        break;
      case Erhebungsstelle.ZAEHLSTELLE:
        filename = `${zaehlstelle.value.nummer}${selectedZaehlung.value.zaehlart}_${dateForFilename}_${type}`;
        break;
    }
    return filename;
  }

  function saveGraphAsImage(
    erhebungsstelle: Erhebungsstelle,
    type: string,
    zeitraum: Array<string>,
    base64: string
  ): void {
    const filename = getFileName(erhebungsstelle, type, zeitraum);

    if (base64) {
      const link = document.createElement("a");
      link.setAttribute("href", base64);
      link.setAttribute("download", filename);
      document.body.appendChild(link); // Required for FF
      link.click();
    }
  }

  return {
    addChartToPdfReport,
    addDatatableToPdfReport,
    saveGraphAsImage,
    getFileName,
  };
}
