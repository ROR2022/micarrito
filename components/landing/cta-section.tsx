"use client"
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FaRegCopy } from "react-icons/fa";
export function CtaSection() {
  const t = useTranslations('Landing.CTA');
  const params = useParams();
  const locale = params.locale as string;

  const handleCloneRepo = () => {
   const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;
   const repoName = repoUrl?.split('/').pop();
   const cloneUrl = `git clone ${repoUrl} ${repoName}`;
   
   try {
     navigator.clipboard.writeText(cloneUrl);
     toast.success('Command copied to clipboard!', {
       description: 'You can now paste it in your terminal',
       duration: 3000
     });
   } catch (error) {
     toast.error('Failed to copy command', {
       description: 'Please try again or copy it manually',
       duration: 3000
     });
   }
  }
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">{t('subtitle')}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 ">
            <Button onClick={handleCloneRepo} className="cursor-pointer"  size="lg" asChild>
              <div className="flex items-center gap-2">
              {t('primaryCTA')}
              <span className=" text-xs text-muted-foreground">
                <FaRegCopy />
              </span>
              </div>
            </Button>
            <Button variant="outline" className="cursor-pointer" size="lg">
              <Link href={`/${locale}/docs`}>{t('secondaryCTA')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 