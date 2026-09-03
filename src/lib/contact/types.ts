export type ContactFormField = "name" | "email" | "subject" | "message"

export type ContactInput = Record<ContactFormField, string>

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<Record<ContactFormField, string[]>>
  values?: Partial<ContactInput>
}

export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
  status: "idle",
  message: "",
}
