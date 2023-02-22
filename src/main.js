import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";


import store from "./store";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

const appInstance = createApp(App);
appInstance.component("font-awesome-icon", FontAwesomeIcon);
appInstance.use(store);
appInstance.use(router);
appInstance.mount("#app");
appInstance.use(Loading);

appInstance.mixin({
    methods: {
        LoaderSpinnerShow: function() {
            this.$options.loader = this.$loading.show({ color: '#0055ff', container: null });
        },
        LoaderSpinnerHide: function() {

            this.$options.loader.hide();
        }
    }
});