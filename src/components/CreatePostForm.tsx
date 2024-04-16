// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PostItemInterface } from '../interfaces/Post';


const CreatePostForm = ({
  onSavePost
}: { onSavePost: (i: PostItemInterface) => void}) => (
  <div>
    <h1>New Post</h1>
    <Formik
      initialValues={{ title: '', body: '', id: '' }}
      validate={(values: PostItemInterface) => {
        const errors: PostItemInterface = {};
        if (!values.title) {
          errors.title = 'Required';
        } else if (!values.body) {
          errors.body = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSavePost({
          ...values
        })
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='create-form'>
          <div className='flex text-dark-body p-4'>
            <label>Id</label>
            <Field type="text" name="id" />
            <ErrorMessage name="id" component="span" />
          </div>
         
          <br />
          <div className='flex text-dark-body p-4'>
            <label>Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="span" />
          </div>
          
          <br />
          <div className='flex text-dark-body p-4'>
            <label>Body</label>
            <Field type="text" name="body" />
            <ErrorMessage name="body" component="span" />
          </div>
          
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <br />
        </Form>
      )}
    </Formik>
  </div>
);

export default CreatePostForm;