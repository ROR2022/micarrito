import { useTranslations } from "next-intl";
import { LayoutGrid, CreditCard, PercentCircle, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
  const t = useTranslations('Landing.Features');
  
  const features = [
    {
      icon: <LayoutGrid className="h-10 w-10 text-primary" />,
      title: t('adaptability.title'),
      description: t('adaptability.description')
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: t('payments.title'),
      description: t('payments.description')
    },
    {
      icon: <PercentCircle className="h-10 w-10 text-primary" />,
      title: t('revenue.title'),
      description: t('revenue.description')
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: t('compliance.title'),
      description: t('compliance.description')
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 