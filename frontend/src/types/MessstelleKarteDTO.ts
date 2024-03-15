import TooltipMessstelleDTO from "@/types/TooltipMessstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";
import { MessstelleStatus } from "@/types/enum/MessstelleStatus";

export default interface MessstelleKarteDTO extends AnzeigeKarteDTO {
    tooltip: TooltipMessstelleDTO;
    status: MessstelleStatus;
}
