//  Navbar
//    Current community, logo, search, chat (?), username/karma section
import { Select } from 'antd';
import axios from 'axios';
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';


export interface headerProps {
    currCommunity: string,
    // URL, need to validate, ya
    logoSource: string,
    // can get the username and the karma of the user from the API, using userID
    userID: string,
}
const Header = (props: headerProps) => {
    //All States/variables
    interface postForm { userID: number, communityID: number, title: string, postType: string, body: string, flair: string, }
    const [formData, setFormData] = useState<postForm>({ userID: Number(localStorage.getItem("userID")), communityID: -1, title: "", postType: "post", body: "", flair: ""})
    interface communitySelection { value: string, label: string }
    const [communities, getCommunities] = useState<communitySelection[]>([]);

    
    interface option {
        value: number,
        label: string
    }

    const nav = useNavigate();

    const onChangeCommunity = async ( opt: number, opt2: option ) => {
        // Here, the name of the community is label, ID is value
        // reroute Change teh page location from /home --> /c/communityName
        
        // For some bizzare ass reason, if you pass in just one prop, it only gives you the VALUE that was selected
        // But if you put in a second prop, it returns the whole JSON, which we can destructure
        const {value, label} = opt2;
        nav("/c/"+label)
        
    };
    
    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    function onClickProfile(){
        const userID = localStorage.getItem("userID");
        nav("profile/:" + userID);
    }

    function onClickLogout(){
        localStorage.removeItem("userID");
        nav("/")
    }
    

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // function handleChange(e: { target: { name: any; value: any; }; }) {
    //     const { name, value } = e.target;
    //     console.log
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // }


    useEffect(() => {
        axios.get("http://localhost:3000/allCommunities").then(function (response) {
            if (response.data) {
                console.log(response.data)
                const allCommunitiesJson = response.data
                const formPrep: communitySelection[] = [];
                for (let community in allCommunitiesJson) {
                    formPrep.push({
                        value: allCommunitiesJson[community].communityID,
                        label: allCommunitiesJson[community].name
                    })
                }
                getCommunities(formPrep)
            }
        })
            .catch(function (error) {
                alert(error);
            });
    }, []);

    return (
        <>
            <div className="flex flex-row w-screen bg-slate border-solid border-black border-b-2 items-center">
                <div className="flex flex-row w-1/2 justify-start pl-6 items-center">
                    <div className="flex w-5 h-5 pt-1px">
                        <a href="../Home">
                            <img className="object-cover" src={props.logoSource} alt="Breddit Logo" />
                        </a>
                    </div>
                    <div className="pl-2">
                        {props.currCommunity}
                    </div>
                    <Select
                    className='ml-3 w-1/2 '
                    showSearch
                    placeholder="Select a Community"
                    optionFilterProp="children"
                    onChange={onChangeCommunity}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={communities}
                    value={this}
                />
                </div>
                <div className="flex flex-row w-1/2 justify-end pr-6 ">
                    <div onClick = {onClickProfile} className="text-white-500 hover:underline mt-2 px-4 cursor-pointer">
                        Go To Profile
                    </div>
                    <div className="text-white-500 hover:underline mt-2 px-4 cursor-pointer" onClick = {onClickLogout}>
                        Logout
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header;