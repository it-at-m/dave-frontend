import type LayerDTO from "@/types/karte/LayerDTO";

export default interface MapConfigDTO {
  lat: string;
  lng: string;
  zoom: number;
  baseLayers: LayerDTO[];
  overlayLayers: LayerDTO[];
}
