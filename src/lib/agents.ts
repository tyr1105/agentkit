export interface Agent {
  name: string;
  slug: string;
  description: string;
  icon: string;
  code: string;
  features: string[];
  inputExample: string;
  outputExample: string;
  customizeInstructions: string;
}

export const agents: Agent[] = [
  {
    name: "Research Agent",
    slug: "research",
    description:
      "An autonomous research agent that searches the web, summarizes findings from multiple sources, and produces a cited report. Perfect for due diligence, market research, and competitive analysis.",
    icon: "Search",
    code: `import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const researchAgent = new AgentKit({
  model: openai("gpt-4o"),
  name: "Research Agent",
  instructions: \`You are a thorough research assistant. Given a topic:
1. Search for the most relevant and recent sources
2. Extract key facts and findings from each source
3. Synthesize into a clear summary with citations
4. Highlight any contradictions between sources
Always cite your sources with [number] format.\`,
  tools: {
    webSearch: {
      description: "Search the web for information",
      parameters: z.object({
        query: z.string().describe("Search query"),
        maxResults: z.number().default(5),
      }),
      execute: async ({ query, maxResults }) => {
        const results = await searchWeb(query, maxResults);
        return results.map((r) => ({
          title: r.title,
          url: r.url,
          snippet: r.snippet,
        }));
      },
    },
    scrapePage: {
      description: "Extract text content from a URL",
      parameters: z.object({
        url: z.string().url(),
      }),
      execute: async ({ url }) => {
        return await scrapeUrl(url);
      },
    },
  },
  memory: { type: "conversation", maxTokens: 8000 },
  maxSteps: 5,
});

// Run the agent
const result = await researchAgent.run(
  "Research the current state of AI agent frameworks in 2025"
);

console.log(result.text); // Cited research summary
console.log(result.sources); // Array of source URLs used`,
    features: [
      "Multi-source web search with configurable depth",
      "Automatic citation formatting and source tracking",
      "Contradiction detection between sources",
      "Configurable search depth (1-10 iterations)",
    ],
    inputExample: `"Research the current state of AI agent frameworks in 2025. 
Focus on: LangGraph, CrewAI, AutoGen, and AgentKit. 
Compare their approaches to multi-agent orchestration."`,
    outputExample: `## AI Agent Frameworks in 2025: Research Summary

### Overview
The AI agent framework landscape has matured significantly in 2025, 
with several major players emerging...

### LangGraph [1][2]
- Graph-based approach to agent workflows
- Built on LangChain ecosystem
- Supports cycles and branching logic...

### CrewAI [3]
- Role-based multi-agent collaboration
- Human-instand input loops for oversight...

### Sources
[1] langgraph.dev/docs — Accessed 2025-01-15
[2] arxiv.org/abs/2401.xxx — "Graph-Based Agent Orchestration"
[3] crewai.com — "CrewAI Framework Documentation"`,
    customizeInstructions:
      "Adjust the `instructions` prompt to focus your research agent on specific domains (e.g., scientific papers, financial reports). Modify `maxResults` in the web search tool to control depth. Change `maxSteps` to allow more or fewer research iterations. Add domain-specific tools like arXiv search or SEC filing lookup.",
  },
  {
    name: "Customer Support Bot",
    slug: "customer-support",
    description:
      "An intelligent support bot that handles FAQs, detects customer sentiment, routes complex issues to human agents, and maintains conversation context across sessions.",
    icon: "Headphones",
    code: `import { AgentKit } from "agentkit";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

const supportBot = new AgentKit({
  model: anthropic("claude-sonnet-4-20250514"),
  name: "Support Bot",
  instructions: \`You are a helpful customer support agent. Guidelines:
1. Always greet the customer warmly
2. Classify the issue type (billing, technical, general)
3. Check the knowledge base before answering
4. Track sentiment — escalate if frustrated
5. Never make up policies — use only verified info
6. Summarize the resolution at the end\`,
  tools: {
    searchFAQ: {
      description: "Search the knowledge base for answers",
      parameters: z.object({
        query: z.string(),
        category: z.enum(["billing", "technical", "general"]).optional(),
      }),
      execute: async ({ query, category }) => {
        return await kb.search(query, { category });
      },
    },
    checkOrderStatus: {
      description: "Look up order status by order ID",
      parameters: z.object({
        orderId: z.string(),
      }),
      execute: async ({ orderId }) => {
        return await orders.lookup(orderId);
      },
    },
    escalateToHuman: {
      description: "Escalate conversation to human agent",
      parameters: z.object({
        reason: z.string(),
        priority: z.enum(["low", "medium", "high"]),
        summary: z.string(),
      }),
      execute: async ({ reason, priority, summary }) => {
        await tickets.create({ reason, priority, summary });
        return { ticketId: "TK-" + Date.now(), eta: "~2 hours" };
      },
    },
  },
  memory: { type: "persistent", userId: "from-session" },
});

// Stream responses for real-time chat
const stream = await supportBot.stream("Where is my order #12345?");
for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`,
    features: [
      "Knowledge base search with category filtering",
      "Sentiment tracking with automatic escalation",
      "Order lookup and account integration",
      "Streaming responses for real-time chat",
    ],
    inputExample: `"Hi, I placed an order 3 days ago and haven't received 
any shipping updates. My order number is #ORD-78291. 
Can you help me track it?"`,
    outputExample: `Hi there! I'd be happy to help you track your order. 
Let me look that up for you right away.

📋 **Order #ORD-78291**
- Status: Shipped (Jan 12, 2025)
- Carrier: FedEx
- Tracking: FX-8291-XXXX
- Estimated delivery: Jan 15, 2025

Your package is currently in transit and on its way! 
It left our warehouse in Austin, TX and is expected 
to arrive by Wednesday.

Is there anything else I can help you with?`,
    customizeInstructions:
      "Add your own knowledge base by implementing the `searchFAQ` tool to query your docs. Connect to your CRM by adding tools for account lookup, refund processing, etc. Adjust the escalation thresholds by modifying the sentiment tracking logic. Add multi-language support by updating the instructions prompt.",
  },
  {
    name: "Code Reviewer",
    slug: "code-reviewer",
    description:
      "An automated code review agent that analyzes PR diffs, identifies bugs and security issues, suggests improvements, and enforces coding standards.",
    icon: "Code",
    code: `import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const codeReviewer = new AgentKit({
  model: openai("gpt-4o"),
  name: "Code Reviewer",
  instructions: \`You are a senior code reviewer. For each diff:
1. Identify bugs, security vulnerabilities, and logic errors
2. Check for performance issues and anti-patterns
3. Verify error handling is comprehensive
4. Suggest improvements with specific code examples
5. Rate severity: critical, warning, suggestion
6. Check for test coverage of new code
Be thorough but constructive. Always explain WHY.\`,
  tools: {
    analyzeDiff: {
      description: "Analyze a git diff for issues",
      parameters: z.object({
        diff: z.string().describe("The git diff content"),
        language: z.string().describe("Programming language"),
      }),
      execute: async ({ diff, language }) => {
        return { diffLines: diff.split("\\n").length, language };
      },
    },
    checkStyleGuide: {
      description: "Check code against style guide rules",
      parameters: z.object({
        code: z.string(),
        rules: z.array(z.string()).optional(),
      }),
      execute: async ({ code, rules }) => {
        return await linter.check(code, rules);
      },
    },
    suggestFix: {
      description: "Generate a fix for the identified issue",
      parameters: z.object({
        originalCode: z.string(),
        issue: z.string(),
        context: z.string(),
      }),
      execute: async ({ originalCode, issue, context }) => {
        return { suggestion: "Fix generated", diff: "..." };
      },
    },
  },
  memory: { type: "none" },
});

const review = await codeReviewer.run(\`
Review this PR diff for a login endpoint:
\${prDiff}
\`);

console.log(review.issues);   // Array of found issues
console.log(review.summary);  // PR review summary`,
    features: [
      "Bug detection with severity classification",
      "Security vulnerability scanning",
      "Style guide enforcement with auto-fix",
      "PR summary generation",
    ],
    inputExample: `"Review this pull request diff that adds a new 
login endpoint with JWT authentication. 
Check for security issues and best practices."

\`\`\`diff
+ app.post('/login', async (req, res) => {
+   const user = await db.query(
+     \`SELECT * FROM users WHERE email = '\${req.body.email}'\`
+   );
+   const token = jwt.sign({ id: user.id }, 'secret');
+   res.json({ token });
+ });
\`\`\``,
    outputExample: `## Code Review Summary

🔴 **Critical** — SQL Injection Vulnerability
Line 3: Raw string interpolation in SQL query.
\`\`\`javascript
// Before
\`SELECT * FROM users WHERE email = '\${req.body.email}'\`
// After
db.query('SELECT * FROM users WHERE email = $1', [req.body.email])
\`\`\`

🟡 **Warning** — Hardcoded JWT Secret
Line 4: Use environment variable instead of 'secret'.
\`\`\`javascript
jwt.sign({ id: user.id }, process.env.JWT_SECRET)
\`\`\`

🟡 **Warning** — Missing Input Validation
No validation on req.body.email or password fields.

🟢 **Suggestion** — Add rate limiting to prevent brute force.

**Overall**: 2 warnings, 1 critical issue. Do not merge.`,
    customizeInstructions:
      "Customize the review instructions to match your team's coding standards. Add tools for running linters (ESLint, Pylint) and formatters. Connect to GitHub/GitLab APIs to post review comments directly on PRs. Add language-specific analyzers by extending the `analyzeDiff` tool.",
  },
  {
    name: "Data Analyst",
    slug: "data-analyst",
    description:
      "A natural language data analyst that converts plain English questions into SQL queries, executes them, and generates visualizations and insights.",
    icon: "BarChart3",
    code: `import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const dataAnalyst = new AgentKit({
  model: openai("gpt-4o"),
  name: "Data Analyst",
  instructions: \`You are a data analyst. Given a natural language query:
1. Understand what data the user wants
2. Generate a safe, read-only SQL query
3. Execute the query against the database
4. Interpret the results in plain English
5. Suggest relevant follow-up queries
6. Identify notable trends or anomalies
Never generate INSERT, UPDATE, or DELETE queries.\`,
  tools: {
    getSchema: {
      description: "Get the database schema for context",
      parameters: z.object({
        tables: z.array(z.string()).optional(),
      }),
      execute: async ({ tables }) => {
        return await db.getSchema(tables);
      },
    },
    runQuery: {
      description: "Execute a read-only SQL query",
      parameters: z.object({
        sql: z.string().describe("SELECT query only"),
        chartType: z.enum(["table", "bar", "line", "pie"]).optional(),
      }),
      execute: async ({ sql, chartType }) => {
        // Validate it's a SELECT query
        if (!sql.trim().toUpperCase().startsWith("SELECT")) {
          throw new Error("Only SELECT queries are allowed");
        }
        const results = await db.execute(sql);
        return { rows: results, rowCount: results.length, chartType };
      },
    },
    explainResults: {
      description: "Generate natural language explanation",
      parameters: z.object({
        query: z.string(),
        results: z.array(z.record(z.unknown())),
        question: z.string(),
      }),
      execute: async ({ query, results, question }) => {
        return { explanation: "Analysis generated", insights: [] };
      },
    },
  },
  memory: { type: "conversation", maxTokens: 4000 },
});

const analysis = await dataAnalyst.run(
  "What were our top 10 products by revenue last quarter?"
);

console.log(analysis.sql);        // Generated SQL
console.log(analysis.results);    // Query results
console.log(analysis.explanation); // Plain English summary`,
    features: [
      "Natural language to SQL conversion",
      "Schema-aware query generation",
      "Read-only safety enforcement",
      "Automatic trend and anomaly detection",
    ],
    inputExample: `"Compare our monthly revenue for 2024 vs 2025 
so far. Show me which months grew and which declined. 
Also highlight any unusual spikes."`,
    outputExample: `## Revenue Comparison: 2024 vs 2025

\`\`\`sql
SELECT 
  MONTH(date) as month,
  SUM(CASE WHEN YEAR(date)=2024 THEN amount END) as rev_2024,
  SUM(CASE WHEN YEAR(date)=2025 THEN amount END) as rev_2025
FROM transactions
WHERE status = 'completed'
GROUP BY MONTH(date)
ORDER BY month;
\`\`\`

### Results
| Month | 2024     | 2025     | Change  |
|-------|----------|----------|---------|
| Jan   | $142,000 | $198,000 | +39.4%  |
| Feb   | $128,000 | $187,000 | +46.1%  |
| Mar   | $155,000 | $221,000 | +42.6%  |

📈 **Key Insight**: 2025 is averaging 42% growth over 2024.
⚠️ **Anomaly**: March 2025 shows unusual spike — likely 
due to the Product Hunt launch on Mar 12.`,
    customizeInstructions:
      "Point the `getSchema` and `runQuery` tools to your database. Add chart rendering by integrating with a visualization library (Recharts, D3). Add tools for CSV export, scheduled reports, or Slack notifications. Customize the `instructions` to include your business metrics and KPI definitions.",
  },
  {
    name: "Content Writer",
    slug: "content-writer",
    description:
      "An SEO-optimized content generation agent that creates blog posts, articles, and marketing copy with proper structure, keywords, and readability.",
    icon: "PenTool",
    code: `import { AgentKit } from "agentkit";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

const contentWriter = new AgentKit({
  model: anthropic("claude-sonnet-4-20250514"),
  name: "Content Writer",
  instructions: \`You are an expert content writer specializing in SEO.
For each request:
1. Research the topic and target keywords
2. Create a detailed outline with H2/H3 headers
3. Write engaging, well-structured content
4. Optimize for target keywords (2-3% density)
5. Include meta description and title tag
6. Add internal linking suggestions
7. Ensure readability score > 70 (Flesch-Kincaid)
Always maintain the brand voice and cite sources.\`,
  tools: {
    keywordResearch: {
      description: "Research keywords and search volume",
      parameters: z.object({
        topic: z.string(),
        intent: z.enum(["informational", "commercial", "transactional"]),
      }),
      execute: async ({ topic, intent }) => {
        return await seoApi.getKeywords(topic, intent);
      },
    },
    analyzeSEO: {
      description: "Analyze content for SEO score",
      parameters: z.object({
        content: z.string(),
        targetKeywords: z.array(z.string()),
      }),
      execute: async ({ content, targetKeywords }) => {
        return await seoApi.analyze(content, targetKeywords);
      },
    },
    checkReadability: {
      description: "Check content readability score",
      parameters: z.object({ content: z.string() }),
      execute: async ({ content }) => {
        return { score: 72, grade: "8th grade", suggestions: [] };
      },
    },
  },
  memory: { type: "none" },
});

const post = await contentWriter.run({
  topic: "Building AI Agents in Production",
  keywords: ["AI agents", "LLM agents", "production AI"],
  tone: "technical but accessible",
  length: "2000 words",
});

console.log(post.title);       // SEO-optimized title
console.log(post.outline);     // Structured outline
console.log(post.content);     // Full article
console.log(post.meta);        // Meta description + tags`,
    features: [
      "Keyword research and density optimization",
      "Automatic outline and structure generation",
      "Readability scoring and improvement",
      "Meta description and SEO metadata",
    ],
    inputExample: `"Write a blog post about 'Building AI Agents 
in Production'. Target keywords: AI agents, LLM agents, 
production AI. Tone: technical but accessible. 
Length: ~2000 words. Include code examples."`,
    outputExample: `## Output Preview

**Title**: Building AI Agents in Production: A Complete 
Guide (2025 Edition)

**Meta Description**: Learn how to build, deploy, and 
scale production-ready AI agents. Covers architecture 
patterns, error handling, and real-world examples.

### Outline
1. Why AI Agents Matter in 2025
2. Architecture Patterns for Production Agents
3. The Tool-Calling Pattern
4. Error Handling & Recovery
5. Monitoring & Observability
6. Cost Optimization Strategies
7. Case Study: Customer Support Agent at Scale

### SEO Score: 87/100
- ✅ Keyword density: 2.1%
- ✅ Readability: 74 (8th grade)
- ✅ Internal links: 3 suggested
- ⚠️ Add alt text to images`,
    customizeInstructions:
      "Customize the brand voice by modifying the instructions prompt. Connect your SEO API of choice (Ahrefs, SEMrush) to the keyword research tool. Add tools for plagiarism checking, image generation, or social media snippet creation. Integrate with your CMS (WordPress, Contentful) to publish directly.",
  },
  {
    name: "Multi-Agent Orchestrator",
    slug: "orchestrator",
    description:
      "A meta-agent that routes complex tasks to specialized sub-agents, manages context between them, and synthesizes their outputs into a cohesive result.",
    icon: "Network",
    code: `import { AgentKit } from "agentkit";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Define specialized sub-agents
const researcher = new AgentKit({
  model: openai("gpt-4o"),
  name: "Researcher",
  instructions: "You research topics thoroughly and provide facts.",
  tools: { webSearch, scrapePage },
});

const writer = new AgentKit({
  model: openai("gpt-4o"),
  name: "Writer",
  instructions: "You write clear, engaging content from research.",
});

const reviewer = new AgentKit({
  model: openai("gpt-4o"),
  name: "Reviewer",
  instructions: "You review content for accuracy and quality.",
});

// Orchestrator that routes between them
const orchestrator = new AgentKit({
  model: openai("gpt-4o"),
  name: "Orchestrator",
  instructions: \`You are a task orchestrator. Break complex tasks into 
steps and delegate to specialized agents:
- "researcher" — for gathering information
- "writer" — for creating content
- "reviewer" — for quality checks
Coordinate the workflow and synthesize results.\`,
  tools: {
    delegateToResearcher: {
      description: "Delegate a research task",
      parameters: z.object({ task: z.string() }),
      execute: async ({ task }) => {
        return await researcher.run(task);
      },
    },
    delegateToWriter: {
      description: "Delegate a writing task",
      parameters: z.object({
        task: z.string(),
        context: z.string(),
      }),
      execute: async ({ task, context }) => {
        return await writer.run(\`\${task}\\n\\nContext: \${context}\`);
      },
    },
    delegateToReviewer: {
      description: "Delegate a review task",
      parameters: z.object({
        content: z.string(),
        criteria: z.array(z.string()),
      }),
      execute: async ({ content, criteria }) => {
        return await reviewer.run(
          \`Review this: \${content}\\nCriteria: \${criteria.join(", ")}\`
        );
      },
    },
  },
  memory: { type: "conversation", maxTokens: 12000 },
  maxSteps: 10,
});

const result = await orchestrator.run(
  "Write a technical blog post about RAG architectures"
);`,
    features: [
      "Intelligent task decomposition and routing",
      "Context passing between specialized agents",
      "Parallel execution of independent sub-tasks",
      "Result synthesis and quality control loops",
    ],
    inputExample: `"Write a comprehensive comparison of React vs 
Vue vs Svelte. Research the current state of each 
framework, write the comparison, and have it reviewed 
for accuracy before delivering the final version."`,
    outputExample: `## Orchestration Log

### Step 1: Research Phase
→ Delegated to Researcher
  - Researching React ecosystem (2025)
  - Researching Vue ecosystem (2025)
  - Researching Svelte ecosystem (2025)
  ✅ Research complete — 47 facts gathered

### Step 2: Writing Phase
→ Delegated to Writer
  ✅ Draft complete — 2,400 words

### Step 3: Review Phase
→ Delegated to Reviewer
  ⚠️ Found 2 factual inaccuracies
  ⚠️ Suggested adding bundle size comparison
  ✅ Review complete

### Step 4: Revision
→ Delegated to Writer (with review feedback)
  ✅ Final version — 2,600 words, all issues resolved

### Final Output
[Complete article delivered with research-backed 
comparisons, accurate benchmarks, and balanced 
perspective across all three frameworks.]`,
    customizeInstructions:
      "Add more specialized sub-agents for your use case (e.g., Designer, QA Tester, Data Analyst). Customize the routing logic by modifying the orchestrator's instructions. Add parallel execution for independent tasks. Implement approval gates where human review is required before proceeding. Adjust `maxSteps` for complex multi-stage workflows.",
  },
];
