import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Red de seguridad: enlaces que apuntan a la ruta de Firestore (sites/{tenant}/...)
  // no son rutas web. Los redirigimos a la sección correcta en vez de un 404.
  async redirects() {
    return [
      { source: '/sites/:tenant/machinery', destination: '/#maquinaria', permanent: false },
      { source: '/sites/:path*', destination: '/', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Imágenes subidas a Firebase Storage.
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
