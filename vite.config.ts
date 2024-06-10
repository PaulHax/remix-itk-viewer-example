import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    // collect lazy loaded JavaScript and Wasm bundles
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@itk-viewer/blosc-zarr/emscripten-build/*",
          dest: "pipelines",
        },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ["@itk-viewer/io"],
    include: ["@itk-viewer/io > p-queue"],
  },
});
