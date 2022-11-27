import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'chaemins193@gmail.com',
        pass: 'awyuivrmmvhyhhny',
      },
    });
  }
  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:8080';

    const url = `${baseUrl}/user/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입을 완료하려면 아래 버튼을 눌러주세요.<br/>
        <form action="${url}" method="POST">
            <button>확인</button>
        </form>
        `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
