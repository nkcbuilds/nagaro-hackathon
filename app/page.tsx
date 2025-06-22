"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { GlitterBackground } from "@/components/glitter-background"
import { Calendar, Clock, Users, Star, Rocket, Code, Trophy, ChevronDown, ChevronUp, Menu, X } from "lucide-react"

interface CountdownProps {
  targetDate: string
}

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId.replace("#", ""))
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className="flex gap-2 text-center justify-center items-center">
        {[31, 12, 45, 30].map((value, index) => (
          <div
            key={index}
            className="bg-nexolve-dark/80 backdrop-blur-sm rounded-xl p-3 min-w-[60px] border border-nexolve-cyan/30"
          >
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-xs text-nexolve-cyan font-medium">{["DAYS", "HRS", "MIN", "SEC"][index]}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 text-center justify-center items-center">
      <div className="bg-nexolve-dark/80 backdrop-blur-sm rounded-xl p-3 min-w-[60px] border border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors">
        <div className="text-xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-xs text-nexolve-cyan font-medium">DAYS</div>
      </div>
      <div className="bg-nexolve-dark/80 backdrop-blur-sm rounded-xl p-3 min-w-[60px] border border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors">
        <div className="text-xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-xs text-nexolve-cyan font-medium">HRS</div>
      </div>
      <div className="bg-nexolve-dark/80 backdrop-blur-sm rounded-xl p-3 min-w-[60px] border border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors">
        <div className="text-xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-xs text-nexolve-cyan font-medium">MIN</div>
      </div>
      <div className="bg-nexolve-dark/80 backdrop-blur-sm rounded-xl p-3 min-w-[60px] border border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors">
        <div className="text-xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-xs text-nexolve-cyan font-medium">SEC</div>
      </div>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-nexolve-cyan/10">
      <button
        className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-nexolve-cyan/5 transition-colors group"
        onClick={onToggle}
      >
        <span className="text-white font-medium group-hover:text-nexolve-cyan transition-colors">{question}</span>
        <div className="text-nexolve-cyan">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-6 text-gray-300 leading-relaxed animate-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function HackathonLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const navItems = [
    { name: "Prizes", href: "#prizes" },
    { name: "How to participate", href: "#participate" },
    { name: "App ideas", href: "#ideas" },
    { name: "Evaluation", href: "#evaluation" },
    { name: "Rules", href: "#rules" },
    { name: "FAQ", href: "#faq" },
  ]

  const prizes = [
    {
      title: "Grand Prize",
      amount: "₹30000",
      gradient: "from-nexolve-blue via-nexolve-cyan to-nexolve-light-cyan",
      icon: "🏆",
    },
    {
      title: "First Runner-Up",
      amount: "₹20000",
      gradient: "from-nexolve-cyan via-nexolve-light-cyan to-nexolve-blue",
      icon: "🥈",
    },
    {
      title: "Second Runner-Up",
      amount: "₹10000",
      gradient: "from-nexolve-light-cyan via-nexolve-cyan to-nexolve-blue",
      icon: "🥉",
    },
  ]

  const appIdeas = [
    {
      title: "AI-Enhanced photo captioner",
      description:
        "Develop an app that uses AI to automatically generate captions for photos. The AI can analyze the content of the image and suggest relevant captions.",
      icon: "📸",
    },
    {
      title: "AI-Powered recipe recommender",
      description:
        "Develop a recipe app that uses AI to recommend recipes based on user preferences, dietary restrictions, and available ingredients. The AI can suggest substitutions and variations to suit individual tastes.",
      icon: "🍳",
    },
    {
      title: "AI-Powered quote generator",
      description:
        "Build an app that generates inspirational quotes or advice using AI. Users can receive daily quotes or request specific topics for quotes.",
      icon: "💭",
    },
    {
      title: "AI-Powered language translation",
      description: "Develop a language translation app that uses AI to translate text or speech in real-time.",
      icon: "🌐",
    },
    {
      title: "AI-Driven virtual travel assistant",
      description:
        "Create a virtual travel assistant that uses AI to provide personalized travel itineraries and suggest local attractions.",
      icon: "✈️",
    },
  ]

  const faqData = [
    {
      question: "Who can participate in the Nexolve Hackathon?",
      answer:
        "Anyone who is at least 13 years old and has an interest in coding is welcome to participate in Nexolve Hackathons, regardless of skill level. Beginners and experts alike are encouraged to join. If you're between 13 and 17 years old, please review the Hackathon rules to understand how they apply to you.\n\nHowever, please note that if you are a resident of a country or territory subject to U.S. export controls, designated as prohibited from financial and/or export transactions with the U.S., or if you or your organization are on a restricted or prohibited party list maintained by the U.S. Departments of Commerce, State, and Treasury, you are not eligible to participate in the Hackathon.",
    },
    {
      question: "What kind of license should be used for the submissions?",
      answer:
        "All projects submitted in this hackathon should be open source with MIT or other standard open-source licenses.",
    },
    {
      question: "Are we allowed to form teams with our friends and colleagues?",
      answer: "Yes, you can form teams with your friends and colleagues. Team collaboration is encouraged!",
    },
    {
      question: "How are winners contacted and paid the prizes?",
      answer:
        "Winners will be contacted by the Nexolve editorial team via email. Prize distribution details will be provided upon selection.",
    },
    {
      question: "What are the hackathon dates?",
      answer: "The hackathon runs from June 24 to July 28, 2024. Make sure to submit your project before the deadline!",
    },
    {
      question: "Need help?",
      answer:
        "If you need any assistance, feel free to reach out to the Nexolve community or check our documentation for guidance.",
    },
  ]

  const participationSteps = [
    {
      step: 1,
      title: "Build an open-source app",
      description:
        "Build an open-source app on any idea using any LLM or AI tool of our choice. Check out the app ideas below for reference.",
      icon: <Code className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Launch your app",
      description: "Launch your app by publishing an article on your Nexolve blog - no blog yet? Set it up here.",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Tag the article",
      description: "Tag the article with #AIForTomorrow tag! This is how we track who's in.",
      icon: <Star className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Share your article",
      description:
        "Share your article on social media with hashtag #AIForTomorrow and tag @nexolve so we can spread the love!",
      icon: <Users className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-nexolve-dark text-white relative overflow-hidden">
      <GlitterBackground />

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-6xl mx-auto px-4 z-50">
        <div className="bg-nexolve-dark/90 backdrop-blur-md border border-nexolve-cyan/20 rounded-2xl shadow-lg">
          <div className="px-6 py-3">
            <div className="flex justify-between items-center">
              <AnimatedSection animation="slide-right">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/nexolve-logo.png"
                    alt="Nexolve Technologies"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-lg hover:shadow-nexolve-cyan/25 transition-shadow duration-300"
                  />
                  <span className="font-medium text-white text-base sm:text-lg tracking-wide">
                    Nexolve Technologies
                  </span>
                </div>
              </AnimatedSection>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <AnimatedSection key={item.name} animation="fade-in" delay={index * 100}>
                    <button
                      onClick={() => smoothScrollTo(item.href)}
                      className="text-gray-400 hover:text-nexolve-cyan transition-colors text-sm font-normal px-3 py-2 rounded-lg hover:bg-nexolve-cyan/5 tracking-wide"
                    >
                      {item.name}
                    </button>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection animation="slide-left">
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-nexolve-cyan hover:text-white p-2 rounded-lg hover:bg-nexolve-cyan/10 transition-colors"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-nexolve-cyan/20 bg-nexolve-dark/95 backdrop-blur-md rounded-b-2xl">
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      smoothScrollTo(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-nexolve-cyan hover:bg-nexolve-cyan/10 rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <AnimatedSection animation="fade-up">
              <Badge variant="secondary" className="mb-4 bg-nexolve-cyan/10 text-nexolve-cyan border-nexolve-cyan/20">
                The Nexolve Hackathon
              </Badge>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-nexolve-blue via-nexolve-cyan to-nexolve-light-cyan bg-clip-text text-transparent">
                AI for Tomorrow.
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Use any LLM or AI tool to build innovative solutions.{" "}
                <span className="text-white font-semibold">
                  Launch your project on Nexolve and show the world the power of AI!
                </span>
              </p>
            </AnimatedSection>

            <AnimatedSection animation="scale-up" delay={600}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-nexolve-blue to-nexolve-cyan hover:from-nexolve-cyan hover:to-nexolve-light-cyan text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-nexolve-cyan/25 transition-all duration-300"
              >
                Register now
              </Button>
            </AnimatedSection>
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <AnimatedSection animation="fade-up" delay={800}>
              <Card className="bg-nexolve-dark/60 backdrop-blur-sm border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-nexolve-cyan" />
                    <span className="text-nexolve-cyan text-sm font-medium">Dates:</span>
                  </div>
                  <div className="text-white font-bold text-xl">Aug 1 - Aug 31, 2024</div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={1000}>
              <Card className="bg-nexolve-dark/60 backdrop-blur-sm border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors rounded-2xl">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-nexolve-cyan" />
                    <span className="text-nexolve-cyan text-sm font-medium">Hackathon starts in:</span>
                  </div>
                  <div className="flex justify-center w-full">
                    <Countdown targetDate="2024-08-01T00:00:00Z" />
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={1200}>
              <Card className="bg-nexolve-dark/60 backdrop-blur-sm border-nexolve-cyan/30 hover:border-nexolve-cyan/50 transition-colors rounded-2xl">
                <CardContent className="p-6 flex flex-col justify-center min-h-[140px]">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-nexolve-cyan" />
                    <span className="text-nexolve-cyan text-sm font-medium">Participants</span>
                  </div>
                  <div className="text-white font-bold text-4xl">200</div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-16 px-4 sm:px-6 lg:px-8 bg-nexolve-dark/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Incentives</h2>
          </AnimatedSection>

          {/* Main Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {prizes.map((prize, index) => (
              <AnimatedSection key={index} animation="scale-up" delay={index * 200}>
                <Card className="bg-nexolve-dark/60 backdrop-blur-sm border-nexolve-cyan/20 hover:border-nexolve-cyan/40 hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${prize.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-nexolve-cyan/25`}
                    >
                      {prize.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-nexolve-cyan/80 mb-2">{prize.title}</h3>
                    <div className="text-2xl font-bold text-white">{prize.amount}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "10 Special Category Prizes:", desc: "$100 each in cash or equivalent Amazon vouchers." },
              { title: "10 Participation Prizes:", desc: "$50 each in cash or equivalent Amazon vouchers." },
              { title: "Digital Badges:", desc: "Award digital badges to all participants and winners." },
              {
                title: "Feature Articles:",
                desc: "Highlight the top submissions in a featured section on Nexolve and social media channels.",
              },
            ].map((item, index) => (
              <AnimatedSection key={index} animation="slide-left" delay={index * 150}>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-nexolve-cyan rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-nexolve-cyan font-semibold">{item.title}</span>
                    <span className="text-gray-300 ml-2">{item.desc}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section id="participate" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              How to <em className="text-nexolve-cyan">participate</em>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {participationSteps.map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 200}>
                <Card className="bg-nexolve-dark/40 backdrop-blur-sm border-nexolve-cyan/20 hover:bg-nexolve-dark/60 hover:border-nexolve-cyan/40 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-nexolve-blue to-nexolve-cyan rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="text-nexolve-cyan group-hover:scale-110 transition-transform">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-nexolve-cyan transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* App Ideas */}
      <section id="ideas" className="py-16 px-4 sm:px-6 lg:px-8 bg-nexolve-dark/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              App ideas <em className="text-nexolve-cyan">for the hackathon</em>
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Here are some app ideas from the Nexolve team. Feel free to build them, but we encourage you to be
              creative and come up with your own.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appIdeas.map((idea, index) => (
              <AnimatedSection key={index} animation="scale-up" delay={index * 150}>
                <Card className="bg-nexolve-dark/60 backdrop-blur-sm border-nexolve-cyan/20 hover:border-nexolve-cyan/40 hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{idea.icon}</div>
                    <h3 className="font-semibold text-white mb-3 group-hover:text-nexolve-cyan transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{idea.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section id="evaluation" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Evaluation <em className="text-nexolve-cyan">criteria</em>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={300}>
            <Card className="bg-nexolve-dark/40 backdrop-blur-sm border-nexolve-cyan/20 p-8 hover:border-nexolve-cyan/40 transition-colors">
              <p className="text-lg text-gray-300 leading-relaxed">
                Your project will be judged on its{" "}
                <span className="text-nexolve-cyan font-semibold">real-world usefulness</span>,
                <span className="text-nexolve-cyan font-semibold"> feature completeness</span>, and{" "}
                <span className="text-nexolve-cyan font-semibold">the story behind it</span>. The blog should cover your
                inspiration, problem-solving approach, and the impact, with a focus on UI/UX design.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Submission Rules */}
      <section id="rules" className="py-16 px-4 sm:px-6 lg:px-8 bg-nexolve-dark/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Submission <em className="text-nexolve-cyan">rules</em>
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                icon: <Rocket className="w-4 h-4" />,
                title: "Start Fresh:",
                desc: "Begin building your project at the start of the hackathon. Projects with commits before the hackathon start date will be disqualified.",
                color: "from-nexolve-blue to-nexolve-cyan",
              },
              {
                icon: <Star className="w-4 h-4" />,
                title: "Originality:",
                desc: "Ensure your idea is original and not plagiarized or copied from someone else.",
                color: "from-nexolve-cyan to-nexolve-light-cyan",
              },
              {
                icon: <Code className="w-4 h-4" />,
                title: "Open Source:",
                desc: "Make sure your project is open-source and includes a proper license, README, and other necessary details.",
                color: "from-nexolve-light-cyan to-nexolve-cyan",
              },
              {
                icon: <Trophy className="w-4 h-4" />,
                title: "Evaluation:",
                desc: "Winners will be selected by the Nexolve editorial team. While articles with more engagement will have a higher weightage, equal points will be given to the idea, implementation, and other criteria mentioned in the evaluation criteria.",
                color: "from-nexolve-blue to-nexolve-light-cyan",
              },
            ].map((rule, index) => (
              <AnimatedSection key={index} animation="slide-left" delay={index * 200}>
                <div className="flex items-start gap-4 group">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${rule.color} rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-nexolve-cyan transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-gray-300">{rule.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Frequently asked <em className="text-nexolve-cyan">questions</em>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={300}>
            <Card className="bg-nexolve-dark/40 backdrop-blur-sm border-nexolve-cyan/20">
              <CardContent className="p-0">
                {faqData.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={500}>
            <div className="text-center mt-8 text-sm text-gray-400">
              <p>
                By participating in this hackathon, you agree to the{" "}
                <button
                  onClick={() => smoothScrollTo("#rules")}
                  className="text-nexolve-cyan hover:underline cursor-pointer transition-colors duration-200"
                >
                  rules laid out here
                </button>
                . Please read them carefully before proceeding. All projects submitted in this hackathon should be open
                source with MIT or other standard open-source licenses.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-nexolve-blue/20 via-nexolve-cyan/20 to-nexolve-light-cyan/20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to build the future with AI?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of developers in creating innovative AI-powered solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={300}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-nexolve-blue to-nexolve-cyan hover:from-nexolve-cyan hover:to-nexolve-light-cyan font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-nexolve-cyan/25 transition-all duration-300"
            >
              Register for the Hackathon
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-nexolve-cyan/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <AnimatedSection animation="fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/images/nexolve-logo.png"
                alt="Nexolve Technologies"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover opacity-80"
              />
              <span className="text-gray-300 font-medium">Nexolve Technologies</span>
            </div>
            <p>&copy; 2024 Nexolve Technologies. All rights reserved.</p>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  )
}
