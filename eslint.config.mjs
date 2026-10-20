import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript.map(config =>
    config.ignores
      ? config
      : { ...config, files: ["**/*.{ts,tsx,mts,cts}"] },
  ),
];

export default eslintConfig;
