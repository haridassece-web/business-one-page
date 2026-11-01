/**
 * Utility to resolve accurate paths for the embedded 3D Tech Hub.
 * Handles root domains, GitHub Pages subpaths (/business-one-page/),
 * and avoids broken relative resolution when URLs lack trailing slashes.
 */
export function get3DHubUrl(theme: "cyber" | "light" = "cyber", embed: boolean = true): string {
  const query = embed ? `?embed=true&theme=${theme}` : `?theme=${theme}`;

  if (typeof window === "undefined") {
    return `./3d-hub/index.html${query}`;
  }

  const path = window.location.pathname || "/";

  let baseDir = "/";
  if (path && path !== "/") {
    if (path.endsWith("/")) {
      baseDir = path;
    } else if (/\.[a-zA-Z0-9]+$/.test(path)) {
      baseDir = path.substring(0, path.lastIndexOf("/") + 1);
    } else {
      baseDir = `${path}/`;
    }
  }

  return `${baseDir}3d-hub/index.html${query}`;
}

export function get3DHubStandaloneUrl(theme: "cyber" | "light" = "cyber"): string {
  return get3DHubUrl(theme, false);
}

