import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Formik, Form, Field } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import * as Yup from 'yup'
import { FieldType } from '@/@types/community'
import { useDispatch } from 'react-redux'
import {
    addTemplate,
    toggleFetchTrigger,
    toggleTemplateDialog,
} from '@/store/slices/community'
import AddFieldForm from './AddFieldForm'
import MapField from './MapField'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { apiAddTemplate } from '@/services/CommunityService'

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

        console.log({
            templateName,
            templateDescription,
            fields: JSON.stringify(fields),
            typeoffields: typeof fields,
        })
    }
    const postAction = () => {
        dispatch(toggleTemplateDialog())
        dispatch(toggleFetchTrigger())
    }

    const [handleCreateTemplate, isTemplateCreating] =
        useRequestWithNotification(
            apiAddTemplate,
            'You have successfully created the template!',
            'Error leaving community',
            postAction
        )

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter a name'),
        description: Yup.string().required('Please enter a description'),
    })

    return (
        <div className="overflow-hidden overflow-y-auto custom-scrollbar">
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
                            <div className="mb-5">
                                {fields.length > 0 && (
                                    <MapField fields={fields} />
                                )}
                            </div>

                            <AddFieldForm handleSave={handleAddField} />
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                onClick={() => {
                                    if (
                                        typeof handleCreateTemplate ===
                                        'function'
                                    ) {
                                        handleCreateTemplate({
                                            templateName,
                                            templateDescription,
                                            fields: JSON.stringify(fields),
                                        })
                                    }
                                }}
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
