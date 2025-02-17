import { CronJob } from 'cron'
import { type AppContext } from './ctx'
import { logger } from './logger'

export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '0 10 1 * *', // At 10:00 on day-of-month 1
    () => {
      logger.info('Cron', 'Hello! This is Cron task.')
    },
    null, // onComplete
    true // start right now
  )
}
