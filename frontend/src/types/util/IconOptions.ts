export default class IconOptions {
  icon: string;
  tooltip: string;
  color: string | undefined;

  constructor(icon: string, tooltip: string, color?: string) {
    this.icon = icon;
    this.tooltip = tooltip;
    this.color = color;
  }
}
