// Composables
import {createRouter, createWebHistory} from "vue-router";
import Main from "@/views/Main.vue";
import ZaehlstelleView from "@/views/ZaehlstelleView.vue";
import MessstelleView from "@/views/MessstelleView.vue";
import AuswertungView from "@/views/AuswertungView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Main,
  },
  {
    path: "/zaehlstelle/:zaehlstelleId/:zaehlungId?",
    name: "zaehlstelle",
    component: ZaehlstelleView,
  },
  {
    path: "/messstelle/:messstelleId",
    name: "messstelle",
    component: MessstelleView,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
