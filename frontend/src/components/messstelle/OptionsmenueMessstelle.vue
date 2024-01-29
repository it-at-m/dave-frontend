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
                    <v-sheet class="overflow-y-auto">
                        <v-expansion-panels
                            hover
                            focusable
                        >
                            <zeit-panel :messstelle-id="messstelleId" />
                        </v-expansion-panels>
                    </v-sheet>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ZeitPanel from "@/components/messstelle/ZeitPanel.vue";
interface Props {
    messstelleId: string;
}

defineProps<Props>();
const dialog = ref(false);
</script>
