import * as simpleIcons from "simple-icons";

type IconKey = keyof typeof simpleIcons;

// Maps a skill label (as it appears in content.ts) to a simple-icons export key.
// Labels with no known/trademark-safe icon are intentionally omitted; they
// just render as plain text badges.
const skillIconMap: Record<string, IconKey> = {
  TypeScript: "siTypescript",
  JavaScript: "siJavascript",
  "Node.js": "siNodedotjs",
  Express: "siExpress",
  NestJS: "siNestjs",
  React: "siReact",
  "Next.js": "siNextdotjs",
  GraphQL: "siGraphql",
  tRPC: "siTrpc",
  PHP: "siPhp",
  Python: "siPython",
  HTML: "siHtml5",
  CSS: "siCss",
  "Tailwind CSS": "siTailwindcss",
  Bootstrap: "siBootstrap",
  "Chakra UI": "siChakraui",
  Zod: "siZod",
  "Apollo Client": "siApollographql",
  "React Hook Form": "siReacthookform",
  Storybook: "siStorybook",
  PostgreSQL: "siPostgresql",
  MySQL: "siMysql",
  MongoDB: "siMongodb",
  "Prisma ORM": "siPrisma",
  "Sequelize ORM": "siSequelize",
  Redis: "siRedis",
  RabbitMQ: "siRabbitmq",
  Docker: "siDocker",
  Serverless: "siServerless",
  Turborepo: "siTurborepo",
  Temporal: "siTemporal",
  Jest: "siJest",
  Cypress: "siCypress",
  Datadog: "siDatadog",
  Sentry: "siSentry",
  Metabase: "siMetabase",
  Snowflake: "siSnowflake",
  "Claude Code": "siClaudecode",
  Cursor: "siCursor",
};

export function getSkillIconPath(label: string): string | null {
  const key = skillIconMap[label];
  if (!key) return null;
  const icon = simpleIcons[key] as { path: string } | undefined;
  return icon?.path ?? null;
}
