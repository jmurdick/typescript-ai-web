import Vue from "vue";
import Router, { Route } from "vue-router";
import { Component } from "vue-router/types/router";

const LandingPage = () => import("@src/apps/LandingPage.vue");
const PageNotFound = () => import("@src/components/PageNotFound.vue");

Vue.use(Router);

const rtr = new Router({
    routes: [
        {
            path: "/",
            name: "Default",
            component: LandingPage,
        },
        { path: "/404", component: PageNotFound },
        { path: "*", redirect: "/404" },
    ],
});
rtr.onReady(() => {
    rtr.beforeResolve((to: Route, from: Route, next: any) => {

        // This code *may* be needed for dynamic forms
        const matched: Component[] = rtr.getMatchedComponents(to);
        const prevMatched: Component[] = rtr.getMatchedComponents(from);
        let diffed: boolean = false;

        const activated: Component[] = matched.filter((component: Component, i: number) => {
            return diffed || (diffed = (prevMatched[i] !== component));
        });

        if (!activated.length) {
            return next();
        }

        Promise
            .all(activated.map((component: Component) => {

                if ((component as any).prefetch) {
                    return (component as any).prefetch({ route: to });
                }

                return Promise.resolve();
            }))
            .then(() => {
                next();
            })
            .catch(next);
    });
});
export default rtr;
