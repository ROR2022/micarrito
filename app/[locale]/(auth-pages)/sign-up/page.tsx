import { signUpAction } from "@/app/actions";
import { SocialAuthButtons } from "@/components/social-auth-buttons";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLocale, getTranslations } from "next-intl/server";

import Link from "next/link";


export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('Auth.signUp');
  const locale = await getLocale();
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">{t('title')}</h1>
        <p className="text-sm text text-foreground flex flex-col gap-2">
          {t('description')}
          <Link className="text-primary font-medium underline" href={`/${locale}/sign-in`}>
            {t('alreadyRegistered')}
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t('email')}</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            type="password"
            name="password"
            placeholder={t('password')}
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText={t('signUp')}>
            {t('signUp')}
          </SubmitButton>
          <SocialAuthButtons />
          <FormMessage message={searchParams} />
        </div>
      </form>
      
    </>
  );
}
