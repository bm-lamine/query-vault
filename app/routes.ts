import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),

  // Api routes
  route("/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig
