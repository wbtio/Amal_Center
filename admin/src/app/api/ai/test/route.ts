import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyAo0aQdHC1qYaYcK-HTtaPl3MS0CL1zTR4';

export async function GET(request: NextRequest) {
  try {
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
