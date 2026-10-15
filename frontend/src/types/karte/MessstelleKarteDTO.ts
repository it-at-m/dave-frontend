import type TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";

import { MessstelleStatus } from "@/types/enum/MessstelleStatus";
import type {ErhebungsstelleKarteDTO} from "@/api/client";

export default interface MessstelleKarteDTO extends ErhebungsstelleKarteDTO {
  tooltip: TooltipMessstelleDTO;
  status: MessstelleStatus;
}
