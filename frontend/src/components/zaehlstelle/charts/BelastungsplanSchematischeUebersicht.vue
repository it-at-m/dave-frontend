<template>
  <belastungsplan-kreuzung-svg-schematische-uebersicht
    v-if="
      drawSchematischeUebersicht &&
      !isQjsBelastungsplan(data) &&
      !isFjsBelastungsplan(data) &&
      !isQuBelastungsplan(data)
    "
    :dimension="dimension"
    :data="data as LadeBelastungsplanDTO"
    style="position: absolute; opacity: 0; pointer-events: none"
    @print="emitPrint($event)"
  />

  <belastungsplan-qjs-svg-schematische-uebersicht
    id="schematische-uebersicht-qjs"
    v-if="drawSchematischeUebersicht && isQjsBelastungsplan(data)"
    :dimension="dimension"
    :data="data"
    :options="options"
    style="position: absolute; opacity: 0; pointer-events: none"
    @print="emitPrint($event)"
  />

  <belastungsplan-fjs-and-qu-svg-schematische-uebersicht
    id="schematische-uebersicht-fjs-qu"
    v-if="
      drawSchematischeUebersicht &&
      (isFjsBelastungsplan(data) || isQuBelastungsplan(data))
    "
    :dimension="dimension"
    :data="data"
    :options="options"
    style="position: absolute; opacity: 0; pointer-events: none"
    @print="emitPrint($event)"
  />
</template>

<script setup lang="ts">
import type {
  LadeBelastungsplanDTO,
  LadeBelastungsplanFjsDTO,
  LadeBelastungsplanQjsDTO,
  LadeBelastungsplanQuDTO,
} from "@/api/client";
import type Options from "@/types/zaehlung/Options";

import BelastungsplanFjsAndQuSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanFjsAndQuSvgSchematischeUebersicht.vue";
import BelastungsplanKreuzungSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvgSchematischeUebersicht.vue";
import BelastungsplanQjsSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanQjsSvgSchematischeUebersicht.vue";
import BelastungsplanTyp from "@/types/enum/BelastungsplanTyp";

interface Props {
  data: LadeBelastungsplanDTO;
  dimension?: string;
  options: Options;
  drawSchematischeUebersicht: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

function emitPrint(event: any) {
  emits("print", event);
}

function isQjsBelastungsplan(data: any): data is LadeBelastungsplanQjsDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.QJS;
}

function isFjsBelastungsplan(data: any): data is LadeBelastungsplanFjsDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.FJS;
}

function isQuBelastungsplan(data: any): data is LadeBelastungsplanQuDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.QU;
}
</script>
