import type TenantConfigurationDTO from "@/types/configuration/TenantConfigurationDTO";
import type ZaehlstelleConfigurationDTO from "@/types/configuration/ZaehlstelleConfigurationDTO";

export default interface ConfigurationDTO {
  zaehlstelle: ZaehlstelleConfigurationDTO;
  tenant: TenantConfigurationDTO;
}
