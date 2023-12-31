import { Input } from 'antd';
import { Select } from 'antd';
import createPostText from '../assets/createPostText.svg'
import createPostImage from '../assets/image.svg'
import createLinkImage from '../assets/link.svg'
import { useState, useEffect, ChangeEvent } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

type postType = "post" | "image" | "link";



const CreatePost = () => {

    //All States/variables
    interface postForm { userID: number, communityID: number, title: string, postType: postType, body: string, flair: string, date: string}
    const d = new Date;
    const today = d.toLocaleDateString();
    const [formData, setFormData] = useState<postForm>({ userID: Number(localStorage.getItem("userID")), communityID: -1, title: "", postType: "post", body: "", flair: "", date: today})
    interface communitySelection { value: string, label: string }
    const [communities, getCommunities] = useState<communitySelection[]>([]);
    const nav = useNavigate();
    const [postBody, setPostBody] = useState(
        <div className="login-form">
          <Input.TextArea rows={7} placeholder='Text(optional)' onChange={onChangeTextArea} name="body" />
        </div>
      );

    const onChangeCommunity = async (value: string) => {
        await axios.get("http://localhost:3000/communityID?name="+value).then(function (response) {
                if (response.data){
                    setFormData({
                        ...formData,
                        communityID: response.data[0].communityID
                    })
                }
            })
            .catch(function (error) {
                alert(error);
            });
    };

    const onChangeFlair = (value: string) => {
        setFormData({
            ...formData,
            flair: value,
        });
    };
    
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    
    function onChangeTextArea(e: { target: { name: any; value: any; }; }) {
        const { name, value } = e.target;
        console.log(formData);
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    function handleChange(e: { target: { name: any; value: any; }; }) {
        const { name, value } = e.target;
        console.log
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleOnSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        axios.post("http://localhost:3000/post",formData).then(function (response) {
            if (response.data) {
                nav("/")
            }
        })
            .catch(function (error) {
                alert(error);
            });
    }

    function regPost() {
        setFormData({
            ...formData,
            postType: "post",
        });
        setPostBody(
            <div className="login-form">
                <Input.TextArea rows={7} placeholder='Text(optional)' onChange={onChangeTextArea} name="body"/>
            </div>
        )
    }

    
    const ImageUploadComponent: React.FC = () => {
        const [base64String, setBase64String] = useState<string>('');
      
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files ? event.target.files[0] : null;
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
                setFormData({
                    ...formData,
                    body: base64,
                    postType: "image"
                });
              setBase64String(base64);
            };
            reader.readAsDataURL(file);
          }

        };
      
        return (
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} /> 
          </div>
        );
      };

      useEffect(() => {
        console.log(formData)
      }, [formData])


      const imagePost = () => {
        setPostBody(
            <div className='border-dashed w-full border-2 border-slate-400 rounded flex justify-center items-center h-48'>
                <ImageUploadComponent/>
            </div>
        )
    }

    function linkPost() {
        setFormData({
            ...formData,
            postType: "link",
        });
        setPostBody(
            <div className="login-form">
                <Input.TextArea rows={3} placeholder='Url' onChange={onChangeTextArea} name="body" />
            </div>
        )
    }

    useEffect(() => {
        axios.get("http://localhost:3000/allCommunities").then(function (response) {
            if (response.data) {
                const allCommunitiesJson = response.data
                const formPrep: communitySelection[] = [];
                for (let community in allCommunitiesJson) {
                    formPrep.push({
                        value: allCommunitiesJson[community].name,
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
        <div className='bg-slate-500 h-screen flex align-middle justify-center'>
            <div className='w-2/5 m-auto bg-slate-300 p-10 rounded'>
                <div className='border-solid border-b-2 border-slate-400 w-full text-xl'>Create a Post</div>
                <Select
                    className='mt-3 w-1/2'
                    showSearch
                    placeholder="Select a Community"
                    optionFilterProp="children"
                    onChange={onChangeCommunity}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={communities}
                    value={this}
                />
                <div className='flex justify-around mt-3'>
                    <div onClick={regPost} className='border-y-2 border-l-2 py-5 w-full text-center rounded flex justify-center align-center items-center'>
                        <img src={createPostText} className='w-10 fill-slate-400 mr-2' />
                        <div>Post</div>
                    </div>
                    <div onClick={imagePost} className='border-y-2 border-x-2 py-5 w-full text-center rounded flex justify-center align-center items-center'>
                        <img src={createPostImage} className='w-10 fill-slate-400 mr-1' />
                        <div>Image & Video</div>
                    </div>
                    <div onClick={linkPost} className='border-y-2 border-r-2 py-5 w-full text-center rounded flex justify-center align-center items-center'>
                        <img src={createLinkImage} className='w-10 fill-slate-400 mr-1' />
                        <div>Link</div>
                    </div>
                </div>
                <form action="" method="get" className="login-form flex flex-col">
                    <div className="login-form">
                        <Input placeholder='Title' type="text" className="w-full my-2" onChange={handleChange} name="title">
                        </Input>
                    </div>


                    {postBody}

                    <Select
                        className='w-1/3 mt-3'
                        showSearch
                        placeholder="Select a Flair"
                        optionFilterProp="children"
                        onChange={onChangeFlair}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                            {
                                value: 'funny',
                                label: 'Funny',
                            },
                            {
                                value: 'serious',
                                label: 'Serious',
                            },
                            {
                                value: 'wholesome',
                                label: 'Wholesome',
                            },
                            {
                                value: '18+',
                                label: '18+',
                            },
                            {
                                value: 'spolier',
                                label: 'Spoiler',
                            },
                        ]}
                    />


                    <div className="login-form w-full">
                        <button type="button" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={handleOnSubmit}>Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;