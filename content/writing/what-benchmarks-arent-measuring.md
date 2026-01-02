---
title: "What Benchmarks Aren't Measuring"
date: 2024-12-31
description: "GDPval and similar benchmarks test well-specified problems with verifiable answers. They don't—can't—test the ambiguous, contested, judgment-intensive work where professional expertise commands premiums. The measurement gap is structural, not temporary."
type: core
tags: ["AI Governance", "Professional Practice", "Measurement"]

# Knowledge graph metadata
graph_id: benchmarks
defines: ["Tame vs Wicked Problems", "Measurement Gap", "Ground-Truth Problem"]
themes: ["AI Governance", "Professional Practice"]
relationships:
  - target: oracle-assistant
    type: soft
    label: references
  - target: eka
    type: soft
    label: references
---

How much valuable professional work can AI do competently right now?

We don't know. And the benchmarks that exist won't tell us.

---

## Tame Problems

OpenAI's GDPval benchmark represents serious investment in evaluation methodology. It recruits credentialed professionals—lawyers, accountants, engineers, physicians—to blindly compare AI outputs against human work on realistic tasks. It's carefully designed, transparently documented, and represents genuine progress over simpler metrics.

It also measures the wrong things.

Examine what GDPval actually tests:

**Well-specified problems.** 89% of GDPval tasks are rated "well-specified" by evaluators—clear inputs, defined deliverables, identifiable correct answers. This is by design; tasks that judges can't evaluate get excluded. But professional expertise commands premiums precisely for *ill-specified* problems—situations where defining the question is part of the work.

**One-shot evaluation.** Tasks are completed in a single session, averaging around seven hours, with no iteration, no clarification requests, no back-and-forth. Real professional work involves extended engagement: discovering hidden constraints, refining approaches based on feedback, asking the follow-up questions that distinguish expert from competent.

**Bounded time horizons.** Seven hours is long for a benchmark, short for professional judgment. The physician managing a chronic condition, the lawyer shepherding a transaction, the engineer monitoring a construction project—these accumulate context over weeks or months that can't be transmitted in a task description.

**Verifiable answers.** GDPval requires evaluators to assess outputs, which means tasks must have assessable outputs. Inter-rater reliability is only 71%—and that's on the tasks simple enough to make it into the benchmark.

OpenAI acknowledges these limitations. Their documentation notes that GDPval tests "discrete deliverables" rather than "extended professional relationships," and explicitly excludes "iterative refinement" and "ambiguous requirements."

This honesty is admirable. It also means GDPval measures something importantly different from the professional judgment that commands premium fees.

---

## Wicked Problems

The distinction I'm drawing comes from planning theory: "tame" versus "wicked" problems.

Tame problems have clear formulations, definable solutions, and objective success criteria. They may be technically difficult, but you know when you've solved them. Most benchmarks test tame problems—because tame problems are what benchmarks can test.

Wicked problems resist formulation. The problem definition depends on the approach you take. Stakeholders disagree about what success means. Solutions aren't right or wrong but better or worse, and "better" is contested. Every attempt to solve the problem changes the problem.

Professional expertise commands its highest premiums on wicked problems. The contested diagnosis where reasonable physicians disagree. The transaction where legal strategy depends on predictions about counterparty behavior. The engineering judgment that weighs incommensurable values under uncertainty.

For this class of problem, we have almost no systematic measurement of AI capability. Not because measurement is impossible, but because the methodologies that work for tame problems break down.

If three senior physicians disagree on a diagnosis, and AI agrees with one of them, is AI correct? What percentage correct? The question has no clean answer. "Capability" becomes conceptually murky, not just practically unmeasured.

---

## The Ground-Truth Problem

This isn't a methodological quibble. It's a fundamental constraint on what benchmarks can tell us.

Benchmarks require ground truth—a correct answer to measure against. For tame problems, ground truth exists. For wicked problems, it often doesn't. The problems that define high-end professional work are precisely the problems where "correct" is contested.

We can still measure things:

- Whether AI recommendations fall within the range of expert opinion
- Whether AI-assisted outcomes differ systematically from human-only outcomes
- Whether AI identifies considerations experts overlooked
- Whether AI reasoning is coherent, defensible, well-supported
- Whether AI appropriately flags uncertainty and limits

None of these is "what percentage of professional work can AI do?" Professional judgment on hard problems doesn't reduce to a percentage. But these measures would reveal whether AI is becoming a credible participant in professional judgment, even without a single scalar metric.

The infrastructure to generate this evidence mostly doesn't exist. What exists instead are benchmarks on tame problems, extrapolated to claims about wicked ones.

---

## The Wrong Frame

There's a deeper issue: current benchmarks evaluate AI as oracle—measuring answer quality against human answers. "Is this output as good as what a professional would produce?"

But [the oracle framing is itself problematic](/writing/ai-oracle-vs-assistant/). When you ask AI for answers, you inherit the verification problem: you can't confirm the answer is right without the expertise to produce it yourself. Benchmark evaluators have that expertise. End users often don't. The benchmark measures something real for the evaluators; it tells users almost nothing about whether they can safely rely on the output.

If professional work should be structured around [inspectable execution rather than trusted answers](/writing/executable-knowledge-architecture/)—expert intent translated into artifacts that expose their methodology—then benchmarks measuring answer quality are testing the wrong thing. No benchmark asks: "Is this approach defensible? Can the reasoning be inspected? Does the methodology hold up to scrutiny?"

The measurement gap isn't just tame versus wicked. It's answer versus process. The infrastructure is built around an approach that may not be the right one for consequential work.

---

## Who Builds Measurement

Here's the structural problem: the parties with resources to build measurement infrastructure have conflicting incentives about what to measure.

AI vendors invest heavily in evaluation—by some estimates, 5000:1 relative to government and academic investment combined. They have the models, the technical capability, and the budgets. GDPval, APEX, and similar efforts represent genuine methodological work.

But vendor-funded evaluation faces unavoidable incentive problems:

- Labs routinely produce dozens of model variants, publishing benchmarks only for highest-scoring versions
- Benchmarks showing unfavorable results get deprecated; favorable ones proliferate
- Training on benchmark data—teaching to the test—is endemic
- Mathematical reasoning benchmarks have been repeatedly compromised by data contamination

This isn't corporate villainy. It's rational behavior. Vendors are evaluated by investors, customers, and press on benchmark performance. The incentive to optimize for metrics that may not reflect real capability is structural.

Meanwhile, the parties with credibility to conduct independent evaluation—academic researchers, professional bodies, regulators—lack the resources. Government investment in AI evaluation is a rounding error relative to industry spending. Academic funding follows publication incentives, not practical measurement needs. Professional bodies move slowly and face internal politics.

The result: measurement infrastructure exists, but it's controlled by parties with stakes in particular outcomes. Independent evaluation is radically undersupplied.

---

## Who Benefits from the Gap

The measurement vacuum isn't neutral. It serves specific interests.

**AI vendors** benefit from ambiguity when capability is uncertain. They can market possibility rather than demonstrated performance. When capability is high, they benefit from measurement—rigorous evaluation becomes marketing. Either way, they control what gets measured and what gets published.

**Professional services firms** benefit from unfalsifiable claims. As long as AI capability remains uncertain, "AI can't do what we do" is a marketing position that can't be tested. The measurement vacuum protects premium pricing.

**Clients and regulators** lose. They need accurate capability information to make decisions. They can't produce it themselves. They're dependent on parties with interests in particular answers.

The parties who would benefit most from accurate, independent measurement are precisely the parties without resources or expertise to produce it.

---

## The Timing Problem

One class of stakeholder deserves specific attention: professional liability insurers.

Insurers have sophisticated mechanisms for assessing risk—decades of claims data, underwriting questionnaires, loss control requirements, actuarial expertise. They've developed robust systems for pricing professional liability across engineering, medicine, law, accounting.

Those mechanisms are blind to AI.

Professional liability claims have long tails—three to seven years from incident to resolution. The claims data accumulating now reflects practice from 2018-2020. AI capability has changed dramatically since then. Adoption is accelerating. But insurers' primary measurement system—claims experience—won't reflect current AI use for years.

This creates a timing problem more than a capability problem. Insurers have the incentives and the resources to assess AI risk. What they lack is a measurement approach that works faster than their claims cycle. They're flying partially blind through a transition where the relevant variable is changing faster than their traditional measurement can track.

I've seen no evidence that insurers have solved this. They have mechanisms. Those mechanisms weren't designed for a rapidly changing capability landscape.

---

## What Would Help

Better measurement would look different from current benchmarks:

**Test wicked problems, not just tame ones.** Evaluation methodology for ambiguous situations, contested "correct" answers, extended time horizons, iterative engagement. Harder to design, more important to have.

**Independent funding.** Shift the 5000:1 ratio. Academic grants, professional body investment, regulatory funding, philanthropic support for evaluation infrastructure that isn't controlled by those with stakes in outcomes.

**Practitioner red-teaming.** Not benchmark designers imagining hard problems, but working professionals trying to break AI on their actual work. The cases that matter are the ones experts encounter.

**Outcome tracking.** Connect AI use to downstream results—patient outcomes, case results, project success. The infrastructure to do this mostly doesn't exist. Building it would reveal what capability actually means in practice.

**Calibration measurement.** Does AI know what it doesn't know? Current evidence suggests models confidently generate plausible nonsense on topics outside their training. Measuring whether stated confidence matches actual accuracy is tractable and critical.

None of this is impossible. It's undersupplied because the incentives don't produce it.

---

## The Honest Position

I'm not claiming AI is secretly capable or secretly incapable. I'm claiming we don't know—and the benchmarks that exist won't tell us.

GDPval and similar efforts measure something real. That something is performance on tame problems: well-specified tasks with verifiable answers and bounded time horizons. These benchmarks show AI performing competently, sometimes impressively, on this class of problem.

Whether that performance extends to wicked problems—the ambiguous, contested, judgment-intensive work that defines senior professional expertise—is a different question. Current benchmarks don't answer it. Current measurement infrastructure can't answer it.

The gap matters because decisions are being made on both sides. Firms are adopting AI without systematic evaluation of whether it works on their actual problems. Clients are paying premiums for human judgment without knowing whether that judgment adds value. Insurers are pricing risk based on assumptions that may not hold. Regulators are deferring oversight because they lack capability data.

Everyone is guessing. Some guesses will be wrong. Better measurement would reduce the guessing, but better measurement requires investment that current incentives don't produce.

That's the problem. I don't have a solution beyond naming it clearly: the benchmarks that exist don't measure what matters, the parties who could fix this have conflicting incentives, and the parties who need the information can't produce it themselves.

---

*We're making consequential decisions about AI in professional work based on benchmarks that test the wrong problems, funded by parties with stakes in particular answers, while the information we actually need goes unproduced. That's the measurement gap. It's structural, not temporary.*
