---
title: "Update for February 2026"
date: 2026-02-08
description: "Two years of technological advancement tested the oracle/assistant distinction. The framework holds—but agentic AI has created new governance gaps that require attention."
type: update
tags: ["AI Governance", "Professional Practice"]
stability: evolving

graph_id: update-feb-2026
themes: ["AI Governance"]
relationships:
  - target: oracle-assistant
    type: core
    label: validates
  - target: eka
    type: core
    label: extends
  - target: agentic-universal
    type: core
    label: refines
---

The [oracle/assistant distinction](/writing/ai-oracle-vs-assistant/) was formulated in late 2024. Since then, reasoning models with chain-of-thought, retrieval-augmented generation, agentic tool use, structured outputs, and various determinism mechanisms have all advanced significantly. A reasonable question: has any of this obsoleted the framework?

I commissioned systematic research to find out. The answer: the distinction remains fundamentally valid. None of these advances resolve the core governance challenges. But the research also revealed something I hadn't anticipated—a new threat to the framework that warrants serious attention.

---

## The Research Question

The oracle/assistant framework rests on three governance requirements:

1. **Reproducibility.** Can the output be regenerated given the same inputs?
2. **Verifiability.** Can the method be assessed independently of the answer?
3. **Accountability.** Can professional responsibility be meaningfully exercised?

Oracle pattern—asking AI for answers directly—fails all three. The output is stochastic, the reasoning is opaque, and the professional has no defensible basis for the conclusions they're delivering. Assistant pattern—routing through executable code where the expert verifies method—satisfies all three. The code is deterministic, the methodology is inspectable, and professional judgment is exercised at the appropriate point.

The research tested whether 2024-2026 technological advances had changed this picture.

---

## Finding: Stochasticity Is Architectural

A central claim of the framework is that oracle-pattern outputs are inherently non-reproducible. This claim is strongly supported by the evidence.

**Reasoning models** use stochastic sampling by design. DeepSeek-R1 runs inference at temperature 0.6 with top-p 0.95. The reinforcement learning architectures intentionally maintain randomness to encourage exploration. Chain-of-thought traces are generated through the same sampling process as any other output—they are not reproducible across runs.

**RAG systems** introduce variance at multiple points: embedding model selection, chunk boundaries, hardware differences, dynamic data insertion. Even "deterministic" retrieval pipelines produce different document sets across identical queries.

**Structured outputs** guarantee format compliance, not content consistency. OpenAI's constrained decoding achieves 100% schema compliance, but the tokens generated within that structure remain non-deterministic. Temperature=0 doesn't solve this: empirical studies document accuracy variations up to 15% across identical runs.

**Infrastructure-level factors** make full determinism incompatible with production deployment. Anthropic's own documentation notes that "even with temperature 0.0, results will not be fully deterministic." The culprits—continuous batching, chunk prefilling, prefix caching—are fundamental to the economics of running these systems at scale.

The reproducibility crisis in AI research makes this concrete. A study of 69 papers using OpenAI services found only 7.2% were executable for reproduction, and zero achieved complete reproduction. Python code translation accuracy dropped from 79.9% to 45.6%-55.3% in reproduction attempts—a 34-point variation. Half of papers with ACM "Artifacts Evaluated - Reusable" badges failed requirements one year after evaluation.

Stochasticity is not a limitation awaiting resolution. It is a design feature.

---

## Finding: Verification Burden Increases With Capability

The framework predicts that oracle-pattern outputs require expert verification of the answer itself, while assistant-pattern outputs allow verification of method. The evidence shows the verification challenge has intensified, not diminished.

**Reasoning traces may be unfaithful.** Anthropic's research paper "Reasoning Models Don't Always Say What They Think" directly challenges whether exposed chain-of-thought represents actual model cognition. OpenAI researchers warn that "monitorability may be fragile to changes in training procedure." Models achieve only 81-83% factual accuracy in intermediate reasoning steps—meaning experts must identify errors in 17-19% of the reasoning they're shown.

**Citations don't guarantee correctness.** RAG systems exhibit up to 57% unfaithful citations due to post-rationalization—citations added after generation rather than grounding the synthesis. Legal AI tools hallucinate 17-33% of the time despite citation mechanisms. Medical RAG evaluations found factuality *decreased* when retrieval was added. Only 22% of retrieved passages were judged relevant by medical experts.

**The expert paradox.** Microsoft Research found that "the more expertise you have, the more cognitive effort you'll spend when working with AI." Domain experts report increased verification burden, not decreased. Medical RAG evaluation required 80,502 annotations by 18 medical professionals to assess output quality. Lay verification remains fundamentally impractical for consequential decisions.

More capable models create more surface area for potential errors. The assistant pattern addresses this by shifting verification from answer to method—a fundamentally different task that doesn't scale with output complexity.

---

## Finding: Agentic Frameworks Have Eroded the Distinction

This is the finding I hadn't anticipated.

The oracle/assistant distinction depends on a human decision: route this query through executable code, or accept a direct answer. The governance value of assistant pattern comes from making that choice deliberately—choosing to produce an inspectable artifact rather than trusting an opaque output.

Agentic AI frameworks have automated that decision.

ChatGPT's Code Interpreter, Claude's tool use, LangChain, CrewAI, AutoGen—all enable models to autonomously generate and execute code without explicit user request. The model "chooses which tools to use based on prompts and what they learn along the way." This implements what I'd call an **implicit assistant pattern**: the AI generates code, but the human didn't ask for code. The AI made the routing decision.

This eliminates the property that distinguished the assistant pattern from the oracle pattern.

Users can scope initial tool permissions, but they cannot control routing decisions within that scope. The human decision point that gave the assistant pattern its governance value has been automated away. When the AI autonomously decides to execute code, the audit trail may not capture why that decision was made versus providing a direct answer.

I call this **agentic erosion**: the loss of assistant-pattern governance value when AI controls the routing decision itself.

The industry is recognizing the gap. Singapore's IMDA (January 2026) and the World Economic Forum (November 2025) released governance frameworks acknowledging that "current AI governance frameworks may not address the unique risks presented by agentic AI." Gartner reported a 1,445% surge in multi-agent system inquiries from Q1 2024 to Q2 2025. Adoption is outpacing governance development.

---

## Finding: Regulatory Trajectory Favors Assistant Pattern

Emerging regulations from 2024-2026 effectively mandate assistant-pattern characteristics without using that terminology.

**EU AI Act** (effective August 2026-2027 for high-risk systems):
- Article 16(1)(d) requires technical documentation enabling reproducibility
- Article 16(1)(e) requires automatic logging of inputs, outputs, and errors
- Article 26 requires deployers to monitor operations, maintain logs for 6+ months, and ensure human oversight
- Professional decisions in employment, credit, healthcare, and safety-critical domains qualify as high-risk

Oracle-pattern outputs cannot satisfy reproducibility requirements. Opaque generation without audit trails fails logging requirements.

**NIST AI Risk Management Framework** (2024 update):
- Recommends separation of model builders from model verifiers/validators
- 2024 GenAI Profile explicitly warns about automation bias
- Emphasizes Test, Evaluation, Verification, and Validation throughout the AI lifecycle

Oracle-pattern deployment embodies the automation bias the framework warns against.

**ISO/IEC 42001** establishes 38 controls including risk assessment mandates. Clause 9 requires monitoring and evaluation throughout the AI lifecycle. Black-box oracle outputs cannot satisfy lifecycle oversight.

Professional liability principles remain unchanged: "The auditor, not the technology, bears professional responsibility." "AI is a powerful copilot, not an autopilot." Training is shifting to "how to review the AI that does the task."

The regulatory direction is clear. Organizations deploying oracle-pattern AI for consequential decisions face compliance challenges beginning August 2026.

---

## Implications

The core distinction holds. Assistant pattern remains the only configuration that can satisfy reproducibility, verifiability, and accountability requirements for professional work under risk.

But the agentic erosion finding requires attention.

**The routing decision must remain human-controlled for consequential work.** When using agentic systems, this means constraining permissions to require human approval for routing decisions, not just execution approval. The question isn't "should the AI run this code?" It's "should this query be answered through code at all?"

**This reconciles AI-First interface design with EKA governance.** [AI-First Software](/writing/ai-first-software/) describes systems that "dynamically select algorithms and approaches." [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/) requires expert-specified methodology. These are compatible when the human has already decided to route through executable artifacts. "System determines approach" is acceptable within a scope the user has authorized. For consequential work, that scope must be: produce inspectable methodology, not direct answers.

**Implicit assistant pattern is not assistant pattern.** Code generated autonomously by an agentic system, without human request, doesn't carry the same governance properties as code requested deliberately. The artifact may be identical. The accountability structure is not.

---

## What This Means for Practice

If you're using AI in professional contexts where decisions carry risk:

1. **Maintain explicit control over the routing decision.** Don't let the AI decide whether to generate code versus provide a direct answer. Make that choice yourself.

2. **Treat implicit assistant pattern as oracle pattern for governance purposes.** If the AI decided to write code without your request, you're back in verification-of-answer territory, not verification-of-method.

3. **Prepare for regulatory requirements.** EU AI Act compliance for high-risk applications begins August 2026. The requirements align with assistant-pattern characteristics: reproducibility, logging, human oversight.

4. **Recognize that verification requires more than AI explanation.** The same unfaithfulness problems that affect reasoning traces affect AI explanations of generated artifacts. Verification protocols need independence from the generating model.

The framework was designed for a world where the human chose the pattern. Agentic AI has introduced a world where that choice can be automated. The distinction remains valid. Preserving its governance value now requires deliberate effort.

---

→ For detailed responses to specific objections, see [Answers to Critics](/writing/answers-to-critics/)
→ For the original framework, see [AI as Oracle vs. Assistant](/writing/ai-oracle-vs-assistant/)
→ For the implementation pattern, see [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/)
