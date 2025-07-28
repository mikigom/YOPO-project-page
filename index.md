---
layout: project_page
permalink: /

title: YOPO: A Minimalist’s Detection Transformer for Monocular RGB Category‑level 9D Multi‑Object Pose Estimation
authors:
  - Hakjin Lee,  Junghoon Seo,  Jaehoon Sim
affiliations:
  - AI Robot Team,  PIT IN Co.,  Republic of Korea
paper: https://arxiv.org/abs/???
code: https://github.com/rij12/YOPO           # placeholder until official repo is released
data: https://github.com/hughw19/NOCS_CVPR2019
---
<div class="columns is-centered">
    <div class="column is-four-fifths">
        <figure class="image is-16by9">
            <iframe class="has-ratio" src="https://www.youtube.com/embed/OTb0iuSBxcw" title="YOPO Project Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </figure>
    </div>
</div>

<!-- Using HTML to center the abstract -->
<div class="columns is-centered has-text-centered">
    <div class="column is-four-fifths">
        <h2>Abstract</h2>
        <div class="content has-text-justified">
Accurate 3‑D object pose estimation is fundamental for robotic perception and manipulation.  
We introduce <strong>YOPO</strong>, an <em>end‑to‑end</em> framework for monocular <em>category‑level 9‑DoF</em>
pose estimation that requires only RGB images and pose annotations.  
Built upon the transformer‑based DINO detector, YOPO augments detection queries with
parallel regression heads that jointly predict object <em>rotation</em>, <em>3‑D translation</em> and
<em>anisotropic scale</em>.  
A single forward pass outputs both object categories and 9‑D poses—no shape priors,
CAD templates, segmentation masks, or post‑processing are needed.  
YOPO achieves state‑of‑the‑art accuracy on CAMERA25, REAL275 and HouseCat6D, setting a
new bar for RGB‑only methods. Code and pretrained models will be released.
        </div>
    </div>
</div>

---

## Background
Estimating an object’s 6‑D (or, for unknown scale, 9‑D) pose from a single RGB frame is essential for robotic grasping, AR, and autonomous navigation. Most prior <em>category‑level</em> methods rely on extra geometric cues—CAD models, instance masks, or pseudo‑depth—plus two‑stage pipelines that first detect and then crop each object. 

We asks: **Can we remove all that baggage?**

## Objective
Develop a <strong>single‑stage</strong>, <strong>RGB‑only</strong> model that:
1. Detects every object in the scene,  
2. Predicts its full 9‑D pose <em>(rotation R, translation t, scale s)</em>,  
3. Trains and infers without CAD, masks, or depth.

## Key Ideas
1. **Query‑based DETR backbone** – inherits DINO’s two‑stage refinement to get strong 2‑D detections.  
2. **Parallel pose head** – four MLP branches regress center‑offset, depth, rotation (6‑D rep) and scale.  
3. **Box‑conditioned translation** – concatenates the 2‑D bounding box to the query so depth & offset learn geometric context.  
4. **3‑D‑aware Hungarian matching** – assigns predictions with a cost that mixes classification, IoU, translation & rotation.  
5. **Minimal supervision** – 2‑D boxes are auto‑derived by projecting 3‑D cuboids; no extra labels required.

![YOPO Overview](/static/image/YOPO_overview.png)

*Figure 1  A schematic of the YOPO architecture (manually added).*

## Table 1 Additional data requirements of recent RGB methods

| Method (Year) | CAD Model | Seg. Mask | Pseudo‑Depth |
|--------------|:---------:|:---------:|:------------:|
| OLD‑Net (’22) | ✓ | ✗ | ✓ |
| DMSR (’24)   | ✓ | ✓ | ✓ |
| DA‑Pose (’25)| ✗ | ✓ | ✓ |
| **YOPO (Ours)** | ✗ | ✗ | ✗ |

YOPO is the **only** approach in this list that dispenses with <em>all</em> external cues.

## Significance
* **Performance.** On REAL275, YOPO‑Swin‑L tops RGB baselines with  
  67 % IoU<sub>50</sub> and 53 % under the 10°/10 cm metric, narrowing the gap to RGB‑D systems.  
* **Simplicity.** Training uses just images + 9‑D labels—no costly CAD collections or pre‑segmentation.  
* **Scalability.** The same architecture generalises across CAMERA25 (synthetic), REAL275 (real) and HouseCat6D (10 categories).  
* **Speed.** One forward pass ≈ <em>real‑time</em> inference suitable for robotic manipulation loops.

## Citation
```
@article{lee2025yopo,
  title     = {You Only Pose Once: A Minimalist’s Detection Transformer for Monocular RGB Category-level 9D Multi-Object Pose Estimation},
  author    = {Hakjin Lee and Junghoon Seo and Jaehoon Sim},
  journal   = {arXiv preprint arXiv:????.?????},
  year      = {2025}
}
```