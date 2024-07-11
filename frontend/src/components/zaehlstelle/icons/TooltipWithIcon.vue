<template>
    <v-tooltip bottom>
        <template #activator="{ on, attrs }">
            <v-icon
                :small="small"
                :large="large"
                :x-large="xLarge"
                :dense="dense"
                class="mr-1"
                :color="color"
                v-bind="attrs"
                v-on="on"
                >{{ icon }}
            </v-icon>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TooltipWithIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) large?: boolean;
    @Prop({ default: false }) xLarge?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() icon?: string;
    @Prop() tooltip?: string;
}
</script>