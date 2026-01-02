---
title: "Making AI Make Sense"
description: "Like fire, AI is powerful, dangerous, essential. Here's how to cook with it."
type: hub
weight: 1
---

Most approaches to using generative AI fall into one of two traps: trusting it completely, until the confident-sounding answer turns out to be fabricated, or avoiding it entirely, unwilling to accept the risk. There is a way to use it which leverages its strengths and avoids risk from its weaknesses. 

**Stop asking AI for answers. Start asking it to follow instructions.**

---

## The Problem with Answers

AI is genuinely good at some things:

- **Translation**: turning natural language into code, intent into implementation, one format into another
- **Pattern detection**: finding structure in data volumes no human could process
- **Generation**: producing candidates, drafts, variations, possibilities
- **Iteration**: refining and expanding without fatigue

But AI has real weaknesses too:

- **Consistency**: ask the same question twice, get different answers
- **Reliability**: outputs sound plausible whether they're correct or not

These weaknesses compound. You can't fully trust a single output. You can't trust repetition to converge on truth.

When you ask AI for an answer, you inherit these problems directly. And there's a deeper issue: you can't verify the answer without the expertise to produce it yourself. If you have that expertise, the AI saved you time but didn't extend your capabilities. If you don't have that expertise, you're taking the AI's word for it.

This is the [fundamental problem with asking AI for answers](/writing/ai-oracle-vs-assistant/).

But you might say, "I don't just ask naive questions. I have real conversations. I probe assumptions. I make the AI challenge me back." That makes the answers better, for sure. But better doesn't mean verifiable. The AI still can't show you its work. The answer might be correct. You just can't know. And if you ask the same question tomorrow, [you might get a different answer](/writing/strong-oracle-trap/).

---

## The Alternative

There's another way to use AI: ask it to execute instructions instead of providing answers.

When you ask for execution, you get something you can actually inspect. You see the steps the AI took. You verify those steps match your intent. You can trace outcomes back to inputs you control.

This changes what expertise means. You don't need the expertise to produce the answer. You need the expertise to specify what you want and to verify that the method is sound. Specifying and verifying take less time than producing, assuming you know enough to do all three.

For consequential work, anything someone pays for or needs to defend, this becomes a concrete pattern I call [Executable Knowledge Architecture](/writing/executable-knowledge-architecture/):

1. The expert specifies intent
2. AI translates that intent into an executable artifact
3. The human verifies the artifact
4. The artifact produces reproducible results

The artifact is the key. It's knowledge made runnable: instructions a machine can follow. The expert's judgment gets encoded in a form you can inspect, test, and reproduce. Same inputs, same outputs. Methodology on record.

Different stakeholders have different obligations to these artifacts. The expert who specifies bears different responsibility than the operator who runs them. [Capability governance](/writing/capability-governance/) maps who verifies what, who bears what risk, and what track record justifies what autonomy.

One caveat: [current AI benchmarks won't help you here](/writing/what-benchmarks-arent-measuring/). They measure answer quality, how good are AI's answers compared to human answers. They don't measure method quality, defensibility, or reproducibility. The benchmarks test the very approach this essay argues against.

---

## The Foundations

You don't need theory to use this approach. But if you want to understand why it works, or see where it leads, the foundations help.

Start with a [different definition of knowledge](/writing/knowledge-as-capability/). Knowledge isn't mental states or beliefs. It's the ability to produce outcomes. This makes human and AI contributions commensurable: both have capabilities, and combined they produce outcomes neither achieves alone.

This reframes what we mean by tacit knowledge, the knowledge we have but can't articulate. Tacit knowledge sounds like a permanent barrier. Some things can never be written down. But [tacitness turns out to be relational](/writing/agent-relative-tacitness/). What's inexpressible for one agent may be perfectly articulable for another. The boundary is softer than it appears.

And that boundary is moving. [AI is opening transfer paths that didn't exist before](/writing/tacit-space-shrinkage/). Knowledge that was locked in human expertise, expressible only through apprenticeship or years of practice, is becoming encodable. The tacit domain is shrinking.

---

## Where This Goes

The pattern scales beyond individual artifacts.

Two barriers have prevented most expertise from becoming software: you needed to know how to code, and you needed to understand how systems work. [Agentic AI removes both barriers](/writing/agentic-ai-universal-interface/). When they fall, the intermediary layers we call "applications" face pressure.

This [compounds as AI capabilities improve](/writing/automating-expertise-gets-easier/). What required custom development yesterday requires only specification today. The [design philosophy shifts](/writing/ai-first-software/): AI becomes foundation, not feature.

The [DIY knowledge worker made sense for forty years](/writing/return-of-the-assistant/). AI offers something better: the freedom of doing it yourself, with the leverage of delegation.

Follow this pattern over time and something accumulates: verified, executable encodings of what previously required human expertise. Each engagement produces artifacts. Those artifacts embody methodology that used to be locked in someone's head. Now it's inspectable, reusable, reproducible at zero marginal cost. [Organizational knowledge accumulates](/writing/ontology-generation/) not as documentation that goes stale, but as working code that stays current because people actually use it.

Scale this and the implications become clear. AI becomes the primary interface between human intent and executable systems. Humans specify. AI translates. Artifacts execute.

This is the direction. The question isn't whether it happens. It's whether you're encoding or being encoded.

