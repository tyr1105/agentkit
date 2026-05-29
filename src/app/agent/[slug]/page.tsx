import { agents } from "@/lib/agents";
import { Nav } from "@/components/nav";
import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Headphones,
  Code,
  BarChart3,
  PenTool,
  Network,
  ArrowRight,
  MousePointerClick,
  Terminal,
  Lightbulb,
  Wrench,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Headphones,
  Code,
  BarChart3,
  PenTool,
  Network,
};

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: `${agent.name} — AgentKit`,
    description: agent.description,
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    notFound();
  }

  const Icon = iconMap[agent.icon] || Search;

  return (
    <div className="grid-pattern min-h-screen">
      <Nav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/#templates"
          className="inline-flex items-center gap-2 text-sm text-[#71717a] hover:text-[#fafafa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all templates
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center shrink-0">
            <Icon className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {agent.name}
            </h1>
            <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-2xl">
              {agent.description}
            </p>
          </div>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap gap-2 mb-12">
          {agent.features.map((feature) => (
            <Badge key={feature} variant="purple">
              {feature}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-cyan-500/5 p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#fafafa] mb-1">
              Get this template + 5 more
            </h3>
            <p className="text-sm text-[#a1a1aa]">
              Full source code, documentation, and lifetime updates included.
            </p>
          </div>
          <a
            href="#pricing"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white hover:opacity-90 transition-opacity"
          >
            Get the Kit — $69
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Code */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold">Complete Source Code</h2>
          </div>
          <CodeBlock code={agent.code} language="typescript" />
        </section>

        {/* What this agent does */}
        <section className="mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold">What This Agent Does</h2>
            </div>
            <div className="space-y-3 text-[#a1a1aa] leading-relaxed">
              {agent.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* How to customize */}
        <section className="mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold">How to Customize</h2>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed">
              {agent.customizeInstructions}
            </p>
          </Card>
        </section>

        {/* Input/Output Example */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <MousePointerClick className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-semibold">Input / Output Example</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-emerald-400 mb-3 uppercase tracking-wider">
                Input
              </h3>
              <div className="rounded-xl border border-[#27272a] bg-[#0c0c0e] p-4">
                <pre className="text-sm text-[#a1a1aa] whitespace-pre-wrap leading-relaxed font-mono">
                  {agent.inputExample}
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-purple-400 mb-3 uppercase tracking-wider">
                Output
              </h3>
              <div className="rounded-xl border border-[#27272a] bg-[#0c0c0e] p-4">
                <pre className="text-sm text-[#a1a1aa] whitespace-pre-wrap leading-relaxed font-mono">
                  {agent.outputExample}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation between agents */}
        <div className="border-t border-[#27272a] pt-8 mt-16">
          <h3 className="text-sm font-medium text-[#71717a] mb-4 uppercase tracking-wider">
            More Templates
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {agents
              .filter((a) => a.slug !== agent.slug)
              .slice(0, 3)
              .map((other) => {
                const OtherIcon = iconMap[other.icon] || Search;
                return (
                  <Link
                    key={other.slug}
                    href={`/agent/${other.slug}`}
                    className="group rounded-xl border border-[#27272a] bg-[#18181b]/60 p-4 hover:border-[#3f3f46] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <OtherIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold text-[#fafafa] group-hover:text-purple-400 transition-colors">
                        {other.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#71717a] line-clamp-2">
                      {other.description.slice(0, 80)}...
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
