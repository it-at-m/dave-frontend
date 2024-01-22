<template>
    <v-sheet
        :height="height"
        :min-height="minheight"
        :width="width"
    >
        <l-map
            ref="map"
            :center="center"
            :options="mapOptions"
            style="z-index: 1"
            @ready="mapReady"
        >
            <l-control-layers />
            <!--      Kartenlayers. Bei layer-type="base" muss bei der Default-Karte :visible auf true gesetzt werden. -->
            <!--      layer-type="overlay" sind zusätzlich zuschaltbare Ansichten. -->

            <!--      Standardkarte Geoportal -->
            <l-wms-tile-layer
                :visible="true"
                :attribution="mapAttribution"
                base-url="https://geoportal.muenchen.de/geoserver/gsm/wms?"
                layer-type="base"
                layers="gsm:g_stadtkarte_gesamt"
                name="Stadtkarte"
            />
            <!--      Luftbild Geoportal -->
            <l-wms-tile-layer
                :visible="false"
                :attribution="mapAttribution"
                base-url="https://geoportal.muenchen.de/geoserver/gsm/wms?"
                layer-type="base"
                layers="gsm:g_luftbild"
                name="Luftbild"
            />
            <!--      OpenStreetMap -->
            <l-wms-tile-layer
                :visible="false"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a> by terrestris'
                base-url="https://ows.terrestris.de/osm/service?"
                layer-type="base"
                layers="OSM-WMS"
                name="OpenStreetMaps"
            />
            <!--      Beginn der overlay Layers   -->
            <l-wms-tile-layer
                :transparent="true"
                :visible="false"
                :attribution="mapAttribution"
                base-url="https://geoportal.muenchen.de/geoserver/gsm/wms?"
                format="image/png"
                layer-type="overlay"
                layers="gsm:stadtbezirk"
                name="Stadtbezirke"
            />
            <l-wms-tile-layer
                :transparent="true"
                :visible="false"
                :attribution="mapAttribution"
                base-url="https://geoportal.muenchen.de/geoserver/gsm/wms?"
                format="image/png"
                layer-type="overlay"
                layers="gsm:vablock_viertel_dave"
                name="Stadtviertel"
            />
            <l-wms-tile-layer
                :transparent="true"
                :visible="false"
                :attribution="mapAttribution"
                base-url="https://geoportal.muenchen.de/geoserver/kvr/wms"
                format="image/png"
                layer-type="overlay"
                layers="kvr:lsa_dave"
                name="Lichtsignalanlagen"
            />

            <!-- Marker für die Zaehlarten -->
            <l-layer-group
                v-for="(
                    zaehlartenKarteDto, indexZaehlarten
                ) in getSelectedZaehlstelleKarte.zaehlartenKarte"
                :key="indexZaehlarten"
            >
                <l-marker
                    v-for="(
                        zaehlart, indexZaehlart
                    ) in zaehlartenKarteDto.zaehlarten"
                    :key="indexZaehlart"
                    :lat-lng="createLatLngAsArray(zaehlartenKarteDto)"
                    @click="choosenZaehlartIconToZaehlstelleHeader(zaehlart)"
                >
                    <l-icon
                        :icon-anchor="
                            calculateIconAnchorCoordinatesForZaehlartMarker(
                                indexZaehlart
                            )
                        "
                    >
                        <v-avatar
                            :color="getColorForZaehlartenMarker(zaehlart)"
                            class="ma-1 pa-0"
                            size="30"
                        >
                            <span
                                class="white--text text-Button font-weight-bold"
                            >
                                {{ zaehlart }}
                            </span>
                        </v-avatar>
                    </l-icon>
                </l-marker>
            </l-layer-group>
        </l-map>
    </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
// imports for leaflet
import {
    LCircleMarker,
    LControlLayers,
    LIcon,
    LLayerGroup,
    LMap,
    LMarker,
    LTileLayer,
    LTooltip,
    LWMSTileLayer,
} from "vue2-leaflet";
// eslint-disable-next-line no-unused-vars
import L, { control, Icon, LatLng, latLng, Marker } from "leaflet";
// eslint-disable-next-line no-unused-vars
import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
// eslint-disable-next-line no-unused-vars
import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";
// eslint-disable-next-line no-unused-vars
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import SucheService from "@/api/service/SucheService";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import markerIconRed from "@/assets/marker-icon-red.png";
import markerIconDiamondViolet from "@/assets/cards-diamond-violet.png";
import markerIconDiamondRed from "@/assets/cards-diamond-red.png";
import TooltipMessstelleDTO from "@/types/TooltipMessstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";
import MessstelleKarteDTO from "@/types/MessstelleKarteDTO";

@Component({
    components: {
        LIcon,
        LMap,
        LTileLayer,
        LMarker,
        LCircleMarker,
        LTooltip,
        LControlLayers,
        LLayerGroup,
        "l-wms-tile-layer": LWMSTileLayer,
    },
})
export default class ZaehlstelleMap extends Vue {
    private static readonly ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER: number = 0;

    private static readonly ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER: number =
        -32;

    private static readonly NUMBER_OF_COLUMNS_ZAEHLART_MARKER: number = 2;

    private static readonly MUNICH_CENTER_LATITUDE: string = "48.137227";

    private static readonly MUNICH_CENTER_LONGITUDE: string = "11.575517";

    private static readonly ICON_COLOR_SECONDARY: string = "secondary";
    private static readonly ICON_COLOR_RED: string = "red";

    private readonly mapAttribution =
        '&copy; <a href="https://stadt.muenchen.de/infos/geobasisdaten.html">GeodatenService München</a>';

    @Prop({ default: "160px" }) minheight!: string;
    /**
     * nummer (müsste eigentlich die ID sein)
     * id
     */
    @Prop()
    private zId?: string;
    @Prop()
    private latlng?: string[];
    @Prop({ default: "15vh" })
    readonly height!: string;
    @Prop({ default: "100%" })
    readonly width!: string;
    @Prop({ default: false })
    private readonly showMarker!: boolean;
    @Prop({ default: 12 })
    private zoom!: number;
    @Ref("map")
    private readonly theMap!: LMap;

    private mapMarkerClusterGroup = L.markerClusterGroup();

    private selectedZaehlstelleKarte: ZaehlstelleKarteDTO =
        DefaultObjectCreator.createDefaultZaehlstelleKarte();

    mapOptions: object = {
        minZoom: 10,
        maxZoom: 18,
        preferCanvas: false,
        attributionControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: "topleft",
        },
    };

    get getSelectedZaehlstelleKarte(): ZaehlstelleKarteDTO {
        return this.selectedZaehlstelleKarte;
    }

    get getZaehlstellenKarteFromStore(): AnzeigeKarteDTO[] {
        return this.$store.getters["search/result"];
    }

    get zoomValue() {
        const zoom = this.$router.currentRoute.query.zoom;

        if (zoom != undefined) {
            return parseFloat(zoom.toString());
        } else {
            return this.zoom;
        }
    }

    /**
     * Die Methode setzt Koordinate auf welche Zentriert werden soll.
     */
    get center() {
        const lat = this.$router.currentRoute.query.lat;
        const lng = this.$router.currentRoute.query.lng;

        if (lat != undefined && lng != undefined) {
            return this.createLatLngFromString(lat.toString(), lng.toString());
        } else if (this.latlng && this.latlng.length > 0) {
            return this.createLatLngFromString(this.latlng[0], this.latlng[1]);
        } else {
            // Mitte von München
            return this.createLatLngFromString(
                ZaehlstelleMap.MUNICH_CENTER_LATITUDE,
                ZaehlstelleMap.MUNICH_CENTER_LONGITUDE
            );
        }
    }

    mounted() {
        SucheService.searchErhebungsstelle(
            this.$store.getters["search/lastSearchQuery"]
        )
            .then((result) => {
                // fügt testdaten für Messstellen hinzu, muss später entfernt werden sobald der richtige Service verfügbar ist
                this.$store.commit("search/result", result);
            })
            .catch((error) => {
                this.$store.dispatch("snackbar/showError", error);
            })
            .finally(() => {
                this.setMarkerToMap();
            });
    }

    getColorForZaehlartenMarker(zaehlart: string): string {
        if (zaehlart == this.$store.getters.getAktiveZaehlung.zaehlart) {
            return ZaehlstelleMap.ICON_COLOR_RED;
        } else {
            return ZaehlstelleMap.ICON_COLOR_SECONDARY;
        }
    }

    @Watch("$store.state.search.result")
    private resetMarker() {
        // Alte Layer entfernen bevor neue eingezeichnet werden
        this.theMap.mapObject.removeLayer(this.mapMarkerClusterGroup);
        this.setMarkerToMap();
    }

    private setMarkerToMap() {
        // Setzen einer leeren ZaehlstelleKarte ohne Marker
        this.selectedZaehlstelleKarte =
            DefaultObjectCreator.createDefaultZaehlstelleKarte();
        this.mapMarkerClusterGroup.clearLayers();
        this.mapMarkerClusterGroup = L.markerClusterGroup({
            disableClusteringAtZoom: 15,
            spiderfyOnMaxZoom: false,
            chunkedLoading: true,
        });

        const zaehlstellenKarte: AnzeigeKarteDTO[] =
            this.getZaehlstellenKarteFromStore;
        const markers: Array<Marker> = [];
        zaehlstellenKarte.forEach((zaehlstelleKarte) => {
            if (zaehlstelleKarte.type != "messstelle") {
                markers.push(
                    this.createMarkerForZaehlstelle(
                        zaehlstelleKarte as ZaehlstelleKarteDTO
                    )
                );
            } else {
                markers.push(
                    this.createMarkerForMessstelle(
                        zaehlstelleKarte as MessstelleKarteDTO
                    )
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
                zaehlstelleKarte.id === this.zId &&
                zaehlstelleKarte.type === "zaehlstelle"
            ) {
                this.selectedZaehlstelleKarte =
                    zaehlstelleKarte as ZaehlstelleKarteDTO;
            }
        });

        this.mapMarkerClusterGroup.addLayers(markers);

        this.theMap.mapObject.addLayer(this.mapMarkerClusterGroup);

        if (zaehlstellenKarte.length === 1) {
            /**
             * Falls in der Main.view nach einer bestimmten Zaehlstelle gesucht
             * und diese Suche mit Druck auf die Enter-Taste eingeleitet wird,
             * umfasst das Suchergebnis somit nur eine Zaehlstelle.
             * Auf diese eine mit einem Icon angezeigte Zaehlstelle muss dann zentriert werden.
             */
            this.theMap.mapObject.setView(
                this.createLatLng(zaehlstellenKarte[0]),
                18
            );
        } else if (!this.zId) {
            this.theMap.mapObject.setView(this.center, this.zoomValue);
        }
    }

    private saveMapPositionInUrl() {
        const map = this.theMap.mapObject;
        const mapCenter = map.getBounds().getCenter();

        const lat = mapCenter.lat.toString();
        const lng = mapCenter.lng.toString();
        const zoom = map.getZoom().toString();

        this.$router.replace({
            path: this.$router.currentRoute.path,
            query: { lat: lat, lng: lng, zoom: zoom },
        });
    }

    private routeToZaehlstelle(id: string) {
        this.saveMapPositionInUrl();
        this.$router.push("/zaehlstelle/" + id);
    }

    private routeToMessstelle(id: string) {
        this.saveMapPositionInUrl();
        this.$router.push(`/messstelle/${id}`);
    }

    private createLatLng(anzeigeKarte: AnzeigeKarteDTO): LatLng {
        return latLng(anzeigeKarte.latitude, anzeigeKarte.longitude);
    }

    private createLatLngFromString(lat: string, lng: string): LatLng {
        return latLng(parseFloat(lat), parseFloat(lng));
    }

    createLatLngAsArray(zaehlartenKarte: ZaehlartenKarteDTO): Array<number> {
        return [
            parseFloat(zaehlartenKarte.latitude),
            parseFloat(zaehlartenKarte.longitude),
        ];
    }

    private createMarkerForZaehlstelle(
        zaehlstelleKarte: ZaehlstelleKarteDTO
    ): Marker {
        let marker: Marker = new Marker(
            this.createLatLng(zaehlstelleKarte),
            this.markerOptionsZaehlstelle(zaehlstelleKarte)
        );
        marker.bindTooltip(
            this.createTooltipZaehlstelle(zaehlstelleKarte.tooltip),
            {
                direction: "top",
                offset: [-14, 0],
            }
        );

        marker.on("click", () => {
            // Zeige alle Zaehlungen zur Zaehlstelle an.
            this.choosenZaehlartIconToZaehlstelleHeader("");
            this.routeToZaehlstelle(zaehlstelleKarte.id);
        });
        return marker;
    }

    private createMarkerForMessstelle(
        messstelleKarteDto: MessstelleKarteDTO
    ): Marker {
        let marker: Marker = new Marker(
            this.createLatLng(messstelleKarteDto),
            this.markerOptionsMessstelle(messstelleKarteDto)
        );
        marker.bindTooltip(
            this.createTooltipMessstelle(messstelleKarteDto.tooltip),
            {
                direction: "top",
                offset: [-14, 0],
            }
        );
        marker.on("click", () => {
            this.routeToMessstelle(messstelleKarteDto.id);
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
    private createTooltipZaehlstelle(
        tooltipDto: TooltipZaehlstelleDTO
    ): string {
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

    private createTooltipMessstelle(tooltipDto: TooltipMessstelleDTO): string {
        if (!tooltipDto) {
            return "<div></div>";
        }
        let tooltip = "<div><b>";
        if (tooltipDto.mstId) {
            tooltip = `${tooltip}Messstelle: ${tooltipDto.mstId}`;
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
            tooltip = `${tooltip} Aufbau: ${tooltipDto.realisierungsdatum}<br/>`;
        }
        if (tooltipDto.abbaudatum) {
            tooltip = `${tooltip}Abbau: ${tooltipDto.abbaudatum}<br/>`;
        }
        if (tooltipDto.datumLetztePlausibleMessung) {
            tooltip = `${tooltip}Letzte plausible Messung: ${tooltipDto.datumLetztePlausibleMessung}<br/>`;
        }

        tooltip = `${tooltip}</div>`;
        return tooltip;
    }

    /**
     * Setzt die Optionen bezüglich verwendetes Icon für den Zaehlstellenmarker.
     */
    private markerOptionsZaehlstelle(zaehlstelleKarte: ZaehlstelleKarteDTO) {
        if (this.zId) {
            if (this.zId === zaehlstelleKarte.id) {
                let defaultIcon = new Icon.Default();
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
    private markerOptionsMessstelle(messstelleKarte: MessstelleKarteDTO) {
        let defaultIcon = new Icon.Default();
        defaultIcon.options.iconUrl = markerIconDiamondViolet;
        if (this.zId) {
            if (this.zId === messstelleKarte.id) {
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
    calculateIconAnchorCoordinatesForZaehlartMarker(index: number): L.Point {
        let xCoordinate: number =
            ZaehlstelleMap.ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER +
            (index % ZaehlstelleMap.NUMBER_OF_COLUMNS_ZAEHLART_MARKER) *
                ZaehlstelleMap.ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER;
        let yCoordinate: number =
            ZaehlstelleMap.ICON_ANCHOR_INITIAL_OFFSET_PIXELS_ZAEHLART_MARKER +
            Math.floor(
                index / ZaehlstelleMap.NUMBER_OF_COLUMNS_ZAEHLART_MARKER
            ) *
                ZaehlstelleMap.ICON_ANCHOR_OFFSET_PIXELS_ZAEHLART_MARKER;
        return new L.Point(xCoordinate, yCoordinate);
    }

    choosenZaehlartIconToZaehlstelleHeader(zaehlart: string) {
        this.$emit("zeahlart-ausgewaehlt", zaehlart);
    }

    mapReady() {
        this.theMap.mapObject.addControl(
            control.attribution({
                position: "bottomleft",
                prefix: "",
            })
        );
        this.theMap.mapObject.setZoom(this.zoomValue);
    }
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
</style>
