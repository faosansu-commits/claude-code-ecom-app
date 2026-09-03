"use client"

import { useActionState, useEffect, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Alert02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { submitContactForm } from "@/app/contact/actions"
import { INITIAL_CONTACT_FORM_STATE } from "@/lib/contact/types"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    INITIAL_CONTACT_FORM_STATE
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
        ส่งข้อความถึงเรา
      </h2>

      {state.status !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mb-5 flex items-start gap-2 rounded-xl p-3 text-sm",
            state.status === "success" && "bg-success/10 text-success",
            state.status === "error" && "bg-destructive/10 text-destructive"
          )}
        >
          <HugeiconsIcon
            icon={state.status === "success" ? CheckmarkCircle02Icon : Alert02Icon}
            strokeWidth={1.75}
            className="mt-0.5 size-4 shrink-0"
          />
          <div>
            <p>{state.message}</p>
            {state.status === "error" && !state.fieldErrors && (
              <p className="mt-1">
                หรือส่งอีเมลมาที่{" "}
                <a href="mailto:support@jhoowa.co.th" className="underline">
                  support@jhoowa.co.th
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <form
        key={JSON.stringify(state.values ?? {})}
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-4"
      >
        {/* Honeypot — off-screen (not sr-only) and aria-hidden so it's invisible to
            people but still present in the DOM for form-filling bots to trip. */}
        <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company">บริษัท</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Field>
          <FieldLabel htmlFor="name">ชื่อ</FieldLabel>
          <Input
            id="name"
            name="name"
            defaultValue={state.values?.name}
            maxLength={100}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" role="alert" className="text-sm text-destructive">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">อีเมล</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.values?.email}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" role="alert" className="text-sm text-destructive">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="subject">หัวข้อ</FieldLabel>
          <Input
            id="subject"
            name="subject"
            defaultValue={state.values?.subject}
            maxLength={150}
            aria-invalid={Boolean(state.fieldErrors?.subject)}
            aria-describedby={state.fieldErrors?.subject ? "subject-error" : undefined}
          />
          {state.fieldErrors?.subject && (
            <p id="subject-error" role="alert" className="text-sm text-destructive">
              {state.fieldErrors.subject[0]}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="message">ข้อความ</FieldLabel>
          <Textarea
            id="message"
            name="message"
            defaultValue={state.values?.message}
            maxLength={2000}
            rows={6}
            aria-invalid={Boolean(state.fieldErrors?.message)}
            aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          />
          {state.fieldErrors?.message && (
            <p id="message-error" role="alert" className="text-sm text-destructive">
              {state.fieldErrors.message[0]}
            </p>
          )}
        </Field>

        <Button type="submit" disabled={pending} className="mt-2 w-full">
          {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
        </Button>
      </form>
    </div>
  )
}
