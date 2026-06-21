import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "کاتەکانی بانگ",
    short_name: "بانگ",
    description: "کاتەکانی بانگ و زیکرەکان بە زمانی کوردی",
    version: "1.0.0",
    permissions: ["alarms", "notifications", "storage"],
    action: {
      default_title: "کاتەکانی بانگ",
    },
  },
});
