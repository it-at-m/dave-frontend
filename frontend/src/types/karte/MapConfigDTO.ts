import type OverlayLayerDTO from "@/types/karte/OverlayLayerDTO";

export default interface MapConfigDTO {
  lat: string;
  lng: string;
  zoom: number;
  overlayLayers: OverlayLayerDTO[];
}
