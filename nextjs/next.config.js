/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bit.ly',
          port: '',
          pathname: '/placeholder-img',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '54321',
          pathname: '/storage/**',
        },
        {
          protocol: 'https',
          hostname: 'aeoqsmyjxtzvkbvuhfaw.supabase.co',
          port: '',
          pathname: '/storage/**',
        },
      ],
    }
  }

module.exports = nextConfig;


