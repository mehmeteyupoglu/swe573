import { Field } from '@/@types/community'
import { Button } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import { toSentenceCase } from '@/utils/helpers'
import useFieldToComponent from '@/utils/hooks/useFieldToComponent'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

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

            <Button
                className="mt-5 flex items-center justify-center gap-x-0.5"
                size="sm"
                variant="solid"
                color="emerald-600"
                block
                onClick={() => {}}
            >
                <HiOutlineDocumentAdd className="" />
                <span>Post</span>
            </Button>
        </div>
    )
}
