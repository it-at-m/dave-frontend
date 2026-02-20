import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEventbus = defineStore("eventbus", () => {
  // ref()s become state properties
  const reloadEvent = ref<boolean>(false);
  // computed()s become getters
  const getReloadEvent = computed(() => reloadEvent.value);
  // function()s become actions
  function setReloadEvent() {
    reloadEvent.value = !reloadEvent.value;
  }

  // Temporaer zur Validierung hinzugefuegt. Muss wieder entfernt werden, sobald die
  // neuen Zaehlarten an der Zaehlung gespeichert werden.
  const selectedKnotenarme = ref<Array<string>>([]);
  const getSelectedKnotenarme = computed(() => selectedKnotenarme.value);
  function activateKnotenarm(knotenarm: string) {
    if (!selectedKnotenarme.value.includes(knotenarm)) {
      selectedKnotenarme.value.push(knotenarm);
    } else {
      deactivateKnotenarm(knotenarm);
    }
  }
  function deactivateKnotenarm(knotenarm: string) {
    const indexOfSelectedKnotenarmToDelete =
      selectedKnotenarme.value.indexOf(knotenarm);
    selectedKnotenarme.value.splice(indexOfSelectedKnotenarmToDelete, 1);
  }
  function resetSelectedKnotenarme() {
    selectedKnotenarme.value = [];
  }

  return {
    getReloadEvent,
    setReloadEvent,
    // Wieder entfernen
    getSelectedKnotenarme,
    activateKnotenarm,
    deactivateKnotenarm,
    resetSelectedKnotenarme,
  };
});
