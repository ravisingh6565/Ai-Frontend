import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './historyInformation.css';

const HistoryInformationPage = () => {
    const [data, setData] = useState();
    const params = useParams();
    const historyId = params.historyId;

    const getData = async() => {
        try{
            const res = await fetch(`https://dummyjson.com/products/${historyId}`);
            const obj = await res.json();
            setData(obj);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
      getData();
    }, []);

    return (
        <div className="history-card">
            <div className="container"> 
                <h3 className="title">Info of: {historyId}</h3>
                {data && (
                    <div>
                        <img src={data?.thumbnail} className="image" alt="Thumbnail" />
                        {data?.images && data.images.length > 0 && (
                            <img src={data?.images?.[0]} className="image" alt="Image" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default HistoryInformationPage;
