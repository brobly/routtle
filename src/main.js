import Vue from 'vue'
import App from './App.vue'
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

Vue.config.productionTip = false

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPenToSquare)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
