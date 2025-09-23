import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("health", "./routes/health.tsx"),
  layout("./layouts/default.tsx", [
    index("routes/home.tsx"),
    route("score/:adminAreaId", "./routes/score/index.tsx"),
  ]),
] satisfies RouteConfig;
