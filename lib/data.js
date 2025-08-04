export const providers = [
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    description: '高性能云服务器，开发者首选的VPS提供商',
    rating: 4.8,
    reviews: 1245,
    price: 49,
    cpu: '2 vCPU',
    ram: '2 GB',
    storage: '80 GB SSD',
    bandwidth: '2 TB',
    locations: 12,
    features: ['Droplets', 'Kubernetes', 'App Platform', 'Managed Databases', 'Spaces'],
    website: 'https://www.digitalocean.com/',
    regions: ['美国', '欧洲', '亚洲'],
    type: '云服务器',
    discount: '新用户首月免费'
  },
  {
    id: 'linode',
    name: 'Linode',
    description: '可靠的云主机服务，提供强大的API和开发者工具',
    rating: 4.7,
    reviews: 982,
    price: 52,
    cpu: '2 vCPU',
    ram: '2 GB',
    storage: '80 GB SSD',
    bandwidth: '3 TB',
    locations: 11,
    features: ['Compute Engine', 'Kubernetes', 'Object Storage', 'Managed Databases', 'Balancers'],
    website: 'https://www.linode.com/',
    regions: ['美国', '欧洲', '亚洲'],
    type: '云服务器',
    discount: '新用户100美元免费额度'
  },
  {
    id: 'vultr',
    name: 'Vultr',
    description: '全球覆盖的云主机服务，价格实惠',
    rating: 4.5,
    reviews: 876,
    price: 45,
    cpu: '2 vCPU',
    ram: '2 GB',
    storage: '55 GB SSD',
    bandwidth: '1.5 TB',
    locations: 25,
    features: ['Compute Instances', 'Kubernetes', 'Object Storage', 'Managed Databases', 'Load Balancers'],
    website: 'https://www.vultr.com/',
    regions: ['全球', '欧洲', '亚洲'],
    type: '云服务器',
    discount: '新用户免费100美元'
  },
  {
    id: 'aws',
    name: 'Amazon AWS',
    description: '全球最大的云服务提供商，服务全面',
    rating: 4.6,
    reviews: 1523,
    price: 58,
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '100 GB SSD',
    bandwidth: '1 TB',
    locations: 32,
    features: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS'],
    website: 'https://aws.amazon.com/',
    regions: ['全球', '欧洲', '亚洲'],
    type: '云服务器',
    discount: '新用户免费套餐'
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    description: '德国老牌主机商，性价比极高',
    rating: 4.9,
    reviews: 643,
    price: 38,
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '80 GB SSD',
    bandwidth: '20 TB',
    locations: 3,
    features: ['Cloud Servers', 'Load Balancers', 'Managed Databases', 'Object Storage', 'Kubernetes'],
    website: 'https://www.hetzner.com/',
    regions: ['欧洲', '亚洲'],
    type: '云服务器',
    discount: '新用户首月5折优惠'
  },
  {
    id: 'ramnode',
    name: 'RamNode',
    description: '专注于KVM虚拟化的VPS提供商',
    rating: 4.4,
    reviews: 521,
    price: 25,
    cpu: '1 vCPU',
    ram: '1 GB',
    storage: '25 GB SSD',
    bandwidth: '1 TB',
    locations: 5,
    features: ['KVM Virtualization', 'IPv4 & IPv6', 'Free SSL', 'DDoS Protection', 'Backup Service'],
    website: 'https://www.ramnode.com/',
    regions: ['美国', '欧洲'],
    type: '传统VPS',
    discount: '新用户首月免费'
  }
];

export const blogPosts = [
  {
    id: 'best-vps-for-wordpress',
    title: '2023年最适合WordPress的VPS推荐',
    excerpt: 'WordPress网站需要特定的服务器配置才能获得最佳性能。我们测试了多家VPS提供商，为您推荐最适合WordPress的VPS方案。',
    category: 'WordPress',
    date: '2023-08-15',
    author: '张明',
    readTime: '5分钟',
    slug: 'best-vps-for-wordpress'
  },
  {
    id: 'vps-vs-cloud-hosting',
    title: 'VPS与云主机：哪种更适合您的需求？',
    excerpt: 'VPS和云主机是两种常见的托管解决方案，但它们之间有显著差异。本文将帮助您了解两者的区别，并选择最适合您需求的方案。',
    category: '技术对比',
    date: '2023-07-28',
    author: '李华',
    readTime: '8分钟',
    slug: 'vps-vs-cloud-hosting'
  },
  {
    id: 'how-to-choose-vps-provider',
    title: '如何选择合适的VPS提供商：完整指南',
    excerpt: '选择VPS提供商时需要考虑多个因素，包括性能、价格、支持服务等。本指南将帮助您做出明智的选择。',
    category: '选择指南',
    date: '2023-07-10',
    author: '王芳',
    readTime: '10分钟',
    slug: 'how-to-choose-vps-provider'
  }
];

export const discounts = [
  {
    id: 'do-free-trial',
    title: 'DigitalOcean 新用户首月免费',
    description: '新用户注册DigitalOcean可享受首月免费使用，无需信用卡。',
    provider: 'DigitalOcean',
    discount: '首月免费',
    expires: '2023-12-31',
    link: 'https://www.digitalocean.com/',
    code: ''
  },
  {
    id: 'linode-100-credit',
    title: 'Linode 新用户100美元免费额度',
    description: '新用户注册Linode可获得100美元免费额度，可用于60天内消费。',
    provider: 'Linode',
    discount: '100美元',
    expires: '2023-12-31',
    link: 'https://www.linode.com/',
    code: 'LINODE100'
  },
  {
    id: 'vultr-free-100',
    title: 'Vultr 新用户100美元免费额度',
    description: '新用户注册Vultr可获得100美元免费额度，可用于30天内消费。',
    provider: 'Vultr',
    discount: '100美元',
    expires: '2023-12-31',
    link: 'https://www.vultr.com/',
    code: 'FREE100'
  }
];

