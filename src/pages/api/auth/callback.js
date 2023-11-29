import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req, res) => {
  const { code } = req.query

  if (code) {
    const supabase = createPagesServerClient({ req, res })
    await supabase.auth.exchangeCodeForSession(String(code))
  }
  console.log("hi")
  res.redirect('/')
}

export default handler