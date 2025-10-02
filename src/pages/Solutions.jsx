import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  BarChart3, 
  MapPin, 
  CloudRain, 
  Thermometer, 
  TrendingUp,
  Shield,
  Users,
  Clock,
  CheckCircle2,
  Zap,
  Brain,
  Database,
  Target
} from 'lucide-react';

const Solutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      icon: Sprout,
      title: 'AI-Powered Crop Prediction',
      description: 'Get intelligent crop recommendations based on real-time climate data, soil conditions, and historical patterns',
      features: [
        'Location-specific crop suitability analysis',
        'Multi-factor climate consideration',
        'Seasonal planting recommendations',
        'Yield potential estimation'
      ],
      link: '/predict-crop'
    },
    {
      icon: BarChart3,
      title: 'Advanced Weather Analytics',
      description: 'Comprehensive climate data analysis with interactive charts and historical weather patterns',
      features: [
        'Real-time temperature monitoring',
        'Precipitation trend analysis',
        'Solar radiation tracking',
        'Humidity and wind pattern studies'
      ],
      link: '/charts'
    },
    {
      icon: MapPin,
      title: 'Geographic Intelligence',
      description: 'Location-based agricultural insights and regional suitability mapping',
      features: [
        'Global location coverage',
        'Regional climate zone analysis',
        'Soil type mapping',
        'Elevation-based recommendations'
      ],
      link: '/predict-crop'
    },
    {
      icon: TrendingUp,
      title: 'Growth & Yield Forecasting',
      description: 'Predictive analytics for crop performance and harvest expectations',
      features: [
        'Growth stage monitoring',
        'Yield prediction models',
        'Risk assessment analysis',
        'Performance optimization tips'
      ]
    },
    {
      icon: Brain,
      title: 'Smart Decision Support',
      description: 'AI-driven insights to help farmers make informed agricultural decisions',
      features: [
        'Data-driven recommendations',
        'Cost-benefit analysis',
        'Resource optimization',
        'Risk mitigation strategies'
      ]
    },
    {
      icon: Shield,
      title: 'Sustainable Farming',
      description: 'Promote environmentally friendly and sustainable agricultural practices',
      features: [
        'Water conservation guidance',
        'Soil health monitoring',
        'Pest management solutions',
        'Organic farming support'
      ]
    }
  ];

  const platformFeatures = [
    {
      icon: Clock,
      title: 'Real-time Data',
      description: 'Live weather updates and continuous climate monitoring'
    },
    {
      icon: Database,
      title: 'Historical Analysis',
      description: 'Access to years of climate data for pattern recognition'
    },
    {
      icon: Zap,
      title: 'Instant Predictions',
      description: 'Quick AI-powered recommendations within seconds'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for farmers and experts alike'
    }
  ];

  return (
    <div className="flex flex-1 h-full bg-background">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-textLight mb-6">
              Agricultural Solutions for 
              <span className="text-primary"> Modern Farming</span>
            </h1>
            <p className="text-textLight/70 text-xl max-w-3xl mx-auto">
              Leveraging AI and data analytics to revolutionize agricultural decision-making and optimize farming outcomes
            </p>
          </div>

          {/* Main Solutions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-panel rounded-xl p-6 hover:bg-panel/80 transition-colors group cursor-pointer"
                onClick={() => solution.link && navigate(solution.link)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-textLight">{solution.title}</h3>
                </div>
                <p className="text-textLight/70 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-textLight/60">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {solution.link && (
                  <button className="mt-4 text-primary hover:text-primary/80 font-medium flex items-center gap-2">
                    Explore Feature
                    <TrendingUp className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Platform Features */}
          <div className="bg-panel rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-textLight mb-8 text-center">
              Platform Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-textLight mb-2">{feature.title}</h3>
                  <p className="text-textLight/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-textLight mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-textLight/70 mb-6 max-w-2xl mx-auto">
              Start using our AI-powered platform to make data-driven decisions and optimize your agricultural outcomes
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/predict-crop')}
                className="cursor-pointer px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/80 transition flex items-center gap-2"
              >
                <Sprout className="w-5 h-5" />
                Predict Crops
              </button>
              <button
                onClick={() => navigate('/graph-chart')}
                className="cursor-pointer px-6 py-3 bg-panel text-textLight rounded-lg font-semibold hover:bg-panel/80 transition flex items-center gap-2 border border-border"
              >
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Solutions;