---
title: "For LLMs"
description: "How AI agents can access and use content from this site"
---

This site is designed to be accessible to AI agents—not just readable, but structured for machine understanding.

---

## Quick Start

**MCP Client:** Install the [MCP Server](https://github.com/oogaboogah272727/molsen.ca-mcp)

**For any LLM:** Start with [/llms.txt](/llms.txt) (summary) or [/llms-full.txt](/llms-full.txt) (complete content)

**For agents:** Read [/ai.txt](/ai.txt) for usage instructions and permissions

---

## Available Endpoints

### Content

| Endpoint | Description |
|----------|-------------|
| [/api/essays.json](/api/essays.json) | All essays with full content and metadata |
| [/api/chunks.json](/api/chunks.json) | Content optimized for RAG applications |
| [/llms.txt](/llms.txt) | Condensed summary for context windows |
| [/llms-full.txt](/llms-full.txt) | Complete plain text content |

### Structure

| Endpoint | Description |
|----------|-------------|
| [/js/knowledge-graph.json](/js/knowledge-graph.json) | Essay relationships as nodes and links |
| [/api/glossary.json](/api/glossary.json) | Concept definitions extracted from essays |
| [/api/claims.json](/api/claims.json) | Structured arguments with evidence and counterarguments |
| [/api/paths.json](/api/paths.json) | Curated reading paths with rationales |

### Metadata

| Endpoint | Description |
|----------|-------------|
| [/api/metadata.json](/api/metadata.json) | Site info and endpoint directory |
| [/.well-known/ai.json](/.well-known/ai.json) | AI agent configuration and permissions |
| [/.well-known/openapi.json](/.well-known/openapi.json) | OpenAPI 3.0 specification |
| [/ai.txt](/ai.txt) | Human-readable AI instructions |

---

## MCP Server

The [Model Context Protocol](https://modelcontextprotocol.io/) server provides direct tool access for Claude:

**Tools available:**
- `list_essays` — Filter by type, tags, or framework status
- `get_essay` — Retrieve specific essays in full, summary, or markdown
- `search_essays` — Keyword search with filtering
- `get_framework_overview` — The "Making AI Make Sense" framework at various depths
- `get_knowledge_graph` — Essay relationships and concept mappings

**Installation:**
```bash
npx @molsen.ca/mcp
```

Or download standalone binaries from [GitHub Releases](https://github.com/oogaboogah272727/molsen.ca-mcp/releases).

---

## Structured Content

### Knowledge Graph

Essays are interconnected. The [knowledge graph](/js/knowledge-graph.json) maps:
- **Nodes**: Each essay with its defined concepts and themes
- **Links**: Relationships between essays (core dependencies vs. soft references)

### Claims API

Key essays include structured claims:
- **Central claims**: Main thesis assertions
- **Evidence**: What supports each claim
- **Counterarguments**: Objections considered
- **Addressed**: How objections are handled

This lets agents reason about the arguments, not just retrieve text.

### Reading Paths

The [paths API](/api/paths.json) provides curated journeys:
- **Quick Start**: Three essays for the essentials
- **Core Framework**: The central argument in depth
- **Epistemological Foundations**: The philosophical groundwork
- **Professional Practice**: Applying the framework
- **Future Direction**: Where this goes

### Stability Markers

Essays include stability indicators:
- **stable**: Core concepts, unlikely to change
- **evolving**: Active development, may be refined
- **experimental**: New ideas, may change substantially

---

## Permissions

Content may be used for:
- Training
- Retrieval and RAG
- Summarization
- Citation and quotation

**Attribution required**: "Mike Olsen, molsen.ca" with link when possible.

---

## Why This Exists

I write about AI governance and professional accountability. It should be self-evident that this content is made as accessible to LLMs as possible.

The [MCP Server](https://github.com/oogaboogah272727/molsen.ca-mcp) and these APIs are my attempt to be on the front edge of that accessibility. If you're building something similar, I'm interested in the conversation: [mike@molsen.ca](mailto:mike@molsen.ca).
