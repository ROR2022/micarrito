import { signInAction } from "@/app/actions";
import { SocialAuthButtons } from "@/components/social-auth-buttons";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLocale,getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('Auth.signIn');
  const locale = await getLocale();

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">{t('title')}</h1>
      <p className="text-sm text-foreground flex flex-col gap-2">
        {t('description')}
        <Link className="text-foreground font-medium underline" href={`/${locale}/sign-up`}>
          {t('notRegistered')}
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">{t('email')}</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t('password')}</Label>
          <Link
            className="text-xs text-foreground underline"
            href={`/${locale}/forgot-password`}
          >
            {t('forgotPassword')}
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder={t('password')}
          required
        />
        <SubmitButton pendingText={t('signIn')} formAction={signInAction}>
          {t('signIn')}
        </SubmitButton>
        <SocialAuthButtons />
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
