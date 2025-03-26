"use client"
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const t = useTranslations('Landing.FAQ');
  const questions = t.raw('questions') as FaqItem[];
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('subtitle')}</p>
        </div>
        
        <div className="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {questions.map((item: FaqItem, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">{t('moreQuestions')}</p>
            <Button asChild>
              <Link href={`/${locale}/contact`}>{t('contactUs')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 