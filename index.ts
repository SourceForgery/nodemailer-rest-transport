import * as nodemailer from 'nodemailer'

export class RestTransport implements nodemailer.Transport {
    name: string
    version: string
    private host: string
    private port: number

    constructor(args:
        { host: string, port: number }) {
        this.host = args.host
        this.port = args.port
        this.name = 'RestTransport'
        this.version = '5'
    }

    send(mail: any, callback: (err: (Error | null), info: any) => void) {

        const transporter = mail.mailer.transporter

        if (!transporter || transporter.name !== 'RestTransport') {
            callback(new Error('Invalid transporter'), null)
            return
        }

        const { host, port } = transporter
        const url = `http://${host}:${port}/tachikoma/sendEmail`

        const payload = {
            subject: mail.data.subject,
            from: mail.data.from,
            html: mail.data.html,
            text: mail.data.text,
            to: [{ address: mail.data.to }],
            attachments: mail.data.attachments,
            headers: mail.data.headers,
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                callback(null, { ...response, messageId: response })

            })
            .then(data => {
                callback(null, data)
            })
            .catch(error => {
                callback(error, null)
            })
    }
}
