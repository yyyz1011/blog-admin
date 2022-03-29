import {createApp} from "vue";
import App from "./App.vue";
import router from "./routers";
import "@/assets/css/common.scss";
import "element-plus/dist/index.css";
import "@/assets/css/el-reset.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
