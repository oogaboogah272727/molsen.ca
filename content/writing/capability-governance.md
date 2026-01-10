---
title: "Capability Governance: A Framework for Generated Artifacts"
date: 2024-12-27
description: "A framework for governing generated artifacts through defensibility. Two routes: exposed methodology or empirical track record. Obligations for producers, consumers, underwriters, and regulators."
type: core
tags: ["AI Governance", "Professional Practice"]

# Knowledge graph metadata
graph_id: capability-governance
defines: ["Method-Bearing vs Conclusion", "Reliability Verification", "Method Exposure"]
themes: ["AI Governance", "Professional Practice"]
relationships:
  - target: oracle-assistant
    type: core
    label: extends
  - target: knowledge-capability
    type: core
    label: uses
---

An **artifact** is an output that enters a decision chain. A report, a calculation, a recommendation, a design, an analysis. Something someone else will act on.

**Generation** is how that artifact came into existence. A human wrote it. An AI drafted it. Some combination reviewed, refined, or rubber-stamped it.

**Defensibility** is whether and to what degree the artifact can be defended when challenged. Defensibility is established through one of two routes: exposed methodology that can be inspected, or empirical track record that demonstrates reliability. The generation method matters because it determines which routes are available.

This framework governs artifacts, generation methods, and defensibility.

---

## Why This Framework?

The EU AI Act governs AI *systems*. NIST AI RMF governs *risk management processes*. ISO 42001 governs *management systems*.

None answers the question practitioners face: "Can I use this generated output, and if so, under what conditions?"

This framework governs artifacts. Different stakeholders, same need:

- Producers: Can I defend what I delivered?
- Consumers: Did I get what I paid for?
- Underwriters: Is my exposure correctly priced?
- Regulators: Is the public holding undisclosed exposure?

All require defensible artifacts with known verification routes.

---

## Normative Stance

This framework is prescriptive, not merely descriptive. It states how artifact governance should work, not just how it does work.

Current practice often substitutes risk transfer for risk reduction: credentials, brand, liability caps, and insurance create the appearance of governance while leaving residual risk with parties who never consented to bear it. This is cost externalization dressed as accountability.

Risk transfer is legitimate when disclosed. Complete transfer is rare—liability caps exist precisely because full transfer is unaffordable—but disclosed incomplete transfer is still legitimate governance. Parties who knowingly accept residual risk have consented. The problem is undisclosed incomplete transfer: when residual risk lands on parties who never agreed to bear it. That somewhere is typically communities, workers, and environments with no seat at the table when terms were set.

Where risk reduction is available—through methodology exposure that permits inspection, or through empirical validation that demonstrates reliability—choosing incomplete transfer instead is ethically indefensible. The framework provides the standard against which current practice can be measured.

---

## Scope

**The framework applies to all generated artifacts.** Governance intensity scales with risk class; the principles do not.

An artifact enters the framework's scope when:

- It informs a decision someone else will act on
- Someone may ask "how did you arrive at this?"
- Accountability attaches to the producer

Engineering, legal, medical, financial, consulting—the domain varies, but the governance question is the same: can you defend what you did?

**Low-stakes artifacts** still fall under the framework. The governance is minimal: check it, fix it if it breaks, learn from the error distribution over time. That's not a different framework. It's the same framework with minimal ceremony.

**High-stakes artifacts** require exposed methodology or actuarial evidence before deployment. The framework doesn't change. The effort justified in applying it does.

The framework is less applicable to pure strategy, artistic judgment, or contexts where methodology cannot be exposed for confidentiality or competitive reasons. But these are edge cases, not the norm.

---

## The Core Distinction: Method-Bearing vs Conclusion

This distinction is the heart of the framework.

**Method-bearing artifacts** translate methodology into implementation. The methodology is exposed. Verification is against specification. The methodology carries the epistemic weight; execution is tooling. Liability is manageable within existing QA frameworks.

**Conclusion artifacts** are outputs where the generation method proposes rather than executes. This includes any novel output requiring independent verification—including AI-proposed methodologies, expert intuitions, and recommendations that can't be traced to inspectable steps.

The distinction is about verification, not importance. Conclusions can be routine; method-bearing work can be critical. The question: can the process be inspected, or must you trust the producer?

### Examples Across Domains

| Domain | Method-Bearing | Conclusion |
|--------|----------------|------------|
| Engineering | Structural calculation per code | Novel design for unusual conditions |
| Legal | Review for compliance with stated requirements | Strategic advice on litigation risk |
| Medical | Lab interpretation per standard reference ranges | Diagnosis based on clinical presentation |
| Financial | Valuation using standard DCF model | Investment recommendation |
| Architecture | Code-compliant specifications | Design decisions integrating aesthetics with constraints |

**Note on embedded judgment:** Most method-bearing work contains judgment calls within the method. An engineer following code still selects load assumptions. A lawyer checking compliance still interprets requirements. These judgment points are where residual risk lives. Method-bearing status means the methodology is exposed and judgment points are identifiable—not that no judgment occurred.

### On Opacity

Some argue method opacity is structurally necessary—trade secrets, competitive advantage, inherent complexity. This conflates business justification with governance adequacy.

As argued in [Agent-Relative Tacitness](/writing/agent-relative-tacitness/), most "tacit knowledge" is representationally blocked (could be expressed, hasn't been), not structurally inexpressible. The domain of genuinely irreducible tacit knowledge is small and shrinking. Claims of structural inexpressibility should be viewed with extreme skepticism.

"I know this but cannot explain how" is not a defense when material economic or safety consequences attach. Inability to articulate method creates governance problems that scale with stakes—the higher the consequences, the less acceptable the opacity.

The framework does not forbid opacity. It classifies it correctly: unexposed method with no track record means unknown risk. Where risk reduction through methodology exposure is available, choosing opacity instead externalizes risk onto consumers and downstream parties. Sophisticated consumers should demand better terms or price the residual risk explicitly.

---

## Routes to Defensibility

Defensibility is established via one of two routes:

### 1. Methodologically Verifiable

Reasoning is traceable. Steps are auditable. Validation against accepted practice is possible. The artifact is method-bearing, and the method can be inspected.

For conclusion artifacts, this route requires converting the conclusion into method-bearing form: execute the proposed method via an inspectable process; outcomes validate or falsify. Risk is bounded a priori because you can see what's being done before it's done.

### 2. Empirically Demonstrated

Outcomes consistently meet a risk-adjusted threshold. Black box is acceptable if track record is sufficient.

This is actuarial standing: systematic reconciliation of predictions against outcomes across sufficient volume. A method demonstrating tighter error distributions, lower variance, better calibration earns reliability status over time. Paul Meehl's research on clinical versus statistical prediction demonstrated decades ago that actuarial methods consistently match or outperform expert clinical judgment across domains—a finding that has replicated extensively and that this framework takes seriously.

**Track record requires measurement.** "This person has been doing it for 30 years" is reputation as proxy, not measurement. The distinction matters: track record is empirical—documented comparison of projections to outcomes. Authority is social permission—credentials, tenure, brand recognition. Empirical evidence can be wrong, but it can also be corrected through further measurement. Social permission can persist indefinitely without ever confronting outcomes. Actuarial standing is earned through documented reconciliation, not accumulated reputation.

**Residual risk remains.** Post facto reconciliation validates after exposure has occurred. Induction limits apply. n successful reconciliations do not guarantee n+1. Reliance on this route is acceptable only when the cost of being wrong is within tolerance.

### The Risk-Adjusted Threshold

Which route is acceptable depends on stakes. Reliability requirements for a scoping study differ from bankable feasibility differ from dam stability sign-off. The framework scales; the threshold varies with consequence of failure: how severe, how reversible, how attributable.

This is appropriate scaling, not ambiguity. A framework that prescribed identical verification for all artifacts would be either impossibly burdensome for low-stakes work or dangerously lax for high-stakes work. Risk-adjusted means the governance intensity matches the stakes.

### Why Two Routes, Not Three

Some argue authority—credentials, certification, brand—constitutes a third route. It does not. Authority transfers risk; it does not reduce risk. The professional stamp says "I accept responsibility"—not "this is correct." When the artifact fails, consequences still occur.

Risk transfer is legitimate governance when disclosed—that's what underwriting is for. Disclosed incomplete transfer is acceptable: parties who knowingly accept residual risk have consented to the terms. The problem is undisclosed incomplete transfer: liability caps that look adequate on paper while the real exposure falls on non-consenting parties. Their only recourse is litigation after the fact. When consequences are fatal, victims have no recourse at all—only their survivors can litigate for harms that cannot be undone.

Where risk reduction is available through methodology exposure or empirical validation, substituting incomplete transfer externalizes costs onto others. The framework excludes authority as a defensibility route not because transfer is illegitimate, but because authority-as-defensibility typically masks incomplete transfer as adequate governance.

Procedural compliance ("we followed standard practice") and precedent ("materially similar to X") are the same problem in different dress. Both shift responsibility away from the specific artifact without reducing the risk that this artifact, in this context, is wrong.

### On Peer Review

Peer review—evaluation of an artifact by a qualified reviewer—is not a third verification route. It is a mechanism that operationalizes the existing two, or fails to, depending on what backs the standards being applied.

When a structural engineer reviews another engineer's calculation, what are they doing? Either they're checking methodology against standards derived from empirical failure data (route 2 informing route 1), or they're exercising their own unexposed judgment ("this looks right to me"). The first is verification. The second is an additional conclusion artifact layered on top of the original—risk distribution rather than risk reduction.

Where standards trace to methodology or track record, peer review reduces risk. Where they don't, peer review aggregates unexposed judgment. The effectiveness data supports this: engineering code inspections detect 50-90% of defects; scientific manuscript peer review detects around 25%. The difference tracks what reviewers have to check against.

This framing differs from how standards typically discuss peer review, and has implications that some will find uncomfortable—particularly for scientific peer review. The full argument, including challenges to this position, appears in [Appendix A](#appendix-a-peer-review-as-risk-reduction).

---

## Stakeholder Obligations

The framework treats all stakeholders as responsible parties with governance duties—not as passive beneficiaries of regulation. This is counter-cultural. The prevailing view treats consumers as rights-holders to be protected. This framework treats them as participants with obligations.

### Note on "Consumer"

Consumers in this framework are sophisticated institutional actors—firms, repeat purchasers, organizations with capacity to evaluate and track outcomes. End-user consumer protection (patients, homeowners, retail buyers) is a related but distinct problem, closer to product liability than professional governance. The obligations below assume consumers who can classify, evaluate, and maintain records as part of normal business practice.

### Consumers

Consumers of generated artifacts have four obligations:

1. **Classify artifacts by risk.** What's the consequence of failure? Attribution difficulty? Downstream propagation? Irreversibility? Classification determines governance intensity.

2. **Demand defensibility.** For high-risk artifacts, demand either exposed methodology or actuarial evidence. "Trust our brand" is risk acceptance, not risk management. Know which you're doing.

3. **Maintain local records.** When provider predictions meet reality, document the comparison. This is your evidence, independent of their claims. Actuarial standing must be earned, and you're the one with visibility into outcomes.

4. **Refresh comparisons.** The actuarial case for method A today may be superseded by method B tomorrow. Continuous evaluation is the obligation. When novel generation mechanisms offer equivalent quality at vastly lower cost—when "expensive and sometimes wrong" faces competition from "cheap and wrong less often"—continuous evaluation becomes economically non-optional.

### Producers

Producers have symmetric obligations:

1. **Expose methods where possible.** Work with exposed method is inherently of greater value due to its openness to validation. Where method cannot be exposed, acknowledge the residual risk explicitly.

2. **Provide defensibility.** For high-risk artifacts, consumers should be able to either inspect the method or see the track record. Offering neither means asking clients to accept unknown risk on reputation alone.

3. **Track outcomes.** When predictions meet reality, document the comparison. Actuarial standing is earned through systematic reconciliation, not accumulated reputation.

4. **Treat AI-generated content as conclusion artifacts** until the method is verified or track record is built. The burden of verification doesn't transfer to the tool.

### Underwriters and Regulators

1. **Demand reconciliation data.** Track record claims require documented outcome comparisons, not tenure or reputation.

2. **Price and regulate based on method exposure.** Exposed methodology should carry lower premiums and lighter oversight than unexposed.

3. **Share data.** Both need the same evidence; sharing accelerates actuarial accumulation industry-wide.

Different motivations, same outcome. Regulators act for public good; underwriters act to correctly price risk. To the extent underwriters bear actual consequences—rather than capping exposure or relying on governmental backstops—their economic incentive aligns with the public interest.

The foundational forcing function is novel generation mechanisms that deliver equivalent or better quality at vastly lower cost. When "expensive and sometimes wrong" competes with "cheap and wrong less often," the actuarial case eventually becomes undeniable. The question is not whether this transition happens, but whether governance frameworks are ready for it.

---

## What the Framework Reveals

**Credentials are regulatory compliance, not reliability signals.** The professional stamp on a regulatory filing is a disclosure gate, not a trust decision. As Michael Spence's signaling theory explains, credentials function as market signals—proxies that reduce information asymmetry between parties who cannot directly observe capability. But signals are not the thing signaled. Actual reliability assessment happens elsewhere: firm reputation, individual track record, methodology review. Credentials are a parallel layer, not a verification shortcut.

**Standard of care is not the same as correctness.** Legal liability typically requires demonstrating breach of standard of care—deviation from what a competent practitioner would do. This standard serves important legal functions: it provides a defensible benchmark and prevents hindsight bias from making every error actionable. But meeting standard of care says nothing about whether this artifact is correct. The dam can still fail. The diagnosis can still be wrong. Standard of care addresses legal liability; it does not address the governance question of whether the artifact is defensible. The two problems require different frameworks.

**Brand is not validation.** "Our brand is our validation" is risk acceptance plus limited transfer—not risk management. The firm's liability cap may be a rounding error compared to actual losses if the structure fails and people die. Brand-based trust makes risk invisible until failure; it doesn't make risk disappear.

The framework forces honesty:

- Exposed, verified method → risk reduced
- Unexposed method with actuarial backing → risk quantified
- Neither → client accepting unknown risk on reputation alone

**Unexposed expert judgment is correctly classified as conclusion artifact.** The senior engineer who "just knows" isn't disqualified—but their output carries higher residual risk than exposed method producing equivalent outcomes. This is already true; the framework makes it explicit.

---

## Implications

1. **Method exposure increases value.** Work with exposed method is open to validation, interpretation, and systematic reconciliation. Previously, unexposed expertise was defensible because interpretation was costly. AI as interpretive layer changes this: interpretation is now cheap, but only for what's exposed. Unexposed expertise forfeits value it didn't have to.

2. **Alternative verification routes carry residual risk.** Where method cannot be exposed, track record provides defensibility—but that risk must be priced accordingly.

3. **All stakeholders have obligations.** Producers, consumers, underwriters, regulators—each has duties to demand and provide defensibility evidence, and to continuously evaluate as generation methods evolve.

4. **Unexposed expertise creates unquantified risk.** Catastrophic failures are rare but real. Vale lost $19 billion in market cap in a single day after Brumadinho; the Samarco disaster resulted in a $30 billion settlement. The industry manages this through reliance on expert judgment (brand) and liability structures that may leave communities holding consequences. Whether current practice is acceptable depends on whether that residual risk is within tolerance—a question this framework forces but doesn't answer.

5. **Novel generation methods will become table stakes.** Either you'll be unable to compete without them once the actuarial case is made, or unable to use them before it is.

---

## Appendix A: Peer Review as Risk Reduction

This appendix develops the argument summarized in the main text: that peer review is not a third verification route but a mechanism that operationalizes the existing two—or fails to, depending on what backs the standards being applied. This framing differs from how peer review is typically discussed in standards and professional literature. The argument is that the standard framing obscures something important.

### The Standard Framing

ISO 31000, COSO, and engineering standards like ASCE Policy Statement 351 classify peer review as a "control activity" or "quality assurance" mechanism. It is treated as risk reduction—something that catches errors before they cause harm. The designer of record retains ultimate responsibility; peer review supplements but does not replace the designer's own quality control.

This framing is not wrong, but it is incomplete.

### What the Standard Framing Misses

Peer review effectiveness varies dramatically by domain. In engineering code inspections against codified standards, defect detection runs 50-70%, sometimes reaching 90% with experienced inspectors. In scientific manuscript peer review, the Godlee study at BMJ found reviewers detected a median of 2 out of 8 deliberately inserted errors—25% detection, with 16% of reviewers catching none at all.

The standard framing treats both as "quality assurance" without explaining why one works and the other largely doesn't.

### The Proposed Framing

The explanation is what reviewers have to check against.

Peer review works where it traces to methodology or track record. Structural engineering codes exist because buildings fell down and the failures were studied. Pharmaceutical trial protocols exist because statistical methods were validated empirically. In these domains, the reviewer isn't substituting judgment for verification—they're applying standards that have methodological or empirical backing. The 50-90% defect detection rates in engineering inspections reflect this: reviewers have something concrete to check against.

Where that backing doesn't exist—strategic recommendations, novel design judgments, contested expert opinion—peer review becomes aggregated unexposed judgment. Two senior engineers agreeing doesn't make the reasoning inspectable. It makes two people responsible instead of one. That's risk distribution, not risk reduction. The 25% detection rate in scientific peer review reflects this: reviewers are exercising judgment about whether other judgment seems sound, with no empirically-validated standard to check against.

### The Uncomfortable Implication

This framing suggests that scientific peer review, as typically practiced, provides less epistemic assurance than the institution assumes. When a reviewer evaluates whether a manuscript's methodology is sound, they're producing a conclusion artifact about a conclusion artifact. The replication crisis is consistent with this interpretation—peer review failed to catch problems that later proved fatal because peer review was never verification in the first place. It was aggregated expert judgment, which is better than nothing but far short of what "peer-reviewed" implies to consumers of scientific literature.

### Challenges to This Framing

Three objections deserve acknowledgment.

First, the boundary between "checking against empirically-backed standards" and "exercising unexposed judgment" is not always sharp. An experienced reviewer applies internalized pattern-matching derived from years of exposure to what works and what doesn't. This is track record of a sort, even if undocumented. The framework may draw the line too sharply.

Second, aggregated expert judgment may be more valuable than "stacked conclusion artifacts" implies. Five independent experts agreeing reduces the probability that all five are wrong in the same way. This is not verification, but it is not nothing. The framework may undervalue it.

Third, demanding that all peer review trace to methodology or track record may be infeasible for domains where the relevant track record doesn't exist yet. Novel research is novel precisely because no track record exists. The framework may set an impossible standard.

### Response to Challenges

These objections have force but do not defeat the core claim.

Internalized pattern-matching is better than nothing, but it remains unexposed and unvalidated—exactly what the framework identifies as residual risk. Multiple experts agreeing does reduce some risk, but it is risk distribution (more people share responsibility) more than risk reduction (the probability of error decreases). And yes, novel domains lack track record—which means peer review in those domains should be understood as provisional judgment, not verification. Calling it what it is allows appropriate calibration of confidence.

### Proportionality

Where standards exist and qualified reviewers can evaluate against them, peer review reduces residual risk even when the underlying artifact remains a conclusion. The reduction is proportional to the reliability of the review process—which itself depends on how well the standards trace to methodology or track record.

Peer review of a structural calculation against code-derived standards reduces more risk than peer review of a strategic recommendation against "best practice." This proportionality is not stated in existing standards, but the data supports it.

### Conclusion

The framework does not dismiss peer review. It classifies peer review by what makes it effective: operationalizing routes 1 and 2 where possible, acknowledging limitations where not. This is a novel framing—standards do not discuss peer review this way. But the effectiveness data suggests they should.
