import { Icon } from "leaflet";
import "leaflet.markercluster";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";

// Hilfsplugin, für den Fall, dass die Marker-Icons fehlen
// https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing

Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Default-Icon
type D = Icon.Default & {
    _getIconUrl: string;
};
delete (Icon.Default.prototype as D)._getIconUrl;
