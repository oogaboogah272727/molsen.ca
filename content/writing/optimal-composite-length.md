---
title: "Optimal Composite Length: A Multi-Criteria Optimization Approach"
date: 2025-12-27
description: "How systematic analysis of variance reduction, mining selectivity, and sample support leads to defensible compositing decisions in mineral resource estimation."
---

In mineral resource estimation, few decisions seem as mundane yet prove as consequential as selecting the right composite length. Compositing—the process of combining individual drill samples into regularized intervals—directly influences the statistical reliability of grade estimates, the validity of variographic analysis, and ultimately, the confidence placed in resource statements. Get it wrong, and you either smooth away genuine geological variability or preserve noise that obscures meaningful patterns.

The challenge lies in balancing competing objectives. Shorter composites preserve detail but retain statistical noise. Longer composites provide stability but may mask important grade variations that affect mining selectivity. The question facing every resource geologist is straightforward: what composite length optimally balances these trade-offs for a given deposit?

---

## A Framework for Defensible Decisions

Rather than relying on industry rules of thumb or arbitrary conventions, a rigorous approach examines three interrelated factors: the natural sample support, variance reduction efficiency, and mining selectivity implications.

**Sample support analysis** begins with understanding what the drilling program actually delivered. In a recent gold deposit study involving nearly 49,000 samples, the modal sample length was 2.5 meters, with 65% of all samples at this interval. More significantly, these 2.5-meter samples contained 78% of the total metal in the database. This distribution reflects the geology and the sampling protocol—standard core runs in competent rock typically produce consistent lengths, while challenging ground conditions or detailed geological contacts result in shorter intervals.

This observation alone provides strong guidance: compositing to a length already dominant in the data minimizes the artificial modification of sample populations. When two-thirds of your samples are already at a particular length, forcing them into a different support size introduces unnecessary transformation.

**Variance reduction analysis** quantifies how compositing dampens grade variability. By simulating composites at lengths from one to five meters, we can measure the proportional reduction in variance at each interval. The relationship is not linear—initial compositing produces dramatic variance reduction, but returns diminish with increasing length.

In the study, raw samples exhibited a variance of 34.0 (with a coefficient of variation exceeding 485%, typical of nuggety gold deposits). Compositing to 2.5 meters reduced variance to 7.3—a 78.5% reduction. Extending to 5.0 meters achieved only an additional 7% reduction (to 85.8% total). The variance reduction curve showed a clear inflection point between 2.0 and 2.5 meters, beyond which additional compositing yielded minimal statistical benefit.

This "knee point" in the variance curve represents an important threshold. Below it, compositing efficiently reduces noise. Beyond it, further compositing primarily destroys genuine geological information without commensurate statistical gain.

**Mining selectivity analysis** addresses the operational consequence of composite length choice. Smaller support sizes preserve the ability to distinguish ore from waste at fine scales—critical for selective mining operations. Larger supports blur these boundaries, potentially diluting ore or misclassifying waste.

The study quantified this through a selectivity ratio: the mean grade of the top 10% of composites divided by the overall mean. At 2.5-meter composites, this ratio was 7.81, indicating that the highest-grade material averaged nearly eight times the deposit mean. Reducing composite length to 1.0 meter improved selectivity to 8.27 (a 6% gain), while increasing to 5.0 meters degraded it to 7.27 (a 7% loss). For an operation where selective mining is economically significant, these differences translate directly to recovered value.

---

## The Convergent Solution

When multiple analytical approaches point to the same answer, confidence in the conclusion increases substantially. In this case:

- The modal sample length is 2.5 meters
- The variance reduction knee point falls at 2.0–2.5 meters
- Typical open-pit mining bench heights align with 2.5-meter intervals
- Selectivity remains acceptable at this support size

The recommendation for 2.5-meter regular composites emerged not from convention but from quantified analysis of the specific dataset. The final composite dataset comprised 42,439 records with 96.3% average coverage—meaning the vast majority of composites were fully supported by sample data, minimizing the need for extrapolation or gap-filling.

---

## Practical Implementation Considerations

Selecting the optimal length represents only part of the compositing decision. Implementation details matter considerably:

**Grade capping before compositing** ensures that extreme values are controlled prior to length-weighted averaging. Compositing first and capping second produces different results—typically less effective control of outliers that influence multiple composites.

**Regular intervals from collar** maintain consistency across the database and simplify downstream processing. While some practitioners advocate "best-fit" compositing that minimizes sample splitting, regular intervals facilitate comparison between holes and integration with block models.

**Coverage thresholds** provide quality control. Composites with less than 50% sample coverage should be flagged for review—they may reflect drilling gaps, lost core, or incomplete assaying. In the study, only 0.7% of composites fell below this threshold, indicating excellent data density.

---

## The Broader Principle

This case study illustrates a broader principle in resource estimation: quantitative analysis should guide methodological choices. The era of "we've always done it this way" or "industry standard is X meters" is yielding to rigorous, deposit-specific optimization.

Modern software tools make such analysis routine. What once required weeks of manual calculation now takes hours. The investment pays dividends not only in defensible resource statements but in the confidence of technical reviewers, investors, and operators who rely on those estimates.

Compositing decisions may never generate the excitement of high-grade drill intercepts or new discovery announcements. But for those who understand that robust methodology underpins every credible resource estimate, getting the fundamentals right represents essential due diligence—and, occasionally, genuine competitive advantage.

The numbers in this study tell a clear story: 78.5% variance reduction, 96.3% average coverage, and a composite length that aligns with both the natural sample support and the operational mining height. When the data, the statistics, and the practicalities converge on a single answer, you have found your optimal solution.
