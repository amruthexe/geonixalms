import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$1",
      period: "/month",
      description: "Perfect for getting started with basic courses.",
      features: ["Access to free courses", "Basic community support", "Mobile access", "Limited quizzes"],
      cta: "Get Started",
      ctaLink: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "$2999",
      period: "/month",
      description: "Unlock all courses and premium features.",
      features: ["Access to ALL courses", "Priority support", "Certificates of completion", "Offline downloads", "Advanced analytics"],
      cta: "Upgrade to Pro",
      ctaLink: "/signup?plan=pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For teams and organizations.",
      features: ["Unlimited users", "Dedicated account manager", "SSO Integration", "Custom branding", "API Access"],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Simple, Transparent <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Pricing</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Choose the plan that fits your learning needs. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-orange-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-lg'} transition-all duration-300 flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 mt-4 text-sm">{plan.description}</p>
                </div>
                
                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                        <div className="mt-0.5 h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={plan.ctaLink}
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
                    plan.popular 
                      ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-200' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
