import React from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Formik, Form, Field } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import * as Yup from 'yup'

export default function AddTemplateForm() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter a name'),
        description: Yup.string().required('Please enter a description'),
    })

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
