import type MapConfigurationDTO from "@/types/configuration/MapConfigurationDTO";

export default interface TenantConfigurationDTO {
  datenportalHeader: string;
  mapConfiguration: MapConfigurationDTO;
}
