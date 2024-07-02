<template>
  <v-sheet
    :height="height"
    :min-height="minheight"
    :width="width"
  >
    <div
      id="map"
      :style="mapStyle"
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
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import markerIconDiamondRed from "@/assets/cards-diamond-red.png";
import markerIconDiamondShadow from "@/assets/cards-diamond-shadow.png";
import markerIconDiamondViolet from "@/assets/cards-diamond-violet.png";
import markerIconRed from "@/assets/marker-icon-red.png";
import { useSearchStore } from "@/store/search";
import { useSnackbarStore } from "@/store/snackbar";
import { useZaehlstelleStore } from "@/store/zaehlstelle";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER = -4;
const ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER = -32;
const NUMBER_OF_COLUMNS_ZAEHLART_MARKER = 2;
const MUNICH_CENTER_LATITUDE = "48.137227";
const MUNICH_CENTER_LONGITUDE = "11.575517";
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

const mapStyle = computed<string>(() => {
  return `height: ${props.height}; width: ${props.width}; min-height: ${props.minheight}; z-index: 1`;
});

const map = ref<L.Map | undefined>(undefined);
const markerCluster = ref(L.markerClusterGroup());

const zaehlartenLayer = ref(L.layerGroup());

onMounted(() => {
  createMap();
  initMap();
});

function createMap(): void {
  if (!map.value) {
    map.value = new L.Map("map", {
      minZoom: 10,
      maxZoom: 18,
      preferCanvas: false,
      attributionControl: false,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: "topleft",
      },
      center: center.value,
      zoom: zoomValue.value,
    });
  }
}

function initMap(): void {
  if (map.value) {
    map.value.whenReady(() =>
      setTimeout(() => {
        if (map.value) {
          map.value.invalidateSize();
          map.value.addControl(
            L.control.attribution({
              position: "bottomleft",
              prefix: "Leaflet",
            })
          );
          map.value.setZoom(zoomValue.value);
          createLayersAndAddToMap();
          markerCluster.value.addTo(map.value);
          searchErhebungsstelle();
        }
      }, 10)
    );
  }
}

const zoomValue = computed(() => {
  const zoom = router.currentRoute.query.zoom;
  if (zoom != undefined) {
    return parseFloat(zoom.toString());
  } else {
    return props.zoom;
  }
});

/**
 * Die Methode setzt Koordinate auf welche Zentriert werden soll.
 */
const center = computed<LatLng>(() => {
  const lat = router.currentRoute.query.lat;
  const lng = router.currentRoute.query.lng;

  if (lat != undefined && lng != undefined) {
    return createLatLngFromString(lat.toString(), lng.toString());
  } else if (props.latlng && props.latlng.length > 0) {
    return createLatLngFromString(props.latlng[0], props.latlng[1]);
  } else {
    // Mitte von München
    return createLatLngFromString(
      MUNICH_CENTER_LATITUDE,
      MUNICH_CENTER_LONGITUDE
    );
  }
});

function createLatLngFromString(lat: string, lng: string): LatLng {
  return latLng(parseFloat(lat), parseFloat(lng));
}

function createLayersAndAddToMap(): void {
  if (map.value) {
    const baseLayers = createBaseLayers();
    const overlayLayers = createOverlayLayers();
    baseLayers.Stadtkarte.addTo(map.value);
    L.control.layers(baseLayers, overlayLayers).addTo(map.value);
  }
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

  const osm = L.tileLayer.wms("https://ows.terrestris.de/osm/service?", {
    layers: "OSM-WMS",
    className: "OpenStreetMaps",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a> by terrestris',
  });

  return {
    Stadtkarte: stadtkarteGesamt,
    Luftbild: luftbild,
    OpenStreetMaps: osm,
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

function resetMarker(): void {
  if (map.value) {
    if (markerCluster.value) {
      markerCluster.value.removeFrom(map.value);
      markerCluster.value.clearLayers();
    }
    zaehlartenLayer.value.removeFrom(map.value);
    setMarkerToMap();
  }
}

function setMarkerToMap() {
  markerCluster.value.clearLayers();
  markerCluster.value = L.markerClusterGroup({
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

  markerCluster.value.addLayers(markers);
  if (map.value) {
    markerCluster.value.addTo(map.value);
    if (zaehlstellenKarte.length === 1) {
      /**
       * Falls in der Main.view nach einer bestimmten Zaehlstelle gesucht
       * und diese Suche mit Druck auf die Enter-Taste eingeleitet wird,
       * umfasst das Suchergebnis somit nur eine Zaehlstelle.
       * Auf diese eine mit einem Icon angezeigte Zaehlstelle muss dann zentriert werden.
       */
      map.value.setView(createLatLng(zaehlstellenKarte[0]), 18);
    } else if (props.zId && props.latlng && props.latlng.length > 0) {
      // Zaehlartenmarker erzeugen
      setZaehlartenmarkerToMap();
      map.value.setView(center.value, zoomValue.value);
    }
  }
}

function setZaehlartenmarkerToMap() {
  const markers: Array<Marker> = [];
  const zaehlartenKarte = selectedZaehlstelleKarte.value.zaehlartenKarte;

  zaehlartenKarte.forEach((zaehlartenKarteDto: ZaehlartenKarteDTO) => {
    zaehlartenKarteDto.zaehlarten.forEach((zaehlart: string, index: number) => {
      markers.push(
        createMarkerForZaehlart(zaehlartenKarteDto, zaehlart, index)
      );
    });
  });
  zaehlartenLayer.value = L.layerGroup(markers);
  if (map.value) {
    zaehlartenLayer.value.addTo(map.value);
  }
}

const selectedZaehlstelleKarte = ref(
  DefaultObjectCreator.createDefaultZaehlstelleKarte()
);

function searchErhebungsstelle() {
  SucheService.searchErhebungsstelle(searchStore.getLastSearchQuery)
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

function saveMapPositionInUrl() {
  if (map.value) {
    const mapCenter = map.value.getBounds().getCenter();

    const lat = mapCenter?.lat.toString();
    const lng = mapCenter?.lng.toString();
    const zoom = map.value.getZoom().toString();

    router.replace({
      path: router.currentRoute.path,
      query: { lat: lat, lng: lng, zoom: zoom },
    });
  }
}

function routeToZaehlstelle(id: string) {
  saveMapPositionInUrl();
  router.push("/zaehlstelle/" + id);
}

function routeToMessstelle(id: string) {
  saveMapPositionInUrl();
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
    nextTick(() => {
      if (map.value) {
        zaehlartenLayer.value.removeFrom(map.value);
        setZaehlartenmarkerToMap();
      }
    });
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
    tooltip = `${tooltip} Aufbau: ${useDateUtils().formatDate(
      tooltipDto.realisierungsdatum
    )}<br/>`;
  }
  if (tooltipDto.abbaudatum) {
    tooltip = `${tooltip}Abbau: ${useDateUtils().formatDate(
      tooltipDto.abbaudatum
    )}<br/>`;
  }
  if (tooltipDto.datumLetztePlausibleMessung) {
    tooltip = `${tooltip}Letzte plausible Messung: ${useDateUtils().formatDate(
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
    html:
      '<span class="white--text text-Button font-weight-bold">' +
      zaehlart +
      "</span>",
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
  background: red;
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
