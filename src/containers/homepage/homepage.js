import React from 'react';
import { Button } from '../../common/button/Button';
import { BarChart } from '../../common/charts/bar';
import { Input } from '../../common/input/Input';

export const HomePage = () => {
    return <div>
        Welcome to homepages
        <BarChart />
        <Input value={"world"} onUpdate={(val) => console.log(val)} />
        <Button primary text={"hello"} onClick={(e) => console.log("e", e)}/>
        <Button customRender={() => <span>Helo</span>} onClick={(e) => console.log("e", e)}/>
    </div>
}