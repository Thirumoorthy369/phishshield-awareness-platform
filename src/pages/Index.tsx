
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Shield, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10">
            <div className="flex items-center mb-4">
              <Shield className="h-10 w-10 text-primary-600" />
              <h1 className="text-3xl font-bold ml-2">PhishShield</h1>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Strengthen Your Human Firewall
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive phishing awareness and simulation platform to train your team and protect your organization from social engineering attacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-primary-50 transform rotate-3"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80&w=1470"
                  alt="Phishing Security"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Training</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PhishShield provides all the tools you need to build a security-aware culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Phishing Simulation"
              description="Create realistic phishing campaigns to safely test your team's awareness"
              icon="🎯"
            />
            <FeatureCard
              title="Interactive Training"
              description="Engaging courses and quizzes that make security training enjoyable"
              icon="🧠"
            />
            <FeatureCard
              title="Practice Zone"
              description="Safe environment to practice identifying phishing attempts"
              icon="🛡️"
            />
            <FeatureCard
              title="Reporting Tools"
              description="Easy reporting of suspicious emails with automated analysis"
              icon="📊"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why Choose PhishShield?</h2>
              <div className="space-y-4">
                <BenefitItem text="Reduce your organization's vulnerability to phishing attacks" />
                <BenefitItem text="Track progress with detailed analytics and reporting" />
                <BenefitItem text="Customize training and simulations to your industry" />
                <BenefitItem text="Comply with security awareness training requirements" />
                <BenefitItem text="Create a security-first culture in your organization" />
              </div>
              <Button className="mt-8" asChild>
                <Link to="/register">
                  Start Protecting Your Team
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-primary-100 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-6xl">📧</div>
                </div>
                <div className="aspect-square bg-green-100 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-6xl">🔒</div>
                </div>
                <div className="aspect-square bg-amber-100 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
                <div className="aspect-square bg-blue-100 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-6xl">🎓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to strengthen your security?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that trust PhishShield to train and protect their teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-600" asChild>
              <Link to="/login">
                Log In
              </Link>
            </Button>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
              <Link to="/register">
                Sign Up Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">PhishShield</span>
            </div>
            <div className="flex flex-wrap gap-8">
              <Link to="/login" className="hover:text-white">Log In</Link>
              <Link to="/register" className="hover:text-white">Sign Up</Link>
              <a href="#" className="hover:text-white">About Us</a>
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} PhishShield Security. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

interface BenefitItemProps {
  text: string;
}

const BenefitItem = ({ text }: BenefitItemProps) => (
  <div className="flex items-start">
    <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
      <Check className="h-4 w-4 text-green-600" />
    </div>
    <p className="text-lg">{text}</p>
  </div>
);

export default Index;
