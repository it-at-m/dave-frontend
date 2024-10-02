// Composables
import { createRouter, createWebHashHistory } from "vue-router";

import AuswertungView from "@/views/AuswertungView.vue";
import HomeView from "@/views/HomeView.vue";
import MessstelleView from "@/views/MessstelleView.vue";
import ZaehlstelleView from "@/views/ZaehlstelleView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/zaehlstelle/:zaehlstelleId/:zaehlungId?",
    name: "zaehlstelle",
    component: ZaehlstelleView,
    props: true,
  },
  {
    path: "/messstelle/:messstelleId",
    name: "messstelle",
    component: MessstelleView,
    props: true,
  },
  {
    path: "/auswertung",
    name: "auswertung",
    component: AuswertungView,
  },
  {
    path: "/pdfreport",
    name: "pdfreport",
    component: () =>
      import(
        /* webpackChunkName: "pdfReportView"  */ "@/views/PdfReportView.vue"
      ),
  },
  { path: "/:catchAll(.*)*", redirect: "/" }, // CatchAll route
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 };
  },
  routes,
});

export default router;
