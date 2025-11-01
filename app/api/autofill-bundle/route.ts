import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CATEGORIES = [
  'Poster',
  'Digital Print',
  'Wall Art',
  'Sticker Design',
  'Card Design',
  'Pattern',
  'Illustration',
  'Stock Photo',
  'Social Media',
  'Other',
];

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Initialize Gemini AI (free tier)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Create the AI prompt
    const prompt = `You are an expert at creating product descriptions for digital goods bundles. Based on the bundle title provided, generate appropriate product details.

Bundle Title: "${title}"

Please analyze this title and provide the following details in JSON format:

1. description: A well-formatted product description following this structure:
   - Opening hook (1-2 sentences about the product)
   - What's included section with emoji (🖼️ What's Included:) listing the contents
   - Features/benefits with emojis
   - Themes section with emoji (🌏 Themes: or similar)
   - Note about digital delivery (⚡ No physical product...)
   - Closing tagline

   Use line breaks (\\n\\n for paragraphs, \\n for list items) and emojis to make it engaging and scannable.
   Include details like file formats (PDF/JPEG/PNG/WEBP), print quality, instant download, etc.

2. price: A reasonable price in Indian Rupees (₹) based on the type of digital product (typically between ₹99 to ₹999)

3. image_count: The typical number of images/items that would be included in such a bundle (typically between 5 to 50)

4. category: The most appropriate category from this list: ${CATEGORIES.join(', ')}

Example format for description:
"[Opening hook about the product]\\n\\nThis digital [product type] includes [number] beautifully designed [items].\\n\\nPerfect for [use cases].\\n\\n🖼️ What's Included:\\n\\n[Number] high-resolution digital [items] (PDF/JPEG/PNG/WEBP)\\n\\nPrintable for production use\\n\\nInstant digital download\\n\\nPerfect for [uses]\\n\\n🌏 Themes: [Theme1] • [Theme2] • [Theme3]\\n\\n⚡ No physical product will be shipped. Print at home or through your favorite print shop.\\n\\n[Closing tagline]"

Return ONLY a valid JSON object with these exact keys: description, price, image_count, category.
Do not include any markdown formatting, explanations, or additional text - just the raw JSON object.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let aiData;
    try {
      // Try to parse the response directly
      aiData = JSON.parse(responseText);
    } catch (e) {
      // If it fails, try to extract JSON from markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        aiData = JSON.parse(jsonMatch[1]);
      } else {
        // Try to find any JSON object in the response
        const objectMatch = responseText.match(/\{[\s\S]*\}/);
        if (objectMatch) {
          aiData = JSON.parse(objectMatch[0]);
        } else {
          throw new Error('Could not extract valid JSON from AI response');
        }
      }
    }

    // Validate the response structure
    if (
      !aiData.description ||
      typeof aiData.price !== 'number' ||
      typeof aiData.image_count !== 'number' ||
      !aiData.category
    ) {
      throw new Error('Invalid response structure from AI');
    }

    // Validate category
    if (!CATEGORIES.includes(aiData.category)) {
      aiData.category = 'Other';
    }

    // Ensure price and image_count are reasonable
    aiData.price = Math.max(0, Math.min(99999, aiData.price));
    aiData.image_count = Math.max(1, Math.min(1000, aiData.image_count));

    return NextResponse.json({
      success: true,
      data: {
        description: aiData.description,
        price: aiData.price.toString(),
        image_count: aiData.image_count.toString(),
        category: aiData.category,
      },
    });
  } catch (error: any) {
    console.error('Error in autofill-bundle API:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate bundle details',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
