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
        <v-list dense>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                two-line
                @click="selectItem(item)"
            >
                <v-list-item-icon class="mr-1 mt-4">
                    <v-icon large>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ getTitle(item) }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >{{ getSubTitle(item) }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import { useStore } from "@/api/util/useStore";
import { computed, ComputedRef } from "vue";
import MessstelleHistoryItem from "@/types/app/MessstelleHistoryItem";
import { useRouter } from "vue-router/composables";
import AbstractHistoryItem from "@/types/app/AbstractHistoryItem";
import ZaehlstelleHistoryItem from "@/types/app/ZaehlstelleHistoryItem";
import { useDateUtils } from "@/util/DateUtils";
import _ from "lodash";

const store = useStore();
const router = useRouter();
const dateUtils = useDateUtils();

const items: ComputedRef<Array<AbstractHistoryItem>> = computed(() => {
    return store.getters["history/getHistoryItems"];
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
        const historyItem: MessstelleHistoryItem =
            item as MessstelleHistoryItem;
        store.commit(
            "filteroptionsMessstelle/setFilteroptionsHistory",
            _.cloneDeep(historyItem.optionsEinstellungen)
        );
        router.push(`/messstelle/${historyItem.id}`);
    }
    if (isZaehlstelleHistoryItem(item)) {
        const historyItem: ZaehlstelleHistoryItem =
            item as ZaehlstelleHistoryItem;
        store.dispatch(
            "setFilteroptionsHistory",
            // Object.assign({}, historyItem.optionsEinstellungen)
            _.cloneDeep(historyItem.optionsEinstellungen)
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