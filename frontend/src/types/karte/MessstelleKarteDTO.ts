import type { ErhebungsstelleKarteDTO } from "@/api/client";
import type TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";

import { MessstelleStatus } from "@/types/enum/MessstelleStatus";

export default interface MessstelleKarteDTO extends ErhebungsstelleKarteDTO {
  tooltip: TooltipMessstelleDTO;
  status: MessstelleStatus;
}
