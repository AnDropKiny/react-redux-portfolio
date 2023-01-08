import { useState, useEffect, createContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Form from '../form/form'
import CreateContext from './FormikContext';

import './statusForm.scss';



const StatusForm = () => {
    console.log("render")
    const { request } = useHttp();
    const [data, setData] = useState([]);

    const getData = () => {
        request('http://localhost:3001/cities')
            .then(setData)
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const sortedArr = (arr) => {
        const data = [...arr];

        data.sort((a, b) => {
            if (a.city > b.city) {
                return 1;
            }
            if (a.city < b.city) {
                return -1;
            }

            return 0;
        });

        const maxElem = data.reduce((result, elem, index) => {
            return Number(elem.population) > Number(data[result].population) ? index : result;
        }, 0);
        return [...data.splice(maxElem, 1), ...data];
    };

    const filteredCities = sortedArr(data).map((value, id) => value.population > 50000 ? <option key={id} value={value.city}>{value.city}</option> : null)

    // const formik = useFormik({
    //     initialValues: {
    //         city: '',
    //         password: '',
    //         confirm: '',
    //         email: '',
    //         terms: false
    //     },
    //     validationSchema: Yup.object({
    //         city: Yup.string().required('Выберете город'),
    //         password: Yup
    //             .string()
    //             .required('Введите пароль')
    //             .min(5, 'Используйте не менее 5 символов'),
    //         confirm: Yup
    //             .string()
    //             .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    //         email: Yup.string().email('Неверный E-mail').required('Укажите E-mail')
    //     }),
    //     onSubmit: (values, { resetForm }) => {
    //         console.log(JSON.stringify(values, null, 2))
    //         resetForm();
    //     }
    // })
    // const context = createContext(formik)

    const { formik, formikContext } = CreateContext();


    return (
        <div className="content">
            <div className='header'>
                <div>
                    <h1>Здравствуйте, <span>Человек №3596941</span></h1>
                    <a href="">Сменить статус</a>
                </div>

                <div className='status_bar'>
                    <div className='bar'>
                        <input type="text" />
                        <span className='text_bar'>Прежде чем действовать, надо понять</span>
                    </div>
                    <div className='rectangle'>  </div>
                </div>
                <form className='city_select'>
                    <label htmlFor="city">Ваш город</label>
                    <select
                        name="city"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>


                        {filteredCities}

                    </select></form>

            </div>
            <div className='form_bar'>
                <formikContext.Provider value={formik}>
                    <Form />
                </formikContext.Provider>

            </div>
        </div>

    )
}
export default StatusForm;