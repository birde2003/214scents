import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { hash, compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { userProfileSchema, changePasswordSchema } from '@/lib/validations/user'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = params.id
    const currentUser = session.user as any

    // Only allow users to update their own profile (unless admin)
    if (currentUser.id !== userId && currentUser.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    // Handle password change separately
    if (body.currentPassword && body.newPassword) {
      const { currentPassword, newPassword } = changePasswordSchema.parse(body)

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      })

      if (!user?.password) {
        return NextResponse.json(
          { message: 'User not found or invalid password' },
          { status: 400 }
        )
      }

      const isValid = await compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      const hashedPassword = await hash(newPassword, 12)

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      })

      return NextResponse.json({ message: 'Password updated successfully' })
    }

    // Handle profile update
    const { name, email, phone, preferredLanguage, preferredCurrency, theme } =
      userProfileSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone,
        preferredLanguage,
        preferredCurrency,
        theme,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        preferredLanguage: true,
        preferredCurrency: true,
        theme: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = params.id
    const currentUser = session.user as any

    // Only allow users to view their own profile (unless admin)
    if (currentUser.id !== userId && currentUser.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        preferredLanguage: true,
        preferredCurrency: true,
        theme: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
