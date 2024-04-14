import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Formik, Form, Field, FieldProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import * as Yup from 'yup'
import { apiGetDataTypes } from '@/services/CommunityService'
import { DataTypeResponse } from '@/@types/community'
import { use } from 'i18next'
import { Select } from '@/components/ui'

import { HiCheck } from 'react-icons/hi' // import the check icon
import { OptionProps } from 'react-select' // import the OptionProps type

type DataTypeOption = {
    value: string
    label: string
}

const CustomSelectOption = ({
    innerProps,
    label,
    isSelected,
}: OptionProps<DataTypeOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

export default function AddTemplateForm() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter a name'),
        description: Yup.string().required('Please enter a description'),
    })

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

    console.log(dataTypes)
    const options: DataTypeOption[] = dataTypes?.map((dataType) => ({
        value: dataType,
        label: dataType,
    }))

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
        <div>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {}}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form className="mb-3">
                        <FormContainer>
                            <FormItem
                                label={'Template Name'}
                                invalid={
                                    (errors.username &&
                                        touched.username) as boolean
                                }
                                errorMessage={errors.username}
                                className="my-5"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="Template Name"
                                    placeholder={'Template Name'}
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem>
                                <hr />
                            </FormItem>
                            <FormItem
                                label={'Field Name'}
                                invalid={
                                    (errors.username &&
                                        touched.username) as boolean
                                }
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="Template Name"
                                    placeholder={'Template Name'}
                                    component={Input}
                                    border={false}
                                />
                            </FormItem>
                            <FormItem
                                label={'Field Type'}
                                invalid={
                                    (errors.username &&
                                        touched.username) as boolean
                                }
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="Template Name"
                                    placeholder={'Template Name'}
                                    component={Input}
                                    border={false}
                                />
                            </FormItem>
                            <FormItem>
                                <Field name="dataType">
                                    {({ field, form }: FieldProps) => (
                                        <Select<DataTypeOption>
                                            field={field}
                                            form={form}
                                            options={options}
                                            placeholder={'Select a data type'}
                                            components={{
                                                Option: CustomSelectOption,
                                            }}
                                            value={options.find(
                                                (option) =>
                                                    option.value === field.value
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="twoTone"
                                type="submit"
                            >
                                Add field
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
