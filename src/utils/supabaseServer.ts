import { createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default function createClient(req?: NextApiRequest, res?: NextApiResponse) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll() {
                    if (req) {
                        return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }))
                    }
                    return []
                },
                setAll(cookiesToSet) {
                    if (res) {
                        res.setHeader(
                            'Set-Cookie',
                            cookiesToSet.map(({ name, value, options }) =>
                                serializeCookieHeader(name, value, options)
                            )
                        )
                    }
                },
            },
        }
    )

    return supabase
}