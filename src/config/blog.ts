export const blogConfig = {
  // 博客基本配置
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Mark's Reverie",
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "A personal blog for thoughts, reflections, and literary musings",
  
  // 数据源配置
  dataSource: {
    // 可选: 'json', 'markdown', 'api', 'cms'
    type: process.env.BLOG_DATA_SOURCE || 'markdown',
    // API 端点（如果使用 API）
    apiUrl: process.env.BLOG_API_URL,
    // CMS 配置（如果使用 CMS）
    cms: {
      type: process.env.CMS_TYPE, // 'contentful', 'strapi', 'sanity', etc.
      spaceId: process.env.CMS_SPACE_ID,
      accessToken: process.env.CMS_ACCESS_TOKEN,
    }
  },
  
  // 分页配置
  pagination: {
    postsPerPage: 10,
    showLoadMore: true,
  },
  
  // 搜索配置
  search: {
    enabled: true,
    provider: process.env.SEARCH_PROVIDER || 'client', // 'client', 'algolia', 'elasticsearch'
  },
  
  // 评论系统配置
  comments: {
    enabled: false,
    provider: process.env.COMMENTS_PROVIDER, // 'disqus', 'utterances', 'giscus'
  },
  
  // 社交媒体配置
  social: {
    twitter: process.env.TWITTER_HANDLE,
    github: process.env.GITHUB_HANDLE,
    linkedin: process.env.LINKEDIN_HANDLE,
  }
}
