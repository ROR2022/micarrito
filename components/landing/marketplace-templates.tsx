import { useTranslations } from "next-intl";
//import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Building, Wrench } from "lucide-react";

export function MarketplaceTemplates() {
  const t = useTranslations('Landing.Templates');
  
  const templates = [
    {
      id: "automotive",
      icon: <Car className="h-5 w-5" />,
      title: t('automotive.title'),
      description: t('automotive.description'),
      fields: ["Brand", "Model", "Year", "Mileage", "Price", "Condition", "Location"]
    },
    {
      id: "realEstate",
      icon: <Building className="h-5 w-5" />,
      title: t('realEstate.title'),
      description: t('realEstate.description'),
      fields: ["Property Type", "Location", "Square Footage", "Bedrooms", "Bathrooms", "Price", "Features"]
    },
    {
      id: "services",
      icon: <Wrench className="h-5 w-5" />,
      title: t('services.title'),
      description: t('services.description'),
      fields: ["Service Type", "Provider Name", "Location", "Hourly Rate", "Experience", "Rating", "Availability"]
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('subtitle')}</p>
        </div>
        
        <div className="mt-16">
          <Tabs defaultValue="automotive" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {templates.map((template) => (
                <TabsTrigger 
                  key={template.id} 
                  value={template.id}
                  className="flex items-center gap-2"
                >
                  {template.icon}
                  <span className="hidden sm:inline">{template.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {templates.map((template) => (
              <TabsContent key={template.id} value={template.id} className="mt-6">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">{template.title}</h3>
                    <p className="text-muted-foreground mb-6">{template.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Custom Fields:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {template.fields.map((field, index) => (
                          <li key={index} className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                            {field}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* <Button>{t('viewDetails')}</Button> */}
                  </div>
                  
                  <div className="order-1 md:order-2 relative aspect-video overflow-hidden rounded-xl border shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/20 z-10" />
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      <p>{template.title}</p>
                    </div>
                    {/* Uncomment once you have the image
                    <Image 
                      src={`/images/${template.id}-template.png`} 
                      alt={template.title}
                      fill
                      className="object-cover" 
                    />
                    */}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
} 