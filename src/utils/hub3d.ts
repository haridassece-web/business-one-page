/**
 * Utility to resolve accurate paths for the embedded 3D Tech Hub.
 * Handles root domains, custom domains, and GitHub Pages subpaths (/business-one-page/).
 * Crucial: Always preserves trailing slash (/3d-hub/) to ensure relative asset
 * resolution (./assets/...) resolves inside /3d-hub/assets/ on both Vercel and GitHub Pages.
 */
export function get3DHubUrl(theme: "cyber" | "light" = "cyber", embed: boolean = true): string {
  const query = embed ? `?embed=true&theme=${theme}` : `?theme=${theme}`;

  if (typeof window === "undefined") {
    return `./3d-hub/${query}`;
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

  return `${baseDir}3d-hub/${query}`;
}

export function get3DHubStandaloneUrl(theme: "cyber" | "light" = "cyber"): string {
  return get3DHubUrl(theme, false);
}


