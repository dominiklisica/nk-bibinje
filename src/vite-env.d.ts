/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENT_IBAN?: string
  readonly VITE_PAYMENT_NAME?: string
  readonly VITE_PAYMENT_STREET?: string
  readonly VITE_PAYMENT_CITY?: string
  readonly VITE_TEST_MONTHLY_FEE?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
