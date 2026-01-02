---
title: "EKA in Practice"
description: "The framework is no longer theoretical. Here's what we learned when we deployed it."
type: practice
tags: ["AI Governance", "Professional Practice", "Organizational Change"]
---

The essays on this site describe a framework. This essay describes what happened when we built it.

We've deployed Executable Knowledge Architecture at a professional services firm with significant liability exposure—the kind of firm where getting it wrong means malpractice claims, not just embarrassment. The implementation details are competitive advantage and can't be shared publicly. But the pattern is transferable, and the results are real.

---

## What We Built

The deployment has several layers:

**An orientation that teaches the distinction.** New users don't just get tool access. They experience the oracle pattern's failure mode firsthand—asking questions, getting plausible answers, then confronting the verification problem directly. By the time they reach the assistant pattern, they understand *why* it matters. The distinction isn't policy they memorize; it's something they've felt.

**System-level enforcement.** The tooling itself distinguishes between exploratory work (oracle pattern, disposable) and analytical work (assistant pattern, code required). For anything that might reach a client, the system requires executable artifacts—not because we distrust professionals, but because professionals need defensible methodology. The constraint is architectural, not cultural.

**Project isolation.** Professional services work involves client confidentiality. The deployment enforces boundaries at the directory level. One project, one context. No cross-contamination, no accidental disclosure, no "the AI saw something it shouldn't have." Legal exposure reduced to the minimum surface area.

**Methodology capture.** Every analytical artifact is versioned, documented, paired with the reasoning that produced it. When someone asks "how did you calculate this?"—and in our industry, they will—the answer isn't "I asked the AI." The answer is inspectable code that encodes the expert's specified method.

---

## What Surprised Us

**Adoption is faster than we imagined possible.** We launched a month ago. In three weeks—over Christmas—we hit 33% penetration across North America. We expected resistance. We got demand. Professionals who'd been skeptical of AI tools engaged once they understood the distinction. The assistant pattern gave them something the oracle couldn't: confidence that their judgment remained central, that the tool extended their capability without replacing their accountability.

**The compounding effect is already visible.** Workflows created by one professional become templates for others. Patterns crystallize into reusable tools. The value of the system increases with each user—not linearly, but faster. Network effects in methodology, and we're only a month in.

**The oracle pattern didn't disappear—it found its place.** Early drafts of the framework positioned oracle and assistant as competing approaches. In practice, they coexist. Oracle for ideation, brainstorming, exploring the problem space. Assistant for anything that needs to be reproducible, defensible, or delivered. The boundary is clearer in use than in theory.

**Resistance, when it comes, is informative.** Some professionals push back—"not everything needs code," "my expertise is ineffable," "this is slower than just asking." Each objection reveals something about how they understand their own value. The conversations that follow are often more valuable than the training itself.

---

## What We're Learning

The framework works. Not perfectly—nothing does—but well enough that adoption is accelerating without us pushing.

The key insight: the governance framework isn't overhead. It's the product. The professional's methodology, encoded in inspectable form, versioned and reproducible—that's what clients are paying for. The AI accelerates the encoding; it doesn't replace the judgment.

The firms that figure this out will have something their competitors don't: a way to use AI that increases rather than undermines their professional value. The ones that treat AI as an answer machine will face the two-prong threat described elsewhere on this site: malpractice risk if they trust it, redundant effort if they verify it.

---

## What's Next

The deployment continues to evolve. We're building shared repositories of validated workflows. We're capturing session data to understand what patterns emerge when professionals work this way. We're finding that the methodology capture has value beyond auditability—it's becoming institutional memory, expertise encoded in a form that survives personnel changes.

A month in. 33% penetration. Adoption accelerating.

We're just getting started.

---

If you're working on similar problems—deploying AI in contexts where professional accountability matters—I'm interested in the conversation. The implementation details stay private, but the pattern is transferable, and I suspect the challenges are common.

Reach out: [mike@molsen.ca](mailto:mike@molsen.ca)
