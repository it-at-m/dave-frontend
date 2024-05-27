import TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";
import AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import { MessstelleStatus } from "@/types/enum/MessstelleStatus";

export default interface MessstelleKarteDTO extends AnzeigeKarteDTO {
    tooltip: TooltipMessstelleDTO;
    status: MessstelleStatus;
}
