import type { MetaFunction } from "@remix-run/node";
import {redirect} from "@remix-run/router";

export function loader() {
  return redirect("/gallery");
}