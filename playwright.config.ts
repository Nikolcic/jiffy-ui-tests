import { defineConfig } from "@playwright/test"

export default defineConfig({
  timeout: 1000 * 60 * 180,
  retries: 0,
  reporter: [["html", { open: "never" }]],
  testDir: "tests",
  workers: 4,
  reportSlowTests: null,
  use: {
    headless: false,
    viewport: { width: 1500, height: 800 },
    actionTimeout: 1000 * 60,
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  expect: {
    timeout: 1000 * 60,
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
})