import BaseEntity from "@/types/BaseEntity";

export default interface InfoMessageDTO extends BaseEntity {
    content: string;
    gueltig: boolean;
}
