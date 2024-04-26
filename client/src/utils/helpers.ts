import dayjs from 'dayjs'

export function toSentenceCase(str: String) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatDate = (date: string, format?: string) =>
    dayjs(date).format(format ?? 'MMMM DD, YYYY HH:mm')

export const mapRoleToLabel = (role: number) => {
    switch (role) {
        case -1:
            return 'Owner'
        case 1:
            return 'Moderator'
        default:
            return 'Member'
    }
}
