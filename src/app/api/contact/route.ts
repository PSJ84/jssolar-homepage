import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  phone: string;
  type?: string;
  capacity?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수입니다.' },
        { status: 400 }
      );
    }

    // Send Telegram notification
    const telegramSent = await sendTelegramNotification(data);

    if (!telegramSent) {
      console.error('Telegram notification failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

async function sendTelegramNotification(data: ContactFormData): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  const message = `🌞 새 상담 신청
━━━━━━━━━━━━
이름: ${data.name}
연락처: ${data.phone}
설치유형: ${data.type || '미선택'}
예상용량: ${data.capacity || '미선택'}
문의내용: ${data.message || '없음'}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Telegram API error:', error);
    return false;
  }
}
