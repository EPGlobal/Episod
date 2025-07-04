import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log('Email entry request received:', { email });

    if (!email || !email.includes('@')) {
      console.log('Invalid email provided:', email);
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const klaviyoApiKey = process.env.KLAVIYO_API_KEY;
    console.log('Klaviyo API key check:', { 
      hasKey: !!klaviyoApiKey, 
      keyLength: klaviyoApiKey?.length || 0,
      keyStart: klaviyoApiKey?.substring(0, 3) || 'none'
    });
    
    if (!klaviyoApiKey) {
      console.error('KLAVIYO_API_KEY not set');
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: 'KLAVIYO_API_KEY environment variable not set'
      }, { status: 500 });
    }

    // Subscribe to Klaviyo list
    const requestBody = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          properties: {
            source: 'email_entry',
            submitted_at: new Date().toISOString(),
          },
        },
      },
    };
    
    console.log('Sending request to Klaviyo:', { 
      url: 'https://a.klaviyo.com/api/profiles/',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey.substring(0, 3)}...`,
        'Content-Type': 'application/json',
        'revision': '2024-05-15',
      },
      body: JSON.stringify(requestBody, null, 2)
    });

    const response = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-05-15',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Klaviyo response status:', response.status);
    console.log('Klaviyo response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Klaviyo API error details:', { 
        status: response.status,
        statusText: response.statusText,
        errorData 
      });
      return NextResponse.json({ 
        error: 'Failed to subscribe',
        details: `Klaviyo API returned ${response.status}: ${JSON.stringify(errorData)}`
      }, { status: 500 });
    }

    const responseData = await response.json();
    console.log('Klaviyo success response:', responseData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email entry error (catch block):', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}