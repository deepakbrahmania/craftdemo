import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../common/button/Button';
import { BarChart } from '../../common/charts/bar';
import { Input } from '../../common/input/Input';
import { Notification } from '../../common/notification/Notification';
import { getTrendStatus, getTrends, fetchAllTrends } from '../../features/trends/trendSlice';

export const HomePage = () => {
    const trends = useSelector(getTrends);
    const [trendStatus, trendError] = useSelector(getTrendStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Hello", trendStatus)
        if(trendStatus === 'idle') {
           dispatch(fetchAllTrends()); 
        }
    }, [trendStatus, dispatch]);

    console.log(trends);
    return <div>
        Welcome to homepages
        <Input value={"world"} onUpdate={(val) => console.log(val)} />
        <Button primary text={"hello"} onClick={(e) => console.log("e", e)}/>
        <Button customRender={() => <span>Helo</span>} onClick={(e) => console.log("e", e)}/>
        
    </div>
}