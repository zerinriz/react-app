import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';

const Student = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: '',
    });
    const [requiredMessage, setMessage] = useState("")

    useEffect(() => {
        if (id !== '0') {
            read('students', id, data => {
                if (data) setStudent(data);
            })
        }
    }, [id]);

    function changeHandler(e) {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/students');
    }

    const save = () => {
        student._id = undefined;
        if (!student.firstName || !student.lastName) {
            setMessage('Field is required')
        }
        else if (id === '0') {
            insert('students', student, data => {
                if (data) return history.push('/students');
                console.log('There was an error during save data');
            })
        } else {
            update('student', id, student, data => {
                if (data) return history.push('/students');
                console.log('There was an error during save data');
            })
        }
    }

    const del = () => {
        remove('students', id, data => {
            history.push('/students');
        })
    }

    return (
        <div className='container'>
            <h2>Student</h2>
            <form className='input-form'>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Students first name: </label>
                    <input type='text'
                        name='firstName'
                        value={student.firstName}
                        onChange={changeHandler} />
                    <div>{requiredMessage}</div>
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Students last name: </label>
                    <input type='text'
                        name='lastName'
                        value={student.lastName}
                        onChange={changeHandler} />
                    <div>{requiredMessage}</div>
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Students year of birth: </label>
                    <input type='text'
                        name='yearOfBirth'
                        value={student.yearOfBirth}
                        onChange={changeHandler} />
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Address: </label>
                    <input type='text'
                        name='address'
                        value={student.address}
                        onChange={changeHandler} />
                </div>
                <hr />
                {id !== '0' && (
                    <div className='left'>
                        <button type='button' onClick={del}>DELETE</button>
                    </div>
                )}
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;  &nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default Student;