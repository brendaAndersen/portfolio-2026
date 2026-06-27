import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHandHoldingHeart, faCode, faHeart, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

library.add(faHandHoldingHeart, faCode, faHeart, faAnglesRight)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon as any)

app.use(router)
app.mount('#app')
