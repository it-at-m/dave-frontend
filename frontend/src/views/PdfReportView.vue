<template>
  <v-container
      class="dave-default"
  >
    <v-sheet
        class="mx-10 mb-10 mt-14 pa-5"
        elevation="2"
        width="80%"
    >
      <v-list>
        <v-list-item
            v-for="(asset, index) in assets"
            :key="asset.id"
        >
        <v-card
            class="ma-1"
            elevation="0"
            width="100%"
            @mouseleave="setClickable(0)"
            @mouseover="setClickable(asset.id)"
        >
          <v-toolbar
              color="transparent"
              density="compact"
              flat
          >
            <v-icon color="grey-lighten-1">{{ icon(asset) }}</v-icon>
            <v-divider
                class="mx-4"
                vertical
            />
            <span class="text-grey-lighten-1 text-body-1 font-weight-regular pl-0">
              {{ header(asset) }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
                v-show="clickable === asset.id && index > 0"
                icon="mdi-chevron-up"
                @click="moveAssetOnePositionUpNotAtFirstPosition(index)"
            />
            <v-btn
                v-show="clickable === asset.id && index < assets.length - 1"
                icon="mdi-chevron-down"
                @click="moveAssetOnePositionDownNotAtLastPosition(index)"
            />
            <v-btn
                v-show="clickable === asset.id && isEditable(asset)"
                icon="mdi-lead-pencil"
                @click="edit(asset)"
            />
            <v-btn
                v-show="clickable === asset.id"
                icon="mdi-trash-can"
                @click="deleteAsset(asset)"
            />
          </v-toolbar>
          <v-card-text>
            <h1 v-if="isHeading1(asset)">
              {{ getTextOfAsset(asset) }}
            </h1>
            <h2 v-if="isHeading2(asset)">
              {{ getTextOfAsset(asset) }}
            </h2>
            <h3 v-if="isHeading3(asset)">
              {{ getTextOfAsset(asset) }}
            </h3>
            <h4 v-if="isHeading4(asset)">
              {{ getTextOfAsset(asset) }}
            </h4>
            <h5 v-if="isHeading5(asset)">
              {{ getTextOfAsset(asset) }}
            </h5>
            <p
                v-if="isText(asset)"
                :style="{ fontSize: getSizeOfAsset(asset) }"
                v-html="getTextOfAsset(asset)"
            />
            <v-divider v-if="isPageBreak(asset)"/>
            <v-divider v-if="isNewline(asset)"/>
            <p v-if="isDatatable(asset)">
              {{ getTextOfAsset(asset) }}
            </p>
            <p v-if="isDatatableMessstelle(asset)">
              {{ getTextOfAsset(asset) }}
            </p>
            <p v-if="isZaehlungskenngroesse(asset)">
              {{ getTextOfAsset(asset) }}
            </p>
            <DisplayImageAsset
                v-if="isImage(asset)"
                :caption="getCaptionOfAsset(asset)"
                :image="getImageOfAsset(asset)"
                :width="`${getWidthOfAsset(asset)}%`"
            />
          </v-card-text>
        </v-card>
        </v-list-item>
      </v-list>

      <v-toolbar
          color="transparent"
          elevation="2"
      >
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-text"
                v-bind="props"
                @click="createTextAsset"
            />
          </template>
          <span> Freitext </span>
        </v-tooltip>
        <v-divider
            class="mx-4"
            vertical
        />
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-header-1"
                v-bind="props"
                @click="createHeadingAsset('h1')"
            />
          </template>
          <span> Überschrift 1 </span>
        </v-tooltip>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-header-2"
                v-bind="props"
                @click="createHeadingAsset('h2')"
            />
          </template>
          <span> Überschrift 2 </span>
        </v-tooltip>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-header-3"
                v-bind="props"
                @click="createHeadingAsset('h3')"
            />
          </template>
          <span> Überschrift 3 </span>
        </v-tooltip>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-header-4"
                v-bind="props"
                @click="createHeadingAsset('h4')"
            />
          </template>
          <span> Überschrift 4 </span>
        </v-tooltip>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-header-5"
                v-bind="props"
                @click="createHeadingAsset('h5')"
            />
          </template>
          <span> Überschrift 5 </span>
        </v-tooltip>
        <v-divider
            class="mx-4"
            vertical
        ></v-divider>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-page-break"
                v-bind="props"
                @click="createPagebreakAsset"
            />
          </template>
          <span> Seitenumbruch </span>
        </v-tooltip>
        <v-divider
            class="mx-4"
            vertical
        ></v-divider>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-format-text-wrapping-wrap"
                v-bind="props"
                @click="createNewlineAsset"
            />
          </template>
          <span> Zeilenumbruch </span>
        </v-tooltip>
        <v-divider
            class="mx-4"
            vertical
        ></v-divider>
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn
                icon="mdi-image"
                v-bind="props"
                @click="createImageAsset"
            />
          </template>
          <span> Bild hinzufügen </span>
        </v-tooltip>
        <v-spacer/>
      </v-toolbar>
    </v-sheet>

    <v-speed-dial
        v-model="fab"
        location="top"
        open-on-hover
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
            key="speed-dial-generate-preview-pdf"
            :color="fabColor"
            :icon="fab ? 'mdi-close-thick' : 'mdi-plus-thick'"
            class="mr-4 mb-4"
            elevation="6"
            location="bottom end"
            position="absolute"
            size="large"
            style="z-index: 400"
            v-bind="activatorProps"
        />
      </template>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
              key="generate-pdf-btn"
              color="secondary"
              icon="mdi-printer"
              size="small"
              v-bind="props"
              @click="generatePdf"
          />
        </template>
        <span>Report herunterladen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
              key="preview-pdf-btn"
              color="secondary"
              icon="mdi-eye"
              size="small"
              v-bind="props"
              @click="previewPdf"
          />
        </template>
        <span>Vorschau öffnen</span>
      </v-tooltip>
    </v-speed-dial>

    <image-asset-form
        v-model="editImage"
        :image="imageAsset"
        @cancelDialog="cancel()"
        @save="save($event)"
    />
    <datatable-asset-form
        v-model="editDatatable"
        :datatable="datatableAsset"
        @cancelDialog="cancel()"
        @save="save($event)"
    />
    <heading-asset-form
        v-model="editHeading"
        :heading="headingAsset"
        @cancelDialog="cancel()"
        @save="save($event)"
    />

    <text-asset-form
        v-model="editText"
        :text="textAsset"
        @cancelDialog="cancel()"
        @save="save($event)"
    />

    <delete-dialog
        v-model="deleteDialog"
        :asset-id="assetId"
        @cancelDialog="cancel()"
        @delete="deleteIt($event)"
    />

    <pdf-preview-dialog
        v-model="previewPdfDialog"
        :source="previewSource"
        @cancelDialog="cancel"
        @download="downloadPdf"
    />
  </v-container>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";

// Components
import DisplayImageAsset from "@/components/pdfreport/assets/DisplayImageAsset.vue";
import ImageAssetForm from "@/components/pdfreport/assetforms/ImageAssetForm.vue";
import HeadingAssetForm from "@/components/pdfreport/assetforms/HeadingAssetForm.vue";
import TextAssetForm from "@/components/pdfreport/assetforms/TextAssetForm.vue";
import DatatableAssetForm from "@/components/pdfreport/assetforms/DatatableAssetForm.vue";
import DeleteDialog from "@/components/pdfreport/assetforms/DeleteDialog.vue";

/* eslint-disable no-unused-vars */
import BaseAsset from "../types/pdfreport/assets/BaseAsset";
import HeadingAsset from "../types/pdfreport/assets/HeadingAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import PagebreakAsset from "@/types/pdfreport/assets/PagebreakAsset";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */
// Utils
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import _ from "lodash";
import PdfPreviewDialog from "@/components/pdfreport/assetforms/PdfPreviewDialog.vue";
import NewlineAsset from "@/types/pdfreport/assets/NewlineAsset";
import ZaehlungskenngroessenAsset from "@/types/pdfreport/assets/ZaehlungskenngroessenAsset";
import MessstelleDatatableAsset from "@/types/pdfreport/assets/MessstelleDatatableAsset";
import {useDaveUtils} from "@/util/DaveUtils";
import {useDateUtils} from "@/util/DateUtils";
import {useSnackbarStore} from "@/store/snackbar";
import {usePdfReportStore} from "@/store/pdfReport";
import {useUserStore} from "@/store/user";

const clickable = ref(0);

const editImage = ref(false);
const editHeading = ref(false);
const editText = ref(false);
const editDatatable = ref(false);
const deleteDialog = ref(false);
const previewPdfDialog = ref(false);

const imageAsset = ref<ImageAsset>(new ImageAsset("", ""));
const headingAsset = ref<HeadingAsset>(
    new HeadingAsset("", AssetTypesEnum.HEADING1)
);
const textAsset = ref<TextAsset>(new TextAsset(""));
const datatableAsset = ref<DatatableAsset>(
    new DatatableAsset({} as OptionsDTO, "", "")
);

const assetId = ref(0);
const loadingPdf = ref(false);

const editables = ref([
  AssetTypesEnum.TEXT,
  AssetTypesEnum.IMAGE,
  AssetTypesEnum.HEADING1,
  AssetTypesEnum.HEADING2,
  AssetTypesEnum.HEADING3,
  AssetTypesEnum.HEADING4,
  AssetTypesEnum.HEADING5,
  AssetTypesEnum.DATATABLE,
  AssetTypesEnum.DATATABLE_MESSSTELLE,
]);

const fab = ref(false);
const pdfSourceAsBlob = ref<Blob>(new Blob());
const pdfSourceForPreview = ref<Uint8Array>(new Uint8Array());
const assets = ref<BaseAsset[]>([]);
const userStore = useUserStore();
const snackbarStore = useSnackbarStore();
const pdfReportStore = usePdfReportStore();
const dateUtils = useDateUtils();

onMounted(() => {
  assets.value = assetsFromStore();
  if (pdfReportStore.getHasTitlePage) {
    createFirstPage();
  }
});

const fabColor = computed(() => {
  return fab.value ? "grey darken-1" : "secondary";
});

const getDepartment = computed(() => {
  return userStore.getDepartment;
});

/**
 * Erstellt die Titelseite des PDF Reports.
 */
function createFirstPage(): void {
  // Damit die FirstPage immer oben steht wenn die Seite das erste mal angesurft wird aber schon Assets dem Report hinzugefügt wurden:
  // Assets reversen, Titelpage in umgekehrter Reihenfolge hinzufügen und Assets nochmals reversen
  assets.value.reverse();
  // Seitenumbruch
  assets.value.push(new PagebreakAsset());
  // Datum
  save(
      new HeadingAsset(
          "erstellt am " + dateUtils.getShortVersionOfDate(new Date()),
          AssetTypesEnum.HEADING3
      )
  );
  // Autor
  const name = userStore.getName;
  const department = getDepartment.value;
  save(new HeadingAsset(`${name} (${department})`, AssetTypesEnum.HEADING3));
  // Untertitel
  save(new HeadingAsset("Untertitel", AssetTypesEnum.HEADING2));
  // Titel
  save(new HeadingAsset("Zählungsreport", AssetTypesEnum.HEADING1));
  assets.value.reverse();

  // Titel wurde erstellt
  pdfReportStore.setHasTitlePage();
}

function cancel() {
  //  Dialog(e) schließen
  editImage.value = false;
  editHeading.value = false;
  editText.value = false;
  editDatatable.value = false;
  deleteDialog.value = false;
  previewPdfDialog.value = false;
}

function save(asset: BaseAsset) {
  //  Dialog schließen
  cancel();

  // In Array speichern
  const a = assets.value.filter((a) => a.id === asset.id) as BaseAsset[];
  // Wenn was gefunden wurde, dann muss das geupdatet werden

  if (a.length > 0) {
    Object.assign(a[0], asset);
  } else {
    // Wenn nichts gefunden wird, dann dem Array einfach hinzu fügen
    assets.value.push(asset);
  }
  // Wir müssen hier ein leeres Objekt setzen, damit die Dialog Componente
  // es mitbekommt, wenn das selbe Objekt nochmal angezeigt werden soll. Das
  // ist nur beim Image notwendig, da hier in der Dialog Componente ein Reset
  // durchgeführt wird.
  if (isImage(asset)) {
    imageAsset.value = new ImageAsset("", "");
  }
}

function assetsFromStore(): BaseAsset[] {
  return _.cloneDeep(pdfReportStore.getAssets);
}

const previewSource = computed(() => {
  return pdfSourceForPreview.value;
});

watch(
    assets,
    () => {
      pdfReportStore.setAssets(_.cloneDeep(assets));
    },
    {deep: true}
);

function edit(asset: BaseAsset): void {
  if (isImage(asset)) {
    editImage.value = true;
    imageAsset.value = asset;
  }

  if (
      isHeading1(asset) ||
      isHeading2(asset) ||
      isHeading3(asset) ||
      isHeading4(asset) ||
      isHeading5(asset)
  ) {
    editHeading.value = true;
    headingAsset.value = asset;
  }

  if (isText(asset)) {
    editText.value = true;
    textAsset.value = asset;
  }

  if (isDatatable(asset)) {
    editDatatable.value = true;
    datatableAsset.value = asset;
  }

  if (isDatatableMessstelle(asset)) {
    editDatatable.value = true;
    datatableAsset.value = asset;
  }
}

function previewPdf() {
  let formData = new FormData();
  loadingPdf.value = true;

  formData.append(
      "assets",
      new Blob([JSON.stringify(assets.value)], {
        type: "application/json",
      })
  );

  formData.append("department", getDepartment.value);
  GeneratePdfService.postPdfCustomFetchReport(formData)
      .then((res) => {
        res.blob().then((blob) => {
          blob.arrayBuffer().then((value) => {
            pdfSourceForPreview.value = new Uint8Array(value);
            previewPdfDialog.value = true;
          });
          pdfSourceAsBlob.value = blob;
        });
      })
      .catch((error) => snackbarStore.showApiError(error))
      .finally(() => (loadingPdf.value = false));
}

function generatePdf() {
  let formData = new FormData();
  loadingPdf.value = true;

  formData.append(
      "assets",
      new Blob([JSON.stringify(assets.value)], {
        type: "application/json",
      })
  );

  fetchPdf(formData);
}

function fetchPdf(formData: any) {
  formData.append("department", getDepartment.value);
  GeneratePdfService.postPdfCustomFetchReport(formData)
      .then((res) => {
        res.blob().then((blob) => {
          pdfSourceAsBlob.value = blob;
          downloadPdf();
        });
      })
      .catch((error) => snackbarStore.showApiError(error))
      .finally(() => (loadingPdf.value = false));
}

function createHeadingAsset(type: string): void {
  if (type === "h1") {
    headingAsset.value = new HeadingAsset("", AssetTypesEnum.HEADING1);
  }
  if (type === "h2") {
    headingAsset.value = new HeadingAsset("", AssetTypesEnum.HEADING2);
  }
  if (type === "h3") {
    headingAsset.value = new HeadingAsset("", AssetTypesEnum.HEADING3);
  }
  if (type === "h4") {
    headingAsset.value = new HeadingAsset("", AssetTypesEnum.HEADING4);
  }
  if (type === "h5") {
    headingAsset.value = new HeadingAsset("", AssetTypesEnum.HEADING5);
  }
  editHeading.value = true;
}

function createTextAsset(): void {
  textAsset.value = new TextAsset("");
  editText.value = true;
}

function createPagebreakAsset(): void {
  assets.value.push(new PagebreakAsset());
}

function createNewlineAsset(): void {
  assets.value.push(new NewlineAsset());
}

function getSizeOfAsset(asset: BaseAsset): string | undefined {
  let result = undefined;
  if (isText(asset)) {
    result = (asset as TextAsset).size;
  }
  return result;
}

function getCaptionOfAsset(asset: BaseAsset): string | undefined {
  let result = undefined;
  if (isImage(asset)) {
    result = (asset as ImageAsset).caption;
  }
  return result;
}

function getWidthOfAsset(asset: BaseAsset): number | undefined {
  let result = undefined;
  if (isImage(asset)) {
    result = (asset as ImageAsset).width;
  }
  return result;
}

function getImageOfAsset(asset: BaseAsset): string | undefined {
  let result = undefined;
  if (isImage(asset)) {
    result = (asset as ImageAsset).image;
  }
  return result;
}

function isEditable(asset: BaseAsset): boolean {
  return editables.value.includes(asset.type);
}

function deleteAsset(asset: BaseAsset): void {
  assetId.value = asset.id;
  deleteDialog.value = true;
}

function deleteIt(id: number): void {
  const filteredAssets = assets.value.filter(
      (a) => a.id !== id
  ) as BaseAsset[];
  assets.value = filteredAssets;
  deleteDialog.value = false;
}

function createImageAsset(): void {
  editImage.value = true;
  imageAsset.value = new ImageAsset(" ", "");
  imageAsset.value.width = 80;
}

function isHeading1(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.HEADING1;
}

function isText(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.TEXT;
}

function isHeading2(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.HEADING2;
}

function isHeading3(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.HEADING3;
}

function isHeading4(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.HEADING4;
}

function isHeading5(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.HEADING5;
}

function isImage(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.IMAGE;
}

function isPageBreak(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.PAGEBREAK;
}

function isNewline(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.NEWLINE;
}

function isDatatable(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.DATATABLE;
}

function isDatatableMessstelle(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.DATATABLE_MESSSTELLE;
}

function isZaehlungskenngroesse(asset: BaseAsset): boolean {
  return asset.type === AssetTypesEnum.ZAEHLUNGSKENNGROESSEN;
}

function icon(asset: BaseAsset): string {
  let icon = "mdi-mushroom-outline";

  if (isHeading1(asset)) {
    icon = "mdi-format-header-1";
  }

  if (isText(asset)) {
    icon = "mdi-text";
  }

  if (isHeading2(asset)) {
    icon = "mdi-format-header-2";
  }

  if (isHeading3(asset)) {
    icon = "mdi-format-header-3";
  }

  if (isHeading4(asset)) {
    icon = "mdi-format-header-4";
  }

  if (isHeading5(asset)) {
    icon = "mdi-format-header-5";
  }

  if (isImage(asset)) {
    icon = "mdi-image";
  }

  if (isPageBreak(asset)) {
    icon = "mdi-format-page-break";
  }

  if (isNewline(asset)) {
    icon = "mdi-format-text-wrapping-wrap";
  }

  if (isDatatable(asset)) {
    icon = "mdi-view-list";
  }

  if (isDatatableMessstelle(asset)) {
    icon = "mdi-view-list";
  }

  if (isZaehlungskenngroesse(asset)) {
    icon = "mdi-numeric";
  }

  return icon;
}

function header(asset: BaseAsset): string {
  let header = "";
  if (isHeading1(asset)) {
    header = "Dokumentüberschrift";
  }

  if (isHeading2(asset)) {
    header = "Zwischenüberschrift Ebene 2";
  }

  if (isHeading3(asset)) {
    header = "Zwischenüberschrift Ebene 3";
  }

  if (isHeading4(asset)) {
    header = "Zwischenüberschrift Ebene 4";
  }

  if (isHeading5(asset)) {
    header = "Zwischenüberschrift Ebene 5";
  }

  if (isText(asset)) {
    header = "Freitext";
  }

  if (isImage(asset)) {
    header = "Bild, Karte oder Diagramm";
  }

  if (isPageBreak(asset)) {
    header = "Seitenumbruch";
  }

  if (isNewline(asset)) {
    header = "Zeilenumbruch";
  }

  if (isDatatable(asset)) {
    header = "Datentabelle";
  }

  if (isDatatableMessstelle(asset)) {
    header = "Datentabelle";
  }

  if (isZaehlungskenngroesse(asset)) {
    header = "Zählungskenngrößen";
  }
  return header;
}

function setClickable(id: number): void {
  clickable.value = id;
}

function getTextOfAsset(asset: BaseAsset): string | undefined {
  let result = undefined;
  if (
      isHeading1(asset) ||
      isHeading2(asset) ||
      isHeading3(asset) ||
      isHeading4(asset) ||
      isHeading5(asset)
  ) {
    result = (asset as HeadingAsset).text;
  } else if (isDatatable(asset)) {
    result = (asset as DatatableAsset).text;
  } else if (isDatatableMessstelle(asset)) {
    result = (asset as MessstelleDatatableAsset).text;
  } else if (isZaehlungskenngroesse(asset)) {
    result = (asset as ZaehlungskenngroessenAsset).text;
  } else if (isText(asset)) {
    result = (asset as TextAsset).text;
  }
  return result;
}

function downloadPdf() {
  let filename = `report_${Date.now()}.pdf`;
  useDaveUtils().downloadFile(pdfSourceAsBlob.value, filename);
}

function moveAssetOnePositionUpNotAtFirstPosition(index: number) {
  const assetToMove = _.nth(assets.value, index);
  if (!_.isNil(assetToMove) && index > 0) {
    assets.value.splice(index, 1);
    assets.value.splice(index - 1, 0, assetToMove);
  }
}

function moveAssetOnePositionDownNotAtLastPosition(index: number) {
  const assetToMove = _.nth(assets.value, index);
  if (!_.isNil(assetToMove) && index < assets.value.length -1) {
    assets.value.splice(index, 1);
    assets.value.splice(index + 1, 0, assetToMove);
  }
}
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
