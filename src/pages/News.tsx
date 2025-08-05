import { Calendar, User, ArrowRight } from 'lucide-react'

const newsArticles = [
  {
    id: 1,
    title: "Greencycle Expands Recycling Program to Include Electronics",
    excerpt: "We're excited to announce our new electronics recycling program, making it easier for customers to dispose of old devices responsibly.",
    date: "2024-01-15",
    author: "Sarah Johnson",
    category: "Company News",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "5 Simple Ways to Reduce Household Waste",
    excerpt: "Learn practical tips to minimize waste in your daily life and contribute to a more sustainable future.",
    date: "2024-01-10",
    author: "Mike Chen",
    category: "Sustainability Tips",
    image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "New Partnership with Local Schools for Environmental Education",
    excerpt: "Greencycle partners with area schools to teach students about waste management and environmental responsibility.",
    date: "2024-01-05",
    author: "Emily Rodriguez",
    category: "Community",
    image: "https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    title: "Understanding Composting: A Complete Guide",
    excerpt: "Everything you need to know about composting at home, from getting started to troubleshooting common issues.",
    date: "2023-12-28",
    author: "David Park",
    category: "How-To Guide",
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    title: "Greencycle Achieves Carbon Neutral Operations",
    excerpt: "We're proud to announce that all our operations are now carbon neutral, marking a major milestone in our sustainability journey.",
    date: "2023-12-20",
    author: "Lisa Thompson",
    category: "Environmental Impact",
    image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    title: "Holiday Waste Management Tips",
    excerpt: "Make your holidays more sustainable with these practical tips for managing increased waste during the festive season.",
    date: "2023-12-15",
    author: "Jennifer Lee",
    category: "Seasonal Tips",
    image: "https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
]

const categories = ["All", "Company News", "Sustainability Tips", "Community", "How-To Guide", "Environmental Impact", "Seasonal Tips"]

export default function News() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about our latest developments, sustainability tips, and environmental initiatives
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={newsArticles[0].image} 
                alt={newsArticles[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="ml-3 text-emerald-600 text-sm">{newsArticles[0].category}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{newsArticles[0].title}</h2>
              <p className="text-gray-600 mb-6">{newsArticles[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date(newsArticles[0].date).toLocaleDateString()}</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{newsArticles[0].author}</span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-emerald-600 rounded-lg p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-6">
            Subscribe to our newsletter for the latest news, tips, and environmental insights
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-white text-emerald-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}