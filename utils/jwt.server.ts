// utils/jwt.server.ts
import jwt from 'jsonwebtoken'
const secret = useRuntimeConfig().JWT_SECRET

export function verifyJWT(token: string) {
  return jwt.verify(token, secret)
}
