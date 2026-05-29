import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentKit — Build AI Agents Fast",
  description:
    "Production-ready AI agent templates. Build powerful agents in 100 lines of code with support for OpenAI, Anthropic, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased">
        {children}
      </body>
    </html>
  );
}
