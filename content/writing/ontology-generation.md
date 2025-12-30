---
title: "Ontology Generation"
date: 2025-06-30
description: "When the AI tool is the universal interface, comprehensive logs reveal both what the organization does and what concepts it uses. Structure and procedure emerge together."
type: core
tags: ["AI Governance", "Professional Practice"]
---

An ontology, in the practical sense, is a structured representation of what an organization knows: its concepts, their properties, and the relationships between them. Palantir built a business around this idea. Their Foundry platform centers on creating an "ontology layer" that models an organization's entities and operations in a unified structure. Objects, properties, relationships, actions — all made explicit and queryable.

Organizations that know what they know, in a structured way, can act on that knowledge systematically. The alternative is tribal knowledge: expertise locked in individual heads, processes documented (if at all) in prose that drifts from reality, institutional memory that walks out the door when people leave.

The problem has always been construction. Building an ontology is expensive. It requires extracting knowledge from experts, formalizing it into structures, validating that the structures match reality, and maintaining them as the organization evolves. Most organizations don't have the resources or discipline to do this well. So the knowledge stays scattered, implicit, inconsistent.

---

## The Universal Interface Changes This

When [Agentic AI becomes the universal interface](/writing/agentic-ai-universal-interface/), something shifts: all user interactions with systems flow through the tool. Every task, every query, every operation goes through natural language interaction with the AI.

This means the logs are comprehensive. Not a sample of how people work — the complete record.

From those logs, two things emerge:

**Structural ontology — what things are.** When someone says "find all orders for customer X that shipped after Y," the interaction reveals:
- Entities: orders, customers
- Properties: ship date
- Relationships: orders belong to customers

Repeat this across thousands of interactions, and the conceptual structure of the organization becomes visible. What entities do people reference? What properties matter? How do concepts relate? The ontology emerges from accumulated usage.

**Procedural patterns — how things get done.** When someone successfully completes a task, the interaction captures:
- The specification of intent
- The generated approach
- The execution result

Repeat this, and patterns surface. Similar tasks solved similarly become candidates for templates. The one-off becomes reusable.

Both layers emerge from the same source: comprehensive logging of natural language interactions with the universal interface.

---

## The Generation Path

**For structural ontology:**

1. **Interactions reference concepts.** Every task mentions entities, properties, relationships — implicitly or explicitly.

2. **Concepts accumulate across interactions.** The same entities appear repeatedly. Properties get referenced. Relationships get expressed.

3. **Structure becomes visible.** "Customers" appear with "orders." "Orders" have "ship dates" and "line items." "Products" belong to "categories." The conceptual model emerges from usage patterns.

4. **Validation confirms or corrects.** Human review checks whether the emergent structure matches organizational reality. Artifacts get renamed, relationships get clarified, gaps get identified.

**For procedural patterns:**

1. **Tasks produce logs.** Each interaction generates a record: what was asked, what was produced, whether it worked.

2. **Successful approaches get identified.** When tasks succeed, the logs capture working solutions: intent, translation, artifact.

3. **Recurring patterns get extracted.** Similar tasks solved similarly become candidates for templates.

4. **Validation promotes templates.** Human judgment decides which patterns are worth encoding for reuse. Validated patterns become [method-bearing artifacts](/writing/capability-governance/)—defensible through exposed methodology rather than reputation alone.

5. **Templates become available.** Validated patterns are distributed — available to agents across the organization.

---

## What This Solves

**The construction problem.** Both structural ontology and procedural templates get built as a byproduct of work, not as a separate project. Every interaction contributes.

**The maintenance problem.** Traditional ontologies drift from reality because maintaining them is a separate activity. Generated ontologies track usage patterns because they're continuously rebuilt from interaction logs — though what people say and what they do can diverge, and that gap requires attention.

**The tribal knowledge problem.** When an expert works through the tool, their knowledge gets captured — both what concepts they use and how they accomplish tasks. Knowledge that would otherwise stay in their head becomes encoded and available. This is [tacit space shrinkage](/writing/tacit-space-shrinkage/) in action: the tool serves as an interlocutor that helps articulate what was previously inexpressible.

**The distribution problem.** Once a pattern or concept is in the system, every agent can use it. No training cascade. The knowledge is available at the point of need.

---

## The Palantir Comparison

Palantir's approach requires deliberate construction: ontology architects who model the organization, engineers who build integrations, ongoing maintenance to keep the model current. It works, but it's expensive. It requires commitment and expertise that most organizations lack.

The generation approach inverts this. The ontology emerges from work rather than preceding it. The architects are the domain experts doing their jobs — their natural language interactions reveal the conceptual structure. Candidate generation is continuous; validation still requires judgment.

Both approaches produce structured organizational knowledge. Palantir's is designed top-down by specialists. The generation approach derives bottom-up from usage. For organizations that can't or won't invest in deliberate construction, the generation path produces ontologies as a side effect of adoption.

---

## What This Requires

**Comprehensive logging.** The tool must capture interactions in queryable form. This is only possible when the tool is the universal interface — if interactions bypass it, the logs are incomplete.

**Concept extraction.** Something needs to identify entities, properties, and relationships from accumulated interactions. This is hard — entity resolution across diverse phrasings, relationship inference, schema induction. Current AI can do reasonable extraction on individual texts; aggregating across thousands of interactions to build coherent structure is an active research problem. The generation approach doesn't require perfect extraction. It requires extraction good enough that validation can catch errors.

**Pattern extraction.** Recurring successful approaches need to be identified and proposed as template candidates. Similar tasks, similar solutions — the clustering problem.

**Validation process.** Both structural ontology and procedural templates need human review before becoming canonical. Is this concept real? Does this pattern generalize? What could go wrong? At scale, this means: prioritizing high-frequency candidates, delegating domain-specific validation to domain owners, accepting that some candidates will wait. Validation is the bottleneck — which is better than having no candidates to validate.

**Distribution mechanism.** Validated knowledge needs to reach agents across the organization. Concretely: a registry of approved concepts and templates, queryable by agents when they encounter similar tasks. Version control for when patterns evolve. Context tags for when a pattern applies in some situations but not others.

---

## Objections

**"This assumes logging everything, which raises privacy and security concerns."** True, and this is more sensitive than typical logging. AI interaction logs contain how people think through problems, not just outcomes. Strategic reasoning exposed in natural language. Mistakes and confusion visible in the interaction flow. This is categorically different from server logs or transaction records. Appropriate controls matter: what gets logged, who can access it, how long it's retained, who can query the aggregate. The logging isn't optional if generation is to work — but the governance needs to match the sensitivity.

**"Concept extraction will find spurious patterns."** Yes. Not every entity reference is a real concept. Not every relationship expressed reflects actual structure. Validation exists precisely for this reason. The generation process produces candidates; human judgment promotes them to canonical status.

**"Different experts use different terms for the same thing."** This is where the generation approach has an advantage. Usage patterns reveal synonyms. If "clients" and "customers" appear in the same structural positions, the system can propose consolidation. Traditional ontology construction requires someone to notice and reconcile these differences manually.

**"What about conflicting patterns? Different experts solve the same problem differently."** Both approaches can be valid. The validation process can maintain variants: "Pattern A works for context X; Pattern B works for context Y." Or it can choose one and deprecate the other. The conflict becomes visible — which is better than the current state where conflicting approaches exist without anyone knowing.

**"This only captures what people actually do with the tool."** True. Domains that aren't touched don't accumulate ontology. This is a feature, not a bug. The generated ontology reflects what matters in practice. If a domain is organizationally important but rarely touched through the tool, that gap becomes visible — a signal, not a failure.

**"Won't this lock in current practices?"** The ontology captures what works, not what's mandated. If better approaches emerge, they'll appear in the logs. The validation process can ask: Is this new pattern better than the existing template? Ontologies should evolve, not fossilize. This is the desire path approach: build the sidewalk where people actually walk, not where you think they should.

**"How does this start? Chicken and egg."** Early interactions happen without ontological support. The system bootstraps cold. The first patterns are extracted from scratch. Over time, the ontology accumulates and agents start benefiting. The cold-start period is real — the approach is less valuable on day one than on day one hundred. This is an adoption curve, not a barrier.

**"What happens when the ontology is wrong?"** Errors discovered post-promotion need a correction mechanism: deprecation flags, version history, downstream dependency tracking. When a concept or pattern is retired, agents need to know. This is operational overhead — less than maintaining a traditional ontology from scratch, but not zero.

**"Different parts of the organization will develop incompatible structures."** Cross-domain coherence is a real problem. If finance models "customers" differently than operations, the ontology fragments. The generation approach needs periodic reconciliation: identifying overlapping concepts across domains, proposing unification, flagging conflicts for human resolution. Palantir's top-down approach handles this by design. The generation approach handles it by detection and repair.

---

## The Recursive Improvement

As the ontology grows — both structural and procedural — agents have more to draw from. Better initial approaches mean higher success rates. Higher success rates mean more useful logs. More useful logs mean richer ontology.

This feedback loop can also amplify errors. Bad patterns promoted early get reinforced by reuse. Ontology optimized for common cases can make edge cases invisible. The validation process is what prevents the vicious cycle: catching bad patterns before they propagate, deprecating patterns that fail in practice, maintaining quality as the system scales.

This is the mechanism behind [Automating Expertise Gets Easier and Easier](/writing/automating-expertise-gets-easier/). The barriers keep falling as the ontology grows — if validation keeps pace.

---

## Connection to the Framework

Ontology generation is how [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/) produces lasting organizational value.

Individual EKA engagements produce artifacts. Artifacts reveal concepts and relationships. Successful artifacts become procedural templates. Concepts and templates accumulate into ontology. The ontology represents what the organization knows — both what things are and how to work with them.

The data layer holds facts. The ontology layer holds structure and capability. Together, they enable [Agentic AI as Universal Interface](/writing/agentic-ai-universal-interface/) to work at organizational scale.

→ Return to [Agentic AI as Universal Interface](/writing/agentic-ai-universal-interface/)
→ Return to [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/)
