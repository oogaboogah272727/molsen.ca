---
title: "Tacit Space Shrinkage: What Happens When AI Can Do What Experts Can't Explain"
date: 2024-12-27
description: "A framework for understanding how AI capabilities are shifting the boundary between tacit and explicit knowledge."
pdf: "/papers/tacit-space-shrinkage.pdf"
---

A senior engineer looks at a foundation design and says "this won't work." She can't fully articulate why — thirty years of pattern recognition compressed into instinct. That judgment was locked in her head. Transfer required years of apprenticeship, if it happened at all.

Then a system trained on thousands of foundation failures started flagging the same concerns. The capability that took decades to develop, that couldn't be taught in any classroom, that would retire when she retired — now exists outside her.

This is happening across technical professions. Capabilities that were tacit — trapped in experts, transferred only through apprenticeship — are becoming explicit. Not because experts learned to articulate what they know. Because new agents arrived that acquire capability through different pathways.

This paper provides a framework for understanding what's happening and what it means.

---

## Terminology

We use knowledge management vocabulary (tacit/explicit knowledge, knowledge transfer) as shorthand. For our purposes, "knowledge" means outcome-generating capability. We take no position on whether machines "know" in any deep sense. We observe that they produce outcomes. That suffices for this framework.

---

## Core Definitions

**Capability:** The ability to reliably produce an outcome, regardless of agent type — human, machine, hybrid, or institutional.

**Tacit capability:** Capability that is difficult to transfer between agents due to articulation barriers, interpretation barriers, or interface mismatch.

**Key insight:** Tacitness is a property of the *transfer relationship*, not the capability itself. The same capability may be tacit between agents A and B, explicit between A and C. This is implicit in the KM literature but has not been treated as a first-order principle.

**Reliability:** Capability is reliable when it consistently produces the intended outcome under specified conditions. Reliability is context-dependent and degrades over time if conditions shift. A system reliable for routine cases may be unreliable for edge cases. Unreliable encoding doesn't create a valid transfer pathway — the representation exists, but it doesn't work.

---

## The Conceptual Move

Traditional KM is anthropocentric. It assumes human knowers with human limitations:

> **Traditional framing**: Tacit knowledge is knowledge humans cannot articulate.

We propose an agent-general reframing:

> **Proposed framing**: Tacit capability is capability for which no transfer pathway exists between the relevant agents.

---

## Definition: Representational Path

A **representational path** for knowledge K is a triple (A, R, B) where:
- **A** is an encoding agent capable of producing representation R from K
- **R** is a representation (symbolic, neural, embodied, or otherwise)
- **B** is a decoding agent capable of recovering K from R
- A and B may be the same agent or different agents

**Explicit**: Knowledge K is explicit iff at least one representational path exists for K.

**Tacit**: Knowledge K is tacit iff no representational path exists for K.

This definition:
1. **Separates encoding from decoding** — different agents may perform each
2. **Is agent-general** — no privileged status for humans or any agent class
3. **Provides a binary criterion** — path exists or it doesn't
4. **Captures the pipeline** — both encoding AND decoding must be viable for knowledge to be explicit

Note: The agents A and B need not be the same. Knowledge may be encoded by one agent class and decoded by another. The criterion for explicitness is that *some* viable path exists, not that any single agent can traverse it alone.

---

## The Argument

### 1. Tacitness is Agent-Relative

Tacitness is not an intrinsic property of knowledge but a relation between knowledge and the encoding/decoding capabilities of agents. The same knowledge can be:
- Tacit for agent A (lacks encoding capacity)
- Explicit for agent B (possesses encoding capacity)

This is uncontroversial at the individual level (expert vs. novice) and at the species level (Polanyi: animals can only possess tacit knowledge; humans developed articulation capability).

### 2. LLMs Are Encoding/Decoding Agents

Large language models possess encoding and decoding capabilities distinct from humans:

**Encoding capabilities:**
- Pattern extraction from large corpora
- Representation of regularities in embedding space
- Generation of articulations from latent representations

**Decoding capabilities:**
- Interpretation of human-generated text
- Mapping natural language to internal representations
- Integration of fragmentary inputs into coherent wholes

These capabilities may exceed human capabilities in certain domains while falling short in others. The point is not that LLMs are superior, but that they are *different* — they constitute a distinct class of encoding/decoding agent.

### 3. The Criterion: Existence of a Representational Path

Here is the critical move:

If an LLM encodes something that was previously unencodable, and some agent (the LLM itself, another machine, or potentially a human) can decode it, a **representational path now exists**. The knowledge is explicit.

If (Encoder=LLM, Representation=embeddings, Decoder=LLM) is a viable path, the knowledge is explicit. Human participation in the path is not required.

The knowledge can now be:
- Stored
- Transferred (to agents that can decode it)
- Operated on computationally
- Reproduced deterministically

Human inability to decode is simply one agent class's limitation. It has no bearing on whether the knowledge is tacit or explicit. The criterion is: **does any representational path exist?**

### 4. Tacit Space Shrinks as Agent Capabilities Improve

Define **tacit space** as: the set of all knowledge K for which no representational path (A, R, B) exists.

As encoding/decoding capabilities improve across the agent population:
- Knowledge that was tacit-for-all-agents becomes explicit-for-some-agents
- That knowledge exits tacit space
- Tacit space shrinks

This shrinkage is monotonic at the frontier. Once any agent demonstrates encoding capability for a given type of knowledge, that knowledge exits the "necessarily tacit" category — even if specific agents later lose access (models deprecated, companies bankrupt, experts retire). The frontier of what's encodable only expands.

### 5. The Distinction: "Hasn't Been" vs. "Cannot Be"

This framework distinguishes:

**Contingently tacit**: Knowledge that hasn't been encoded/decoded yet, but could be with sufficient agent capability. This category shrinks as capabilities improve.

**Necessarily tacit**: Knowledge that cannot in principle be encoded/decoded by any possible agent. This is the irreducible floor — if it exists.

The traditional tacit knowledge literature conflates these. It treats "we cannot articulate this" as if it meant "this cannot be articulated." But the former is a statement about current capability; the latter is a claim about logical impossibility.

---

## Examples Across Domains

**Legal: Document Review**

Junior associates spent years developing the pattern recognition to spot problematic contract clauses. Much of this was tacit — seniors couldn't fully articulate what triggered concern, only that "this doesn't look right."

AI document review systems, trained on labeled examples, now flag many of the same issues. For routine pattern-matching — inconsistent indemnification language, missing standard provisions — the capability has transferred. What was tacit between senior and junior is now explicit between corpus and algorithm.

The limits are real: strategic judgment about novel clauses, interpretation of doctrinal ambiguity, prediction of counterparty behavior — these remain human territory. But the routine pattern recognition that filled associate hours has a new encoding pathway.

**Medical: Diagnostic Imaging**

Radiologists develop diagnostic intuition over decades. "Something about this scan." They often can't articulate the specific features triggering concern — the knowledge is tacit.

For specific, well-defined diagnostic tasks — certain cancers, pneumonia detection — AI systems now match or exceed accuracy. They learned from labeled images, not from explanation. The capability transferred without requiring the expert to articulate it.

The constraints matter: these systems work in narrow lanes, require clinical integration, and fail on out-of-distribution cases. The radiologist's broader judgment — when to escalate, how to integrate imaging with patient history — remains irreducibly human. But for defined tasks within the training distribution, a representational path now exists.

**Financial: Credit Pattern Recognition**

Experienced underwriters develop "gut feel" for creditworthiness that goes beyond documented criteria. New underwriters learned through exposure to decisions, not through instruction.

ML models now encode correlated patterns from historical data. They predict default probability based on features the underwriter might have weighted intuitively. This isn't the same as encoding the underwriter's judgment — it's encoding patterns in the data the underwriter was implicitly detecting.

The distinction matters: the model predicts; the human still underwrites. Risk structuring, term selection, and covenant design remain judgment calls. But the predictive pattern recognition that once required years of exposure now has a machine pathway.

---

## Strategic Questions

If tacit space is shrinking, three questions matter:

**1. Which of your capabilities are next?**

Map the capabilities your organization treats as "expertise" or "experience." Which involve pattern recognition that could be learned from historical data? Those are candidates for encoding. The boundaries of your competitive advantage may be shifting faster than you think.

**2. Are you building encoding infrastructure or just using tools?**

There's a difference between using ChatGPT and building the capability to encode your organization's tacit knowledge systematically. One is commodity access; the other is strategic infrastructure. Which are you investing in?

**3. What happens when capability becomes explicit?**

When tacit capability becomes machine-encodable, the experts who held it don't disappear — but their role changes. They become validators, edge-case handlers, trainers of systems. The tacit knowledge that was once a moat becomes a liability if it prevents you from building explicit, scalable alternatives.

Is your organization preparing for this transition, or betting it won't happen?

---

## Implications

### For Tacit Knowledge Theory

The tacit knowledge literature must be revised to account for non-human agents. The question "what is tacit?" becomes "what is tacit *for whom*?" — and the answer differs by agent class.

The residual question becomes: **Is there a floor?** Is there knowledge that is necessarily tacit — unencodable by any possible agent? Or does tacit space shrink asymptotically toward zero?

Candidates for the irreducible floor:
- **Collins's Collective Tacit Knowledge (CTK)**: Knowledge constituted by social practice, distributed across a society, not located in any individual. Can any agent encode what is not located anywhere?
- **Grimen's strong thesis**: Knowledge where there is a *logical* gap between the knowledge and any possible articulation.
- **Phenomenal experience / qualia**: The felt quality of experience. Can any encoding capture "what it is like"?
- **Wittgenstein's silence**: "Whereof one cannot speak, thereof one must be silent." Is there a domain of the unsayable in principle?

### For Knowledge Management

If tacit space is shrinking, the strategic question shifts:
- Old question: How do we transfer tacit knowledge between humans?
- New question: How do we expand the encoding/decoding frontier? What knowledge is next to become explicit?

The value of tacit knowledge as competitive advantage erodes as more knowledge becomes machine-encodable.

### For Epistemology

The traditional epistemological distinction between tacit and explicit becomes less fundamental. It's not a distinction between *kinds* of knowledge but between *states* of knowledge relative to agent capability. As capability improves, the same knowledge transitions from one state to another.

---

## What This Does NOT Claim

1. **Does not claim LLMs "understand" in any deep sense** — only that they encode and decode in ways that satisfy the functional definition of explicitness.

2. **Does not claim human understanding is unnecessary** — humans may need to decode for knowledge to be *actionable by humans*. But actionability-by-humans is not the criterion for explicitness.

3. **Does not claim the floor is empty** — there may well be necessarily tacit knowledge. The claim is only that *contingently* tacit knowledge shrinks as capabilities improve.

4. **Does not claim this is good or bad** — the normative implications are a separate question. The claim is descriptive: this is what happens to tacit space as encoding/decoding agents improve.

---

## Key Formulations

> **Representational path**: A triple (A, R, B) where A encodes knowledge K into representation R, and B decodes R to recover K.

> **Explicit**: Knowledge K is explicit iff at least one representational path exists.

> **Tacit**: Knowledge K is tacit iff no representational path exists.

> **Tacit space** = the set of all knowledge for which no representational path exists.

> **Tacit space shrinks monotonically** as encoding/decoding capabilities improve across the agent population.

> **No agent class is privileged.** Human participation in the representational path is not required for knowledge to be explicit.

> **The residual question is the floor**: Is there knowledge for which no representational path can ever exist, regardless of agent capability? Or does tacit space shrink asymptotically toward zero?
