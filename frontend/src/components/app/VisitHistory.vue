<template>

    <v-tooltip location="bottom">
      <template #activator="{ props }">
        <v-btn
            id="menu-activator"
            v-bind="props"
            icon="mdi-history"
            :disabled="!isHistory"
        >
        </v-btn>
      </template>
      Historie
    </v-tooltip>

  <v-menu activator="#menu-activator" location="bottom center">
    <v-list density="compact">
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          two-line
          :prepend-icon="item.icon"
          :title="getTitle(item)"
          :subtitle="getSubTitle(item)"
          @click="selectItem(item)"
      >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MessstelleHistoryItem from "@/types/history/MessstelleHistoryItem";
import { useRouter } from "vue-router";
import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";
import ZaehlstelleHistoryItem from "@/types/history/ZaehlstelleHistoryItem";
import { useDateUtils } from "@/util/DateUtils";
import _ from "lodash";
import { useHistoryStore } from "@/store/history";
import { useMessstelleStore } from "@/store/messstelle";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useZaehlstelleStore } from "@/store/zaehlstelle";

const zaehlstelleStore = useZaehlstelleStore();
const messstelleStore = useMessstelleStore();
const historyStore = useHistoryStore();
const router = useRouter();
const dateUtils = useDateUtils();

const items = computed<Array<AbstractHistoryItem>>(() => {
    return historyStore.historyItems;
});

const isHistory = computed<boolean>(() => {
    return items.value.length > 0;
});

function isMessstelleHistoryItem(item: AbstractHistoryItem) {
    return item instanceof MessstelleHistoryItem;
}
function isZaehlstelleHistoryItem(item: AbstractHistoryItem) {
    return item instanceof ZaehlstelleHistoryItem;
}

function selectItem(item: AbstractHistoryItem): void {
    if (isMessstelleHistoryItem(item)) {
        const historyItem: MessstelleHistoryItem =
            item as MessstelleHistoryItem;
        messstelleStore.setFilteroptionsHistory(
            _.cloneDeep(
                historyItem.optionsEinstellungen ??
                    DefaultObjectCreator.createDefaultMessstelleOptions()
            )
        );
        router.push(`/messstelle/${historyItem.id}`);
    }
    if (isZaehlstelleHistoryItem(item)) {
        const historyItem: ZaehlstelleHistoryItem =
            item as ZaehlstelleHistoryItem;
        zaehlstelleStore.setFilteroptionsHistory(
            _.cloneDeep(
                historyItem.optionsEinstellungen ??
                    DefaultObjectCreator.createDefaultZaehlstelleOptionsDto()
            )
        );
        router.push(
            `/zaehlstelle/${historyItem.zaehlstelleId}/${historyItem.zaehlungId}`
        );
    }
}

function getTitle(item: AbstractHistoryItem): string {
    let title = "";
    if (isMessstelleHistoryItem(item)) {
        const messstelleHistoryItem = item as MessstelleHistoryItem;
        title = `${messstelleHistoryItem.mstId} (${dateUtils.getTimeOfDate(
            messstelleHistoryItem.viewtime
        )})`;
    }
    if (isZaehlstelleHistoryItem(item)) {
        const zaehlstelleHistoryItem = item as ZaehlstelleHistoryItem;
        title = `${
            zaehlstelleHistoryItem.zaehlstelleNr
        } (${dateUtils.getTimeOfDate(zaehlstelleHistoryItem.viewtime)})`;
    }
    return title;
}

function getSubTitle(item: AbstractHistoryItem): string {
    let subTitle = "";
    if (isMessstelleHistoryItem(item)) {
        const standortMs = (item as MessstelleHistoryItem).standortMs;
        if (standortMs != null) {
            subTitle = `${standortMs}`;
        }
    }
    if (isZaehlstelleHistoryItem(item)) {
        const zaehlstelleHistoryItem = item as ZaehlstelleHistoryItem;
        subTitle = `${dateUtils.getShortVersionOfDate(
            zaehlstelleHistoryItem.zaehlungDatum
        )} ${zaehlstelleHistoryItem.zaehlungProjektName}`;
    }
    return subTitle;
}
</script>