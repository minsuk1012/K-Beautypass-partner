import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hospitalName, managerName, contact } = body;
    
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      return NextResponse.json(
        { message: 'Slack webhook URL not configured' },
        { status: 500 }
      );
    }

    const payload = {
      text: `🏥 *신규 입점 상담 신청이 접수되었습니다!*`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🏥 신규 입점 상담 신청",
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*병원명:*\n${hospitalName}`
            },
            {
              type: "mrkdwn",
              text: `*담당자:*\n${managerName}`
            }
          ]
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*연락처:*\n${contact}`
            },
            {
              type: "mrkdwn",
              text: `*접수 시간:*\n${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`
            }
          ]
        },
        {
            type: "divider"
        }
      ]
    };

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Slack notification failed:', error);
    return NextResponse.json(
      { message: 'Failed to send Slack notification' },
      { status: 500 }
    );
  }
}
