import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import {
  personalSchema,
  type PersonalFormValues,
} from "@/schemas/personalSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function PersonalForm() {
  const personal = useResumeStore((s) => s.resume.personal);
  const setPersonal = useResumeStore((s) => s.setPersonal);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: personal,
    mode: "onChange",
  });

  // Every keystroke is pushed to the store, so the preview updates live.
  useEffect(() => {
    const subscription = watch((values) => {
      setPersonal(values as PersonalFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, setPersonal]);

  const summaryLength = watch("summary")?.length ?? 0;

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name"
          required
          placeholder="Ananya Reddy"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          label="Job title"
          placeholder="Full Stack Developer"
          error={errors.jobTitle?.message}
          {...register("jobTitle")}
        />
        <TextField
          label="Email"
          required
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextField
          label="Location"
          placeholder="Hyderabad, India"
          error={errors.location?.message}
          {...register("location")}
        />
        <TextField
          label="LinkedIn"
          placeholder="linkedin.com/in/yourname"
          error={errors.linkedin?.message}
          {...register("linkedin")}
        />
        <TextField
          label="GitHub"
          placeholder="github.com/yourname"
          error={errors.github?.message}
          {...register("github")}
        />
        <TextField
          label="Website / Portfolio"
          placeholder="yourname.dev"
          error={errors.website?.message}
          {...register("website")}
        />
      </div>

      <TextArea
        label="Professional summary"
        rows={4}
        placeholder="2-3 lines about your experience and strengths."
        hint={`${summaryLength}/500`}
        error={errors.summary?.message}
        {...register("summary")}
      />
    </form>
  );
}