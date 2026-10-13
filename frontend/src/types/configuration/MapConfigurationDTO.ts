import type LayerDTO from "@/types/karte/LayerDTO";

export default interface MapConfigurationDTO {
  lat: string;
  lng: string;
  zoom: number;
  baseLayers: LayerDTO[];
  overlayLayers: LayerDTO[];
}
