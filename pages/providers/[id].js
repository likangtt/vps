import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FiStar, FiServer, FiGlobe, FiDollarSign, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { providers } from '../../lib/data';
const ProviderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  if (!id) return null;
  
  const provider = providers.find(p => p.id === id);
  
  if (!provider) {
    return (
      <>
        <Head>
          <title>服务商未找到 - VPS推荐</title>
        </Head>
        <Header />
        <main className="py-16">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">服务商未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您访问的服务商页面不存在。</p>
            <Link href="/providers" className="btn">
              返回服务商列表
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>{provider.name} - VPS主机评测与推荐</title>
        <meta name="description" content={`${provider.name}的详细评测，包括性能、价格、支持服务等信息。了解${provider.name}的优缺点，做出明智选择。`} />
        <meta name="keywords" content={provider.name + ", VPS, 云服务器, 主机评测"} />
        <link rel="canonical" href={`https://vpsrecommendation.com/providers/${provider.id}`} />
        <meta property="og:title" content={`${provider.name} - VPS主机评测与推荐`} />
        <meta property="og:description" content={`${provider.name}的详细评测，包括性能、价格、支持服务等信息。`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://vpsrecommendation.com/providers/${provider.id}`} />
      </Head>
      
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/providers" className="text-gray-500 hover:text-gray-700">
                    VPS服务商
                  </Link>
                </li>
                <li className="text-gray-500">
                  {provider.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Provider Header */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                  <div className="flex items-center mb-4">
                    <div className="rating">
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={i < Math.floor(provider.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">{provider.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">{provider.reviews} 条评价</span>
                  </div>
                  <p className="text-gray-700 mb-6">{provider.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {provider.features.map((feature, index) => (
                      <span key={index} className="badge badge-primary">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href={provider.website} target="_blank" className="btn">
                      访问官网
                    </Link>
                    <Link href="/comparison" className="btn btn-secondary">
                      比较服务商
                    </Link>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-3">当前优惠</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{provider.discount}</p>
                      <p className="text-gray-600">限时优惠</p>
                    </div>
                    <button className="btn">
                      立即使用
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">技术规格</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiServer className="text-blue-500 mr-3" />
                        <span>CPU: {provider.cpu}</span>
                      </li>
                      <li className="flex items-center">
                        <FiServer className="text-blue-500 mr-3" />
                        <span>内存: {provider.ram}</span>
                      </li>
                      <li className="flex items-center">
                        <FiGlobe className="text-blue-500 mr-3" />
                        <span>存储: {provider.storage}</span>
                      </li>
                      <li className="flex items-center">
                        <FiDollarSign className="text-blue-500 mr-3" />
                        <span>价格: ¥{provider.price}/月</span>
                      </li>
                      <li className="flex items-center">
                        <FiClock className="text-blue-500 mr-3" />
                        <span>带宽: {provider.bandwidth}</span>
                      </li>
                      <li className="flex items-center">
                        <FiGlobe className="text-blue-500 mr-3" />
                        <span>地区: {provider.locations} 个</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">服务地区</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.regions.map((region, index) => (
                        <span key={index} className="badge badge-primary">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">服务类型</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-4">{provider.type}</span>
                    <span className="badge badge-success">
                      {provider.type === '云服务器' ? '弹性扩展' : '固定配置'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="card sticky top-24">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">价格方案</h3>
                    <div className="mb-6">
                      <p className="text-3xl font-bold mb-2">¥{provider.price}<span className="text-lg font-normal text-gray-600">/月</span></p>
                      <p className="text-gray-600">基础配置</p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>{provider.cpu}</span>
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>{provider.ram}</span>
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>{provider.storage}</span>
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>{provider.bandwidth} 带宽</span>
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>24/7 技术支持</span>
                      </li>
                    </ul>
                    
                    <button className="btn w-full mb-3">
                      立即购买
                    </button>
                    <Link href={provider.website} target="_blank" className="btn btn-secondary w-full">
                      查看更多方案
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews Section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">用户评价</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold">张</span>
                  </div>
                  <div>
                    <h4 className="font-bold">张先生</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className={i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  使用{provider.name}已经一年了，服务器稳定，响应速度快，客服支持也很专业。强烈推荐！
                </p>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="font-bold">李</span>
                  </div>
                  <div>
                    <h4 className="font-bold">李女士</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className={i < 5 ? 'fill-current text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  作为开发者，{provider.name}的API和工具非常完善，部署和管理应用非常方便。价格也很合理。
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="btn btn-secondary">
                查看所有评价
              </button>
            </div>
          </div>
        </section>
        
        {/* Related Providers */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">类似服务商</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers
                .filter(p => p.id !== provider.id)
                .slice(0, 3)
                .map((relatedProvider) => (
                  <div key={relatedProvider.id} className="card">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        <Link href={`/providers/${relatedProvider.id}`} className="hover:text-blue-600">
                          {relatedProvider.name}
                        </Link>
                      </h3>
                      <div className="flex items-center mb-3">
                        <div className="rating">
                          <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={i < Math.floor(relatedProvider.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 ml-2">{relatedProvider.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{relatedProvider.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">¥{relatedProvider.price}/月</span>
                        <Link href={`/providers/${relatedProvider.id}`} className="btn btn-sm">
                          查看详情
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ProviderDetail;

