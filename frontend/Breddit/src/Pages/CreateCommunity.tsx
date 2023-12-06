import { Input } from 'antd';
import { Select } from 'antd';
const { TextArea } = Input;
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const CreateCommunity = () => {

    const nav = useNavigate();
    function uploadCommunity(){
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const userID = localStorage.getItem("userID");
        const newCommunity = {communityName: name, description: description, userID: userID, picture: ""}

        axios.post("http://localhost:3000/community",newCommunity)
            .then(function (response) {
                if (response.data){
                    console.log(response.data)
                    nav("/home");
                }
            })
            .catch(function (error) {
                alert(error);
            });

    }
    return (
        <div className='bg-slate-500 h-screen flex align-middle justify-center'>
            <div className='w-2/5 m-auto bg-slate-300 p-10 rounded'>
                <div className='border-solid border-b-2 border-slate-400 w-full text-xl'>Create a Community</div>
                <div className='flex justify-around mt-3'>
                </div>
                <form action="" method="get" className="login-form flex flex-col">
                    <div className="login-form">
                        <Input placeholder='Title' type="text" className="w-full my-2" id="name" name="name">
                        </Input>
                    </div>
                    <div className="login-form">
                        <Input placeholder='Description' type="text" className="w-full my-2 pb-20" id="description" name="description">
                        </Input>
                    </div>
                    <div>Placeholder to insert image for community</div>
                    <div className="login-form w-full">
                        <button type="button" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick = {uploadCommunity}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCommunity;