import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, country, phone, street, postalCode, city } = await request.json();

    if (!email || !email.includes('@') || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    const klaviyoApiKey = process.env.KLAVIYO_API_KEY;
    if (!klaviyoApiKey) {
      console.error('KLAVIYO_API_KEY not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Subscribe to Klaviyo list with full profile data
    const response = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-05-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: email,
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ') || '',
            phone_number: phone,
            properties: {
              source: 'claim_sample',
              country: country,
              street: street,
              postal_code: postalCode,
              city: city,
              submitted_at: new Date().toISOString(),
            },
            location: {
              address1: street,
              city: city,
              zip: postalCode,
              country: country,
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Klaviyo API error:', errorData);
      
      // Check if error is due to duplicate email (email already exists)
      const errorMessage = JSON.stringify(errorData).toLowerCase();
      if (errorMessage.includes('email') && (errorMessage.includes('exist') || errorMessage.includes('duplicate') || errorMessage.includes('already'))) {
        console.log('Email already exists in Klaviyo, treating as success');
        return NextResponse.json({ success: true, message: 'Sample claim completed (email already registered)' });
      }
      
      // For any other error, still let the user through but log the error
      console.error('Klaviyo error, but allowing sample claim through:', errorData);
      return NextResponse.json({ success: true, message: 'Sample claim completed' });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sample claim error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}