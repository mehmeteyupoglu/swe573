import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Formik, Form, Field, FieldProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import * as Yup from 'yup'
import { apiGetDataTypes } from '@/services/CommunityService'
import { DataTypeOption, DataTypeResponse, FieldType } from '@/@types/community'
import { Select } from '@/components/ui'
import { CustomSelectOption } from '@/components/shared/CustomSelectOption'
import { useDispatch } from 'react-redux'
import { addTemplate, toggleTemplateDialog } from '@/store/slices/community'
import AddFieldForm from './AddFieldForm'

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

    const [fields, setFields] = useState([] as FieldType[])
    const dispatch = useDispatch()

    const handleAddField = (field: FieldType) => {
        setFields([...fields, field])
    }

    const handleSave = () => {
        dispatch(toggleTemplateDialog())
        dispatch(addTemplate({ templateName, templateDescription, fields }))
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter a name'),
        description: Yup.string().required('Please enter a description'),
    })

    return (
        <div className="max-h-96 overflow-hidden overflow-y-auto custom-scrollbar">
            <Formik
                initialValues={{}}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {}}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form className="mb-3">
                        <FormContainer>
                            <FormItem label={'Template Name'} className="my-5">
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
                            <AddFieldForm handleSave={handleAddField} />
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
