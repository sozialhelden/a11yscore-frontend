import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/default.tsx", [
    index("routes/home.tsx"),
    route("score/:region", "./routes/score.tsx"),
  ]),
] satisfies RouteConfig;
