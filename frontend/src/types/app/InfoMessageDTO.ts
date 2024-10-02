import type BaseEntity from "@/types/common/BaseEntity";

export default interface InfoMessageDTO extends BaseEntity {
  content: string;
  gueltig: boolean;
}
