import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { blogPosts, blogCategories } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/blog-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Blog - Mi Carrito',
  description: 'Artículos y consejos sobre el mundo automotriz',
};

export default async function BlogPage() {
  const t = await getTranslations('Blog');

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t('categories')}</h2>
            <div className="space-y-2">
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t('search')}</h2>
            <div className="flex gap-2">
              <Input placeholder={t('searchPlaceholder')} />
              <Button>{t('search')}</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t('filter')}</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {blogCategories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 