---
title: "Framework for Capability Governance in Technical Consulting"
date: 2024-12-27
description: "A framework for governing AI-assisted work in technical professions. When someone asks 'how did you arrive at this?', can you answer?"
type: core
tags: ["AI Governance", "Professional Practice"]
---

A client asks: "How did you arrive at this recommendation?"

The consultant pauses. The honest answer is: an AI drafted the analysis, a junior reviewed the formatting, and a senior signed off after a ten-minute skim. The methodology is a black box. The deliverable looks authoritative. But if it's wrong, no one in the chain can explain why it was right.

This is not a hypothetical. It's happening now, across every technical profession. The question isn't whether AI-assisted work is acceptable. It's whether anyone can defend what they delivered.

This framework addresses that question.

---

## Terminology Note

We use established KM vocabulary (tacit/explicit knowledge, knowledge transfer) as convenient shorthand. Readers committed to anthropocentric epistemology may prefer to read "knowledge" as "outcome-generating capability." The phenomena described are the same; the philosophical commitments differ.

We take no position on whether machines "know" in any deep sense. We observe that they do stuff. That's enough for governance purposes.

---

## Foundational Move: Capability Over Knowledge

"Knowledge" is philosophically fraught — it requires beliefs, justification, mental states. This is necessarily anthropocentric.

We sidestep the debate. What matters is **capability**: the ability to reliably produce an outcome. This is agent-agnostic. Human, institution, algorithm, hybrid — the substrate is irrelevant. The only questions are: does it produce outcomes, and how reliably?

I develop this argument more fully in [Knowledge as Capability](/writing/knowledge-as-capability/). For governance purposes, the key point is simpler: we're making explicit what we already value.

---

## Scope

This framework applies to technical professional work where:

- Outputs inform consequential decisions
- Professional accountability attaches to the producer
- The question "how did you arrive at this?" may be asked

Engineering, architecture, legal advisory, medical practice, financial analysis, consulting — the domain varies, but the governance challenge is the same: can you defend what you did?

The framework is less applicable to pure strategy, artistic judgment, or contexts where methodology cannot be exposed for confidentiality or competitive reasons. It addresses technical work where verification is possible, not all professional work.

---

## Tacitness as Interface Property

Traditional framing holds tacit knowledge as intrinsically hard to articulate (Polanyi). Under this framework, tacitness is relational—a function of the expressive capacity of the holder and the interpretive capacity of the receiver.

What is tacit between two humans may be explicit between human and AI, or vice versa. Tacitness becomes a measurable interface property: how much effort to transfer capability X from agent A to agent B?

This reframes knowledge management. The question shifts from "how do we capture tacit knowledge?" to "how do we reduce tacitness by improving expressive or interpretive capacity on either side of the transfer?"

---

## Reliability as the Fulcrum

Commercially valuable knowledge is reliable capability. Reliability is established via one of two routes:

1. **Methodologically verifiable**: reasoning is traceable, steps are auditable, validation against accepted practice is possible.

2. **Empirically demonstrated**: outcomes consistently meet a risk-adjusted threshold. Black box is acceptable if track record is sufficient.

The risk-adjusted threshold governs which route is acceptable for a given deliverable. Reliability requirements for a scoping study differ from bankable feasibility differ from dam stability sign-off. The framework scales.

---

## Artifact Distinction: Method-Bearing vs Conclusion

**Method-bearing artifacts** translate methodology into implementation. Verification is against specification. The methodology carries the epistemic weight; execution is tooling. Liability is manageable within existing QA frameworks.

**Conclusion artifacts** are novel outputs requiring independent verification. This includes any artifact where the generation method proposes rather than executes—including AI-proposed methodologies.

Verification routes for conclusion artifacts:

1. **Methodologically verifiable work**: execute the proposed method via method-bearing process; outcomes validate or falsify. Risk bounded a priori.

2. **Empirical test (prospective)**: build it, observe outcomes before full deployment. Risk bounded by test design.

3. **Post facto reconciliation**: compare projected outcomes against actual outcomes after deployment. Risk already taken; validation is retroactive; induction limits apply.

No free epistemic lunch for conclusion artifacts. Novel outputs earn reliability status only by being worked through or empirically tested—not by being plausible.

### Examples Across Domains

The method-bearing vs. conclusion distinction applies across technical professions:

| Domain | Method-Bearing | Conclusion |
|--------|----------------|------------|
| Engineering | Structural calculation per code | Novel design for unusual conditions |
| Legal | Review for compliance with stated requirements | Strategic advice on litigation risk |
| Medical | Lab interpretation per standard reference ranges | Diagnosis based on clinical presentation |
| Financial | Valuation using standard DCF model | Investment recommendation |
| Architecture | Code-compliant specifications | Design decisions integrating aesthetics with constraints |

The distinction isn't about importance — conclusions can be routine and method-bearing work can be critical. It's about verification: can the process be inspected, or must you trust the producer?

**Note on embedded judgment:** Most method-bearing work contains judgment calls within the method. An engineer following code still selects load assumptions. A lawyer checking compliance still interprets requirements. These judgment points are where residual risk lives. Method-bearing status means the methodology is exposed and judgment points are identifiable — not that no judgment occurred.

---

## Post Facto Reconciliation Builds Actuarial Standing

Track record is a legitimate verification route, but it requires actual measurement against outcomes. "This person has been doing it for 30 years" is not measurement—it's reputation as proxy.

Systematic reconciliation—evaluating projections against outcomes across sufficient volume—builds actuarial evidence. A method demonstrating tighter error distributions, lower variance, better calibration earns reliability status over time.

This is how expert intuition has always been validated. We're making it measurable.

Residual risk: post facto reconciliation validates after exposure has occurred. Induction limits apply. n successful reconciliations do not guarantee n+1. Reliance on reconciliation-only verification is acceptable only when the cost of being wrong is within tolerance.

---

## Stakeholder Obligations

Consumers of conclusion artifacts should demand either methodological verifiability or actuarial evidence of reliability.

Producers should provide the same.

Both must continuously evaluate as generation methods evolve. The actuarial case for method A today may be superseded by method B tomorrow.

Underwriters and regulators are stakeholders with obligations and leverage. When reconciliation data demonstrates that method A produces quantifiably better outcomes—lower risk, tighter distributions, lower implementation cost—they will exert pressure on generation to shift to that mode. This is the forcing function.

The foundational forcing function is the introduction of novel generation mechanisms. Without novelty, the obligation to continuously evaluate would be empty formalism.

---

## What the Framework Reveals

**Credentials are regulatory compliance, not reliability signals.** The professional stamp on a regulatory filing is a disclosure gate, not a trust decision. Actual reliability assessment happens elsewhere: firm reputation, individual track record, methodology review. Credentials are a parallel layer, not a verification shortcut.

**Brand is not validation.** "Our brand is our validation" is risk acceptance plus limited transfer—not risk management. The firm's liability cap may be a rounding error compared to actual losses if the structure fails and people die. Brand-based trust makes risk invisible until failure; it doesn't make risk disappear.

The framework forces honesty:

- Exposed, verified method → risk reduced
- Unexposed method with actuarial backing → risk quantified
- Neither → client accepting unknown risk on reputation alone

**Unexposed expert judgment is correctly classified as conclusion artifact.** The senior engineer who "just knows" isn't disqualified—but their output carries higher residual risk than exposed method producing equivalent outcomes. This is already true; the framework makes it explicit.

---

## Method Exposure as Compounding Value

Method exposure enables:

1. **Methodological validation** (producer-side verification)
2. **Consumer interpretation** (receiver-side access via AI as interpretive layer)
3. **Systematic reconciliation** (actuarial evidence over time)

Previously, unexposed expertise was defensible because interpretation was costly. The consumer couldn't evaluate methods even if exposed—they were functionally opaque regardless.

AI as interpretive layer changes the value equation, but only for exposed methods. With exposed methods, AI can translate between producer's technical expression and consumer's interpretive capacity—explain what was done, what was arbitrary judgment, what was supported by evidence, what the risks are. Without exposed methods, AI generates plausible narrative about a black box. Nowhere near as useful.

Competitive pressure flips. Interpretation is now cheap, but only for what's exposed. Unexposed expertise forfeits all three value layers.

---

## The Pitch

This is how we evaluate whether something is right or wrong right now. We don't trust everyone—we trust people we deem trustworthy, and that trustworthiness is established by track record or by evaluating how they obtained their results. Novel generation mechanisms are no different.

The framework doesn't mandate adoption of any particular method. It demands consistent application of reliability standards we already hold. Resistance to novel methods is legitimate if they fail to meet thresholds. What's illegitimate is categorical exemption from evaluation—either by reflexive rejection or uncritical acceptance.

The framework is novel only in its explicitness. We already do this. We just don't talk about it this way.

---

## Implications

1. All work product should have its methods exposed where possible. Work with exposed method is inherently of greater value due to its exposure to methodological validation.

2. Where method cannot be exposed, alternative verification routes exist but carry higher residual risk that must be priced accordingly.

3. Stakeholders at all levels—producers, consumers, underwriters, regulators—have obligations to demand and provide reliability evidence, and to continuously evaluate as generation methods evolve.

4. The framework reveals that unexposed expertise, however well-intentioned, creates unquantified residual risk. Catastrophic failures are rare but real — Vale lost $19 billion in market cap in a single day after Brumadinho, and the Samarco disaster resulted in a $30 billion settlement. The industry manages this through reliance on expert judgment (brand) and liability structures that may leave communities holding consequences. Whether current practice is acceptable depends on whether that residual risk is within tolerance — a question this framework forces but doesn't answer.

5. The question isn't whether to adopt novel generation methods. It's whether you'll be permitted to compete without them once the actuarial case is made—or conversely, whether you'll be permitted to use them before it is.

---

## Practical Next Steps

**For practitioners:**

1. **Classify your recent work.** Look at your last ten deliverables. For each: could a qualified peer inspect your method and verify the output, or must they trust your judgment? Be honest about which are method-bearing and which are conclusions.

2. **Identify your verification route.** For conclusion artifacts, how would you defend them if challenged? Exposed methodology? Track record? Neither? If neither, you're asking clients to accept unknown risk.

3. **Treat AI-generated content as conclusion artifacts** until you've verified the method or built track record. The burden of verification doesn't transfer to the tool.

**For firms:**

1. **Audit your deliverable mix.** What percentage of your work is conclusion artifacts with no verification route beyond reputation? This is your exposure.

2. **Track outcomes.** When your predictions meet reality, document the comparison. Actuarial standing is earned through systematic reconciliation, not accumulated reputation.

3. **Identify method exposure opportunities.** Where could you expose methodology but don't? The barrier is often inertia, not impossibility.

**For clients:**

1. **Ask one question:** "How would I verify this if I needed to?" The answer tells you whether you're receiving method-bearing work or paying for conclusions you can't inspect.

2. **Maintain your own records.** When provider predictions meet reality, document the comparison. This is your evidence, independent of their claims.
