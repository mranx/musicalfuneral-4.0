import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/database';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    // Fix 1: Type assertion for authOptions
    const session = await getServerSession(authOptions as any);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fix 2: Type assertion for session.user
    const email = (session as any).user?.email;

    if (!email) {
      return NextResponse.json(
        { error: 'User email not found in session' },
        { status: 400 }
      );
    }

    const userProfile = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        relation: true,
        directorName: true,
        directorCompany: true,
        directorEmail: true,
        deceasedName: true,
        dateOfBirth: true,
        dateOfPassing: true,
        specialRequests: true,
        servicePlan: true,
        servicePrice: true,
        createdAt: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Fix 1: Type assertion for authOptions
    const session = await getServerSession(authOptions as any);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fix 2: Type assertion for session.user
    const email = (session as any).user?.email;

    if (!email) {
      return NextResponse.json(
        { error: 'User email not found in session' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, phone, specialRequests } = body;

    const updatedProfile = await prisma.user.update({
      where: { email },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        specialRequests: specialRequests || undefined
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        relation: true,
        specialRequests: true
      }
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedProfile
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = (session as any).user?.email;
    if (!email) {
      return NextResponse.json({ error: "User email not found in session" }, { status: 400 });
    }

    // Check if user exists before deleting
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User delete error:", error);
    return NextResponse.json({ error: "An error occurred while deleting user" }, { status: 500 });
  }
}