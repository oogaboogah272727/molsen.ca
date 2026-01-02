# molsen.ca

Hugo static site for [molsen.ca](https://molsen.ca) — essays on AI governance, professional accountability, and human-AI cooperation.

## Quick Start

```bash
# Install Hugo (if needed)
brew install hugo  # macOS
# or see https://gohugo.io/installation/

# Development
hugo server -D

# Build
hugo --gc --minify
```

## Site Structure

```
content/
├── _index.md              # Landing page content
├── about.md               # About page
├── contact.md             # Contact page
├── for-llms.md            # LLM accessibility documentation
└── writing/
    ├── _index.md          # Writing section index
    └── *.md               # Essays

layouts/
├── index.html             # Landing page template
├── index.json             # Default JSON output
├── index.api.json         # /api/essays.json
├── index.meta.json        # /api/metadata.json
├── index.graph.json       # /js/knowledge-graph.json
├── index.glossary.json    # /api/glossary.json
├── index.claims.json      # /api/claims.json
├── index.paths.json       # /api/paths.json
├── index.chunks.json      # /api/chunks.json
├── index.llms.txt         # /llms.txt
└── index.llmsfull.txt     # /llms-full.txt

data/
└── paths.yaml             # Reading path definitions

static/
├── ai.txt                 # AI agent instructions
├── css/style.css          # Styles
└── .well-known/
    ├── ai.json            # Structured AI metadata
    └── openapi.json       # OpenAPI 3.0 spec
```

---

## LLM Accessibility Infrastructure

This site is designed for AI agent accessibility. All endpoints are auto-generated from essay front matter on each build.

### Endpoints Overview

| Endpoint | Source | Description |
|----------|--------|-------------|
| `/api/essays.json` | `index.api.json` | All essays with full content |
| `/api/metadata.json` | `index.meta.json` | Site info, endpoint directory |
| `/api/glossary.json` | `index.glossary.json` | Aggregates `defines` from all essays |
| `/api/claims.json` | `index.claims.json` | Aggregates `claims` from essays |
| `/api/paths.json` | `index.paths.json` | Reading paths from `data/paths.yaml` |
| `/api/chunks.json` | `index.chunks.json` | Essay content for RAG |
| `/js/knowledge-graph.json` | `index.graph.json` | Essay relationships |
| `/llms.txt` | `index.llms.txt` | Summary for context windows |
| `/llms-full.txt` | `index.llmsfull.txt` | Complete essay content |
| `/ai.txt` | `static/ai.txt` | Agent instructions (static) |
| `/.well-known/ai.json` | `static/.well-known/ai.json` | Structured agent config (static) |
| `/.well-known/openapi.json` | `static/.well-known/openapi.json` | API spec (static) |

### Output Formats (hugo.toml)

The site uses custom Hugo output formats defined in `hugo.toml`:

```toml
[outputs]
  home = ["HTML", "JSON", "LLMS", "LLMSFULL", "API", "META", "GRAPH", "GLOSSARY", "CLAIMS", "PATHS", "CHUNKS"]
```

Each format maps to a template in `layouts/` with a corresponding `baseName` that determines the output path.

---

## Essay Front Matter

### Required Fields

```yaml
---
title: "Essay Title"
date: 2024-01-15
description: "One-sentence description"
type: foundational  # hub | foundational | core | theoretical | applied | empirical | practice
tags: ["AI Governance", "Professional Practice"]
---
```

### Knowledge Graph Metadata

Add these fields to include an essay in the knowledge graph:

```yaml
# Knowledge graph metadata
graph_id: unique-short-id    # Used for relationships (e.g., "eka", "oracle-assistant")
defines: ["Concept One", "Concept Two"]  # Concepts this essay defines
themes: ["AI Governance", "Epistemic Rigor"]  # Thematic categories
relationships:
  - target: other-essay-graph-id
    type: core      # core = essential dependency, soft = reference
    label: extends  # describes the relationship
  - target: another-essay
    type: soft
    label: references
```

**How it works:**
- `graph_id`: Short identifier used in `relationships.target` references
- `defines`: Aggregated into `/api/glossary.json`
- `relationships`: Become links in `/js/knowledge-graph.json`

### Structured Claims

For essays with formal arguments, add claims:

```yaml
# Structured claims
claims:
  - claim: "The main assertion being made"
    type: central           # central | supporting | implication
    evidence: "What supports this claim"
    counters:
      - "A counterargument considered"
      - "Another counterargument"
    addressed: "How the counterarguments are addressed"
  - claim: "A secondary assertion"
    type: supporting
    evidence: "Supporting evidence"
```

**Claim types:**
- `central`: Main thesis of the essay
- `supporting`: Claims that build toward the central claim
- `implication`: Consequences that follow from the central claim

### Stability Markers

Indicate how stable the essay's content is:

```yaml
stability: stable      # stable | evolving | experimental
```

- `stable`: Core concepts, unlikely to change
- `evolving`: Active development, may be refined
- `experimental`: New ideas, may change substantially

---

## Adding a New Essay

1. Create `content/writing/your-essay-slug.md`

2. Add front matter:
```yaml
---
title: "Your Essay Title"
date: 2024-01-15
description: "One-sentence description"
type: core
tags: ["AI Governance"]
stability: evolving

# Knowledge graph metadata
graph_id: your-essay
defines: ["New Concept"]
themes: ["AI Governance"]
relationships:
  - target: related-essay-id
    type: soft
    label: references
---
```

3. Write content in Markdown

4. Build to verify: `hugo server -D`

5. The essay automatically appears in:
   - `/api/essays.json`
   - `/js/knowledge-graph.json` (if `graph_id` present)
   - `/api/glossary.json` (if `defines` present)
   - `/api/claims.json` (if `claims` present)
   - `/llms.txt` and `/llms-full.txt`

---

## Reading Paths

Curated reading journeys are defined in `data/paths.yaml`:

```yaml
paths:
  - id: path-id
    name: "Path Display Name"
    description: "What this path covers"
    audience: "Who this path is for"
    essays:
      - slug: essay-file-name  # Without .md extension
        rationale: "Why read this essay here"
      - slug: another-essay
        rationale: "Why this comes next"
```

The `slug` must match the essay's filename (e.g., `ai-oracle-vs-assistant` for `ai-oracle-vs-assistant.md`).

Paths are rendered to `/api/paths.json` via `layouts/index.paths.json`.

---

## Static Files

These files are maintained manually (not auto-generated):

### `/static/ai.txt`
Human-readable AI agent instructions. Update when:
- New endpoints are added
- Reading order changes
- Usage guidelines change

### `/static/.well-known/ai.json`
Structured agent configuration. Update when:
- New endpoints are added
- Permissions change
- MCP server info changes

### `/static/.well-known/openapi.json`
OpenAPI 3.0 specification. Update when:
- New endpoints are added
- Response schemas change

---

## MCP Server

A separate repository provides an MCP server for this site's content:

**Repository:** [github.com/oogaboogah272727/molsen.ca-mcp](https://github.com/oogaboogah272727/molsen.ca-mcp)

**Installation:**
```bash
npx @molsen.ca/mcp
```

**Tools provided:**
- `list_essays` — Filter essays by type, tags, framework status
- `get_essay` — Retrieve specific essays
- `search_essays` — Keyword search
- `get_framework_overview` — Framework at various depths
- `get_knowledge_graph` — Essay relationships

The MCP server fetches from the live site endpoints. No deployment coordination needed—the server always uses current content.

---

## Maintenance Checklist

### When adding a new essay:
- [ ] Add `graph_id` if it should be in the knowledge graph
- [ ] Add `defines` for any new concepts introduced
- [ ] Add `relationships` to connect to related essays
- [ ] Consider adding `claims` for formal arguments
- [ ] Set appropriate `stability` marker
- [ ] Add to `content/writing/_index.md` (manually curated list)
- [ ] Add to `data/paths.yaml` if it belongs in a reading path
- [ ] Add `graph_id` to README reference table

### When adding a new endpoint:
- [ ] Create template in `layouts/`
- [ ] Add output format to `hugo.toml`
- [ ] Add to outputs list in `hugo.toml`
- [ ] Update `/static/ai.txt`
- [ ] Update `/static/.well-known/ai.json`
- [ ] Update `/static/.well-known/openapi.json`
- [ ] Update `/content/for-llms.md`
- [ ] Update landing page For LLMs tab if appropriate

### When updating reading paths:
- [ ] Edit `data/paths.yaml`
- [ ] Verify essay slugs match filenames

---

## Graph IDs Reference

Current `graph_id` values for use in `relationships.target`:

| graph_id | Essay |
|----------|-------|
| `making-sense` | Making AI Make Sense |
| `oracle-assistant` | AI as Oracle vs. Assistant |
| `strong-oracle-trap` | The Strong Oracle Trap |
| `eka` | Executable Knowledge Architecture |
| `knowledge-capability` | Knowledge as Capability |
| `agent-tacitness` | Agent-Relative Tacitness |
| `tacit-shrinkage` | Tacit Space Shrinkage |
| `capability-governance` | Capability Governance |
| `stochasticity` | Stochastic in Form, Deterministic in Function |
| `parrots` | Parrots Are All You Need |
| `consulting-threat` | Existential Threat to Consulting |
| `ai-first` | AI-First Software |
| `table-extraction` | Evaluating AI Table Extraction |
| `critical-thinking` | Mike's Rules for Critical Thinking |
| `leadership-scifi` | Leadership Lessons from Science Fiction |
| `support-team` | The Real Job of Support Teams |
| `remote-work` | The Remote Work Formula |
| `agentic-universal` | Agentic AI as Universal Interface |
| `automating-expertise` | Automating Expertise Gets Easier |
| `ontology-generation` | Ontology Generation |
| `benchmarks` | What Benchmarks Aren't Measuring |
| `return-assistant` | The Return of the Assistant |
| `office-availability` | The Office Availability Math |
| `eka-practice` | EKA in Practice |
| `universal-interface` | The Universal Interface Thesis |

---

## License

Content: All rights reserved.
Code/Templates: MIT
