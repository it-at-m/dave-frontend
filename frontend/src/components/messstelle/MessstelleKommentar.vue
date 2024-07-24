<template>
    <span v-if="kommentar">
        <v-btn
            color="secondary"
            icon="mdi-comment-text"
            size="small"
            height="20px"
            class="ml-n2"
            variant="text"
            v-tooltip:bottom="'Kommentar anzeigen'"
            @click="showDialog = true"
        />
        <v-dialog
            v-model="showDialog"
            max-width="600px"
        >
            <v-card class="rounded-0">
                <v-card-title class="text-h5 grey-lighten-2">
                    <v-icon left>mdi-comment-multiple</v-icon>
                    Informationen
                </v-card-title>
                <br />
                <v-card-text> {{ kommentar }} </v-card-text>
            </v-card>

            <v-footer>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey-lighten-1"
                    @click="showDialog = false"
                >
                    Schließen
                </v-btn>
                <v-spacer></v-spacer>
            </v-footer>
        </v-dialog>
    </span>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
    kommentar?: string;
}

defineProps<Props>();

const showDialog = ref(false);
</script>

