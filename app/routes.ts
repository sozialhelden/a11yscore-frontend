import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("health", "./routes/health.tsx"),
  layout("./layouts/default.tsx", [
    index("routes/home.tsx"),
    route("score/:adminAreaId", "./routes/score/index.tsx"),

    layout("./layouts/faq.tsx", [
      ...prefix("faqs", [
        route("/what-is-a11y-score", "./routes/faqs/what.tsx"),
        route("/how-is-it-calculated", "./routes/faqs/calculation.tsx"),
        route("/how-to-interpret-the-score", "./routes/faqs/score.tsx"),
        route("/what-data-is-being-used", "./routes/faqs/data.tsx"),
        route("/how-to-contribute", "./routes/faqs/contribute.tsx"),
        route("/give-feedback", "./routes/faqs/feedback.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
