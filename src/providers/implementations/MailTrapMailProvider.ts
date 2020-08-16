import {IMailProvider, IMessage} from "../IMailProvider";
import nodeMailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'b6ace8f407f44f',
                pass: 'a94e19f6d274e3'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter .sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            }, html: message.body
            , subject: message.subject
        })
    }


}