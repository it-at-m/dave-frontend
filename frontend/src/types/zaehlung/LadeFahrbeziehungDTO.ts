import type BaseEntity from "@/types/common/BaseEntity";

export default interface LadeFahrbeziehungDTO extends BaseEntity {
    // Kreuzung
    von: number;
    nach: number;
    vonknotvonstrnr: string;
    nachknotvonstrnr: string;
    von_strnr: string;
    vonknotennachstrnr: string;
    nachknotnachstrnr: string;
    nach_strnr: string;

    // Kreisverkehr
    knotenarm: number;
    hinein: boolean;
    heraus: boolean;
    vorbei: boolean;
}
