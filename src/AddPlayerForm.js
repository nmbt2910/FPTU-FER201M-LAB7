import * as Yup from 'yup';

function AddPlayerForm() {
  const formik = useFormik({
    initialValues: {
      nation: '',
      club: '',
      cost: 0,
      clip: '',
      description: '',
      img: '',
      top: false,
    },
    validationSchema: Yup.object({
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

  return null;
}

export default AddPlayerForm;