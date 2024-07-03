import type TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";
import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import { MessstelleStatus } from "@/types/enum/MessstelleStatus";

export default interface MessstelleKarteDTO extends AnzeigeKarteDTO {
    tooltip: TooltipMessstelleDTO;
    status: MessstelleStatus;
}
