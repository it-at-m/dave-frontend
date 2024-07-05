// Composables
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ZaehlstelleView from "@/views/ZaehlstelleView.vue";
import MessstelleView from "@/views/MessstelleView.vue";
import AuswertungView from "@/views/AuswertungView.vue";

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
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 };
  },
  routes,
});

export default router;
