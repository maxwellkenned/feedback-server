import { prisma } from '../../prisma'
import {
  FeedbackRepository,
  IFeedbackCreateData,
} from '../feedbacks-repository'

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })
  }
}
