import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  BarChart3, 
  MapPin, 
  Clock, 
  Search,
  TrendingUp,
  CloudRain,
  Thermometer,
  Play,
  LineChart,
  PieChart,
  Gamepad2
} from 'lucide-react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();



  const features = [
    {
      icon: Sprout,
      title: 'Crop Prediction',
      description: 'Get AI-powered crop recommendations based on location-specific climate data and soil conditions',
      link: '/predict-crop'
    },
    {
      icon: BarChart3,
      title: 'Weather Analytics',
      description: 'Detailed climate charts and historical weather patterns for informed agricultural planning',
      link: '/charts'
    },
    {
      icon: TrendingUp,
      title: 'Live Data',
      description: 'Real-time weather monitoring and climate insights updated continuously',
      link: '/charts'
    },
    {
      icon: LineChart,
      title: 'Growth Analysis',
      description: 'Track crop performance and growth patterns with advanced analytics',
      link: '/charts'
    }
  ];

  return (
    <div className="flex flex-1 h-full bg-background">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-textLight mb-6">
              Green
              <span className="text-primary">Cycle</span>
            </h1>
            <p className="text-textLight/70 text-xl max-w-3xl mx-auto">
              A platform for crop predictions, weather analytics, and data-driven farming decisions
            </p>

            {/* Main Search */}
          
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-panel rounded-xl p-6 hover:bg-panel/80 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-textLight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-textLight/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold text-textLight mb-8 text-center">
              Platform Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-textLight mb-1">Global</div>
                <div className="text-textLight/60 text-sm">Coverage</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-textLight mb-1">50+</div>
                <div className="text-textLight/60 text-sm">Crop Types</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CloudRain className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-textLight mb-1">Real-time</div>
                <div className="text-textLight/60 text-sm">Weather Data</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-textLight mb-1">Instant</div>
                <div className="text-textLight/60 text-sm">Predictions</div>
              </div>
            </div>
          </div>
            <div className="max-w-2xl mt-5 mx-auto">
               
                <Link to={'/predict-crop'}>
                <button
                  type="submit"
                  className="px-8 cursor-pointer mx-auto py-4 bg-primary text-background rounded-xl font-semibold hover:bg-primary/80 transition flex items-center gap-2"
                >
                  <Sprout className="w-5 h-5" />
                  Predict Crops
                </button>
          </Link>
            </div>
        </div>
      </main>
      <div className="w-px bg-gradient-to-b from-gray-600 to-gray-800 hidden lg:block"></div>

      {/* Right Sidebar */}
      <aside className="w-80 bg-panel p-6 hidden lg:block overflow-y-auto custom-scrollbar">
        <h2 className="text-lg font-semibold text-textLight mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5" /> Quick Access
        </h2>

        {/* Quick Links */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => navigate('/predict-crop')}
            className="w-full flex items-center gap-3 p-3 bg-background/50 rounded-lg text-textLight hover:bg-background transition-colors text-left"
          >
            <Sprout className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium">Crop Prediction</div>
              <div className="text-sm text-textLight/60">Find suitable crops</div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/charts')}
            className="w-full flex items-center gap-3 p-3 bg-background/50 rounded-lg text-textLight hover:bg-background transition-colors text-left"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium">Weather Analytics</div>
              <div className="text-sm text-textLight/60">View climate data</div>
            </div>
          </button>
         <button
  onClick={() => navigate('/games')}
  className="w-full flex items-center gap-3 p-3 bg-background/50 rounded-lg text-textLight hover:bg-background transition-colors text-left"
>
  <Gamepad2 className="w-5 h-5 text-primary" />
  <div>
    <div className="font-medium">Plant Games</div>
    <div className="text-sm text-textLight/60">Interactive games</div>
  </div>
</button>
        </div>

        {/* How It Works */}
        <div className="bg-background/50 rounded-lg p-4">
          <h3 className="font-medium text-textLight mb-3">How It Works</h3>
          <div className="space-y-3 text-sm text-textLight/70">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">1</div>
              <span>Enter your location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">2</div>
              <span>Analyze climate data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">3</div>
              <span>Get crop recommendations</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;