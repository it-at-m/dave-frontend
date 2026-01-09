import type MapConfigurationDTO from "@/types/configuration/MapConfigurationDTO";

export default interface TenantConfigurationDTO {
  department: string;
  mapConfiguration: MapConfigurationDTO;
}
