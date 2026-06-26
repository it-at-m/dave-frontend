<template>
  <div
    class="drilldown-table-wrapper"
    :style="{ height: height }"
  >
    <v-tabs v-model="activeTab">
      <v-tab v-for="type in vehicleTypes" :key="type.key" :value="type.key">{{ type.title }}</v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item v-for="type in vehicleTypes" :key="type.key" :value="type.key">
        <table class="drilldown-table">
          <thead>
            <tr>
              <th class="drilldown-table__sticky time-col text-center">Zeit/ von -> nach</th>
              <th
                v-for="beziehung in fahrbeziehungen"
                class="drilldown-table__sticky"
              >
                {{ beziehung.von }} <br />
                {{ beziehung.nach }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="zeitintervall in zeitintervalle"
              :key="`${zeitintervall.startUhrzeit}-${zeitintervall.endeUhrzeit}`"
            >
              <td class="text-no-wrap text-center time-col">
                {{ formatDateTime(zeitintervall.startUhrzeit) }} -
                {{ formatDateTime(zeitintervall.endeUhrzeit) }}
              </td>
              <td class="innertable_cell-content" v-for="fahrbeziehung in fahrbeziehungen" :key="getFahrbeziehungKey(fahrbeziehung)">
                {{ getVehicleValue(type, zeitintervall, getFahrbeziehungKey(fahrbeziehung)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import type {
  DrilldownDTO,
  FahrbeziehungKeyDTO,
  FahrbeziehungWerteDTO,
  ZeitintervallRowDTO,
} from "@/types/zaehlung/zaehldaten/DrillDownDTO";

interface Props {
  drillDownData: DrilldownDTO;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: "100%",
});

const vehicleTypes = [
  { key: "pkw", title: "Pkw" },
  { key: "lkw", title: "Lkw" },
  { key: "lastzuege", title: "Lz" },
  { key: "busse", title: "Bus" },
  { key: "kraftraeder", title: "Krad" },
  { key: "fahrradfahrer", title: "Rad" },
  { key: "fussgaenger", title: "Fuß" },
] as const;

const activeTab = ref(vehicleTypes[0].key);

const zeitintervalle = computed(() =>
  [...(props.drillDownData.zeitintervalle ?? [])].sort((a, b) =>
    a.startUhrzeit.localeCompare(b.startUhrzeit)
  )
);

const fahrbeziehungen = computed(() =>
  [...(props.drillDownData.fahrbeziehungen ?? [])].sort((a, b) =>
    a.von !== b.von ? a.von - b.von : a.nach - b.nach
  ).filter(f => hasNonZeroValues(getFahrbeziehungKey(f)))
);

function hasNonZeroValues(key: string): boolean {
  return zeitintervalle.value.some(z =>
    vehicleTypes.some(t => (z.wertByFahrbeziehung?.[key]?.[t.key as keyof FahrbeziehungWerteDTO] ?? 0) !== 0)
  );
}

function getFahrbeziehungKey(fahrbeziehung: FahrbeziehungKeyDTO): string {
  return `${fahrbeziehung.von}→${fahrbeziehung.nach}`;
}

function getVehicleValue(
  vehicleType: { key: string },
  zeitintervall: ZeitintervallRowDTO,
  fahrbeziehungKey: string,
): number {
  return zeitintervall.wertByFahrbeziehung?.[fahrbeziehungKey]?.[vehicleType.key as keyof FahrbeziehungWerteDTO] ?? 0;
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<style scoped>

/* Make the tabs bar stick to the top */
:deep(.v-tabs) {
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgb(var(--v-theme-surface));
}

:deep(.v-tabs-window),
:deep(.v-tabs-window-item) {
  overflow: visible !important;
}

.drilldown-table-wrapper {
  overflow: auto;
  height: 100%;   /* <-- height, not just max-height */
  width: 100%;
}

.drilldown-table {
  border-collapse: collapse;
  width: 100%;
  min-width: max-content;
}

.drilldown-table th,
.drilldown-table td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 6px 10px;
  vertical-align: top;
}

.drilldown-table thead th,
.drilldown-table tfoot th,
.drilldown-table tfoot td {
  background: white;
  font-weight: 600;
}

.drilldown-table__sticky {
  overflow: auto;
  position: sticky;
  top: var(--tabs-height, 48px); /* Vuetify default tab height is 48px */
  z-index: 1;
  background: rgb(var(--v-theme-surface))
}

.drilldown-table__cell {
  min-width: 10rem;
}

.drilldown-table__cell-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  white-space: nowrap;
}

.time-col {
  width: 10rem;
  min-width: 8rem;
}

.innertable {
  margin: 0 auto;
}

.innertable td {
  border: none;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  padding: 2px 4px;
}

.innertable td:last-child {
  border-right: none;
}

.innertable_cell-content {
  text-align: center;
}
</style>