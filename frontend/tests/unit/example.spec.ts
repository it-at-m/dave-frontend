import { createLocalVue, shallowMount } from "@vue/test-utils";
import { createPinia, Pinia, PiniaVuePlugin } from "pinia";
import Vue from "vue";
import Vuetify from "vuetify";

import TheSnackbar from "@/components/common/TheSnackbar.vue";

const localVue = createLocalVue();

describe("TheSnackbar.vue", () => {
  let vuetify: any;
  let pinia: Pinia;

  beforeAll(() => {
    Vue.use(Vuetify);
    Vue.use(PiniaVuePlugin);
  });

  beforeEach(() => {
    vuetify = new Vuetify();
    pinia = createPinia();
  });

  it("renders props.message when passed", () => {
    const message = "Hello_World";
    const wrapper = shallowMount(TheSnackbar, {
      localVue,
      vuetify,
      pinia,
      propsData: { message: message },
    });
    expect(wrapper.html()).toContain(message);
  });
});
