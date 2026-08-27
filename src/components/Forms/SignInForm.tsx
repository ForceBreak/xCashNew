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
import { signInWithGoogle, signInWithEmail } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Invalid email address'),
  password: z.string().min(1, 'Password is required.'),
});

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const { email, password } = form.getValues();
      await signInWithEmail(email, password);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="form-signin" onSubmit={form.handleSubmit(handleSignIn)}>
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
            disabled={isLoading}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="form-signin"
            size="lg"
            disabled={isLoading}
          >
            Submit
          </Button>
        </Field>

        <Separator />

        <Button
          type="button"
          size="lg"
          onClick={() => signInWithGoogle()}
          disabled={isLoading}
        >
          Sign In with Google
        </Button>
      </FieldGroup>
    </form>
  );
}
