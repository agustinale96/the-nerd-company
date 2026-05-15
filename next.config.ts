import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old service slugs → new solution slugs
      { source: "/servicios/llm-custom",       destination: "/solutions/chatbots",      permanent: true },
      { source: "/servicios/agentes-ia",        destination: "/solutions/automation",    permanent: true },
      { source: "/servicios/machine-learning",  destination: "/solutions/retention",     permanent: true },
      { source: "/servicios/deep-learning",     destination: "/solutions/data-analytics",permanent: true },
      { source: "/servicios/end-to-end",        destination: "/solutions",               permanent: true },
      { source: "/servicios",                   destination: "/solutions",               permanent: true },
      // Old page routes
      { source: "/quienes-somos",               destination: "/about",                   permanent: true },
      { source: "/contacto",                    destination: "/contact",                  permanent: true },
    ];
  },
};

export default nextConfig;
