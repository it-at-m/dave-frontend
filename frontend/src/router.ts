import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import ZaehlstelleView from "@/views/ZaehlstelleView.vue";
import MessstelleView from "@/views/testView.vue";

Vue.use(Router);

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 * */
/* eslint-disable @typescript-eslint/no-explicit-any */
const routerMethods = ["push", "replace"];
routerMethods.forEach((method: string) => {
    const originalCall = (Router.prototype as any)[method];
    (Router.prototype as any)[method] = function (
        location: any,
        onResolve: any,
        onReject: any
    ): Promise<any> {
        if (onResolve || onReject) {
            return originalCall.call(this, location, onResolve, onReject);
        }
        return originalCall.call(this, location).catch((err: any) => err);
    };
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export default new Router({
    base: import.meta.env.BASE_URL,
    routes: [
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
            path: "/pdfreport",
            name: "pdfreport",
            component: () =>
                import(
                    /* webpackChunkName: "pdfReportView"  */ "@/views/PdfReportView.vue"
                ),
        },
        { path: "*", redirect: "/" }, //Fallback 2
    ],
});
