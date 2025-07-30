"use client";
import Pricing from '@/components/pricing';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Custom Hooks
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Custom Cursor Component
const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`fixed w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 transition-transform duration-200 ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{ left: x - 10, top: y - 10 }}
    />
  );
};

// Floating Shapes Component
const FloatingShapes = () => {
  const scrollY = useScrollPosition();
  
  const shapes = useMemo(() => [
    { id: 1, size: 'w-72 h-72', gradient: 'from-blue-500/30 to-purple-500/30', x: '10%', y: '20%' },
    { id: 2, size: 'w-96 h-96', gradient: 'from-purple-500/20 to-cyan-500/20', x: '70%', y: '60%' },
    { id: 3, size: 'w-80 h-80', gradient: 'from-cyan-500/25 to-blue-500/25', x: '80%', y: '10%' },
    { id: 4, size: 'w-64 h-64', gradient: 'from-pink-500/30 to-purple-500/30', x: '20%', y: '70%' },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} bg-gradient-to-r ${shape.gradient} rounded-full blur-3xl animate-pulse`}
          style={{
            left: shape.x,
            top: shape.y,
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Slow Moving Text Component
const SlowMovingText = ({ children, className = '' }) => {
  const scrollY = useScrollPosition();
  
  return (
    <div 
      className={className}
      style={{ 
        transform: `translateY(${scrollY * 0.3}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    let startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 interactive ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isHovered ? 'transform scale-105 shadow-2xl shadow-purple-500/20' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-6xl mb-6 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan, price, features, featured = false, buttonText = 'Get Started' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative backdrop-blur-lg border rounded-3xl p-8 transition-all duration-700 interactive ${
        featured 
          ? 'bg-gradient-to-b from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/25' 
          : 'bg-white/5 border-white/10'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isHovered ? 'transform scale-110 shadow-2xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
        <div className="mb-8">
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-white/60 ml-2">/month</span>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/80">
              <span className="text-green-400 mr-3">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
          featured 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50' 
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [glitchText, setGlitchText] = useState('The Future of Image Creation');
  const [hasGlitched, setHasGlitched] = useState(false);
  const originalText = 'The Future of Image Creation';

  useEffect(() => {
    if (hasGlitched) return;

    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const startGlitch = () => {
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setGlitchText(prev => 
          prev.split('').map((char, index) => {
            if (index < iterations) return originalText[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );

        if (iterations >= originalText.length) {
          clearInterval(glitchInterval);
          setGlitchText(originalText);
          setHasGlitched(true);
        }
        iterations += 1 / 3;
      }, 30);
    };

    // Start glitch effect after a short delay
    const initialDelay = setTimeout(startGlitch, 500);
    return () => clearTimeout(initialDelay);
  }, [hasGlitched]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 max-w-6xl mx-auto px-4">
        <SlowMovingText className="text-7xl md:text-9xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            {glitchText}
          </span>
        </SlowMovingText>
        
        <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
          Transform ordinary images into extraordinary masterpieces with our neural-powered AI editor
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="px-12 py-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 interactive">
            Experience the Magic
          </button>
          <button className="px-12 py-6 backdrop-blur-lg bg-white/10 border border-white/20 text-white text-xl font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 interactive">
            Watch Demo
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <AnimatedCounter target={1000000} suffix="+" />
            <p className="text-white/60 mt-2">Images Transformed</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={50000} suffix="+" />
            <p className="text-white/60 mt-2">Happy Creators</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={99} suffix="%" />
            <p className="text-white/60 mt-2">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: '🧠',
      title: 'Neural Background Removal',
      description: 'Advanced AI instantly identifies and removes backgrounds with pixel-perfect precision, handling complex edges and fine details.',
    },
    {
      icon: '⚡',
      title: 'Quantum Upscaling',
      description: 'Enhance image resolution up to 16x while preserving crisp details and natural textures using quantum computing principles.',
    },
    {
      icon: '🎨',
      title: 'Style Transfer Matrix',
      description: 'Transform your images with artistic styles from famous painters or create your own unique aesthetic signature.',
    },
    {
      icon: '🌈',
      title: 'Color Harmonization',
      description: 'Intelligently balance colors and lighting to create professional-grade images that captivate and inspire.',
    },
    {
      icon: '🔮',
      title: 'Predictive Enhancement',
      description: 'AI predicts the best possible version of your image and applies enhancements automatically.',
    },
    {
      icon: '⭐',
      title: 'Real-time Collaboration',
      description: 'Work with your team in real-time, share feedback, and iterate on designs seamlessly in the cloud.',
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Superpowers for Creators
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            Unleash the full potential of AI-powered image editing with features that push the boundaries of what's possible
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    {
      plan: 'Creator',
      price: 19,
      features: [
        'Up to 100 images/month',
        'Basic AI enhancements',
        'Standard export quality',
        'Email support'
      ]
    },
    {
      plan: 'Professional',
      price: 49,
      features: [
        'Unlimited images',
        'Advanced AI features',
        '4K export quality',
        'Priority support',
        'Batch processing',
        'Custom presets'
      ],
      featured: true
    },
    {
      plan: 'Enterprise',
      price: 149,
      features: [
        'Everything in Professional',
        'API access',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Advanced analytics'
      ]
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Power Level
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            Scale your creative workflow with plans designed for every level of ambition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-slate-900 text-white min-h-screen overflow-x-hidden">
      {!isMobile && <CustomCursor />}
      <FloatingShapes />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <Pricing />
       
        
        {/* Footer */}
        <footer className="py-20 border-t border-white/10 backdrop-blur-lg bg-white/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Transform Your Images?
            </h3>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to push the boundaries of visual storytelling
            </p>
            <button className="px-16 py-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 interactive">
              Start Creating Now
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;