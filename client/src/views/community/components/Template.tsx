import { Card } from '@/components/ui'
import { TemplateType } from '@/@types/community'
import Field from './Field'

export default function Template({ template }: { template: TemplateType }) {
    return (
        <Card bordered className="mt-5">
            <div className="text-gray font-bold">{template.name}:</div>
            <Field fields={template.fields} />
        </Card>
    )
}
