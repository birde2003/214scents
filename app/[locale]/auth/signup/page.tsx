'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, SignupInput } from '@/lib/validations/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

export default function SignUpPage() {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'en'
  
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to create account')
        return
      }

      // Auto login after registration
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Account created but login failed. Please sign in manually.')
        setTimeout(() => router.push(`/${locale}/auth/signin`), 2000)
      } else {
        router.push(`/${locale}/account`)
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-block">
            <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
              214 Scents
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">{t('auth.signUp')}</h2>
          <p className="mt-2 text-gray-400">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link href={`/${locale}/auth/signin`} className="text-primary hover:text-primary-400">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>

        <div className="bg-background-secondary p-8 rounded-xl border border-primary/20">
          {error && (
            <Alert type="error" message={error} className="mb-6" />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label={t('auth.name')}
              type="text"
              {...register('name')}
              error={errors.name?.message}
              autoComplete="name"
            />

            <Input
              label={t('auth.email')}
              type="email"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
            />

            <Input
              label={t('auth.password')}
              type="password"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="new-password"
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              {t('auth.signUp')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
