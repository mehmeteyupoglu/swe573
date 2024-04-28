import { Field } from '@/@types/community'
import { Button } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import { toSentenceCase } from '@/utils/helpers'
import useFieldToComponent from '@/utils/hooks/useFieldToComponent'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { useState } from 'react'

const FieldComponent = ({
    field,
    value,
    onChange,
}: {
    field: Field
    value: string
    onChange: (value: string) => void
}) => {
    const Component = useFieldToComponent(field.field_type)
    const field_name = toSentenceCase(field.field_name)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

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
                    value={value}
                    onChange={handleChange}
                />
            )}
        </FormItem>
    )
}

export default function MapFields({ fields }: { fields: Field[] }) {
    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(
        {}
    )

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = fields.map((field) => ({
            field_name: field.field_name,
            field_type: field.field_type,
            field_value: fieldValues[field.field_name] || '',
        }))

        // Now you can send formData to the server
        console.log(formData)
    }

    const handleFieldChange = (name: string, value: string) => {
        setFieldValues((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                {fields.map((field) => (
                    <FieldComponent
                        key={field.field_name}
                        field={field}
                        value={fieldValues[field.field_name] || ''}
                        onChange={(value) =>
                            handleFieldChange(field.field_name, value)
                        }
                    />
                ))}

                <Button
                    className="mt-5 flex items-center justify-center gap-x-0.5"
                    size="sm"
                    variant="solid"
                    color="emerald-600"
                    block
                    type="submit"
                >
                    <HiOutlineDocumentAdd className="" />
                    <span>Post</span>
                </Button>
            </div>
        </form>
    )
}
