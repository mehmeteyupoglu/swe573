import dayjs from 'dayjs'

export function toSentenceCase(str: String) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatDate = (date: string) => dayjs(date).format('MMMM DD, YYYY')
