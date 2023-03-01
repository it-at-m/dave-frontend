<template>
  <v-container class="pa-0" fluid>
    <v-sheet
        class="ma-10 pa-5"
        elevation="2"
        outlined
        width="80%"
    >
      <draggable
          :scroll-sensitivity="250"
          :list="assets"
          :force-fallback="true"
          ghost-class="ghost"
          @end="dragging = false"
          @start="dragging = true"
      >
        <v-card
            v-for="asset in assets"
            :key="asset.id"
            class="ma-3"
            elevation="0"
        >
          <v-app-bar
              color="rgba(0, 0, 0, 0)"
              dense
              flat
              @mouseout="setClickable(0)"
              @mouseover="setClickable(asset.id)"
          >
            <v-icon color="grey lighten-2">{{ icon(asset) }}</v-icon>
            <v-divider
                class="mx-4"
                vertical
            ></v-divider>
            <span class="grey--text text--lighten-2 body-1 font-weight-regular pl-0">
              {{ header(asset) }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
                v-show="(clickable === asset.id) && isEditable(asset)"
                icon
                @click="edit(asset)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn
                v-show="clickable === asset.id"
                icon
                @click="deleteAsset(asset)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text
              :style="{cursor: selectedCursor}"
              @mouseover="draggable = true"
          >
            <h1 v-if="isHeading1(asset)">{{ asset.text }}</h1>
            <h2 v-if="isHeading2(asset)">{{ asset.text }}</h2>
            <h3 v-if="isHeading3(asset)">{{ asset.text }}</h3>
            <h4 v-if="isHeading4(asset)">{{ asset.text }}</h4>
            <h5 v-if="isHeading5(asset)">{{ asset.text }}</h5>
            <p v-if="isText(asset)" :style="{fontSize:asset.size}" v-html="asset.text"/>
            <v-divider v-if="isPageBreak(asset)"></v-divider>
            <v-divider v-if="isNewline(asset)"></v-divider>
            <p v-if="isDatatable(asset)">{{ asset.text }}</p>
            <p v-if="isZaehlungskenngroesse(asset)">{{ asset.text }}</p>
            <DisplayImageAsset
                v-if="isImage(asset)"
                :caption="asset.caption"
                :image="asset.image"
                :width="`${asset.width}%`"
            ></DisplayImageAsset>
          </v-card-text>
        </v-card>
        <v-toolbar>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                  icon
                  @click="createTextAsset">
                <v-icon>mdi-text</v-icon>
              </v-btn>
            </template>
            <span>
              Freitext
            </span>
          </v-tooltip>
          <v-divider
              class="mx-4"
              vertical
          ></v-divider>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createHeadingAsset('h1')">
                <v-icon>mdi-format-header-1</v-icon>
              </v-btn>
            </template>
            <span>
              Überschrift 1
            </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createHeadingAsset('h2')">
                <v-icon>mdi-format-header-2</v-icon>
              </v-btn>
            </template>
            <span>
              Überschrift 2
            </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createHeadingAsset('h3')">
                <v-icon>mdi-format-header-3</v-icon>
              </v-btn>
            </template>
            <span>
              Überschrift 3
            </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createHeadingAsset('h4')">
                <v-icon>mdi-format-header-4</v-icon>
              </v-btn>
            </template>
            <span>
              Überschrift 4
            </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createHeadingAsset('h5')">
                <v-icon>mdi-format-header-5</v-icon>
              </v-btn>
            </template>
            <span>
              Überschrift 5
            </span>
          </v-tooltip>
          <v-divider
              class="mx-4"
              vertical
          ></v-divider>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createPagebreakAsset">
                <v-icon>mdi-format-page-break</v-icon>
              </v-btn>
            </template>
            <span>
              Seitenumbruch
            </span>
          </v-tooltip>
          <v-divider
              class="mx-4"
              vertical
          ></v-divider>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createNewlineAsset">
                <v-icon>mdi-format-text-wrapping-wrap</v-icon>
              </v-btn>
            </template>
            <span>
              Zeilenumbruch
            </span>
          </v-tooltip>
          <v-divider
              class="mx-4"
              vertical
          ></v-divider>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"
                     icon
                     @click="createImageAsset">
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </template>
            <span>
              Bild hinzufügen
            </span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-icon color="grey lighten-2">mdi-heart</v-icon>
        </v-toolbar>
      </draggable>
    </v-sheet>

    <v-speed-dial
        v-model="fab"
        fixed
        bottom
        right
        open-on-hover
    >
      <template v-slot:activator>
        <v-btn
            v-model="fab"
            dark
            fab
            :color="fabColor"
        >
          <v-icon v-if="fab">
            mdi-close-thick
          </v-icon>
          <v-icon v-else>
            mdi-plus-thick
          </v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              dark
              small
              color="secondary"
              @click="generatePdf"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <span>Report herunterladen</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              dark
              small
              color="secondary"
              @click="previewPdf"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>Vorschau öffnen</span>
      </v-tooltip>
    </v-speed-dial>
    <ImageAssetForm
        :image="imageAsset"
        :open="editImage"
        v-on:cancel="cancel()"
        v-on:save="save($event)"
    ></ImageAssetForm>
    <DatatableAssetForm
        :datatable="datatableAsset"
        :open="editDatatable"
        v-on:cancel="cancel()"
        v-on:save="save($event)"
    ></DatatableAssetForm>
    <HeadingAssetForm
        :heading="headingAsset"
        :open="editHeading"
        v-on:cancel="cancel()"
        v-on:save="save($event)"
    ></HeadingAssetForm>
    <TextAssetForm
        :open="editText"
        :text="textAsset"
        v-on:cancel="cancel()"
        v-on:save="save($event)"
    ></TextAssetForm>
    <DeleteDialog
        :asset-id="assetId"
        :open="deleteDialog"
        v-on:cancel="cancel()"
        v-on:delete="deleteIt($event)"
    ></DeleteDialog>

    <pdf-preview-dialog
        :open="previewPdfDialog"
        :source="previewSource"
        v-on:cancel="cancel"
        v-on:download="downloadPdf"
        />

  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

// Components
import draggable from "vuedraggable"
import DisplayImageAsset from "@/components/pdfreport/assets/DisplayImageAsset.vue"
import ImageAssetForm from "@/components/pdfreport/assetforms/ImageAssetForm.vue";
import HeadingAssetForm from "@/components/pdfreport/assetforms/HeadingAssetForm.vue"
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
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */
// Utils
import DaveUtils from "@/util/DaveUtils";
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import _ from "lodash";
import PdfPreviewDialog from "@/components/pdfreport/assetforms/PdfPreviewDialog.vue";
import NewlineAsset from "@/types/pdfreport/assets/NewlineAsset";


@Component({
  components: {
    PdfPreviewDialog,
    draggable,
    DisplayImageAsset,
    ImageAssetForm,
    HeadingAssetForm,
    TextAssetForm,
    DatatableAssetForm,
    DeleteDialog,
  }
})
export default class PdfReportView extends Vue {
  // mouse events
  clickable: number = 0
  draggable: boolean = false
  dragging: boolean = false

  // Formulare
  editImage: boolean = false
  editHeading: boolean = false
  editText: boolean = false
  editDatatable: boolean = false;
  deleteDialog: boolean = false
  previewPdfDialog: boolean = false

  // die einzelnen Assets
  imageAsset: ImageAsset = new ImageAsset("", "")
  headingAsset: HeadingAsset = new HeadingAsset("", AssetTypesEnum.HEADING1)
  textAsset: TextAsset = new TextAsset("")
  datatableAsset: DatatableAsset = new DatatableAsset({} as OptionsDTO, "", "");

  // liste der Assets
  assets: BaseAsset[] = this.assetsFromStore;

  assetId: number = 0
  loadingPdf: boolean = false;

  // bearbeitbare Assest
  editables: string[] = [AssetTypesEnum.TEXT, AssetTypesEnum.IMAGE, AssetTypesEnum.HEADING1, AssetTypesEnum.HEADING2, AssetTypesEnum.HEADING3, AssetTypesEnum.HEADING4, AssetTypesEnum.HEADING5, AssetTypesEnum.DATATABLE]

  private fab: boolean = false;
  private pdfSourceAsBlob: any;
  private pdfSourceForPreview:Uint8Array = new Uint8Array;

  get fabColor(): string {
    return this.fab ? "grey darken-1" : "secondary"
  }

  created() {
    if (!this.$store.getters.hasTitlePage) {
      this.createFirstPage()
    }
  }

  /**
   * Erstellt die Titelseite des PDF Reports.
   */
  createFirstPage(): void {
    // Damit die FirstPage immer oben steht wenn die Seite das erste mal angesurft wird aber schon Assets dem Report hinzugefügt wurden:
    // Assets reversen, Titelpage in umgekehrter Reihenfolge hinzufügen und Assets nochmals reversen
    this.assets.reverse();
    // Seitenumbruch
    this.assets.push(new PagebreakAsset())
    // Datum
    this.save(new HeadingAsset("erstellt am " + this.$d(new Date(), 'short', 'de-DE'), AssetTypesEnum.HEADING3))
    // Autor
    const name = this.$store.getters["user/getName"] as string
    const department = this.$store.getters["user/getDepartment"] as string
    this.save(new HeadingAsset(`${name} (${department})`, AssetTypesEnum.HEADING3))
    // Untertitel
    this.save(new HeadingAsset("Untertitel", AssetTypesEnum.HEADING2))
    // Titel
    this.save(new HeadingAsset("Zählungsreport", AssetTypesEnum.HEADING1))
    this.assets.reverse();

    // Titel wurde erstellt
    this.$store.dispatch("hasTitlePage")
  }

  // Assets werden aus dem Store geladen
  get assetsFromStore(): BaseAsset[] {
    return _.cloneDeep(this.$store.getters.getAssets)
  }

  /**
   * Der Drag & Drop Cursor.
   */
  get selectedCursor(): string {
    let cursor = "default"
    if (this.draggable) {
      cursor = "grab"
    }
    if (this.dragging) {
      cursor = "grabbing"
    }
    return cursor
  }

  // Immer wenn sich das assets-Array, oder ein Objekt in diesem, ändert => Speichern im Store
  @Watch('assets', {deep: true})
  saveAssetsInStore(assets: BaseAsset[]) {
    this.$store.dispatch("setAssets", _.cloneDeep(assets))
  }

  edit(asset: BaseAsset): void {
    if (this.isImage(asset)) {
      this.editImage = true
      this.imageAsset = asset
    }

    if (this.isHeading1(asset) || this.isHeading2(asset) || this.isHeading3(asset) || this.isHeading4(asset) || this.isHeading5(asset)) {
      this.editHeading = true
      this.headingAsset = asset
    }

    if (this.isText(asset)) {
      this.editText = true
      this.textAsset = asset
    }

    if (this.isDatatable(asset)) {
      this.editDatatable = true
      this.datatableAsset = asset
    }
  }

  isEditable(asset: BaseAsset): boolean {
    return this.editables.includes(asset.type)
  }

  deleteAsset(asset: BaseAsset): void {
    this.assetId = asset.id
    this.deleteDialog = true
  }

  deleteIt(id: number): void {
    const assets = this.assets.filter(a => a.id !== id) as BaseAsset[]
    this.assets = assets
    this.deleteDialog = false
  }

  createImageAsset(): void {
    this.editImage = true
    this.imageAsset = new ImageAsset(" ", "")
    this.imageAsset.width = 80
  }

  createHeadingAsset(type: string): void {
    if (type === "h1") {
      this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING1)
    }
    if (type === "h2") {
      this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING2)
    }
    if (type === "h3") {
      this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING3)
    }
    if (type === "h4") {
      this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING4)
    }
    if (type === "h5") {
      this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING5)
    }
    this.editHeading = true
  }

  createTextAsset(): void {
    this.textAsset = new TextAsset("")
    this.editText = true
  }

  createPagebreakAsset(): void {
    this.assets.push(new PagebreakAsset())
  }

  createNewlineAsset(): void {
    this.assets.push(new NewlineAsset())
  }

  /**
   * Setzt die id des Assets, damit bei click auf die App Leiste das Asset wieder gefunden und übergeben werden kann.
   *
   * @param id
   */
  setClickable(id: number): void {
    this.clickable = id
  }

  /**
   * Event Methode um neu erstellte oder veränderte Daten zu speichern.
   *
   * @param asset
   */
  save(asset: BaseAsset) {
    //  Dialog schließen
    this.cancel()

    // In Array speichern
    const a = this.assets.filter(a => a.id === asset.id) as BaseAsset[]
    // Wenn was gefunden wurde, dann muss das geupdatet werden

    if (a.length > 0) {
      Object.assign(a[0], asset)
    } else {
      // Wenn nichts gefunden wird, dann dem Array einfach hinzu fügen
      this.assets.push(asset)
    }
    // Wir müssen hier ein leeres Objekt setzen, damit die Dialog Componente
    // es mitbekommt, wenn das selbe Objekt nochmal angezeigt werden soll. Das
    // ist nur beim Image notwendig, da hier in der Dialog Componente ein Reset
    // durchgeführt wird.
    if (this.isImage(asset)) {
      this.imageAsset = new ImageAsset("", "")
    }
  }

  /**
   * Schließt einen Bearbeitungsdialog.
   */
  cancel() {
    //  Dialog(e) schließen
    this.editImage = false;
    this.editHeading = false;
    this.editText = false;
    this.editDatatable = false;
    this.deleteDialog = false;
    this.previewPdfDialog = false;
  }

  isHeading1(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.HEADING1;
  }

  isText(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.TEXT;
  }

  isHeading2(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.HEADING2;
  }

  isHeading3(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.HEADING3;
  }

  isHeading4(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.HEADING4;
  }

  isHeading5(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.HEADING5;
  }

  isImage(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.IMAGE;
  }

  isPageBreak(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.PAGEBREAK;
  }

  isNewline(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.NEWLINE;
  }

  isDatatable(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.DATATABLE;
  }

  isZaehlungskenngroesse(asset: BaseAsset): boolean {
    return asset.type === AssetTypesEnum.ZAEHLUNGSKENNGROESSEN;
  }

  /**
   * Erzeugt das Icon zu den einzelnen Assets.
   */
  icon(asset: BaseAsset): string {
    let icon = "mdi-mushroom-outline"

    if (this.isHeading1(asset)) {
      icon = "mdi-format-header-1"
    }

    if (this.isText(asset)) {
      icon = "mdi-text"
    }

    if (this.isHeading2(asset)) {
      icon = "mdi-format-header-2"
    }

    if (this.isHeading3(asset)) {
      icon = "mdi-format-header-3"
    }

    if (this.isHeading4(asset)) {
      icon = "mdi-format-header-4"
    }

    if (this.isHeading5(asset)) {
      icon = "mdi-format-header-5"
    }

    if (this.isImage(asset)) {
      icon = "mdi-image"
    }

    if (this.isPageBreak(asset)) {
      icon = "mdi-format-page-break"
    }

    if (this.isNewline(asset)) {
      icon = "mdi-format-text-wrapping-wrap"
    }

    if (this.isDatatable(asset)) {
      icon = "mdi-view-list"
    }

    if (this.isZaehlungskenngroesse(asset)) {
      icon = "mdi-numeric"
    }

    return icon
  }

  /**
   * Erzeugt die Überschrift über den einzelnen Assets
   *
   * @param asset
   */
  header(asset: BaseAsset): string {
    let header = ""
    if (this.isHeading1(asset)) {
      header = "Dokumentüberschrift"
    }

    if (this.isHeading2(asset)) {
      header = "Zwischenüberschrift Ebene 2"
    }

    if (this.isHeading3(asset)) {
      header = "Zwischenüberschrift Ebene 3"
    }

    if (this.isHeading4(asset)) {
      header = "Zwischenüberschrift Ebene 4"
    }

    if (this.isHeading5(asset)) {
      header = "Zwischenüberschrift Ebene 5"
    }

    if (this.isText(asset)) {
      header = "Freitext"
    }

    if (this.isImage(asset)) {
      header = "Bild, Karte oder Diagramm"
    }

    if (this.isPageBreak(asset)) {
      header = "Seitenumbruch"
    }

    if (this.isNewline(asset)) {
      header = "Zeilenumbruch"
    }

    if (this.isDatatable(asset)) {
      header = "Datentabelle"
    }

    if (this.isZaehlungskenngroesse(asset)) {
      header = "Zählungskenngrößen"
    }

    return header
  }

  private generatePdf() {
    let formData = new FormData();
    this.loadingPdf = true;

    formData.append("assets", new Blob([JSON.stringify(this.assets)], {
      type: "application/json"
    }));

    this.fetchPdf(formData);
  }

  private fetchPdf(formData: any) {
    formData.append("department", this.$store.getters["user/getDepartment"]);
    GeneratePdfService.postPdfCustomFetchReport(formData).then(res => {
      res.blob()
          .then(blob => {
            this.pdfSourceAsBlob = blob;
            this.downloadPdf();

          })
    })
        .catch((error) => this.$store.dispatch('snackbar/showError', error))
        .finally(() => this.loadingPdf = false)
  }

  private previewPdf() {
    let formData = new FormData();
    this.loadingPdf = true;

    formData.append("assets", new Blob([JSON.stringify(this.assets)], {
      type: "application/json"
    }));

    formData.append("department", this.$store.getters["user/getDepartment"]);
    GeneratePdfService.postPdfCustomFetchReport(formData).then(res => {
      res.blob()
          .then(blob => {

            blob.arrayBuffer().then(value => {
              this.pdfSourceForPreview = new Uint8Array(value);
              this.previewPdfDialog = true;
            });
            this.pdfSourceAsBlob = blob;
          })
    })
        .catch((error) => this.$store.dispatch('snackbar/showError', error))
        .finally(() => this.loadingPdf = false)
  }

  private downloadPdf() {
    let filename: string = `report_${Date.now()}.pdf`
    DaveUtils.downloadFile(this.pdfSourceAsBlob, filename);
  }

  get previewSource(): Uint8Array {
    return this.pdfSourceForPreview;
  }
}
</script>
