---
title: "Making AI Make Sense"
description: "A framework for deploying AI where it's strong and routing around where it's weak. Maximizing its strengths, minimizing its weaknesses."
type: hub
weight: 1
---

AI is powerful and unreliable. Most approaches either ignore the unreliability and get burned, or avoid AI entirely and miss the value.

This framework does neither. It deploys AI where it's strong and routes around where it's weak.

---

## What AI Is Good At

- **Translation** between representations: natural language to structured formats, intent to implementation, one form to another
- **Pattern detection** at scale: finding structure in volumes humans can't process
- **Generation** of candidates: options, drafts, variations, possibilities
- **Tireless iteration**: refining, expanding, reformulating without fatigue

---

## What AI Is Bad At

- **Consistency**: ask twice, get different answers
- **Reliability**: generates plausible outputs, not verified ones

These compound. You can't trust a single output. You can't trust repetition to converge on truth. Precision and accuracy are both compromised.

---

## The Core Move

**Ask AI to execute instructions, not provide answers.**

This is the [fundamental choice between oracle and assistant patterns](/writing/ai-oracle-vs-assistant/). When you ask for answers (oracle), you inherit the consistency and reliability problems directly. And you face a deeper issue: you can't verify the answer without the expertise to produce it yourself. If you have that expertise, why do you need the AI? If you don't, how do you know the answer is right?

People push back: "I don't just ask for answers. I have conversations. I probe. I challenge." That's better, but [sophisticated dialogue doesn't solve the verification problem](/writing/strong-oracle-trap/)—it just makes it less obvious.

When you ask for execution (assistant), you get something inspectable. You see the steps it takes and ensure they match your expectations. You trace outcomes back to inputs you control: your instructions, your data.

This changes what's required. Instead of expertise to produce the answer, you need expertise to specify intent and verify the method. Specifying and verifying take less time than producing—if you have the expertise to do all three.

---

## The Pattern for Professional Work

For consequential work—anything someone pays for and expects to be reliable, accurate, and defensible—the framework becomes concrete in what I call [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/):

1. Expert specifies intent
2. AI translates intent into executable artifact
3. Human verifies the artifact
4. Artifact produces reproducible results

An executable artifact is knowledge made runnable: instructions that a machine can follow to produce outcomes. The expert's judgment, encoded in a form that can be inspected, tested, and reproduced. The same inputs produce the same outputs. The methodology is on record.

Different stakeholders have different obligations to these artifacts. The expert who specifies bears different responsibility than the operator who runs them. [Capability governance](/writing/capability-governance/) maps these obligations: who must verify what, who bears what risk, what track record justifies what autonomy.

**Why benchmarks won't tell you if this works.** [Current AI benchmarks measure answer quality](/writing/what-benchmarks-arent-measuring/)—how good are the answers AI produces? They test well-specified problems with verifiable answers. They don't measure method quality, defensibility, or reproducibility. The measurement infrastructure is built around asking AI for answers, which is the approach this framework argues against.

---

## Why This Works

You don't need theory to use the pattern. But if you want to understand the mechanics, or see where this leads, the foundations matter.

The framework rests on [defining knowledge as capability to produce outcomes](/writing/knowledge-as-capability/)—not mental states, not beliefs. Capability. This makes human and AI contributions commensurable. Both have capabilities. Combined, they produce outcomes neither achieves alone.

This definition also clarifies what "tacit knowledge" really means. Tacit knowledge—knowledge we possess but cannot fully articulate—sounds like a permanent barrier. But [tacitness is relational, not intrinsic](/writing/agent-relative-tacitness/). What's inexpressible for one agent may be articulable for another. The boundary of what can be encoded is softer than it appears.

And that boundary is moving. [AI capabilities are opening transfer paths that didn't exist](/writing/tacit-space-shrinkage/). Knowledge that was locked in human expertise—expressible only through apprenticeship, demonstration, or years of practice—is becoming encodable. The tacit domain is shrinking.

---

## How This Scales

The pattern applies beyond individual artifacts. Two barriers have traditionally prevented most expertise from becoming software: coding skill and system access knowledge. [Agentic AI removes both](/writing/agentic-ai-universal-interface/). When those barriers fall, the intermediary layers—most of what we call "applications"—face pressure.

This pressure [compounds as AI capabilities improve](/writing/automating-expertise-gets-easier/). What required custom development yesterday requires only specification today. What required a specialist last year requires only someone who understands the domain. The [design philosophy shifts](/writing/ai-first-software/): AI as foundation, not feature.

The [DIY knowledge worker made sense for forty years](/writing/return-of-the-assistant/). AI assistants offer something better: the freedom of DIY with the leverage of delegation.

---

## Where This Leads

Follow the pattern and something accumulates: verified, executable encodings of what previously required human expertise.

Each engagement produces artifacts. Those artifacts embody methodology. The methodology was previously locked in an expert's head. Now it's inspectable, reusable, reproducible at zero marginal cost. Over time, [organizational knowledge accumulates from these interactions](/writing/ontology-generation/)—not as documentation that goes stale, but as working code that stays current because it's actually used.

Scale this and the implications become clear:

**The AI becomes the primary interface.** Between data, APIs, and executable systems on one side, and human intent on the other. The artifact is the intermediate representation. Humans specify; AI translates; artifacts execute.

This is the direction. The framework describes the responsible path to get there: verification and accountability intact at each step, while the domain of what requires human execution steadily shrinks.

The question isn't whether this happens. It's whether you're encoding or being encoded.
