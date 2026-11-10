// Članarina i evidencija kluba trebaju bazu (Supabase). Na objavljenoj stranici
// uključuju se tek kad su upisani VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY;
// lokalno (npm run dev) rade i u demo načinu radi isprobavanja.
export const MEMBERSHIP_ENABLED =
  !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) || import.meta.env.DEV
