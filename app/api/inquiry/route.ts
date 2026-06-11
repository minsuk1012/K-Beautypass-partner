import { NextRequest, NextResponse } from 'next/server';

interface InquiryData {
  hospitalName: string;
  managerName: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: InquiryData = await request.json();

    // Validation
    if (!data.hospitalName || !data.managerName || !data.phone) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('SLACK_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Slack message format
    const slackMessage = {
      text: '새로운 입점 문의가 접수되었습니다.',
      attachments: [
        {
          color: '#3b82f6',
          title: '🏥 B2B 입점 문의',
          fields: [
            {
              title: '병원/클리닉명',
              value: data.hospitalName,
              short: true,
            },
            {
              title: '담당자명',
              value: data.managerName,
              short: true,
            },
            {
              title: '연락처',
              value: data.phone,
              short: true,
            },
            ...(data.email
              ? [
                  {
                    title: '이메일',
                    value: data.email,
                    short: true,
                  },
                ]
              : []),
            ...(data.message
              ? [
                  {
                    title: '문의사항',
                    value: data.message,
                    short: false,
                  },
                ]
              : []),
            ...(data.source
              ? [
                  {
                    title: '유입 경로',
                    value: data.source,
                    short: true,
                  },
                ]
              : []),
          ],
          footer: 'K-BeautyPass B2B Landing',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    // Send to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      console.error('Slack webhook error:', response.status);
      return NextResponse.json(
        { error: '전송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
