import { IMailAdapter } from '../adapters/mail-adapters'
import { FeedbackRepository } from '../repositories/feedbacks-repository'

interface ISubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({ type, comment, screenshot })
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family:sans-serif; font-size:16px; color:#111111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="screenshot da tela"/>` : ``,
        `</div>`,
      ].join('\n'),
    })
  }
}
