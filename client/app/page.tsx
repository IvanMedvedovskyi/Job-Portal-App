import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Building,
  CheckCircleIcon,
  SearchIcon,
  Users,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      title: "Diverse Opportunities",
      description:
        "Access thousands of job listings across various industries and experience levels.",
      benefits: [
        "100,000+ active job listings",
        "50+ job categories",
        "Remote and on-site options",
      ],
      cta: "Explore Jobs",
      ctaLink: "/findwork",
    },
    {
      icon: <Building className="w-6 h-6 text-indigo-500" />,
      title: "Top Companies",
      description:
        "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
      benefits: [
        "500+ verified employers",
        "Exclusive partnerships",
        "Direct application process",
      ],
      cta: "View Companies",
      ctaLink: "/findwork",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: "Talent Pool",
      description:
        "Employers can access a diverse pool of qualified candidates for their open positions.",
      benefits: [
        "1M+ registered job seekers",
        "Advanced search filters",
        "AI-powered matching",
      ],
      cta: "Post a Job",
      ctaLink: "/post",
    },
  ];

  return (
    <main>
      <Header />

      <section className="py-12 bg-gradient-to-b from-teal-50 to-indigo-500/5 text-primary-foreground">
        <div className="container mx-auto px-4 text-center text-black">
          <h1 className="text-4xl text-indigo-500 md:text-5xl font-bold mb-6">
            Find Your Dream Job or Perfect Candidate
          </h1>
          <p className="text-xl mb-8">
            Connect with thousands of employers and job seekers on our platform
          </p>
          <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              type="text"
              placeholder="Search for jobs"
              className="flex-grow bg-white text-black"
            />
            <Button className="bg-indigo-500 cursor-pointer text-white">
              <SearchIcon className="w-6 h-6" />
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose{" "}
            <span className="font-extrabold text-indigo-500">
              Job Finder Application
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col h-full rounded-xl border-none"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.ctaLink}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Badge
              variant={"outline"}
              className="text-sm font-medium border-gray-400"
            >
              Trusted by 12,000+ companies worldwide
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-28 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size={"lg"} asChild>
              <Link href={"/findwork"}>Find Work</Link>
            </Button>
            <Button size={"lg"} variant={"outline"} asChild>
              <Link href={"/post"}>Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
