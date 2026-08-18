/**
 * Contextual blog links shown near the end of each service page.
 *
 * The Doulas page already carried inline links out to related posts; the other
 * service pages had none. Every slug below is verified against BLOG_SEO — keep
 * it that way, a link to a missing slug is a 404 crawlers will find.
 */

import type { ServiceReviewKey } from "./service-reviews";

export type RelatedPost = { title: string; slug: string };

export const SERVICE_RELATED_READING: Record<ServiceReviewKey, RelatedPost[]> = {
  doulas: [
    { title: "Doula vs Midwife: Who Cares for You and Your Baby", slug: "doula-vs-midwife-who-cares-for-you-and-your-baby" },
    { title: "Breastfeeding Rules Every New Mom Should Know", slug: "breastfeeding-rules-every-new-mom-should-know" },
    { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
  ],

  lactation: [
    { title: "Why Every New Mother May Need a Lactation Consultant", slug: "why-every-new-mother-may-need-a-lactation-consultant" },
    { title: "Baby Not Latching? A Guide to Breastfeeding Problems and Fixes", slug: "baby-not-latching-chennai-breastfeeding-problems-and-fixes" },
    { title: "5 Signs Your Baby Is Getting Enough Breast Milk", slug: "5-signs-baby-getting-enough-breast-milk" },
  ],

  gynaecology: [
    { title: "Pregnancy Diet Plan: Complete Nutrition Guide for Moms", slug: "pregnancy-diet-plan" },
    { title: "Is Folic Acid Enough in the First Trimester?", slug: "is-folic-acid-enough-in-first-trimester" },
    { title: "Can Stress Cause Miscarriage in the First Trimester?", slug: "can-stress-cause-miscarriage-in-first-trimester" },
  ],

  nannies: [
    { title: "Twin Baby Care at Home in Chennai: What Changes With Two", slug: "twin-baby-care-at-home-in-chennai-what-changes-with-two" },
    { title: "Newborn Sleep Patterns: What to Expect at 3 Months", slug: "newborn-sleep-patterns-what-to-expect-in-the-third-month" },
    { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
  ],

  "postnatal-recovery": [
    { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
    { title: "Does Postpartum Belly Go Away? Realistic Recovery Guide", slug: "does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
    { title: "Why Is It Hard to Lose Weight While Breastfeeding?", slug: "why-is-it-so-hard-to-lose-weight-while-breastfeeding" },
  ],

  physiotherapy: [
    { title: "Does Postpartum Belly Go Away? Realistic Recovery Guide", slug: "does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
    { title: "How Much Walking Is Safe During Pregnancy? Expert Guide", slug: "how-much-walking-is-safe-during-pregnancy" },
    { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
  ],

  pediatrician: [
    { title: "NICU Baby Care at Home in Chennai: What Happens After Discharge", slug: "nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" },
    { title: "Premature Baby Care at Home in Chennai: A Parent's Guide After NICU Discharge", slug: "premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
    { title: "Newborn Sleep Patterns: What to Expect at 3 Months", slug: "newborn-sleep-patterns-what-to-expect-in-the-third-month" },
  ],

  yoga: [
    { title: "How Much Walking Is Safe During Pregnancy? Expert Guide", slug: "how-much-walking-is-safe-during-pregnancy" },
    { title: "Can You Walk 10,000 Steps During Pregnancy? Safe Guide", slug: "can-you-walk-10000-steps-during-pregnancy" },
    { title: "10 Essential Nutrition Tips for a Healthy Pregnancy", slug: "10-essential-nutrition-tips-for-a-healthy-pregnancy" },
  ],

  "baby-care": [
    { title: "Newborn Sleep Patterns: What to Expect at 3 Months", slug: "newborn-sleep-patterns-what-to-expect-in-the-third-month" },
    { title: "How to Hold Your Baby When Breastfeeding Correctly", slug: "how-to-hold-a-baby-when-breastfeeding" },
    { title: "Premature Baby Care at Home in Chennai: A Parent's Guide After NICU Discharge", slug: "premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
  ],

  "mother-care": [
    { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
    { title: "Does Postpartum Belly Go Away? Realistic Recovery Guide", slug: "does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
    { title: "10 Essential Nutrition Tips for a Healthy Pregnancy", slug: "10-essential-nutrition-tips-for-a-healthy-pregnancy" },
  ],
};

export function getServiceRelatedReading(key: ServiceReviewKey): RelatedPost[] {
  return SERVICE_RELATED_READING[key];
}
