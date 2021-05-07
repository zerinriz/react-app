import { useEffect, useState } from 'react';
import { list } from '../services/apiService';
import { Link } from 'react-router-dom';

const Students = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        list('students', data => {
            setStudents(data);
        })
    }, []);


    return (
        <div className='container'>
            <h1>Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Year of Birth</th>
                        <th>Adress</th>
                        <td>
                            <Link to='/students/0'>Add new</Link>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(c => (
                        <tr key={c._id}>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.yearOfBirth}</td>
                            <td>{c.address}</td>
                            <td>
                                <Link to={`/students/${c._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Students;