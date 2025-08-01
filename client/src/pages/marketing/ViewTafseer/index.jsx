import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleTafseer } from '../../../api/tafseer';

function ViewTafseer() 
{
    const { id } = useParams();
    const [tafseer, setTafseer] = useState(null);

    useEffect(() => {
        fetchSingleTafseer(id)
        .then(response => setTafseer(response))
        .catch(error => setTafseer(error));
    },[]);
    console.log(tafseer);

    return (
        <div>
        
        </div>
    );
}


export default ViewTafseer;