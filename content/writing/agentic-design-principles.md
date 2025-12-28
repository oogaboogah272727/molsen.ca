---
title: "Agentic Design Principles: Building Systems That Think"
date: 2025-01-15
description: "A framework for designing AI systems as collaborative teams of autonomous agents rather than collections of functions."
originalPublication: "Originally published January 2025"
---

> *This essay may be revised as my thinking develops. The version here is authoritative.*

The way we design software systems is shifting. For decades, we've built systems as collections of functions—discrete units of code that execute tasks when called. But as AI capabilities mature and system complexity grows, a different approach is emerging: agentic design.

The core insight is deceptively simple. Traditional system design treats components as tools. Agentic system design treats them as team members. That distinction matters more than it might seem at first.

---

## From Functions to Agents

A function executes tasks. An agent owns outcomes. That's the difference.

When designing a URL shortening service, a traditional approach might define functions: `generateShortCode()`, `saveURL()`, `redirectToLongURL()`, `getAnalytics()`. Each function does exactly what it's told. Nothing more.

An agentic approach reconceptualizes the same service as a collaboration between agents. A URL Agent takes responsibility for the entire URL lifecycle—validating URLs, generating optimal short codes, and learning popular patterns. A Redirect Agent owns the user experience, handling redirects while optimizing response time and adapting caching based on access patterns. An Analytics Agent doesn't just track metrics when asked; it identifies trends and generates reports proactively.

The shift from functions to agents isn't semantic. It changes how we think about responsibility, autonomy, and improvement.

---

## Five Pillars of Agentic Design

### 1. Decomposition by Responsibility

This pillar challenges how we break down systems. Rather than decomposing by function ("we need login, data processing, and notification functions"), we decompose by responsibility ("we need agents responsible for user identity, data intelligence, and communication").

Here's the question I'd ask: "If this system were a company, what would the job titles be?" A social media platform might employ a Content Curator, Community Manager, Trend Analyst, Security Guard, and Relationship Manager—each mapping to an agent with clear ownership and accountability.

### 2. Orchestration Over Control

Traditional systems rely on central control: a main function that calls subfunctions in sequence. Agentic systems prefer orchestration, where coordination emerges from agent interaction.

Think of a restaurant kitchen. The traditional approach has a central controller that validates orders, checks inventory, assigns chefs, oversees preparation, and notifies servers—all in rigid sequence. An agentic approach broadcasts events. An Inventory Agent hears about a new order and autonomously reserves ingredients. A Chef Agent responds to the inventory confirmation and begins preparation. No single point of control exists. Capable agents respond to relevant signals and publish their own.

### 3. Parallel by Default

Every operation that can be parallel should be parallel. This principle forces us to ask: What parts of this operation are truly dependent? Can we split this into independent sub-operations?

In an e-commerce checkout, the traditional sequential flow—validate cart, check inventory, process payment, create order, send confirmation—wastes time. Multiple agents can work simultaneously: a Cart Agent validates structure while an Inventory Agent checks items, a Payment Agent pre-authorizes the transaction, a Tax Agent calculates rates, and a Shipping Agent estimates delivery. Only the final transaction requires their coordinated output.

### 4. Emergent Intelligence

Design simple agents that create complex behaviors through interaction. Each agent has limited, focused intelligence. Complex behavior emerges from their interaction. No single agent understands the whole system. The system becomes smarter than any individual agent.

A content recommendation system illustrates this well. Rather than one monolithic recommendation algorithm, imagine specialized agents: a Trending Agent identifies rapidly growing content, a Personalization Agent understands individual preferences, a Diversity Agent ensures variety, and a Freshness Agent prioritizes recent material. The final recommendation emerges from their negotiation—each contributing candidates, each voting on the final selection. The resulting recommendations exhibit sophistication that no single agent possesses.

### 5. Memory and Learning

Every agent should learn from its experiences. This means maintaining memory, adapting strategy based on past outcomes, and adjusting future behavior based on success and failure.

A learning agent checks its memory for similar past tasks before acting, chooses strategies informed by historical performance, monitors execution outcomes, and deprioritizes approaches that fail. Over time, the agent—and therefore the system—improves without manual intervention.

---

## Patterns for Practice

Several recurring patterns emerge from agentic design:

- **Hive Mind**: Deploy multiple identical agents across distributed data, sharing discoveries among themselves. Useful for log analysis, web scraping, or large-scale data processing.
- **Specialist Network**: Assemble different expert agents for different aspects of complex domains like medical diagnosis or financial analysis.
- **Assembly Line**: Arrange agents in value-adding pipelines, each transforming and enriching data as it flows.
- **Market**: Have agents bid for work based on capabilities and current load. Enables dynamic resource allocation.
- **Council**: Have agents vote on decisions with different weights. Appropriate for complex risk assessment or approval workflows.

---

## Designing for Reality

Practical implementation requires discipline.

1. Identify natural boundaries—the job titles that would exist if the system were an organization.
2. Define each agent's responsibilities, capabilities, dependencies, and interfaces.
3. Design appropriate communication patterns: events for loose coupling, messages for direct communication, shared memory for high-frequency updates.
4. Plan for failure. Each agent should fail independently, degrade gracefully, recover autonomously, and learn from what went wrong.
5. Enable evolution. The system should accommodate new agents without redesign, allow independent upgrades, and let new capabilities emerge from agent combinations.

---

## Why This Matters

Agentic design reflects a maturing understanding of how complex intelligent systems should be structured—whether artificial or organizational. The principles echo insights from distributed systems, organizational design, and collective intelligence research.

As AI systems take on more consequential tasks, how we structure their operation matters. Systems built as rigid control hierarchies are brittle. Systems built as collaborative networks of autonomous agents can adapt, learn, and improve.

Here's the mindset shift: when designing systems, don't just solve today's problem. Create teams of digital workers that understand their responsibilities, collaborate without central control, learn from experience, adapt to new situations, and improve continuously.

The system isn't just built to work. It's built to think, learn, and evolve.
