export const providers = [
  {
    id: 1,
    name: 'DigitalOcean',
    description: 'Simple, reliable cloud VPS hosting',
    features: ['SSD Storage', '99.99% Uptime SLA', '24/7 Support'],
    pricing: 'Starting at $5/month',
    rating: 4.7,
    region: 'US',
    type: 'VPS',
    url: 'https://www.digitalocean.com/',
    discount: {
      code: 'DO25',
      percentage: 25,
      description: 'Get $100 credit over 60 days'
    }
  },
  {
    id: 2,
    name: 'Vultr',
    description: 'High performance cloud servers',
    features: ['NVMe Storage', 'DDoS Protection', '24/7 Support'],
    pricing: 'Starting at $2.50/month',
    rating: 4.5,
    region: 'Global',
    type: 'VPS',
    url: 'https://www.vultr.com/',
    discount: {
      code: 'VULTR100',
      percentage: 100,
      description: 'Get $100 free credit'
    }
  },
  {
    id: 3,
    name: 'Linode',
    description: 'High performance cloud computing',
    features: ['NVMe Storage', '99.99% Uptime SLA', '24/7 Support'],
    pricing: 'Starting at $5/month',
    rating: 4.6,
    region: 'Global',
    type: 'VPS',
    url: 'https://www.linode.com/',
    discount: {
      code: 'LINODE60',
      percentage: 60,
      description: 'Get $60 free credit'
    }
  }
];
