'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import { userProfileSchema as updateProfileSchema, changePasswordSchema } from '@/lib/validations/user'
import { z } from 'zod'

type UpdateProfileData = z.infer<typeof updateProfileSchema>
type ChangePasswordData = z.infer<typeof changePasswordSchema>

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'en'

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue,
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  })

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin?callbackUrl=/${locale}/account/profile`)
      return
    }

    // Set initial form values
    if (session?.user) {
      setValue('name', (session.user as any).name || '')
      setValue('email', (session.user as any).email || '')
      setValue('phone', (session.user as any).phone || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session])

  const onUpdateProfile = async (data: UpdateProfileData) => {
    setIsUpdatingProfile(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const userId = (session?.user as any).id
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update profile')
      }

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
        },
      })

      setSuccessMessage('Profile updated successfully')
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const onChangePassword = async (data: ChangePasswordData) => {
    setIsChangingPassword(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const userId = (session?.user as any).id
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to change password')
      }

      setSuccessMessage('Password changed successfully')
      resetPasswordForm()
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (status === 'loading') {
    return (
      <StorefrontLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </StorefrontLayout>
    )
  }

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href={`/${locale}/account`} className="text-primary hover:text-primary-400 flex items-center gap-2 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Account
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
              Profile Settings
            </h1>
          </div>

          {successMessage && <Alert type="success" message={successMessage} className="mb-6" />}
          {errorMessage && <Alert type="error" message={errorMessage} className="mb-6" />}

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Profile Information</h2>
              <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="space-y-4">
                <Input
                  label="Full Name"
                  {...registerProfile('name')}
                  error={profileErrors.name?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  {...registerProfile('email')}
                  error={profileErrors.email?.message}
                />

                <Input
                  label="Phone"
                  type="tel"
                  {...registerProfile('phone')}
                  error={profileErrors.phone?.message}
                />

                <Button type="submit" isLoading={isUpdatingProfile}>
                  Update Profile
                </Button>
              </form>
            </Card>

            {/* Change Password */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  {...registerPassword('currentPassword')}
                  error={passwordErrors.currentPassword?.message}
                />

                <Input
                  label="New Password"
                  type="password"
                  {...registerPassword('newPassword')}
                  error={passwordErrors.newPassword?.message}
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  {...registerPassword('confirmPassword')}
                  error={passwordErrors.confirmPassword?.message}
                />

                <Button type="submit" isLoading={isChangingPassword}>
                  Change Password
                </Button>
              </form>
            </Card>

            {/* Preferences */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <select className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <select className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                    <option value="midnight">Midnight Black</option>
                    <option value="ocean">Ocean Blue</option>
                    <option value="amber">Amber Gold</option>
                    <option value="emerald">Emerald Green</option>
                    <option value="ruby">Ruby Red</option>
                  </select>
                </div>

                <Button variant="outline">Save Preferences</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
