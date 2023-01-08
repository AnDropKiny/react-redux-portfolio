import { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import Form from '../form/Form'

import './status.scss';

const Status = () => {
    console.log("render")
    const { request } = useHttp();
    const [data, setData] = useState([]);
    const [city, setCity] = useState("Красноярск");
    const [status, setStatus] = useState(false);
    const [textStatus, setNewStatus] = useState("Прежде чем действовать, надо понять");

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

    const changeStatus = () => {
        setStatus(false)
        setNewStatus(document.getElementById("status").value);
    }

    const filteredCities = sortedArr(data).map((value, id) => value.population > 50000 ? <option key={id} value={value.city}>{value.city}</option> : null)


    return (
        <div className="content">
            <div className='header'>
                <div>
                    <h1>Здравствуйте, <span>Человек №3596941</span></h1>
                    {!status ? <a onClick={() => setStatus(true)}>Сменить статус</a> : <a onClick={() => changeStatus()}>Сохранить</a>}

                </div>

                <div className='status_bar'>
                    <div className='bar'>
                        {!status ? <span className='text_bar'>{textStatus}</span> : <input id='status' type="text" />}
                    </div>
                    <div className='rectangle'>  </div>
                </div>
                <div className='city_select'>
                    <label htmlFor="city">Ваш город</label>
                    <select
                        name="city"
                        id="city"
                        onChange={(e) => setCity(e.target.value)}>
                        {filteredCities}
                    </select>
                </div>

            </div >
            <div className='form_bar'>
                <Form data={city} />
            </div>
        </div >

    )
}

export default Status;