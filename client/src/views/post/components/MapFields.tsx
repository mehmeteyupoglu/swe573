import { Field } from '@/@types/community'
import { Button } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import { toSentenceCase } from '@/utils/helpers'
import useFieldToComponent from '@/utils/hooks/useFieldToComponent'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

const FieldComponent = ({ field }: { field: Field }) => {
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
}

export default function MapFields({ fields }: { fields: Field[] }) {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                {fields.map((field) => (
                    <FieldComponent key={field.field_name} field={field} />
                ))}

                <Button
                    className="mt-5 flex items-center justify-center gap-x-0.5"
                    size="sm"
                    variant="solid"
                    color="emerald-600"
                    block
                    type="submit"
                    // onClick={handleSubmit}
                >
                    <HiOutlineDocumentAdd className="" />
                    <span>Post</span>
                </Button>
            </div>
        </form>
    )
}
