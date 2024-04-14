import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@api": ["./app/api/index.ts"],
    "@api/*": ["./app/api/*"],
    "@assets": ["./app/assets/index.ts"],
    "@assets/*": ["./app/assets/*"],
    "@components": ["./app/components/index.ts"],
    "@components/*": ["./app/components/*"],
    "@hooks": ["./app/hooks/index.ts"],
    "@hooks/*": ["./app/hooks/*"],
    "@store": ["./app/store/index.ts"],
    "@store/*": ["./app/store/*"],
    "@styles": ["./app/styles/index.ts"],
    "@styles/*": ["./app/styles/*"],
    "@utils": ["./app/utils/index.ts"],
    "@utils/*": ["./app/utils/*"],
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
