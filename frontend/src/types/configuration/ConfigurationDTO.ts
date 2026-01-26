import type ZaehlstelleConfigurationDTO from "@/types/configuration/ZaehlstelleConfigurationDTO";
import type TenantConfigurationDTO from "@/types/configuration/TenantConfigurationDTO";

export default interface ConfigurationDTO {
  zaehlstelle: ZaehlstelleConfigurationDTO;
  tenant: TenantConfigurationDTO;
}
