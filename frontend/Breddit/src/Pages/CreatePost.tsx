import { Input } from 'antd';
import { Select } from 'antd';
const { TextArea } = Input;
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import createPostText from '../assets/createPostText.svg'
import createPostImage from '../assets/image.svg'
import createLinkImage from '../assets/link.svg'
import React, { useState } from 'react'

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const items: MenuProps['items'] = [
    {
        key: 'funny',
        label: 'Funny',
    },
    {
        key: 'Serious',
        label: 'Serious',
    },
    {
        key: 'Wholesome',
        label: 'Wholesome',
    },
];





const CreatePost = () => {
    var createPostBody = (
        <div className="login-form">
            <TextArea rows={7} placeholder='Text(optional)' />
        </div>
    )

    const [postBody, setPostBody] = useState(createPostBody)

    function regPost() {
        setPostBody(
            <div className="login-form">
                <TextArea rows={7} placeholder='Text(optional)' />
            </div>
        )
    }

    function postImage() {
        setPostBody(
            <div className='border-dashed w-full border-2 border-slate-400 rounded flex justify-center items-center h-48'>
                <div className=''>Drag and Drop Image </div>
                <button className='rounded-full border-solid border-2 border-slate-400 w-fit mt-3 px-5 py-1 mb-2 ml-2'>Upload</button>
            </div>

        )
    }

    function linkPost() {
        setPostBody(
            <div className="login-form">
                <TextArea rows={3} placeholder='Url' />
            </div>
        )
    }

    return (
        <div className='bg-slate-500 h-screen flex align-middle justify-center'>
            <div className='w-2/5 m-auto bg-slate-300 p-10 rounded'>
                <div className='border-solid border-b-2 border-slate-400 w-full text-xl'>Create a Post</div>
                <Select
                    className='mt-3 w-1/2'
                    showSearch
                    placeholder="Select a Community"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                        {
                            value: 'cpp',
                            label: 'CPP',
                        },
                        {
                            value: 'cali',
                            label: 'Cali',
                        },
                        {
                            value: 'la',
                            label: 'LA',
                        },
                    ]}
                />
                <div className='flex justify-around mt-3'>
                    <div onClick={regPost} className='border-y-2 border-l-2 py-5 w-full text-center rounded flex justify-center align-center items-center'>
                        <img src={createPostText} className='w-10 fill-slate-400 mr-2' />
                        <div>Post</div>
                    </div>
                    <div onClick={postImage} className='border-y-2 border-x-2 py-5 w-full text-center rounded flex justify-center align-center items-center'>
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
                        <Input placeholder='Title' type="text" className="w-full my-2">
                        </Input>
                    </div>


                    {postBody}

                    <Dropdown className='rounded-full border-solid border-2 border-slate-400 w-fit mt-3 px-5 py-1'
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['3'],
                        }}
                    >
                        <Typography.Link>
                            <Space className='text-black'>
                                Flair
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>


                    <div className="login-form w-full">
                        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;