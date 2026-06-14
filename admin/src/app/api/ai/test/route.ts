import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { requireAdmin } from '@/lib/api-auth';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    console.log('Testing Gemini API...');
    
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent('Hello, how are you?');
    const response = await result.response;
    const text = response.text();
    
    console.log('Test successful:', text);

    return NextResponse.json({
      success: true,
      message: 'Gemini API is working',
      response: text
    });

  } catch (error: any) {
    console.error('Test failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}
