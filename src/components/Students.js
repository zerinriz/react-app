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
                        <th>Student Name</th>
                        <th>Points</th>
                        <td>
                            <Link to='/students/0'>Add new</Link>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(c => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.points}</td>
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