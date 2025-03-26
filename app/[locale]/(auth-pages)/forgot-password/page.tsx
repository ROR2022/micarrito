import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Link from "next/link";


export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('Auth.forgotPassword');
  const locale = await getLocale();
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">{t('title')}</h1>
          <p className="text-sm text-secondary-foreground">
            {t('description')}
            <Link className="text-primary underline" href={`/${locale}/sign-in`}>
              {t('signIn')}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t('email')}</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            {t('resetPassword')}
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      
    </>
  );
}
