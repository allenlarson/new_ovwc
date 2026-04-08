import { ToSend } from 'tosend';
import { NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const tosend = new ToSend(process.env.TOSEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, service, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Send notification email to Allen
    await tosend.send({
      from: {
        email: process.env.TOSEND_FROM_EMAIL!,
        name: 'Oceanview Web Co',
      },
      to: [{ email: process.env.CONTACT_TO_EMAIL! }],
      subject: `New Project Inquiry from ${escapeHtml(name)}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #9d174d, #4c1d95); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #fff;">New Project Inquiry</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;"><a href="mailto:${encodeURIComponent(email)}" style="color: #a78bfa;">${escapeHtml(email)}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;"><a href="tel:${encodeURIComponent(phone)}" style="color: #a78bfa;">${escapeHtml(phone)}</a></td>
              </tr>` : ''}
              ${company ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 13px;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${escapeHtml(company)}</td>
              </tr>` : ''}
              ${service ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 13px;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px;">${escapeHtml(service)}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; font-size: 15px; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
              <a href="mailto:${encodeURIComponent(email)}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #9d174d, #4c1d95); color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">Reply to ${escapeHtml(name)}</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
