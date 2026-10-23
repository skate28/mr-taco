import { site } from "@/content";

export function faqItems() {
  return site.faq.filter((item) => item.question.trim() && item.answer.trim());
}

export function hasFaq(): boolean {
  return faqItems().length > 0;
}
