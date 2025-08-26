'use client';
import React, { useState, useMemo } from 'react';
import {
  Card,
  List,
  Tag,
  Input,
  Button,
  Pagination,
  Form,
  ConfigProvider,
  theme,
  Empty,
  Divider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import 'antd/dist/reset.css';

// Category list
const categories = ['AI', 'Cloud Computing', 'Cybersecurity', 'Web Development', 'Mobile Apps', 'Data', 'DevOps'];

// Featured article (hero)
const featuredArticle = {
  slug: 'future-of-ai-in-business',
  title: 'The Future of AI in Business',
  description:
    'Explore how artificial intelligence is transforming industries and what it means for your business strategy.',
  author: 'Alex Bennett',
  date: 'July 15, 2024',
  category: 'AI',
};

// Articles dataset (could be replaced with Supabase fetch later)
const allArticles = [
  {
    slug: 'improve-cybersecurity-posture',
    title: '5 Ways to Improve Your Cybersecurity Posture',
    description: 'Protect your business from cyber threats with these essential strategies.',
    category: 'Cybersecurity',
    date: '2024-07-10',
  },
  {
    slug: 'rise-of-serverless',
    title: 'The Rise of Serverless Architecture',
    description: 'Discover the benefits of serverless computing and how it can optimize your infrastructure.',
    category: 'Cloud Computing',
    date: '2024-07-08',
  },
  {
    slug: 'building-scalable-web-apps',
    title: 'Building Scalable Web Applications',
    description: 'Learn how to design and build web applications that can handle rapid growth.',
    category: 'Web Development',
    date: '2024-07-04',
  },
  {
    slug: 'mobile-dev-trends-2024',
    title: 'Mobile App Development Trends in 2024',
    description: 'Stay ahead of the curve with the latest trends in mobile app development.',
    category: 'Mobile Apps',
    date: '2024-07-01',
  },
  {
    slug: 'ml-infra-devops',
    title: 'Integrating ML Workflows into DevOps',
    description: 'Bridge the gap between data science and platform engineering.',
    category: 'DevOps',
    date: '2024-06-28',
  },
  {
    slug: 'data-quality-ai-era',
    title: 'Data Quality in the AI Era',
    description: 'Why governance and observability matter more than ever.',
    category: 'Data',
    date: '2024-06-25',
  },
];

export default function BlogPage() {
  const { dark } = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // Filter + search
  const filtered = useMemo(() => {
    return allArticles.filter(a => {
      const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Reset to first page when filters change
  React.useEffect(() => { setPage(1); }, [search, activeCategory]);

  const onSubscribe = values => {
    // Simple success feedback; replace with real API later
    // eslint-disable-next-line no-alert
    alert(`Subscribed: ${values.email}`);
  };

  const isDark = dark;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
        token: {
          colorPrimary: '#1383eb',
          borderRadiusLG: 10,
        },
      }}
    >
      <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#0d1117] text-white' : 'bg-white text-gray-900'} transition-colors`}>
        <Navbar />
        <main className="flex-1 w-full pt-20">
          {/* Hero / Featured */}
          <section className="max-w-6xl mx-auto px-4 pt-12 pb-6">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Insights & Updates</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-prose mb-6">Actionable engineering, product & innovation stories from our team.</p>
                <Card
                  bordered={false}
                  className={`${isDark ? 'bg-[#1a202c]' : 'bg-gray-50'} shadow-sm`}
                  title={<span className="font-semibold">Featured · {featuredArticle.category}</span>}
                >
                  <h2 className="text-2xl font-bold mb-2 leading-snug">{featuredArticle.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm leading-relaxed">{featuredArticle.description}</p>
                  <div className="text-xs text-gray-400">By {featuredArticle.author} · {featuredArticle.date}</div>
                </Card>
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  size="large"
                  allowClear
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {['All', ...categories].map(cat => (
                    <Tag
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`cursor-pointer px-4 py-1 rounded-full text-sm ${activeCategory === cat ? 'font-semibold' : ''}`}
                      color={activeCategory === cat ? 'blue' : isDark ? 'default' : 'processing'}
                    >
                      {cat}
                    </Tag>
                  ))}
                </div>
                <Card bordered={false} className={`${isDark ? 'bg-[#1a202c]' : 'bg-gray-50'} shadow-sm`}>
                  <h3 className="font-semibold mb-2">Stay in the loop</h3>
                  <Form layout="vertical" onFinish={onSubscribe} requiredMark={false} className="flex flex-col gap-2">
                    <Form.Item
                      name="email"
                      className="mb-2"
                      rules={[{ required: true, message: 'Email required' }, { type: 'email', message: 'Enter a valid email' }]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="self-start">Subscribe</Button>
                  </Form>
                </Card>
              </div>
            </div>
          </section>
          <Divider className="my-0" />
          {/* Article List */}
          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest Articles</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} result{filtered.length !== 1 && 's'}</span>
            </div>
            {filtered.length === 0 ? (
              <Empty description="No articles match your search." />
            ) : (
              <List
                grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                dataSource={paginated}
                renderItem={item => (
                  <List.Item key={item.slug}>
                    <Card
                      hoverable
                      className={`${isDark ? 'bg-[#1a202c]' : 'bg-white'} transition-colors h-full`}
                      title={<span className="font-semibold text-base">{item.title}</span>}
                      extra={<Tag color="geekblue" className="m-0">{item.category}</Tag>}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{item.description}</p>
                      <div className="text-[11px] tracking-wide uppercase text-gray-400">{item.date}</div>
                    </Card>
                  </List.Item>
                )}
              />
            )}
            <div className="flex justify-center mt-10">
              <Pagination
                current={page}
                onChange={(p) => setPage(p)}
                pageSize={pageSize}
                total={filtered.length}
                showSizeChanger={false}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}
