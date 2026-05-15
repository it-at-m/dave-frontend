<template>
  <v-sheet
    width="100%"
    :height="height"
    :min-height="minheight"
    color="transparent"
    class="pa-4"
  >
    <div class="d-flex align-start justify-space-between">
      <div class="info-content">
        <span class="text-caption">Zählstelle</span><br />
        <span class="text-h5">{{ nummer }}</span
        ><br /><br />
        <div class="text-caption text-truncate">{{ kreuzungsname }}</div>
        <span class="text-caption"
          >Stadtbezirk {{ stadtbezirkNummer }}, {{ stadtbezirk }}</span
        >
      </div>
      <div class="preview-placeholder">
        <div class="preview-image">
        <template v-if="previewImageUrl">
          <img
            :src="previewImageUrl"
            alt="Zählstelle Vorschau"
            class="preview-img"
          />
        </template>
        <template v-else>
          <span class="preview-text">Kein Bild</span>
        </template>
      </div>
    </div>
  </div>
</v-sheet>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import ZaehlstellenImageService from "@/api/service/ZaehlstellenImageService";

/**
 * Basisinformationen zur Zählstelle
 */
interface Props {
  height: string;
  minheight: string;
  nummer?: string;
  kreuzungsname?: string;
  stadtbezirkNummer?: string;
  stadtbezirk?: string;
  zaehlstelleUuid?: string;
}

const props = withDefaults(defineProps<Props>(), {
  nummer: "",
  kreuzungsname: "",
  stadtbezirkNummer: "",
  stadtbezirk: "",
  zaehlstelleUuid: "",
});

const previewImageUrl = ref<string>("");
let currentObjectUrl: string | null = null;

const revokePreviewUrl = (): void => {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
  previewImageUrl.value = "";
};

const loadPreviewImage = (): void => {
  const imageId = props.zaehlstelleUuid?.trim() ?? "";
  if (!imageId) {
    revokePreviewUrl();
    return;
  }

  ZaehlstellenImageService.getByZaehlstelleIdAsFile(imageId)
    .then((blob) => {
      if (blob && blob.size > 0) {
        revokePreviewUrl();
        currentObjectUrl = URL.createObjectURL(blob);
        previewImageUrl.value = currentObjectUrl;
      } else {
        revokePreviewUrl();
      }
    })
    .catch(() => {
      revokePreviewUrl();
    });
};

onMounted(loadPreviewImage);
watch(() => props.zaehlstelleUuid, loadPreviewImage);
onBeforeUnmount(revokePreviewUrl);
</script>

<style scoped>
.info-content {
  flex: 1 1 auto;
  min-width: 0;
}
.preview-placeholder {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}
.preview-image {
  width: 190px;
  height: 122px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.85rem;
  font-weight: 500;
  overflow: hidden;
}
.preview-image img.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.preview-text {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
