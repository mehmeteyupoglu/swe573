import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Formik, Form, Field, FieldProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import * as Yup from 'yup'
import { apiGetDataTypes } from '@/services/CommunityService'
import { DataTypeOption, DataTypeResponse } from '@/@types/community'
import { Select } from '@/components/ui'
import { CustomSelectOption } from '@/components/shared/CustomSelectOption'
import { useDispatch } from 'react-redux'
import { addTemplate, toggleTemplateDialog } from '@/store/slices/community'

export default function AddTemplateForm() {
    const [templateName, setTemplateName] = useState('')
    const [templateDescription, setTemplateDescription] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'templateName') {
            setTemplateName(value)
        } else if (name === 'templateDescription') {
            setTemplateDescription(value)
        }
    }

    const [fields, setFields] = useState([{ name: '', type: '' }])
    const dispatch = useDispatch()

    const handleAddField = () => {
        setFields([...fields, { name: '', type: '' }])
    }

    const handleSave = () => {
        dispatch(toggleTemplateDialog())
        dispatch(addTemplate({ templateName, templateDescription, fields }))
    }

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
        <div className="max-h-96 overflow-hidden overflow-y-auto custom-scrollbar">
            <Formik
                initialValues={{
                    templateName: '',
                    templateDescription: '',
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
                                    (errors.templateName &&
                                        touched.templateName) as boolean
                                }
                                errorMessage={errors.templateName}
                                className="my-5"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="templateName"
                                    placeholder={'Template Name'}
                                    component={Input}
                                    onChange={handleChange}
                                    value={templateName}
                                />
                            </FormItem>
                            <FormItem
                                label={'Template Description'}
                                invalid={
                                    (errors.templateDescription &&
                                        touched.templateDescription) as boolean
                                }
                                errorMessage={errors.templateDescription}
                                className="my-5"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="templateDescription"
                                    placeholder={'Template Description'}
                                    component={Input}
                                    onChange={handleChange}
                                    value={templateDescription}
                                />
                            </FormItem>
                            <FormItem>
                                <hr />
                            </FormItem>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        value={field.name}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const newFields = [...fields]
                                            newFields[index].name =
                                                e.target.value
                                            setFields(newFields)
                                        }}
                                        placeholder="Field Name"
                                        component={Input}
                                        className="mb-1"
                                    />

                                    <Field
                                        name="dataType"
                                        value={field.type}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const newFields = [...fields]
                                            newFields[index].name =
                                                e.target.value
                                            setFields(newFields)
                                        }}
                                        placeholder="Field Type"
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Select<DataTypeOption>
                                                className="mb-5"
                                                field={field}
                                                form={form}
                                                options={options}
                                                placeholder={
                                                    'Select a data type'
                                                }
                                                components={{
                                                    Option: CustomSelectOption,
                                                }}
                                                value={options.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value
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
                                </div>
                            ))}
                            <Button
                                block
                                loading={isSubmitting}
                                variant="twoTone"
                                type="submit"
                                onClick={handleAddField}
                            >
                                Add field
                            </Button>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                onClick={handleSave}
                                color="green-600"
                                className="mt-5"
                            >
                                Save
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
