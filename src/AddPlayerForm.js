import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddPlayerForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      nation: '',
      club: '',
      cost: 0,
      clip: '',
      description: '',
      img: '',
      top: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required.').min(2, 'Must be 2 characters or more'),
      nation: Yup.string().required('Required.').min(2, 'Must be 2 characters or more'),
      club: Yup.string().required('Required.').min(2, 'Must be 2 characters or more'),
      cost: Yup.number().required('Required.').integer().typeError('Please type a number.'),
      clip: Yup.string().required('Required.').min(10, 'Must be 10 characters or more'),
      description: Yup.string().required('Required.').min(10, 'Must be 10 characters or more'),
      img: Yup.string().required('Required.').min(10, 'Must be 10 characters or more'),
    }),
    onSubmit: (values) => {
      const baseURL = 'https://6535dff3c620ba9358ecb96d.mockapi.io/dbPlayers'; // Replace with your API endpoint URL

      fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          console.log('Player added successfully!');
        })
        .catch(error => console.log(error.message));
    },
  });

  return (
    <div>
      <h2>Add Player</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>
        {/* Other form fields */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddPlayerForm;