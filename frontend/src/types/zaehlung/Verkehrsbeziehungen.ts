export default interface Verkehrsbeziehungen {
  vonKnotenarme: Array<number>;
  nachKnotenarme: { [key: number]: Array<number> };
}
