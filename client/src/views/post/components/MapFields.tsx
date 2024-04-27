import { Field } from '@/@types/community'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { toSentenceCase } from '@/utils/helpers'
import useFieldToComponent from '@/utils/hooks/useFieldToComponent'

export default function MapFields({ fields }: { fields: Field[] }) {
    return (
        <div>
            {fields.map((field) => {
                const Component = useFieldToComponent(field.field_type)
                const field_name = toSentenceCase(field.field_name)
                return (
                    <FormItem
                        key={field_name}
                        label={field_name}
                        invalid={false}
                        errorMessage=""
                    >
                        {Component && (
                            <Component
                                type={field.field_type}
                                name={field_name}
                                placeholder={field_name}
                            />
                        )}
                    </FormItem>
                )
            })}
        </div>
    )
}
