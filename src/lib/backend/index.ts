import { demoBackend } from './demo'
import { supabaseBackend } from './supabase'
import type { Backend } from './types'

export type * from './types'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Supabase ako su upisani VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY, inače demo način. */
export const backend: Backend = url && key ? supabaseBackend(url, key) : demoBackend()
