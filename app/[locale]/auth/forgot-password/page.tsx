'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, ForgotPasswordInput } from '@/lib/validations/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

export default function ForgotPasswordPage() {
  const t = useTranslations()
  
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      // TODO: Implement password reset email sending
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
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
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
              214 Scents
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">{t('auth.forgotPassword')}</h2>
          <p className="mt-2 text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-background-secondary p-8 rounded-xl border border-primary/20">
          {success && (
            <Alert type="success" message={t('auth.passwordResetSent')} className="mb-6" />
          )}
          
          {error && (
            <Alert type="error" message={error} className="mb-6" />
          )}

          {!success ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label={t('auth.email')}
                type="email"
                {...register('email')}
                error={errors.email?.message}
                autoComplete="email"
              />

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                {t('auth.resetPassword')}
              </Button>

              <div className="text-center">
                <Link href="/auth/signin" className="text-sm text-primary hover:text-primary-400">
                  {t('auth.backToSignIn')}
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <Link href="/auth/signin">
                <Button className="w-full" size="lg">
                  {t('auth.backToSignIn')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
