<template>
  <v-sheet
    :height="height"
    :min-height="minheight"
    :width="width"
  >
    <div
      id="map"
      ref="mapRef"
      style="width: 100%; height: 100%"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type MessstelleKarteDTO from "@/types/karte/MessstelleKarteDTO";
import type TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";
import type TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import type ZaehlstelleKarteDTO from "@/types/karte/ZaehlstelleKarteDTO";
import type ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";

import L, { DivIcon, Icon, LatLng, latLng, Marker } from "leaflet";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import markerIconDiamondRed from "@/assets/cards-diamond-red.png";
import markerIconDiamondShadow from "@/assets/cards-diamond-shadow.png";
import markerIconDiamondViolet from "@/assets/cards-diamond-violet.png";
import markerIconRed from "@/assets/marker-icon-red.png";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import {useMapConfigStore} from "@/store/MapConfigStore";

const ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER = -4;
const ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER = -32;
const NUMBER_OF_COLUMNS_ZAEHLART_MARKER = 2;
//const MUNICH_CENTER_LATITUDE = "48.137227";
//const MUNICH_CENTER_LONGITUDE = "11.575517";
const ICON_COLOR_SECONDARY = "secondary";
const ICON_COLOR_RED = "red";

const mapAttribution =
  '&copy; <a href="https://stadt.muenchen.de/infos/geobasisdaten.html">GeodatenService München</a>';

interface Props {
  minheight?: string;
  zId?: string;
  latlng?: Array<string>;
  height?: string;
  width?: string;
  showMarker?: boolean;
  zoom?: number;
  reload?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  minheight: "160px",
  height: "15vh",
  width: "100%",
  showMarker: false,
  zoom: 12,
});

const zaehlstelleStore = useZaehlstelleStore();
const searchStore = useSearchStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();
const dateUtils = useDateUtils();
const mapOptionsStore = useMapOptionsStore();
const mapConfigStore = useMapConfigStore();

const mapRef = ref<HTMLDivElement | null>(null);

let map: L.Map;
let mapMarkerClusterGroup = L.markerClusterGroup();
let zaehlartenLayer = L.layerGroup();

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  map.remove();
});

function initMap(): void {
  map = L.map(mapRef.value as HTMLElement, {
    zoom: zoomValue.value,
    minZoom: 8,
    maxZoom: 18,
    preferCanvas: false,
    attributionControl: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: "topleft",
    },
    center: center.value,
  });
  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.addControl(
        L.control.attribution({
          position: "bottomleft",
          prefix: "Leaflet",
        })
      );
      map.setZoom(zoomValue.value);
      createLayersAndAddToMap();
      mapMarkerClusterGroup.addTo(map);
      searchErhebungsstelle();
    }, 10);
  });
}

const zoomValue = computed(() => {
  if (props.latlng && props.latlng.length > 0) {
    return props.zoom;
  } else if (
    mapOptionsStore.getMapOptions &&
    mapOptionsStore.getMapOptions.zoom
  ) {
    return mapOptionsStore.getMapOptions.zoom;
  } else {
    return mapConfigStore.getMapConfig.zoom;
  }
});

/**
 * Die Methode setzt Koordinate auf welche Zentriert werden soll.
 */
const center = computed<LatLng>(() => {
  if (props.latlng && props.latlng.length > 0) {
    return createLatLngFromString(props.latlng[0], props.latlng[1]);
  } else if (
    mapOptionsStore.getMapOptions &&
    mapOptionsStore.getMapOptions.latitude &&
    mapOptionsStore.getMapOptions.longitude
  ) {
    return createLatLngFromString(
      mapOptionsStore.getMapOptions.latitude,
      mapOptionsStore.getMapOptions.longitude
    );
  } else {
    return createLatLngFromString(
        mapConfigStore.getMapConfig.lat, mapConfigStore.getMapConfig.lng
    );
  }
});

function createLatLngFromString(lat: string, lng: string): LatLng {
  return latLng(parseFloat(lat), parseFloat(lng));
}

function createLayersAndAddToMap(): void {
  const baseLayers = createBaseLayers();
  const overlayLayers = createOverlayLayers();

  baseLayers.Stadtkarte.addTo(map);
  L.control.layers(baseLayers, overlayLayers).addTo(map);
}

function createBaseLayers(): L.Control.LayersObject {
  const stadtkarteGesamt = L.tileLayer.wms(
    "https://geoportal.muenchen.de/geoserver/gsm/wms?",
    {
      layers: "gsm:g_stadtkarte_gesamt",
      className: "Stadtkarte",
      attribution: mapAttribution,
    }
  );

  const luftbild = L.tileLayer.wms(
    "https://geoportal.muenchen.de/geoserver/gsm/wms?",
    {
      layers: "gsm:g_luftbild",
      className: "Luftbild",
      attribution: mapAttribution,
    }
  );

  const osm = L.tileLayer.wms(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  return {
    Stadtkarte: stadtkarteGesamt,
    Luftbild: luftbild,
    OpenStreetMap: osm,
  };
}

function createOverlayLayers(): L.Control.LayersObject {
  const stadtbezirke = L.tileLayer.wms(
    "https://geoportal.muenchen.de/geoserver/gsm/wms?",
    {
      layers: "gsm:stadtbezirk",
      className: "Stadtbezirke",
      transparent: true,
      format: "image/png",
      attribution: mapAttribution,
    }
  );
  const stadtviertel = L.tileLayer.wms(
    "https://geoportal.muenchen.de/geoserver/gsm/wms?",
    {
      layers: "gsm:vablock_viertel_dave",
      className: "Stadtviertel",
      transparent: true,
      format: "image/png",
      attribution: mapAttribution,
    }
  );
  const lichtsignalanlagen = L.tileLayer.wms(
    "https://geoportal.muenchen.de/geoserver/kvr/wms?",
    {
      layers: "kvr:lsa_dave",
      className: "Lichtsignalanlagen",
      transparent: true,
      format: "image/png",
      attribution: mapAttribution,
    }
  );

  return {
    Stadtbezirke: stadtbezirke,
    Stadtviertel: stadtviertel,
    Lichtsignalanlagen: lichtsignalanlagen,
  };
}

const searchResult = computed(() => {
  return searchStore.getSearchResult;
});

watch(searchResult, () => {
  resetMarker();
});

watch(
  () => zaehlstelleStore.getAktiveZaehlung.id,
  () => {
    zaehlartenLayer.clearLayers();
    zaehlartenLayer.removeFrom(map);
    setZaehlartenmarkerToMap();
  }
);

function resetMarker(): void {
  mapMarkerClusterGroup.removeFrom(map);
  mapMarkerClusterGroup.clearLayers();
  zaehlartenLayer.removeFrom(map);
  setMarkerToMap();
}

function setMarkerToMap() {
  mapMarkerClusterGroup.clearLayers();
  mapMarkerClusterGroup = L.markerClusterGroup({
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    chunkedLoading: true,
  });
  // Setzen einer leeren ZaehlstelleKarte ohne Marker
  selectedZaehlstelleKarte.value =
    DefaultObjectCreator.createDefaultZaehlstelleKarte();

  const zaehlstellenKarte: Array<AnzeigeKarteDTO> = searchResult.value;
  const markers: Array<Marker> = [];
  zaehlstellenKarte.forEach((zaehlstelleKarte) => {
    if (zaehlstelleKarte.type != "messstelle") {
      markers.push(
        createMarkerForZaehlstelle(zaehlstelleKarte as ZaehlstelleKarteDTO)
      );
    } else {
      markers.push(
        createMarkerForMessstelle(zaehlstelleKarte as MessstelleKarteDTO)
      );
    }
    /**
     * Steuerung ob die Marker für die Zaehlarten
     * in die Karte hinzugefügt werden soll.
     *
     * Durch setzen der Zaehlstelle wird die Generierung der Marker
     * über die Computed Property "getSelectedZaehlstelleKarte" getriggert.
     */
    if (
      zaehlstelleKarte.id === props.zId &&
      zaehlstelleKarte.type === "zaehlstelle"
    ) {
      selectedZaehlstelleKarte.value = zaehlstelleKarte as ZaehlstelleKarteDTO;
    }
  });

  mapMarkerClusterGroup.addLayers(markers);
  mapMarkerClusterGroup.addTo(map);
  if (zaehlstellenKarte.length === 1) {
    /**
     * Falls in der Main.view nach einer bestimmten Zaehlstelle gesucht
     * und diese Suche mit Druck auf die Enter-Taste eingeleitet wird,
     * umfasst das Suchergebnis somit nur eine Zaehlstelle.
     * Auf diese eine mit einem Icon angezeigte Zaehlstelle muss dann zentriert werden.
     */
    // Zaehlartenmarker erzeugen
    setZaehlartenmarkerToMap();
    map.setView(createLatLng(zaehlstellenKarte[0]), 18);
  } else if (props.zId && props.latlng && props.latlng.length > 0) {
    // Zaehlartenmarker erzeugen
    setZaehlartenmarkerToMap();
    map.setView(center.value, zoomValue.value);
  } else {
    map.setView(center.value, zoomValue.value);
  }
}

function setZaehlartenmarkerToMap() {
  const markers: Array<Marker> = [];
  const zaehlartenKarte = selectedZaehlstelleKarte.value.zaehlartenKarte;

  const zaehlarten: Array<string> = [];

  zaehlartenKarte.forEach((zaehlartenKarteDto: ZaehlartenKarteDTO) => {
    zaehlartenKarteDto.zaehlarten.forEach((zaehlart: string, index: number) => {
      if (!zaehlarten.includes(zaehlart)) {
        markers.push(
          createMarkerForZaehlart(zaehlartenKarteDto, zaehlart, index)
        );
        zaehlarten.push(zaehlart);
      }
    });
  });
  if (markers.length > 0) {
    zaehlartenLayer = L.layerGroup(markers);
    zaehlartenLayer.addTo(map);
  }
}

const selectedZaehlstelleKarte = ref(
  DefaultObjectCreator.createDefaultZaehlstelleKarte()
);

function searchErhebungsstelle() {
  SucheService.searchErhebungsstelle(
    searchStore.getLastSearchQuery,
    searchStore.getSearchAndFilterOptions
  )
    .then((result) => {
      searchStore.setSearchResult(result);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    })
    .finally(() => {
      setMarkerToMap();
    });
}

function getColorForZaehlartenMarker(zaehlart: string): string {
  if (zaehlart == zaehlstelleStore.getAktiveZaehlung.zaehlart) {
    return ICON_COLOR_RED;
  } else {
    return ICON_COLOR_SECONDARY;
  }
}

function saveMapPosition() {
  const mapCenter = map.getBounds().getCenter();

  const lat = mapCenter?.lat.toString();
  const lng = mapCenter?.lng.toString();
  const zoom = map.getZoom();

  mapOptionsStore.setMapOptions({ longitude: lng, latitude: lat, zoom: zoom });
}

function routeToZaehlstelle(id: string) {
  saveMapPosition();
  router.push("/zaehlstelle/" + id);
}

function routeToMessstelle(id: string) {
  saveMapPosition();
  router.push(`/messstelle/${id}`);
}

function createLatLng(anzeigeKarte: AnzeigeKarteDTO): LatLng {
  return latLng(anzeigeKarte.latitude, anzeigeKarte.longitude);
}

function createMarkerForZaehlstelle(
  zaehlstelleKarte: ZaehlstelleKarteDTO
): Marker {
  const marker: Marker = new Marker(
    createLatLng(zaehlstelleKarte),
    markerOptionsZaehlstelle(zaehlstelleKarte)
  );
  marker.bindTooltip(createTooltipZaehlstelle(zaehlstelleKarte.tooltip), {
    direction: "top",
    offset: [-14, 0],
  });

  marker.on("click", () => {
    // Zeige alle Zaehlungen zur Zaehlstelle an.
    choosenZaehlartIconToZaehlstelleHeader("");
    routeToZaehlstelle(zaehlstelleKarte.id);
  });
  return marker;
}

function createMarkerForMessstelle(
  messstelleKarteDto: MessstelleKarteDTO
): Marker {
  const marker: Marker = new Marker(
    createLatLng(messstelleKarteDto),
    markerOptionsMessstelle(messstelleKarteDto)
  );
  marker.bindTooltip(createTooltipMessstelle(messstelleKarteDto.tooltip), {
    direction: "top",
    offset: [0, -25],
  });
  marker.on("click", () => {
    routeToMessstelle(messstelleKarteDto.id);
  });
  return marker;
}

function createMarkerForZaehlart(
  zaehlartenKarteDto: ZaehlartenKarteDTO,
  zaehlart: string,
  index: number
): Marker {
  const marker: Marker = new Marker(
    createLatLngFromString(
      zaehlartenKarteDto.latitude,
      zaehlartenKarteDto.longitude
    ),
    markerOptionsZaehlart(zaehlart, index)
  );

  marker.on("click", () => {
    choosenZaehlartIconToZaehlstelleHeader(zaehlart);
  });
  return marker;
}

/**
 * Tooltip wird zur Anzeige von Metainformationen über die Zählstelle benötigt.
 * Ein Tooltip enthält (wenn vorhanden) folgende Informationne:
 *  - Zählstellennumer
 *  - Kreuzungsname
 *  - Stadtbezirk
 *  - Stadtbezirksnummer
 *  - anzahlZaehlungen
 *  - datumLetzteZaehlung
 */
function createTooltipZaehlstelle(tooltipDto: TooltipZaehlstelleDTO): string {
  if (!tooltipDto) {
    return "<div></div>";
  }
  let tooltip = "<div><b>";
  if (tooltipDto.zaehlstellennnummer) {
    tooltip = `${tooltip}Zählstelle: ${tooltipDto.zaehlstellennnummer}</b><br/>`;
  }
  if (tooltipDto.kreuzungsname) {
    tooltip = `${tooltip}${tooltipDto.kreuzungsname}<br/>`;
  }
  if (!tooltipDto.zaehlstellennnummer) {
    tooltip = `${tooltip}</b>`;
  }
  tooltip = `${tooltip}<br/>`;
  if (!tooltipDto.stadtbezirk) {
    tooltip = `${tooltip}Stadtbezirk: Keine Angabe<br/>`;
  } else {
    tooltip = `${tooltip}Stadtbezirk: `;
    if (tooltipDto.stadtbezirknummer) {
      tooltip = `${tooltip}${tooltipDto.stadtbezirknummer} - `;
    }
    tooltip = `${tooltip}${tooltipDto.stadtbezirk}<br/>`;
  }
  if (tooltipDto.anzahlZaehlungen) {
    tooltip = `${tooltip}Anzahl der Zählungen: ${tooltipDto.anzahlZaehlungen}<br/>`;
    if (tooltipDto.datumLetzteZaehlung) {
      tooltip = `${tooltip}Letzte Zählung: ${tooltipDto.datumLetzteZaehlung}<br/>`;
    }
  } else {
    tooltip = `${tooltip}Noch keine Zählungen vorhanden.`;
  }
  tooltip = `${tooltip}</div>`;
  return tooltip;
}

function createTooltipMessstelle(tooltipDto: TooltipMessstelleDTO): string {
  if (!tooltipDto) {
    return "<div></div>";
  }
  let tooltip = "<div>";
  if (tooltipDto.mstId) {
    tooltip = `<b>${tooltip}Messstelle: ${tooltipDto.mstId}`;
    if (tooltipDto.detektierteVerkehrsarten) {
      tooltip = `${tooltip} (${tooltipDto.detektierteVerkehrsarten})`;
    }
    tooltip = `${tooltip}</b><br/>`;
  }
  if (tooltipDto.standort) {
    tooltip = `${tooltip}${tooltipDto.standort}<br/>`;
  }
  tooltip = `${tooltip}<br/>`;
  if (!tooltipDto.stadtbezirk) {
    tooltip = `${tooltip}Stadtbezirk: Keine Angabe<br/>`;
  } else {
    tooltip = `${tooltip}Stadtbezirk: `;
    if (tooltipDto.stadtbezirknummer) {
      tooltip = `${tooltip}${tooltipDto.stadtbezirknummer} - `;
    }
    tooltip = `${tooltip}${tooltipDto.stadtbezirk}<br/>`;
  }
  if (tooltipDto.realisierungsdatum) {
    tooltip = `${tooltip} Aufbau: ${dateUtils.formatDate(
      tooltipDto.realisierungsdatum
    )}<br/>`;
  }
  if (tooltipDto.abbaudatum) {
    tooltip = `${tooltip}Abbau: ${dateUtils.formatDate(
      tooltipDto.abbaudatum
    )}<br/>`;
  }
  if (tooltipDto.datumLetztePlausibleMessung) {
    tooltip = `${tooltip}Letzte plausible Messung: ${dateUtils.formatDate(
      tooltipDto.datumLetztePlausibleMessung
    )}<br/>`;
  }

  tooltip = `${tooltip}</div>`;
  return tooltip;
}

/**
 * Setzt die Optionen bezüglich verwendetes Icon für den Zaehlstellenmarker.
 */
function markerOptionsZaehlstelle(zaehlstelleKarte: ZaehlstelleKarteDTO) {
  if (props.zId) {
    if (props.zId === zaehlstelleKarte.id) {
      const defaultIcon = new Icon.Default();
      defaultIcon.options.iconUrl = markerIconRed;
      return { opacity: 1.0, icon: defaultIcon };
    } else {
      return { opacity: 0.5 };
    }
  }
}

/**
 * Setzt die Optionen bezüglich verwendetes Icon für den Messstellenmarker.
 */
function markerOptionsMessstelle(messstelleKarte: MessstelleKarteDTO) {
  const defaultIcon = new Icon({
    iconUrl: markerIconDiamondViolet,
    shadowUrl: markerIconDiamondShadow,
    shadowAnchor: [8, 45],
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (props.zId) {
    if (props.zId === messstelleKarte.id) {
      defaultIcon.options.iconUrl = markerIconDiamondRed;
      return { opacity: 1.0, icon: defaultIcon };
    } else {
      return { opacity: 0.5, icon: defaultIcon };
    }
  } else {
    return { opacity: 1.0, icon: defaultIcon };
  }
}

/**
 * Setzt die Optionen bezüglich verwendetes Icon für den Zaehlartenmarker.
 */
function markerOptionsZaehlart(zaehlart: string, index: number) {
  const divIcon = new DivIcon({
    iconAnchor: calculateIconAnchorCoordinatesForZaehlartMarker(index),
    iconSize: [30, 30],
    className: `zaehlart-circle-${getColorForZaehlartenMarker(zaehlart)}`,
    html: '<span class="text-white font-weight-bold">' + zaehlart + "</span>",
  });

  return { opacity: 1.0, icon: divIcon };
}

/**
 * In dieser Methode wird die X- und Y-Koordinate für den Icon-Anchor eines Zaehlart-Markers ermittelt.
 *
 * Eine Zaehlstelle kann mehrere Zaehlungen mit unterschiedlichen Zaehlarten besitzen.
 * Jede verfügbare Zaehlart der Zaehlstelle wird rechts unterhalb des Zaehlstellenmarkers
 * in 2 Spalten und n-Reihen gruppiert. Anhand des Indexes im Parameter "index" errechnet
 * sich der Position eines einzelnen Zaehlart-Markers.
 *
 * @param index zur Berechnung der X- und Y-Koordinate in Pixel für die Positionierung des
 * Zaehlart Markers rechts unterhalb der Zaehlstellenkoordinate.
 * @return der Array mit der X- und Y-Pixelkoordinate.
 */
function calculateIconAnchorCoordinatesForZaehlartMarker(
  index: number
): L.Point {
  const xCoordinate: number =
    ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER +
    (index % NUMBER_OF_COLUMNS_ZAEHLART_MARKER) *
      ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER;
  const yCoordinate: number =
    ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER +
    Math.floor(index / NUMBER_OF_COLUMNS_ZAEHLART_MARKER) *
      ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER;
  return new L.Point(xCoordinate, yCoordinate);
}

const emits = defineEmits<{
  (e: "zeahlart-ausgewaehlt", v: string): void;
}>();

function choosenZaehlartIconToZaehlstelleHeader(zaehlart: string) {
  emits("zeahlart-ausgewaehlt", zaehlart);
}
</script>

<style lang="css">
/* Zoom-Buttons verwenden per Default die Farbe 'primary'. Da diese im Button kaum zu erkennen ist,
wurden die Farbe auf schwarz gesetzt */
.leaflet-control-zoom a.leaflet-control-zoom-in {
  color: black;
}

.leaflet-control-zoom a.leaflet-control-zoom-out {
  color: black;
}

.zaehlart-circle-red {
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #f44336;
  text-align: center;
}
.zaehlart-circle-secondary {
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #f57c00;
  text-align: center;
}
</style>
