<template>
    <div>
        <v-btn
            color="secondary"
            @click="dialog = true"
        >
            <v-icon left>mdi-filter-outline</v-icon>
            <span class="hidden-lg-and-down"
                >Filtereinstellungen bearbeiten</span
            >
            <span class="hidden-xl-only">Filtereinstellungen</span>
        </v-btn>
        <v-dialog
            v-model="dialog"
            max-width="900px"
            ><v-card
                width="900px"
                flat
            >
                <v-card-title>
                    <v-icon left>mdi-filter-outline</v-icon>
                    Filtereinstellungen
                </v-card-title>
                <v-card-text>
                    <v-sheet
                        class="overflow-y-auto"
                        :max-height="getContentSheetHeight"
                        width="100%"
                    >
                        <v-expansion-panels
                            hover
                            focusable
                        >
                            <zeit-panel
                                :messstelle-id="messstelleId"
                                :chosen-options.sync="chosenOptions"
                            />
                        </v-expansion-panels>
                    </v-sheet>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="saveChosenOptions">test</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, Ref, watch } from "vue";
import ZeitPanel from "@/components/messstelle/ZeitPanel.vue";
import { useVuetify } from "@/util/useVuetify";
import MessungOptionsDTO from "@/types/messung/MessungOptionsDTO";
import { useStore } from "@/api/util/useStore";

interface Props {
    messstelleId: string;
}
defineProps<Props>();

const vuetify = useVuetify();
const store = useStore();
let chosenOptions: Ref<MessungOptionsDTO> = ref({} as MessungOptionsDTO);

const getContentSheetHeight = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "650px";
    }
    return "400px";
});

function saveChosenOptions(): void {
    console.log(JSON.stringify(chosenOptions.value));
    // eslint-disable-next-line no-undef
    store.commit(
        "filteroptionsMessstelle/setFilteroptions",
        Object.assign({}, chosenOptions.value)
    );
}

const dialog = ref(false);
</script>
