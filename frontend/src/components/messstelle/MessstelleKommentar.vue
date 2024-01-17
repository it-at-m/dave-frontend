<template>
    <div>
        <v-tooltip bottom>
            <template #activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    color="secondary"
                    icon
                    v-on="on"
                    @click="showDialog = true"
                >
                    <v-icon>mdi-message-text</v-icon>
                </v-btn>
            </template>
            <span>Kommentar anzeigen</span>
        </v-tooltip>
        <v-dialog
            v-model="showDialog"
            max-width="600px"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    <v-icon left>mdi-comment-multiple</v-icon>
                    Informationen
                </v-card-title>
                <br />
                <v-card-text> testkommentar{{ kommentar }} </v-card-text>
            </v-card>

            <v-footer>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-1"
                    @click="showDialog = false"
                >
                    Schließen
                </v-btn>
                <v-spacer></v-spacer>
            </v-footer>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
    kommentar: string;
}

defineProps<Props>();

const showDialog = ref(false);
</script>

