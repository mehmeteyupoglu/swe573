import { Field } from '@/@types/community'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { toSentenceCase } from '@/utils/helpers'

export default function MapFields({ fields }: { fields: Field[] }) {
    return (
        <div>
            {fields.map((field) => {
                const field_name = toSentenceCase(field.field_name)
                return (
                    <FormItem
                        key={field_name}
                        label={field_name}
                        invalid={false}
                        errorMessage=""
                    >
                        <Input
                            type={field.field_type}
                            name={field_name}
                            placeholder={field_name}
                        />
                    </FormItem>
                )
            })}
        </div>
    )
}
