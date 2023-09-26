<template>
    <v-sheet width="100%">
        <v-row no-gutters>
            <v-col>
                <v-img
                    :src="image"
                    :width="width"
                    max-width="100%"
                    max-height="200px"
                ></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <span class="text-caption grey--text text--lighten-1">{{
                    caption
                }}</span>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImageAsset extends Vue {
    @Prop() caption?: string;
    @Prop() image?: string;
    @Prop({ default: "100%" }) width?: string;
}
</script>
