import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Test API is working' });
}

export async function POST(request: Request) {
  console.log('Test POST endpoint called');
  
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: 'Test POST is working', 
      receivedData: body 
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
} 