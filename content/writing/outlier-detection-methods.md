---
title: "Comparing Outlier Detection Methods for Skewed Grade Data"
date: 2025-01-15
description: "A practical comparison of five outlier detection approaches reveals how the right method balances statistical rigor with metal preservation in resource estimation."
---

Every geologist who has stared at a grade distribution knows the problem: a handful of exceptionally high samples that could make or break a resource estimate. Cap them too aggressively, and you leave metal on the table. Ignore them entirely, and your estimates become hostage to a few extraordinary values. The question is not whether to treat outliers, but how.

In a recent analysis of nearly 49,000 gold assay samples, I compared five different outlier detection methods to understand their practical trade-offs. The results offer useful guidance for anyone wrestling with skewed grade data.

---

## The Challenge of Skewed Distributions

Gold grades rarely follow well-behaved statistical distributions. In this dataset, values ranged from trace to 545 ppm, with a median of just 1.2 ppm. The maximum grade was 453 times the median—a ratio that would make any estimator nervous. Standard statistical assumptions simply do not apply.

This is where outlier detection methods diverge dramatically. Each approach makes different assumptions about what constitutes "extreme," and those assumptions have real consequences for resource estimation.

---

## Five Methods, Five Perspectives

### The IQR Method: Too Broad a Net

The Interquartile Range method, sometimes called Tukey's fence, uses the spread of the middle 50% of data to define outlier thresholds. Values beyond 1.5 times the IQR above the third quartile are flagged as mild outliers; values beyond 3 times are flagged as extreme.

In this dataset, even the extreme IQR threshold flagged 4,605 samples—9.4% of the data—at a cutoff of just 2.48 ppm. For a gold deposit, this is far too aggressive. The method is robust and non-parametric, but its fixed multipliers are designed for symmetric distributions, not the heavily skewed populations typical of precious metal grades.

### The Z-Score: Assumptions That Do Not Hold

The classical Z-score approach assumes data follow a normal distribution. Samples more than three standard deviations from the mean are flagged as outliers. This identified 472 samples (0.96%) at a threshold of 18.65 ppm.

The problem is that gold grades are definitively not normally distributed. Formal testing (Shapiro-Wilk) confirmed what the histogram already showed: these data violate normality assumptions severely. The Z-score method can still be applied, but its theoretical underpinnings are compromised.

### The Modified Z-Score (MAD): Overly Cautious

The Median Absolute Deviation method addresses the normality issue by using the median rather than the mean as the central tendency measure. This makes it robust to extreme values—but perhaps too robust.

With a standard threshold of 3.5, the MAD method flagged over 10,000 samples (20.5%) as outliers, at a cutoff of just 0.92 ppm. For a dataset where grades above 1 ppm represent genuine mineralization, this is impractical. The method's conservatism, an advantage in some contexts, becomes a liability when dealing with intentionally sampled ore zones.

### The Percentile Method: Practical and Transparent

Percentile-based thresholds take a simpler approach: define the top X% of samples as outliers. The 99th percentile threshold identified 490 samples (1.0%) above 17.96 ppm.

This method has the advantage of transparency. Everyone understands what "top 1%" means. It makes no assumptions about distribution shape and produces consistent, reproducible results. The main criticism—that the threshold is "arbitrary"—is also its strength: you choose the level of conservatism explicitly rather than having it emerge from assumptions that may not hold.

### Isolation Forest: Machine Learning Enters the Conversation

Isolation Forest is an unsupervised machine learning algorithm that identifies outliers based on how easily they can be isolated from the rest of the data. Extreme values, by definition, are easier to separate.

With a 1% contamination parameter, the algorithm identified 490 samples with an effective threshold around 18 ppm—closely matching the 99th percentile results. This convergence between the statistical and machine learning approaches provides useful validation. However, the algorithm's "black box" nature makes it harder to explain to auditors and reviewers.

---

## From Detection to Treatment: The Capping Question

Identifying outliers is only half the problem. The critical question is what to do with them. In resource estimation, the most common approach is capping: replacing values above a threshold with that threshold value.

The key constraint is metal conservation. Cap too low, and significant metal is removed from the resource model. Industry practice generally accepts up to 5% metal loss from capping, though this varies by commodity and context.

In this analysis, capping at 75 ppm emerged as the optimal choice. At this level:

- Only 38 samples (0.08%) were affected
- Metal loss was 3.94%—comfortably below the 5% guideline
- The maximum grade was reduced from 545 ppm to 75 ppm
- Skewness dropped from 31.46 to 12.83

Lower caps proved costly. Capping at 20 ppm would lose 17% of the metal. Even 50 ppm resulted in 6.5% metal loss—above the conventional threshold.

---

## The Spatial Dimension

One finding deserves particular attention. When the locations of outlier samples were analyzed, they showed significant spatial clustering. The average nearest-neighbor distance between outliers was 42 meters, compared to 86 meters expected under a random distribution.

This pattern suggests the high grades are not random errors or laboratory problems—they represent genuine high-grade zones within the deposit. This has important implications. Rather than viewing these samples purely as statistical nuisances to be suppressed, they may warrant separate treatment as a high-grade domain or influence zone.

---

## Practical Recommendations

For practitioners facing similar challenges, several conclusions emerge from this comparison:

First, avoid methods with strong distributional assumptions. The IQR and MAD methods were designed for different problems and performed poorly on skewed grade data. The classical Z-score is well-understood but theoretically inappropriate.

Second, the percentile method offers the best combination of practicality, transparency, and defensibility. A 99th percentile threshold provides a sensible starting point for most datasets.

Third, always quantify the metal loss before implementing caps. In this case, moving from a 50 ppm cap to 75 ppm reduced metal loss from 6.5% to 3.94%—a significant recovery with minimal additional estimation risk.

Fourth, examine the spatial distribution of outliers. Clustering may indicate genuine geological features that deserve domain-specific treatment rather than blanket capping.

---

## Conclusion

Outlier treatment in resource estimation requires balancing statistical prudence with economic reality. The analysis presented here demonstrates that a thoughtful approach—comparing multiple methods, quantifying impacts, and examining spatial patterns—can identify solutions that control estimation risk while preserving metal.

For this dataset, a cap of 75 ppm at the 99.92nd percentile achieved exactly that: controlling extreme values while limiting metal loss to under 4%. The result is a more defensible resource estimate that neither overstates nor understates the deposit's potential.

The methods differ, but the principle remains constant: let the data guide the decision, and always count the metal.
