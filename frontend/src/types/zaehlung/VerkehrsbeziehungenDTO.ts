export default interface VerkehrsbeziehungenDTO {
  vonKnotenarme: Array<number>;
  nachKnotenarme: { [key: number]: Array<number> };
}
