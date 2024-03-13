<template>
    <v-menu offset-y>
        <template #activator="{ on: dialog }">
            <v-tooltip bottom>
                <template #activator="{ on: tooltip }">
                    <v-btn
                        icon
                        small
                        :disabled="!isHistory"
                        class="ml-2"
                        v-on="{ ...tooltip, ...dialog }"
                    >
                        <v-icon>mdi-history</v-icon>
                    </v-btn>
                </template>
                Historie
            </v-tooltip>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                two-line
                @click="selectItem(item)"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ getTitle(item) }}</v-list-item-title>
                    <v-list-item-subtitle
                        >{{ getSubTitle(item) }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import { useStore } from "@/api/util/useStore";
import { computed, ComputedRef } from "vue";
import MessstelleHistoryItem from "@/types/app/MessstelleHistoryItem";
import { useRouter } from "vue-router/composables";
import AbstractHistoryItem from "@/types/app/AbstractHistoryItem";
import ZaehlstelleHistoryItem from "@/types/app/ZaehlstelleHistoryItem";
import { useDateUtils } from "@/util/DateUtils";
/* eslint-enable no-unused-vars */

const store = useStore();
const router = useRouter();
const dateUtils = useDateUtils();

const items: ComputedRef<Array<AbstractHistoryItem>> = computed(() => {
    return store.getters["historyNew/getHistoryItems"];
});

const isHistory: ComputedRef<boolean> = computed(() => {
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
        router.push(`/messstelle/${(item as MessstelleHistoryItem).id}`);
    }
    if (isZaehlstelleHistoryItem(item)) {
        router.push(
            `/zaehlstelle/${(item as ZaehlstelleHistoryItem).zaehlstelleId}/${
                (item as ZaehlstelleHistoryItem).zaehlungId
            }`
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
        subTitle = `${(item as MessstelleHistoryItem).standortMs}`;
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