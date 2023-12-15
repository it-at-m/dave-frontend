import TooltipMessstelleDTO from "@/types/TooltipMessstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default interface MessstelleKarteDTO extends AnzeigeKarteDTO {
    tooltip: TooltipMessstelleDTO;
}
