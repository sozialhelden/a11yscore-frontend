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

    route("/scores/:adminArea", "./routes/score/index.tsx", [
      index("./routes/score/empty-state.tsx"),
      route(
        "/scores/:adminArea/:topLevelCategory",
        "./routes/score/top-level-category.tsx",
        [
          route(
            "/scores/:adminArea/:topLevelCategory/:subCategory",
            "./routes/score/sub-category.tsx",
            [
              route(
                "/scores/:adminArea/:topLevelCategory/:subCategory/:criterion",
                "./routes/score/criterion.tsx",
              ),
            ],
          ),
        ],
      ),
    ]),

    route("/pages/:slug", "./routes/pages/index.tsx", { id: "pages" }),
    layout("./layouts/faq.tsx", [
      route("/faqs/:slug", "./routes/faqs/index.tsx", { id: "faqs" }),
      route("/faqs/what-data-is-being-used", "./routes/faqs/data.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
