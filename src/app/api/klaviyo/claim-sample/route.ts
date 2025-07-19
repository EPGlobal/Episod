import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';
import { Country } from 'country-state-city';

export async function POST(request: NextRequest) {
  try {
    const { name, email, country, phone, street, postalCode, city } = await request.json();

    if (!email || !email.includes('@') || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Format phone number properly using libphonenumber-js
    let formattedPhone = '';
    if (phone && phone.trim()) {
      try {
        // Get country code from country name
        const countryData = Country.getAllCountries().find(c => c.name.toUpperCase() === country.toUpperCase());
        const countryCode = countryData?.isoCode as CountryCode;
        
        if (countryCode) {
          const phoneNumber = parsePhoneNumber(phone, countryCode);
          if (phoneNumber && phoneNumber.isValid()) {
            formattedPhone = phoneNumber.format('E.164'); // Format as +1234567890
          }
        }
      } catch (error) {
        console.warn('Phone number formatting failed:', error);
        // If formatting fails, leave phone empty rather than send invalid format
      }
    }

    const klaviyoApiKey = process.env.KLAVIYO_API_KEY;
    if (!klaviyoApiKey) {
      console.error('KLAVIYO_API_KEY not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create or update profile with address information
    const profileResponse = await fetch('https://a.klaviyo.com/api/profile-import/', {
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
            phone_number: formattedPhone,
            properties: {
              sample_claimed: true,
              sample_claim_date: new Date().toISOString(),
              shipping_country: country,
              shipping_street: street,
              shipping_postal_code: postalCode,
              shipping_city: city,
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

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      console.error('Klaviyo profile API error:', errorData);
      
      // For any error, still let the user through but log the error
      console.error('Klaviyo error, but allowing sample claim through:', errorData);
      return NextResponse.json({ success: true, message: 'Sample claim completed' });
    }

    // Add to sample claims list (you'll need to create this list in Klaviyo first)
    const listId = process.env.KLAVIYO_SAMPLE_LIST_ID; // Add this to your env vars
    if (listId) {
      try {
        await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
          method: 'POST',
          headers: {
            'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
            'Content-Type': 'application/json',
            'revision': '2024-05-15',
          },
          body: JSON.stringify({
            data: [{
              type: 'profile',
              attributes: {
                email: email
              }
            }]
          }),
        });
      } catch (error) {
        console.error('Failed to add to list:', error);
        // Don't fail the request if list addition fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sample claim error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}