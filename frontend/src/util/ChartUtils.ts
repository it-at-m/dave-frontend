export default class ChartUtils {
  public static readonly LEGEND_ENTRY_KFZ: string = "Kfz";
  public static readonly LEGEND_ENTRY_SV: string = "SV";
  public static readonly LEGEND_ENTRY_GV: string = "GV";
  public static readonly LEGEND_ENTRY_SV_ANTEIL_PROZENT: string = "SV %";
  public static readonly LEGEND_ENTRY_GV_ANTEIL_PROZENT: string = "GV %";
  public static readonly LEGEND_ENTRY_RAD: string = "Rad";
  public static readonly LEGEND_ENTRY_FUSS: string = "Fuß";
  public static readonly LEGEND_ENTRY_PKW: string = "Pkw";
  public static readonly LEGEND_ENTRY_LKW: string = "Lkw";
  public static readonly LEGEND_ENTRY_LFW: string = "Lfw";
  public static readonly LEGEND_ENTRY_LZ: string = "Lz";
  public static readonly LEGEND_ENTRY_BUS: string = "Busse";
  public static readonly LEGEND_ENTRY_KRAD: string = "Krad";
  public static readonly LEGEND_ENTRY_PKW_EINHEITEN: string = "Pkw-Einheiten";

  public static readonly CHART_SYMBOLS: Map<string, string> = new Map([
    [ChartUtils.LEGEND_ENTRY_KFZ, "circle"],
    [ChartUtils.LEGEND_ENTRY_SV, "circle"],
    [ChartUtils.LEGEND_ENTRY_GV, "circle"],

    [ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT, "triangle"],
    [ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT, "triangle"],

    [ChartUtils.LEGEND_ENTRY_RAD, "diamond"],

    [ChartUtils.LEGEND_ENTRY_FUSS, "roundRect"],

    [ChartUtils.LEGEND_ENTRY_PKW, "rect"],
    [ChartUtils.LEGEND_ENTRY_LKW, "rect"],
    [ChartUtils.LEGEND_ENTRY_LFW, "rect"],
    [ChartUtils.LEGEND_ENTRY_LZ, "rect"],
    [ChartUtils.LEGEND_ENTRY_BUS, "rect"],
    [ChartUtils.LEGEND_ENTRY_KRAD, "rect"],

    [ChartUtils.LEGEND_ENTRY_PKW_EINHEITEN, "arrow"],
  ]);

  public static readonly CHART_COLOR: Map<string, string> = new Map([
    [ChartUtils.LEGEND_ENTRY_KFZ, "#B71C1C"], // red darken-4
    [ChartUtils.LEGEND_ENTRY_SV, "#0D47A1"], // blue darken-4
    [ChartUtils.LEGEND_ENTRY_GV, "#40C4FF"], // light-blue accent-2

    [ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT, "#263238"], // blue-grey-darken-4
    [ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT, "#90A4AE"], // blue-grey-lighten-2

    [ChartUtils.LEGEND_ENTRY_RAD, "#1B5E20"], // green darken-4

    [ChartUtils.LEGEND_ENTRY_FUSS, "#CDDC39"], // lime

    [ChartUtils.LEGEND_ENTRY_PKW, "#00E5FF"], // cyan accent-3
    [ChartUtils.LEGEND_ENTRY_LKW, "#BF360C"], // deep-orange darken-4
    [ChartUtils.LEGEND_ENTRY_LFW, "#CDDC39"], // lime
    [ChartUtils.LEGEND_ENTRY_LZ, "#FF9E80"], // deep-orange accent-1
    [ChartUtils.LEGEND_ENTRY_BUS, "#FFC107"], // amber
    [ChartUtils.LEGEND_ENTRY_KRAD, "#0097A7"], // cyan darken-2

    [ChartUtils.LEGEND_ENTRY_PKW_EINHEITEN, "#000000"], // black
  ]);

  public static readonly CHART_COLOR_GESAMT_AUSWERTUNG: Map<number, string> =
    new Map([
      [0, "#F44336"], // red
      [1, "#9C27B0"], // purple
      [2, "#3F51B5"], // indigo
      [3, "#03A9F4"], // light-blue
      [4, "#009688"], // teal
      [5, "#CDDC39"], // lime
      [6, "#FFC107"], // amber
      [7, "#795548"], // brown
      [8, "#607D8B"], // blue-grey
      [9, "#E91E63"], // pink
    ]);
}
