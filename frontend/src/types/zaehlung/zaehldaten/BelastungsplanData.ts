export default interface BelastungsplanData {
  values: number[][];
  label: string;
  filled: boolean;
  percent: boolean;

  sumIn: number[];
  sumOut: number[];
  sum: number[];
}
