import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Form, Field } from 'formik'
import { FormContainer } from '@/components/ui/Form'
import { apiGetDataTypes } from '@/services/CommunityService'
import { DataTypeOption, DataTypeResponse, FieldType } from '@/@types/community'
import { Select, Switcher } from '@/components/ui'
import { CustomSelectOption } from '@/components/shared/CustomSelectOption'
import { useDispatch } from 'react-redux'
import { OptionProps } from 'react-select'

export default function AddFieldForm({
    handleSave,
}: {
    handleSave: (field: FieldType) => void
}) {
    const [field, setField] = useState({
        field_name: '',
        field_type: '',
        isRequired: false,
    })
    const dispatch = useDispatch()

    const handleAddField = () => {
        console.log(field)
        setField({ field_name: '', field_type: '', isRequired: false })
    }

    const [dataTypes, setDataTypes] = useState<
        (
            | 'Text'
            | 'Date'
            | 'Geolocation'
            | 'Number'
            | 'Image'
            | 'Video'
            | 'Audio'
            | 'File'
        )[]
    >([])

    const options: DataTypeOption[] = dataTypes?.map((dataType) => ({
        value: dataType,
        label: dataType,
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        console.log({
            name,
            value,
        })
        setField({
            ...field,
            [name]: value,
        })
    }

    useEffect(() => {
        const fetchDataType = async () => {
            const resp = await apiGetDataTypes()
            if (resp.status == 200) {
                setDataTypes(
                    (resp.data as DataTypeResponse['data_types']) || []
                )
            }
        }
        fetchDataType()
    }, [])

    return (
        <div className="max-h-96 overflow-hidden overflow-y-auto custom-scrollbar">
            <Form className="mb-3">
                <FormContainer>
                    <Field
                        name={'field_name'}
                        type="text"
                        autoComplete="off"
                        value={field.field_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e)
                        }
                        placeholder="Field Name"
                        component={Input}
                        className="mb-1"
                    />

                    <Select<DataTypeOption>
                        className="mb-1"
                        name="field_type"
                        options={options}
                        placeholder={'Select a data type'}
                        value={options.find(
                            (option) => option.value === field.field_type
                        )}
                        onChange={(option) => {
                            setField({
                                ...field,
                                field_type: option?.value ?? '',
                            })
                        }}
                    />

                    <Field
                        name="isRequired"
                        component={Switcher}
                        className="mb-5"
                        label="Is Required"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setField({
                                ...field,
                                isRequired: e.target.checked,
                            })
                        }}
                    />

                    <Button
                        block
                        variant="twoTone"
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleSave(field)
                        }
                    >
                        Add field
                    </Button>
                </FormContainer>
            </Form>
        </div>
    )
}
