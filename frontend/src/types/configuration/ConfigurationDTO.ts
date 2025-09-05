import type MapConfigurationDTO from "@/types/configuration/MapConfigurationDTO";
import type ZaehlstelleConfigurationDTO from "@/types/configuration/ZaehlstelleConfigurationDTO";

export default interface ConfigurationDTO {
    map: MapConfigurationDTO;
    zaehlstelle: ZaehlstelleConfigurationDTO;
}