import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/otp-form")({
  component: OTPForm,
});

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CenteredLayout } from "@/components";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useForm } from "@tanstack/react-form";
import { setAuth } from "@/features/auth/stores/authStore";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth({
    onSuccess: (data) => {
      // Stocker les credentials
      setAuth(data.token, data.user);

      navigate({
        to: "/dashboard",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "nlahiany@gmail.com",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Email:", value.email);
      mutate({ email: value.email, otp: value.otp });
    },
  });

  return (
    <CenteredLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Enter verification code</h1>
              <FieldDescription>
                We sent a 6-digit code to your email address
              </FieldDescription>
            </div>
            <Field className="flex flex-col items-center">
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <form.Field name="otp">
                {(field) => (
                  <InputOTP
                    maxLength={6}
                    id="otp"
                    required
                    containerClassName="gap-4 justify-center"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                  >
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              </form.Field>
              <FieldDescription className="text-center">
                Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>
            </Field>
            <Field>
              <Button isLoading={isPending} disabled={isPending} type="submit">
                Verify
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </CenteredLayout>
  );
}
