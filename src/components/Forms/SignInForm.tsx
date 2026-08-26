'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { createClient } from '@/lib/supabase/client';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Invalid email address'),
  password: z.string().min(1, 'Password is required.'),
});

export default function SignInForm({
  action = () => {},
}: {
  action: (values: z.infer<typeof formSchema>) => void;
}) {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'openid email profile',
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <form id="form-signin" onSubmit={form.handleSubmit(action)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="john@gmail.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal" className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="form-signin" size="lg">
            Submit
          </Button>
        </Field>

        <Separator />

        <Button type="button" size="lg" onClick={() => signInWithGoogle()}>
          Login with Google
        </Button>
      </FieldGroup>
    </form>
  );
}
