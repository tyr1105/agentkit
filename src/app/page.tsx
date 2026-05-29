import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { agents } from "@/lib/agents";
import Link from "next/link";
import {
  Sparkles,
  Wrench,
  Brain,
  Zap,
  Shield,
  Rocket,
  Search,
  Headphones,
  Code,
  BarChart3,
  PenTool,
  Network,
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  MessageSquare,
  Bot,
  Layers,
} from "lucide-react";

const featureIcons = [Sparkles, Wrench, Brain, Zap, Shield, Rocket];
const features = [
  {
    title: "Multi-Provider Support",
    description:
      "Switch between OpenAI, Anthropic, Google, and local models with a single line change. No vendor lock-in.",
  },
  {
    title: "Tool Calling",
    description:
      "Define typed tools with Zod schemas. The agent decides when and how to use them. Full type safety.",
  },
  {
    title: "Memory & Persistence",
    description:
      "Conversation memory, long-term storage, and session management built in. Your agents remember context.",
  },
  {
    title: "Streaming Responses",
    description:
      "Real-time token streaming for chat interfaces. Show results as they're generated, not after.",
  },
  {
    title: "Error Handling",
    description:
      "Automatic retries, graceful degradation, and structured error types. Production-ready from day one.",
  },
  {
    title: "Production Ready",
    description:
      "Logging, monitoring, rate limiting, and cost tracking. Everything you need to ship to production.",
  },
];

const agentIcons = [Search, Headphones, Code, BarChart3, PenTool, Network];

const heroCode = `import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";

const agent = new AgentKit({
  model: openai("gpt-4o"),
  name: "My Agent",
  instructions: "You are a helpful assistant.",
  tools: {
    search: {
      description: "Search the web",
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => fetchResults(query),
    },
  },
});

const result = await agent.run("Research AI frameworks");
// → Structured response with sources`;

const withoutCode = `// Without AgentKit — 200+ lines of boilerplate
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.KEY });

async function runAgent(prompt: string) {
  const messages: any[] = [{ role: "user", content: prompt }];
  
  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: [
        {
          type: "function",
          function: {
            name: "web_search",
            description: "Search the web",
            parameters: {
              type: "object",
              properties: {
                query: { type: "string" }
              },
              required: ["query"]
            }
          }
        }
      ]
    });
    
    const choice = response.choices[0];
    messages.push(choice.message);
    
    if (choice.finish_reason === "stop") {
      return choice.message.content;
    }
    
    if (choice.finish_reason === "tool_calls") {
      for (const toolCall of choice.message.tool_calls || []) {
        const args = JSON.parse(toolCall.function.arguments);
        let result;
        
        switch (toolCall.function.name) {
          case "web_search":
            result = await searchWeb(args.query);
            break;
          // ... more tools, more boilerplate
        }
        
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        });
      }
    }
  }
  // Still no: memory, streaming, error handling, 
  // logging, retry logic, type safety...
}`;

const withCode = `// With AgentKit — 30 lines, production-ready
import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const agent = new AgentKit({
  model: openai("gpt-4o"),
  name: "My Agent",
  instructions: "You are a helpful assistant.",
  tools: {
    search: {
      description: "Search the web",
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => fetchResults(query),
    },
  },
  memory: { type: "conversation", maxTokens: 4000 },
  retries: 3,
  streaming: true,
});

// That's it. Memory, streaming, retries, logging 
// and type safety — all included.
const result = await agent.run("Hello!");`;

const faqs = [
  {
    q: "What do I get when I purchase?",
    a: "You get 6 production-ready agent templates written in TypeScript, complete with full source code, documentation, and example implementations. Each template is self-contained and can be customized for your specific use case. You also get lifetime updates.",
  },
  {
    q: "Do I need to be an expert in AI/ML?",
    a: "No! If you can write TypeScript and use npm packages, you can use AgentKit. The templates handle all the complex AI orchestration — you just configure the prompts, tools, and models for your use case.",
  },
  {
    q: "Which AI providers are supported?",
    a: "AgentKit works with OpenAI (GPT-4o, o1, etc.), Anthropic (Claude), Google (Gemini), and any provider supported by the Vercel AI SDK. You can also use local models through Ollama. Switching providers is a one-line change.",
  },
  {
    q: "Can I use this in production / commercial projects?",
    a: "Absolutely. The templates are designed for production use from the ground up. They include error handling, retry logic, rate limiting, and monitoring hooks. Use them in any commercial project with no restrictions.",
  },
  {
    q: "How is this different from LangChain or Vercel AI SDK?",
    a: "AgentKit is built on top of the Vercel AI SDK and provides opinionated, production-ready agent patterns. Instead of building from scratch, you get battle-tested templates for common agent architectures. Think of it as the missing cookbook for AI agents.",
  },
];

export default function Home() {
  return (
    <div className="grid-pattern min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm">
                <Sparkles className="w-4 h-4" />
                6 Production-Ready Templates
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Build Production AI Agents in{" "}
                <span className="gradient-text">100 Lines of Code</span>
              </h1>
              <p className="text-lg text-[#a1a1aa] max-w-xl leading-relaxed">
                Stop writing boilerplate. Get 6 battle-tested agent templates for
                research, support, code review, data analysis, content writing,
                and multi-agent orchestration. Ship in hours, not weeks.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
                >
                  Get the Kit — $69
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#templates"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#3f3f46] hover:bg-[#18181b] transition-all"
                >
                  View Templates
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-[#71717a]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  TypeScript
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  OpenAI + Anthropic
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Lifetime Updates
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <CodeBlock code={heroCode} language="typescript" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Ship AI Agents</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto text-lg">
              Each template comes with production-grade features so you can focus
              on your product, not infrastructure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <Card key={feature.title} hover>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agent Templates Preview */}
      <section id="templates" className="py-24 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              6 Agent Templates,{" "}
              <span className="gradient-text">Ready to Deploy</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto text-lg">
              Each template is a complete, working agent. Customize the prompts,
              tools, and models for your use case.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => {
              const Icon = agentIcons[i];
              return (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card hover className="h-full group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#fafafa] group-hover:text-purple-400 transition-colors">
                        {agent.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
                      {agent.description.slice(0, 120)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.features.slice(0, 2).map((f) => (
                        <Badge key={f} variant="purple">
                          {f.split(" ").slice(0, 3).join(" ")}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      View code & details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Comparison */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Write <span className="text-red-400">200 Lines</span> or{" "}
              <span className="gradient-text">30 Lines</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto text-lg">
              Same functionality. Fraction of the code. All the production
              features.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-400">
                  Without AgentKit — 200+ lines
                </span>
              </div>
              <CodeBlock code={withoutCode} language="typescript" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-400">
                  With AgentKit — 30 lines
                </span>
              </div>
              <CodeBlock code={withCode} language="typescript" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built on the{" "}
              <span className="gradient-text">Best AI Infrastructure</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto text-lg">
              AgentKit works with the tools you already use. No lock-in.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "OpenAI", icon: Bot, variant: "green" as const },
              { name: "Anthropic", icon: MessageSquare, variant: "purple" as const },
              { name: "LangChain", icon: Layers, variant: "blue" as const },
              { name: "Vercel AI SDK", icon: Globe, variant: "cyan" as const },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-[#27272a] bg-[#18181b]/60 hover:border-[#3f3f46] transition-colors"
              >
                <tech.icon className="w-6 h-6 text-[#a1a1aa]" />
                <span className="text-lg font-medium text-[#fafafa]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Price.{" "}
              <span className="gradient-text">Everything Included.</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto text-lg">
              No subscriptions. No hidden fees. Pay once, use forever.
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="relative rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-500/5 to-transparent p-8 shadow-[0_0_80px_-20px_rgba(124,58,237,0.3)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="purple">Most Popular</Badge>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">AgentKit Complete</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold gradient-text">$69</span>
                  <span className="text-[#71717a] ml-2">one-time</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "6 Production-Ready Agent Templates",
                  "Full TypeScript Source Code",
                  "Multi-Provider Support (OpenAI, Anthropic, etc.)",
                  "Tool Calling with Zod Schemas",
                  "Memory & Persistence Patterns",
                  "Streaming Response Examples",
                  "Error Handling & Retry Logic",
                  "Documentation & Examples",
                  "Lifetime Updates",
                  "Commercial License",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-[#a1a1aa]">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://gumroad.com/l/agentkit"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-7 py-3.5 text-base font-semibold rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
              >
                Get AgentKit — $69
              </a>
              <p className="text-center text-xs text-[#71717a] mt-4">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#0c0c0e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[#27272a] bg-[#18181b]/60 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[#fafafa] font-medium hover:bg-[#18181b] transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-[#71717a] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-5 text-[#a1a1aa] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-[#fafafa]">
                Agent<span className="gradient-text">Kit</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#71717a]">
              <a href="#features" className="hover:text-[#fafafa] transition-colors">
                Features
              </a>
              <a href="#templates" className="hover:text-[#fafafa] transition-colors">
                Templates
              </a>
              <a href="#pricing" className="hover:text-[#fafafa] transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-[#fafafa] transition-colors">
                FAQ
              </a>
            </div>
            <p className="text-xs text-[#3f3f46]">
              © {new Date().getFullYear()} AgentKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
