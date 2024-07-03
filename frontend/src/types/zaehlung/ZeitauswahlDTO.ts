import Zeitblock from "@/types/enum/Zeitblock";
import ZeitblockStuendlich from "@/types/enum/ZeitblockStuendlich";

export default interface ZeitauswahlDTO {
    blocks: Array<Zeitblock>;
    hours: Array<ZeitblockStuendlich>;
}
