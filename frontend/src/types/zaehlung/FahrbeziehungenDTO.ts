export default interface FahrbeziehungenDTO {
  vonKnotenarme: Array<number>;
  nachKnotenarme: { [key: number]: Array<number> };
}
